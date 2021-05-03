<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = json_decode(file_get_contents("php://input"));
  $data = array_values((array)$data);
  $selectQuery = "SELECT * FROM users WHERE email = :email";

  try 
  {
    
    $statement = $connection->prepare($selectQuery);
    $statement->execute(array(
      ":email" => $data[0]
    ));

    //If a row is found with the email, then attempt to verify the hashed password from the returned row
    if ($statement->rowCount() == 1) {
      $row = $statement->fetch(PDO::FETCH_ASSOC);
      if (password_verify($data[1], $row['password']))
      {
        echo "1";
      }
    }
  }
  catch(PDOException $e)
  {
    echo $e;
    //Log to file?
  }
 
?>
