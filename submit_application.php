<?php
/**
 * St Joseph's Technical Institute - Application Form Submission Handler
 * This file processes form submissions and saves them to a database or file
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

// Check if form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$formData = file_get_contents('php://input');
$data = json_decode($formData, true);

// If JSON decoding failed, try POST data
if (!$data) {
    $data = $_POST;
}

// Validate required fields
$requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'dob', 'gender',
    'idNumber', 'address', 'city', 'county',
    'emergencyName', 'emergencyPhone', 'relationship',
    'lastSchool', 'graduationYear', 'qualification',
    'programme', 'programmeLevel', 'startDate',
    'disabilityType', 'signLanguage', 'currentEmployment',
    'motivation', 'goals'
];

$errors = [];
foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || empty(trim($data[$field]))) {
        $errors[] = "Field '$field' is required";
    }
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Validate phone
if (!preg_match('/^[\d\s\-\+\(\)]{9,}$/', preg_replace('/[^\d\s\-\+\(\)]/', '', $data['phone']))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid phone number']);
    exit;
}

// Generate reference number
$referenceNumber = generateReferenceNumber();

// Sanitize and prepare data for storage
$applicationData = [
    'referenceNumber' => $referenceNumber,
    'submittedAt' => date('Y-m-d H:i:s'),
    'personalInfo' => [
        'firstName' => sanitize($data['firstName']),
        'lastName' => sanitize($data['lastName']),
        'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
        'phone' => sanitize($data['phone']),
        'dateOfBirth' => $data['dob'],
        'gender' => sanitize($data['gender']),
        'idNumber' => sanitize($data['idNumber'])
    ],
    'addressInfo' => [
        'address' => sanitize($data['address']),
        'city' => sanitize($data['city']),
        'county' => sanitize($data['county']),
        'postalCode' => sanitize($data['postalCode'])
    ],
    'emergencyContact' => [
        'name' => sanitize($data['emergencyName']),
        'phone' => sanitize($data['emergencyPhone']),
        'relationship' => sanitize($data['relationship'])
    ],
    'education' => [
        'lastSchool' => sanitize($data['lastSchool']),
        'graduationYear' => intval($data['graduationYear']),
        'qualification' => sanitize($data['qualification']),
        'certificates' => sanitize($data['certificates'])
    ],
    'programmeInfo' => [
        'programme' => sanitize($data['programme']),
        'level' => sanitize($data['programmeLevel']),
        'startDate' => $data['startDate']
    ],
    'disabilityInfo' => [
        'type' => sanitize($data['disabilityType']),
        'supportNeeds' => sanitize($data['supportNeeds']),
        'signLanguageExperience' => sanitize($data['signLanguage'])
    ],
    'employment' => [
        'status' => sanitize($data['currentEmployment']),
        'jobTitle' => sanitize($data['jobTitle']),
        'yearsOfExperience' => intval($data['workExperience'])
    ],
    'additionalInfo' => [
        'motivation' => sanitize($data['motivation']),
        'goals' => sanitize($data['goals']),
        'referral' => sanitize($data['referral'])
    ]
];

try {
    // Save to database (uncomment and configure as needed)
    // saveToDatabase($applicationData);
    
    // Save to file (alternative to database)
    saveToFile($applicationData);
    
    // Send confirmation email
    sendConfirmationEmail($applicationData);
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully',
        'referenceNumber' => $referenceNumber
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while processing your application',
        'error' => $e->getMessage()
    ]);
}

/**
 * Sanitize input data
 */
function sanitize($data) {
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate unique reference number
 */
function generateReferenceNumber() {
    $timestamp = substr(time(), -6);
    $random = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
    return 'STJT-' . date('Y') . '-' . $timestamp . '-' . $random;
}

/**
 * Save application to file
 */
function saveToFile($data) {
    $dir = 'applications';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $filename = $dir . '/' . $data['referenceNumber'] . '.json';
    
    if (!file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
        throw new Exception('Failed to save application file');
    }
}

/**
 * Save application to database (configure your database connection)
 */
function saveToDatabase($data) {
    // Example database configuration
    // $servername = "localhost";
    // $username = "root";
    // $password = "";
    // $dbname = "stjtech_applications";
    
    // $conn = new mysqli($servername, $username, $password, $dbname);
    
    // if ($conn->connect_error) {
    //     throw new Exception('Database connection failed: ' . $conn->connect_error);
    // }
    
    // $sql = "INSERT INTO applications (reference_number, data, submitted_at) VALUES (?, ?, NOW())";
    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param("ss", $data['referenceNumber'], json_encode($data));
    
    // if (!$stmt->execute()) {
    //     throw new Exception('Failed to insert application: ' . $stmt->error);
    // }
    
    // $stmt->close();
    // $conn->close();
}

/**
 * Send confirmation email to applicant
 */
function sendConfirmationEmail($data) {
    $to = $data['personalInfo']['email'];
    $subject = 'Application Confirmation - St Joseph\'s Technical Institute';
    
    $message = "Dear " . $data['personalInfo']['firstName'] . ",\n\n";
    $message .= "Thank you for submitting your application to St Joseph's Technical Institute for the Deaf.\n\n";
    $message .= "Your Reference Number: " . $data['referenceNumber'] . "\n";
    $message .= "Submitted on: " . $data['submittedAt'] . "\n";
    $message .= "Applied Programme: " . $data['programmeInfo']['programme'] . "\n\n";
    $message .= "We have received your application and will review it carefully. ";
    $message .= "You will be contacted within 7 business days regarding the status of your application.\n\n";
    $message .= "If you have any questions, please contact us at:\n";
    $message .= "Email: info@stjosephstechnical.ac.ke\n";
    $message .= "Phone: +254 (0) 123 456 789\n\n";
    $message .= "Best regards,\n";
    $message .= "St Joseph's Technical Institute for the Deaf\n";
    $message .= "Nyang'oma\n";
    
    $headers = "From: info@stjosephstechnical.ac.ke\r\n";
    $headers .= "Reply-To: info@stjosephstechnical.ac.ke\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Uncomment to enable email sending
    // mail($to, $subject, $message, $headers);
}

?>
