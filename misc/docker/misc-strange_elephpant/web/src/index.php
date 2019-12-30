<?php
error_reporting(0);
session_start();

if(isset($_POST['answer'])) {
	//var_dump($_POST['answer']);
	if($_SESSION['start_time'] && (time() - $_SESSION['start_time']) > 2) {
		$_SESSION['stage'] = 1;
		die("<script>alert('Timeout!');location.href='index.php';</script>");
	}
	else if($_POST['answer'] != $_SESSION['answer']) {
		$_SESSION['stage'] = 1;
		die("<script>alert('땡!');location.href='index.php';</script>");
	}

	$_SESSION['stage'] += 1;
	header('Location: index.php');
}

$val = mt_rand(1, 3);
$random_mode = mt_rand(1, 3);
if ($random_mode==1) $_SESSION['mode']='win';
else if ($random_mode==2) $_SESSION['mode']='lose';
else if ($random_mode==3) $_SESSION['mode']='tie';

switch($val)
{
	case 1:
		$image = file_get_contents('rock.png');
		$_SESSION['com'] = 'rock';
		if ($_SESSION['mode'] == 'win') $_SESSION['answer'] = '보';
		if ($_SESSION['mode'] == 'lose') $_SESSION['answer'] = '가위';
		if ($_SESSION['mode'] == 'tie') $_SESSION['answer'] = '바위';
		break;
	case 2:
		$image = file_get_contents('scissor.png');
		$_SESSION['com'] = 'scissor';
		if ($_SESSION['mode'] == 'win') $_SESSION['answer'] = '바위';
		if ($_SESSION['mode'] == 'lose') $_SESSION['answer'] = '보';
		if ($_SESSION['mode'] == 'tie') $_SESSION['answer'] = '가위';
		break;
	case 3:
		$image = file_get_contents('paper.png');
		$_SESSION['com'] = 'paper';
		if ($_SESSION['mode'] == 'win') $_SESSION['answer'] = '가위';
		if ($_SESSION['mode'] == 'lose') $_SESSION['answer'] = '바위';
		if ($_SESSION['mode'] == 'tie') $_SESSION['answer'] = '보';
		break;
}

if(!$_SESSION['stage']) $_SESSION['stage'] = 1;
$_SESSION['start_time'] = time();
if ($_SESSION['stage'] == 101) die("<center><h1>Congratulations!</h1><br><h1>XMAS{k0ggiri_ahjeossi_neun_k0ga_son_irae}</h1></center>");

?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<title>Strange Elephpant</title>
	<style>
		input {
			margin: 30px;
			margin-top: 0;
			width: 200px;
			height: 200px;
			font-size: 50px;
		}
	</style>
</head>

<body>
	<center>
		<img src="image.php" width="700px" height="480px">
		<br>
		<?php

			if ($_SESSION['mode']=='win') echo "<h1>어딘가 잘못된 PHP 코끼리를 이겨주세요!</h1>";
			else if ($_SESSION['mode']=='lose') echo "<h1>어딘가 잘못된 PHP 코끼리에게 져 주세요!</h1>";
			else echo "<h1>어딘가 잘못된 PHP 코끼리와 비겨주세요!</h1>";

			echo "<h2>라운드 당 시간 제한 : 2초</h2>";
			echo "<h2>라운드 : {$_SESSION['stage']}/100</h2><br>";

			echo "
			<form method='POST'>
				<input type='submit' name='answer' value='가위'>
				<input type='submit' name='answer' value='바위'>
				<input type='submit' name='answer' value='보'>
			</form>
			";
		?>
	</center>
</body>
