<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  $id = json_decode($_GET['id']);
    
  try
  {
    $selectQuery = "SELECT * FROM contacts 
                    INNER JOIN email_addresses 
                    ON contacts.contact_id = email_addresses.contact_id
                    INNER JOIN phone_numbers
                    ON contacts.contact_id = phone_numbers.contact_id
                    WHERE contacts.contact_id = :id";

    $statement = $connection->prepare($selectQuery);
    $statement->execute(array(
      ":id" => $id
    ));

    $row = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($row);
  }
  catch (PDOException $e) {
    echo $e;
  }

?>