<?php

  require_once("db_connect.php");
  require_once("validationFunctions.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = json_decode(file_get_contents("php://input"));
  $data = (array)$data;
  $dataKeys = array_keys($data);

  $insertQuery = "INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)";
  $hashedPassword = "";
  
  $errors = [];
  $response =  ["hasErrors" => false, "errorArr" => &$errors];

  if (notEmpty($data, $errors)) {
    validateName($dataKeys[0], $data['firstName'], $errors);
    validateName($dataKeys[1], $data['lastName'], $errors);
    validateEmail($data['email'], $errors);
    validatePassword($data['password'], $errors);   
    
    if (count($errors) == 0) {
      try 
      {
        $connection->prepare($insertQuery)->execute(array(
        ":first_name" => $data['firstName'],
        ":last_name"  => $data['lastName'],
        ":email"      => $data['email'],
        ":password"   => password_hash($data['password'], PASSWORD_DEFAULT), 
        ));
        echo true;
      }
      catch(PDOException $e)
      {
        echo $e;
        //Log to file?
      }
    } else {
      $response['hasErrors'] = true;
      echo json_encode($response);
    }
  }

  //Check if any user values are empty
  function notEmpty($data, &$errors) {
    foreach ($data as $key => $value) {
      if (!empty($value)) {
        continue;
      }
      $errors[] = $key . " cannot be empty";
    }
    if (empty($errors)) {
      return true;
    } else {
      return false;
    }
  }
?>
