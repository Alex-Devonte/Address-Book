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
    
    if (isset($data['attachment'])) {
      $attachment = $data['attachment'];

      $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/address-book/src/php/images/" . $id;

      //Create folder for image based on user_id if it doesn't exist
      if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
      } 
      $target_file = $target_dir . '/' . basename($attachment['attachment']['name']);
  
      //https://www.php.net/manual/en/function.rename.php
      rename($attachment['tmp_path'], $target_file);

      $path = "http://localhost/address-book/src/php/images/" . $id . '/' . $attachment['attachment']['name'];
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

    $query = "INSERT INTO email_addresses (email_id, email_type, email_address, contact_id) VALUES (:email_id, :type, :email, :id) ON DUPLICATE KEY UPDATE email_type = :type, email_address = :email, contact_id = :id";
    // $updateQuery = "UPDATE email_addresses
    //                 SET email_type = :type, email_address = :email 
    //                 WHERE contact_id = :id AND email_id = :email_id";
    $statement = $connection->prepare($query);

    for ($i = 0; $i < count($emailGroup); $i++) {
      $statement->execute(array(
        ':email_id' => $emailGroup[$i]['id'],
        ':type' => $emailGroup[$i]['emailType'],
        ':email' => $emailGroup[$i]['email'],
        ':id' => $id
      ));
    }

    $query = "INSERT INTO phone_numbers (phone_id, phone_type, phone_number, contact_id) VALUES (:phone_id, :type, :phone, :id) ON DUPLICATE KEY UPDATE phone_type = :type, phone_number = :phone, contact_id = :id";
    // $updateQuery = "UPDATE phone_numbers
    //                 SET phone_type = :type, phone_number = :phone
    //                 WHERE contact_id = :id AND phone_id = :phone_id";
    $statement = $connection->prepare($query);

    for ($i = 0; $i < count($phoneGroup); $i++) {
      $statement->execute(array(
        ':phone_id' => $phoneGroup[$i]['id'],
        ':type' => $phoneGroup[$i]['phoneType'],
        ':phone' => $phoneGroup[$i]['phone'],
        ':id' => $id,
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