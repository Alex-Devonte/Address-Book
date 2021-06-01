<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");

  $id = json_decode(file_get_contents("php://input"));

  try
  {
    $deleteQuery = "DELETE FROM email_addresses WHERE contact_id = :id";
    $connection->beginTransaction();
    $statement = $connection->prepare($deleteQuery);
    $statement->execute(array(':id' => $id));

    $deleteQuery = "DELETE FROM phone_numbers WHERE contact_id = :id";
    $statement = $connection->prepare($deleteQuery);
    $statement->execute(array(':id' => $id));

    $deleteQuery = "DELETE FROM contacts WHERE contact_id = :id";
    $statement = $connection->prepare($deleteQuery);
    $statement->execute(array(':id' => $id));
    echo $connection->commit();
  }
  catch (PDOException $e) {
    echo $e;
  }

?>