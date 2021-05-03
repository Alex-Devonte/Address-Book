<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = file_get_contents("php://input");
  $selectQuery = "SELECT email FROM users WHERE email = :email";

  try 
  {
    $statement = $connection->prepare($selectQuery);
    $statement->execute(array(
      ":email"  => $data,
    ));

    echo $statement->rowCount();
  }
  catch(PDOException $e)
  {
    echo $e;
    //Log to file?
  }
 
?>
