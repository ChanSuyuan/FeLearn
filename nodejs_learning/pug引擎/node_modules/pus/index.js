'use strict';

let name = 'pʌʃ';

const pk = require('./package.json');
const crypto = require('crypto');
const program = require('commander');
const Document = require('nedb');
const path = require('path');
const mkdirp = require('mkdirp');
const debug = require('debug')(name);
require('colors');

let _ = {
  sha1 (msg) {
    return crypto.createHash('sha1').update(msg, 'utf8').digest('hex');
  },
  today () {
    return new Date().toJSON().slice(0, 10);
  },
  isStringEmpty (val) {
    return typeof val === 'undefined' || !val || val === '' || val.length <= 0;
  },
  stdout (docs) {
    let out = docs.reduce((stdout, doc) => {
      stdout += `${doc.sha1.slice(0, 7).yellow} ${doc.date} | ${doc.text}\n`;
      return stdout;
    }, '');
    process.stdout.write(out);
  },
  err (msg) {
    throw new Error(msg);
  }
};

class LocalStorage {
  constructor (opts) {
    debug('LocalStorage#constructor');
    this.dotpath = path.join(process.env.HOME, '.pus');
    this.mkdir();
    this.docs = new Document({
      filename: path.join(this.dotpath, 'commits.db'),
      autoload: true
    });
    opts.isReady();
  }

  mkdir () {
    debug('LocalStorage#mkdir');
    mkdirp.sync(this.dotpath);
  }

  insert (doc, cb) {
    debug('Storage#insert');
    doc.at = new Date().toJSON();
    this.docs.insert(doc, (err) => {
      if (err) {
        _.err(`Error while trying to insert. ${err.message}`);
      }
      cb();
    });
  }

  count (cb) {
    debug('Storage#count');
    this.docs.count({}, (err, count) => {
      if (err) {
        _.err(`Error while trying to count. ${err.message}`);
      }

      cb(count);
    });
  }

  find (query, opts, cb) {
    debug('Storage#find');
    let sortby = opts.sort || { date: -1 };
    let limit = opts.limit || 100;
    this.docs.find(query || {}).sort(sortby).limit(limit).exec((err, docs) => {
      if (err) {
        _.err(`Error while trying to find. ${err.message}`);
      }

      cb(docs);
    });
  }

  findOne (query, cb) {
    this.docs.findOne(query).exec((err, doc) => {
      if (err) {
        _.err(`Error while trying to findOne. ${err.message}`);
      }

      cb(doc);
    });
  }

  update (query, updates, cb) {
    this.docs.update(query, updates, (err) => {
      if (err) {
        _.err(`Error while trying to update. ${err.message}`);
      }

      cb();
    });
  }
}

class Validation {
  constructor (options) {
    this.cmd = options._name;

    this.cantdoc = `Can't execute '${this.cmd}' command.`;
    this.seedoc = `see doc by taping 'pus ${this.cmd} --help'`;
    this.options = options;
    this.fields = options.options.map((opt) => opt.long.slice(2));

    if (typeof this.options !== 'object') {
      _.err(`Options are not valid. ${this.seedoc}`);
    }

    this.isOK();
  }

  isOK () {
    return this.fields.every(this.validate.bind(this));
  }

  validate (field) {
    debug('Validation#validate', field);
    return this[field](this.options[field]);
  }

  task () { return true; }
  event () { return true; }
  note () { return true; }
  done () { return true; }

  limit (val) {
    debug('Validation#limit', val);
    if (val && isNaN(+val)) {
      _.err(`${this.cantdoc} Limit must be a number. ${this.seedoc}`);
    }

    return true;
  }

  date (val) {
    debug('Validation#date', val);
    if (val && (!/^\d{4}-\d{2}-\d{2}$/.test(val) || isNaN(Date.parse(val)))) {
      _.err(`${this.cantdoc} Date is incorrect. ${this.seedoc}`);
    }

    return true;
  }
}

class Command {
  constructor (storage, options) {
    Object.assign(this, options);

    this.storage = storage;
    this.defaults();

    this.validator = new Validation(options);
    this.validate();
  }

  defaults () {}
  validate () {}
  run () {}
}

class Done extends Command {
  validate () {
    debug('Done#validate', this.sha1);

    let validator = this.validator;
    if (_.isStringEmpty(this.sha1) || this.sha1.length < 7) {
      _.err(`${validator.cantdoc} ${validator.seedoc}`);
    }
  }

  query () {
    return {
      sha1: new RegExp(`^${this.sha1}`),
      flag: '.'
    };
  }

  run () {
    this.storage.findOne(this.query(), (doc) => {
      if (!doc) {
        process.stdout.write('Task not found!\n');
        return process.exit();
      }

      let updates = { $set: {
        flag: '~',
        text: '~ ' + doc.text.slice(2)
      } };
      this.storage.update({ _id: doc._id }, updates, () => {
        // use commit run to insert commit
        Commit.prototype.run.call({
          storage: this.storage,
          flag: 'x',
          text: doc.text.slice(2),
          date: this.date || _.today()
        }, doc.sha1);
      });
    });
  }
}

