<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/public/css.css">
</head>
    <body>
        <h1>{{title}}</h1>
        <ul>
            {% for item in quotes %}
            <li>{{ item }}</li>
            {% endfor %}
        </ul>
    </body>
</html>