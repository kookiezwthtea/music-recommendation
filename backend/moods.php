<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "mood_music";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT id, name FROM moods";
$result = $conn->query($sql);

$moods = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $moods[] = $row;
    }
} else {
    echo json_encode(["error" => "No moods found"]);
    $conn->close();
    exit();
}

echo json_encode($moods);

$conn->close();
?>
