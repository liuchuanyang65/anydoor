<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{title}}</title>
	<style>
		body {
			padding: 30px;
		}
		.link {
			display: block;
			margin-bottom: 30px;
		}
	</style>
</head>
<body>
{{#each files}}
    <a class="link" href="{{../dir}}/{{this}}">{{this}}</a>
{{/each}}
</body>
</html>
