<?php
  require_once("db_connect.php");
  require_once("validationFunctions.php") ;
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

  $data = json_decode(file_get_contents("php://input"), true);
  $errors = [];
  $response =  ["hasErrors" => false, "errors" => &$errors];
  $id = $data['id'];
  $data = $data['data'];
  $dataKeys = array_keys($data);

  $path = $data['profilePic'];
  $firstName = "";
  $lastName = "";
  $nickname = $data['nickname'];

  $emailGroup = $data['emailGroup'];
  $phoneGroup = $data['phoneGroup'];

  if (validateName($dataKeys[1], $data['firstName'], $errors) && validateName($dataKeys[2], $data['lastName'], $errors)) {
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
  }

  if (!empty($data['emailGroup']['email'])) {
    if (validateEmail($data['emailGroup']['email'], $errors)) {
      $email = $data['emailGroup']['email'];
    }
  }

  if (!empty($data['phoneGroup']['phone'])) {
    if (validatePhone($data['phoneGroup']['phone'], $errors)) {
      $phone = $data['phoneGroup']['phone'];
    } 
  } 

  try
  {
    if (count($errors) > 0) {
      echo json_encode($response);
      exit();
    }
    
    $updateQuery = "UPDATE contacts
                    SET first_name = :first, last_name = :last, nickname = :nickname,
                        profile_picture_path = :path 
                    WHERE contact_id = :id";
    
    $connection->beginTransaction();

    $statement = $connection->prepare($updateQuery);
    $statement->execute(array(
      ':first' => $firstName,
      ':last' => $lastName,
      ':nickname' => $nickname,
      ':path' => $path,
      ':id' => $id
    ));

    $updateQuery = "UPDATE email_addresses
                    SET email_type = :type, email_address = :email 
                    WHERE contact_id = :id AND email_id = :email_id";
    $statement = $connection->prepare($updateQuery);

    for ($i = 0; $i < count($emailGroup); $i++) {
      $statement->execute(array(
        ':type' => $emailGroup[$i]['emailType'],
        ':email' => $emailGroup[$i]['email'],
        ':id' => $id,
        ':email_id' => $emailGroup[$i]['id']
      ));
    }
    $updateQuery = "UPDATE phone_numbers
                    SET phone_type = :type, phone_number = :phone
                    WHERE contact_id = :id AND phone_id = :phone_id";
    $statement = $connection->prepare($updateQuery);

    for ($i = 0; $i < count($phoneGroup); $i++) {
      $statement->execute(array(
        ':type' => $phoneGroup[$i]['phoneType'],
        ':phone' => $phoneGroup[$i]['phone'],
        ':id' => $id,
        ':phone_id' => $phoneGroup[$i]['id']
      ));
    }
    
    $connection->commit();
      echo json_encode($response);
  }
  catch (PDOException $e)
  {
    echo $e;
  }
?>