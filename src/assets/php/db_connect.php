<?php
	$db_hostname = "localhost";
	$db_database = "address_book";
	$db_username = "root";
	$db_password = "";

	try
	{
		$connection = new PDO("mysql:host=$db_hostname; dbname=$db_database", $db_username, $db_password);
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $e)
	{
		echo "Connection Failed: " . $e->getMessage();
	}
?>