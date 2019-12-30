<?php
	error_reporting(0);
	session_start();
	
	switch($_SESSION['com'])
	{
		case 'rock':
			$image = file_get_contents('rock.png');
			break;
		case 'scissor':
			$image = file_get_contents('scissor.png');
			break;
		case 'paper':
			$image = file_get_contents('paper.png');
			break;						
	}

	header('Content-Type: image/png');
	echo $image.random_bytes(20);
?>