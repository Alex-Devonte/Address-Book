<?php

  require_once("db_connect.php");
  require_once("validationFunctions.php");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

  $data = json_decode(file_get_contents("php://input"), true);
  $data = (array)$data;

  $errors = [];
  $userId = $data['id'];
  $contactData = $data['data'];

  $firstName = $contactData['firstName'];
  $lastName = $contactData['lastName'];
  $nickname = $contactData['nickname'];

  $emailGroup = $contactData['emailGroup'];
  $phoneGroup = $contactData['phoneGroup'];
  
  $profilePicSrc = $contactData['profilePic'];
  $emailCount = count($emailGroup);
  $phoneCount = count($phoneGroup);

  for ($i = 0; $i < $emailCount; $i++) {
    $email = $emailGroup[$i]['email'];
    if (!empty($email)) {
      validateEmail($email, $errors);
    }
  }

  for ($i = 0; $i < $phoneCount; $i++) {
    $phone = $phoneGroup[$i]['phone'];
    if (!empty($phone)) {
      validatePhone($phone, $errors);
    }
  }

  if (count($errors) == 0) {
    if (isset($contactData['attachment'])) {
      $attachment = $contactData['attachment'];

      $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/address-book/src/php/images/" . $userId;
      //$target_dir = "http://localhost/address-book/src/php/images/" . $userId;
  
      //Create folder for image based on user_id if it doesn't exist
      if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
      } 
      $target_file = $target_dir . '/' . basename($attachment['attachment']['name']);
  
      //https://www.php.net/manual/en/function.rename.php
      rename($attachment['tmp_path'], $target_file);
      $profilePicSrc = "http://localhost/address-book/src/php/images/" . $userId . '/' . $attachment['attachment']['name'];
    }
    try 
    {
      //Insert for contacts table
      $insertQuery = "INSERT INTO contacts (first_name, last_name, nickname, profile_picture_path, user_id) 
                      VALUES (:first_name, :last_name, :nickname, :pic_path, :id)";

      $statement = $connection->prepare($insertQuery);
      $statement->execute(array(
        "first_name" => $firstName,
        "last_name" => $lastName,
        "nickname" => $nickname,
        "pic_path" => $profilePicSrc,
        "id" => $userId
      ));    
      $contactId = $connection->lastInsertId();

      //Insert for email addresses table
      $insertQuery = "INSERT INTO email_addresses (email_type, email_address, contact_id) 
                      VALUES (:type, :email, :id)";
      $statement = $connection->prepare($insertQuery);

      for ($i = 0; $i < $emailCount; $i++) {
        $statement->execute(array(
          "type" => $emailGroup[$i]['emailType'],
          "email" => $emailGroup[$i]['email'],
          "id" => $contactId
        ));
      }

      //Insert for phone numbers table
      $insertQuery = "INSERT INTO phone_numbers (phone_type, phone_number, contact_id) 
                      VALUES (:type, :phone, :id)";
      $statement = $connection->prepare($insertQuery);
      for ($i = 0; $i < $phoneCount; $i++) {
        $statement->execute(array(
          "type" => $phoneGroup[$i]['phoneType'],
          "phone" => $phoneGroup[$i]['phone'],
          "id" => $contactId
        ));
      }

    }
    catch (PDOException $e)
    {
      echo $e;
    }
  }
?>