<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  $data = json_decode(file_get_contents("php://input"), true);
  $data = (array)$data;
  
  $errors = [];
  $userId = $data['id'];
  $contactData = $data['data'];

  $firstName = $contactData['firstName'];
  $lastName = $contactData['lastName'];
  $nickname = $contactData['nickname'];

  $email = $contactData['emailGroup']['email'];
  $emailType = $contactData['emailGroup']['emailType'];
  $phone = $contactData['phoneGroup']['phone'];
  $phoneType = $contactData['phoneGroup']['phoneType'];
  $profilePicSrc = $contactData['profilePic'];
  
  if (!empty($email)){
    validateEmail($contactData['emailGroup']['email'], $errors);
  }
  if (!empty($phone)) {
    validatePhone($contactData['phoneGroup']['phone'], $errors);
  }

  if (count($errors) == 0) {
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
      $statement->execute(array(
        "type" => $emailType,
        "email" => $email,
        "id" => $contactId
      ));

      //Insert for phone numbers table
      $insertQuery = "INSERT INTO phone_numbers (phone_type, phone_number, contact_id) 
                      VALUES (:type, :phone, :id)";
      $statement = $connection->prepare($insertQuery);
      $statement->execute(array(
        "type" => $phoneType,
        "phone" => $phone,
        "id" => $contactId
      ));
    }
    catch (PDOException $e)
    {
      echo $e;
    }
  }
    
  function validateEmail($email, &$errors) {
    if (preg_match("/^[a-z0-9._%. +-]+@[a-z0-9.-]+/", $email)) {
      return true;
    } else {
      $errors[] = "Email must be in a valid format E.g: email@domain.com";
      return false;
    }
  }

  function validatePhone($phone, &$errors) {
    if (ctype_digit($phone)) {
      if (strlen(($phone)) == 10) {
        return true;
      } else {
        $errors[] = "Phone number must be 10 numbers long";
      }
    } else {
      $errors[] = "Phone number must only contain numbers";
    }
  }
?>