class Show extends Done {
  run () {
    let docs = [];
    let findOne = (sha1) => {
      this.storage.findOne({ sha1: new RegExp(`^${sha1}`) }, (doc) => {
        if (!doc) {
          return;
        }
        if (doc) {
          docs.push(doc);
        }
        if (!doc.parent) {
          return _.stdout(docs.sort((a, b) => {
            return b.at > a.at ? 1 : -1;
          }));
        }
        findOne(doc.parent);
      });
    };
    findOne(this.sha1);
  }
}

class Commit extends Command {
  defaults () {
    if (!this.limit) {
      this.limit = 59;
    }
    if (!this.date) {
      this.date = _.today();
    }
  }

  validate () {
    let validator = this.validator;

    if (_.isStringEmpty(this.text)) {
      _.err(`${validator.cantdoc} ${validator.seedoc}`);
    }

    if (this.text.length > +this.limit) {
      _.err(`Can't commit, you go over the limitation. ${validator.seedoc}`);
    }
  }

  run (parent) {
    let flag = this.flag || (this.task ? '.' : (this.event ? 'o' : '-'));
    let doc = {
      date: this.date,
      text: [flag, this.text].join(' '),
      flag: flag
    };
    if (parent) {
      doc.parent = parent;
    }
    this.storage.count((count) => {
      doc.sha1 = _.sha1(`${count}|${doc.date}|${doc.text}`);
      this.storage.insert(doc, () => {
        debug('Pus#commit', 'ok');
      });
    });
  }
}

class Log extends Command {
  query () {
    let query = { flag: /[\.\-ox]/ };
    if (this.task) {
      query.flag = /\./;
    } else if (this.event) {
      query.flag = /o/;
    } else if (this.note) {
      query.flag = /-/;
    } else if (this.done) {
      query.flag = /x/;
    }

    if (this.date) {
      query.date = { $gte: this.date };
    }

    return query;
  }
  run () {
    let options = {
      limit: this.limit || 100
    };

    this.storage.find(this.query(), options, _.stdout);
  }
}

class Grep extends Log {
  query () {
    let query = super.query();
    query.text = new RegExp(this.exp);
    return query;
  }
}

class Status extends Log {
  query () {
    let query = super.query();
    query.flag = '.';
    return query;
  }
}

class Pus {
  constructor (opts) {
    this.StorageKlass = LocalStorage;
    this.storage = new this.StorageKlass({
      isReady: this.isReady.bind(this)
    });
  }

  isReady () {
    debug(`${name} is ready`);
  }

  exec (name, ...args) {
    this[name].apply(this, args);
  }

  commit (text, options) {
    options.text = text;
    let cmd = new Commit(this.storage, options);
    cmd.run();
  }

  log (options) {
    let cmd = new Log(this.storage, options);
    cmd.run();
  }

  grep (exp, options) {
    options.exp = exp;
    let cmd = new Grep(this.storage, options);
    cmd.run();
  }

  done (sha1, options) {
    options.sha1 = sha1;
    let cmd = new Done(this.storage, options);
    cmd.run();
  }

  show (sha1, options) {
    options.sha1 = sha1;
    let cmd = new Show(this.storage, options);
    cmd.run();
  }

  status (options) {
    let cmd = new Status(this.storage, options);
    cmd.run();
  }
}

let pus = new Pus();

program
  .description(`${name} is a rapid personnal logging system.`)
  .version(pk.version);

program
  .command('commit <text>')
  .alias('ci')
  .description('run commit commands to add new entries in your journal')
  .option('-t, --task', 'commit as a task')
  .option('-o, --event', 'commit as an event')
  .option('-n, --note', 'commit as a note')
  .option('-d, --date <date>', 'force date, format YYYY-MM-DD, default today')
  .option('-l, --limit <number>', 'extend characters limitation, default 59')
  .action(pus.exec.bind(pus, 'commit'));

program
  .command('log')
  .description('show commit logs')
  .option('-l, --limit <limit>', 'limit number of results, default 100')
  .option('-d, --date <date>', 'show all task since date')
  .option('-t, --task', 'show only tasks')
  .option('-o, --event', 'show only events')
  .option('-n, --note', 'show only notes')
  .option('-x, --done', 'show only done tasks')
  .action(pus.exec.bind(pus, 'log'));

program
  .command('grep <exp>')
  .description('grep commits')
  .option('-l, --limit <limit>', 'limit number of results, default 100')
  .option('-d, --date <date>', 'show all task since date')
  .option('-t, --task', 'show only tasks')
  .option('-o, --event', 'show only events')
  .option('-n, --note', 'show only notes')
  .option('-x, --done', 'show only done tasks')
  .action(pus.exec.bind(pus, 'grep'));

program
  .command('status')
  .alias('st')
  .description('show tasks')
  .option('-l, --limit <limit>', 'limit number of results, default 100')
  .option('-d, --date <date>', 'show all task since date')
  .action(pus.exec.bind(pus, 'status'));

program
  .command('done <sha1>')
  .description('done a task using its sha1')
  .action(pus.exec.bind(pus, 'done'));

program
  .command('show <sha1>')
  .description('show a task using its sha1')
  .action(pus.exec.bind(pus, 'show'));

program
  .command('*')
  .action((cmd) => {
    console.log('unknow command "%s"', cmd);
  });

program.parse(process.argv);
