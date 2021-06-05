<?php

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
  
  function validateName($nameKey, $nameValue, &$errors) {
    //Check if name contains letters only
    if (ctype_alpha($nameValue)) {
      return true;
    } else {
      $errors[] = $nameKey . " must contain letters only";
      return false;
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

  function validatePassword($password, &$errors) {
    if (preg_match("/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/", $password)) {
      return true;
    } else {
      $errors[] = "Passwords must be a minimum of 6 characters and contain at least 1 number, 1 uppercase letter, and 1 lowercase letter";
      return false;
    }
  }

?>