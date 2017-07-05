<?php
	include($_SERVER['DOCUMENT_ROOT'] . '/' . 'global_connector.php');

	$json = json_decode(file_get_contents("php://input"));
	if(isset($json)) {
		$action = $json->action;
		$hits = $json->score->hits;
		$base = $json->score->score;
		$shots = $json->score->shots;
		$kills = $json->score->kills;
		$initials = $json->player;
	}

	if($action == 'set') {
		$score = 0;

		$acc1 = $hits;
        $acc2 = $shots;
        if($acc1 == 0 || $acc2 == 0) {
        	$accuracy = 0;
        	$accResult = 0;
        }
        else {
           $accuracy = ($acc1 / $acc2) * 100;
           $accResult = ($accuracy / 100) * 1000;
        }
        
        $score = $base + ($kills * 66) + (int)$accResult;
        $date = date('n/j/Y');

		/// Connect to db
		$connection = new Connecter("scores");
		/// Add email and name to mailing list
		$sql ="INSERT INTO scores (initils, score, date) VALUES (:initials, :score, :date)";
		$stmt = $connection->conn->prepare($sql);
		try 
		{
			$stmt->execute(array(':initials' => $initials, ':score' => $score, ':date' => $date));
			echo json_encode("Done");
		}
		catch(PDOException $e)
		{
			echo json_encode($e);
		}
		
		$connection->conn = null;
		$connection = null;
	}
	else if($_POST['action'] == 'get') {
		/// Connect to db
		$connection = new Connecter("scores");
		/// Add email and name to mailing list
		$sql ="SELECT * FROM scores ORDER BY score DESC";
		$stmt = $connection->conn->prepare($sql);
		try 
		{
			$stmt->execute();
        	$results  = $stmt->fetch()
		}
		catch(PDOException $e)
		{
			echo json_encode($e);
		}
		
		$connection->conn = null;
		$connection = null;

		echo json_encode($results);
	}
?>