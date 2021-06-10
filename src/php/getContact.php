<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  $id = json_decode($_GET['id']);
  $emailInfo = [];
  $phoneInfo = [];
  $response = [];
  
  try
  {
    $selectQuery = "SELECT * FROM contacts WHERE contact_id = :id";

    $statement = $connection->prepare($selectQuery);
    $statement->execute(array(
      ":id" => $id
    ));
    $response = $statement->fetchAll((PDO::FETCH_ASSOC));


    $selectQuery = "SELECT email_address, email_type FROM email_addresses WHERE contact_id = :id";
    $statement = $connection->prepare($selectQuery);
    $statement->execute((array(":id" => $id)));
   
    /*Create associative arrays to hold multiple phone numbers and email addresses if needed*/
    while ($row = $statement->fetch()) {
      $emailInfo[] =  ['email' => $row['email_address'], 'emailType' => $row['email_type']];
    }

    $selectQuery = "SELECT phone_number, phone_type FROM phone_numbers WHERE contact_id = :id";
    $statement = $connection->prepare($selectQuery);
    $statement->execute((array(":id" => $id)));

    while ($row = $statement->fetch()) {
      $phoneInfo[] = ['phone' => $row['phone_number'], 'phoneType' => $row['phone_type']];
    }

    $response = array_merge($response,array("emailData" => $emailInfo), array("phoneData" => $phoneInfo));
    echo json_encode($response);
  }
  catch (PDOException $e) {
    echo $e;
  }

?>