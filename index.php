<html>
<head>
	<title>Drag-n-Drop Upload</title>
	
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="index.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
	<div class="wrapper">
		<h3>HTML5 Drag-n-Drop Files Upload</h3>
	
		<div id="target">
			Drop Files Here
		</div>
		
		<div id="info">
			<ul id="files"></ul>		
		</div>
	</div>
</body>
</html>

<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	echo "<br />_FILES<br />";
	var_dump($_FILES);
	
	exit;	
}

?>