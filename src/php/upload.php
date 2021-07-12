<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

  if (isset($_FILES['attachment'])) {
    $folder_id = $_POST['folder_id'];
    $uploadData = [];

    //Set temporary directory
    $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/address-book/src/php/images_tmp/" . $folder_id;

    //Set path
    $target_file = $target_dir . '/' . basename($_FILES['attachment']['name']);

    //Create folder if it doesn't exist
    if (!file_exists($target_dir)) {
      mkdir($target_dir, 0777, true);
    }
    rename($_FILES['attachment']['tmp_name'], $target_file);

    $uploadData['attachment'] = $_FILES['attachment'];
    $uploadData['tmp_directory'] = $target_dir;
    $uploadData['tmp_path'] = $target_file;
    
    echo json_encode($uploadData); 
}
?>