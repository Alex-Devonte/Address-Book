<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  $data = (file_get_contents("php://input"));

  try
  {
    $selectQuery = "SELECT * FROM contacts WHERE user_id = :id";

    $statement = $connection->prepare($selectQuery);
    $statement->execute(array(
      ":id" => $data
    ));

    $row = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($row);
  }
  catch (PDOException $e) {
    echo $e;
  }
?>