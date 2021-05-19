<?php

  require_once("db_connect.php");
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: Content-Type");

  //Get raw data
  $data = json_decode(file_get_contents("php://input"));
  echo json_encode($data);
  echo json_encode($data);

?>