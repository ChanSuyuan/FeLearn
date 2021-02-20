# Pus [pʌʃ]

[pʌʃ] is a rapid personnal logging system.

inspired by the [Bullet Journal](http://bulletjournal.com) and by
[Git](http://git-scm.org).

**installation**

`npm i -g pus`

**commands**

```sh
# Add a task
$ pus commit -t 'a task'
$ pus ci -t 'a new task as well'

# Add an event
$ pus commit -o 'an event'
$ pus commit -o 'my wife birthday' -d 2016-12-24

# Add a note
$ pus commit 'a note'
$ pus commit -n 'a note' -d 2016-01-01

# List all notes, events, tasks
$ pus log
$ pus log -t # only tasks
$ pus log -n # only notes
$ pus log -o # only events
$ pus log -d 2015-01-01 # list all since 2015-01-01, you can combine w/ others

# Complete a task
$ pus done <sha1>

# Show more about a task
$ pus show <sha1>
```

**how does it work**

For now [pʌʃ] creates a local persistent database in `~/.pus/commits.db`.

