<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = json_decode(file_get_contents("php://input"));
  $data = (array_values((array)$data));

  $selectQuery = "SELECT * FROM contacts WHERE user_id = :id";
  $statement = $connection->prepare($selectQuery);
  $statement->execute(array(
    ":id" => $data[0]
  ));

  $row = $statement->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($row);

?>