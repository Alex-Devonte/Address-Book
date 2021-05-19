<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = json_decode(file_get_contents("php://input"));
  $data = array_values((array)$data);
  $returnData = ["login" => false, "userInfo" => []];
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
        $returnData["login"] = true;
        $returnData["userInfo"]["id"] = $row["user_id"];
        $returnData["userInfo"]["firstName"] = $row["first_name"];
        $returnData["userInfo"]["lastName"] = $row["last_name"];
        $returnData["userInfo"]["email"] = $row["email"];
        echo json_encode($returnData);
      }
    }
  }
  catch(PDOException $e)
  {
    echo $e;
    //Log to file?
  }
 
?>
