<?php
// Handle login request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $username = $data['username'];
  $password = $data['password'];

  // Validate the username and password
  // Check against the database or other authentication mechanism

  // If the credentials are valid, return a success response
  if ($username === 'admin' && $password === 'password') {
    http_response_code(200);
    echo json_encode(['message' => 'Login successful']);
  } else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid username or password']);
  }
} else {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
}