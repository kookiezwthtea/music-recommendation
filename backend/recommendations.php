<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mood_music";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Get moods from query parameter
$moods = isset($_GET['moods']) ? explode(',', $_GET['moods']) : [];

if (!empty($moods) && is_array($moods)) {
    $placeholders = implode(',', array_fill(0, count($moods), '?'));
    $sql = "SELECT s.title, s.artist FROM songs s
            INNER JOIN song_mood sm ON s.id = sm.song_id
            INNER JOIN moods m ON sm.mood_id = m.id
            WHERE m.name IN ($placeholders)";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
        exit();
    }

    $types = str_repeat('s', count($moods)); 
    $stmt->bind_param($types, ...$moods);

    if (!$stmt->execute()) {
        echo json_encode(["error" => "Failed to execute statement: " . $stmt->error]);
        exit();
    }

    $result = $stmt->get_result();
    $songs = array();
    while ($row = $result->fetch_assoc()) {
        $songs[] = $row;
    }

    echo json_encode($songs);
    $stmt->close();
} else {
    echo json_encode(["error" => "No moods provided or moods is not an array"]);
}

$conn->close();
?>
