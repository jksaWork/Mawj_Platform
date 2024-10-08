<<<<<<< HEAD
<?php

define("RECIPIENT_NAME", "Shama");
define("RECIPIENT_EMAIL", "info@mawjplatform.com");

$success = false;
$name = isset($_POST['name']) ? preg_replace("/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['name']) : "";
$senderEmail = isset($_POST['email']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email']) : "";
$senderPhone = isset($_POST['phone']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['phone']) : "";
$message = isset($_POST['message']) ? preg_replace("/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message']) : "";

// If all values exist, send the email
if ($name && $senderEmail && $senderPhone && $message) {
    $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
    $subject = "New Contact Message from " . $name;
    $headers = "From: " . $name . " <" . $senderEmail . ">";
    $msgBody = "Name: " . $name . "\nEmail: " . $senderEmail . "\nPhone: " . $senderPhone . "\nMessage: " . $message;
    
    $success = mail($recipient, $subject, $msgBody, $headers);

    // Redirect to a thank you page
    if ($success) {
        header('Location: thank-you.html');
    } else {
        // Redirect to an error page or display an error message
        header('Location: contact.html?message=Failed');
    }
} else {
    // Redirect to an error page or display an error message
    header('Location: contact.html?message=Failed');
}

?>
=======
<?php

define("RECIPIENT_NAME", "Shama");
define("RECIPIENT_EMAIL", "info@mawjplatform.com");

$success = false;
$name = isset($_POST['name']) ? preg_replace("/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['name']) : "";
$senderEmail = isset($_POST['email']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email']) : "";
$senderPhone = isset($_POST['phone']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['phone']) : "";
$message = isset($_POST['message']) ? preg_replace("/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message']) : "";

// If all values exist, send the email
if ($name && $senderEmail && $senderPhone && $message) {
    $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
    $subject = "New Contact Message from " . $name;
    $headers = "From: " . $name . " <" . $senderEmail . ">";
    $msgBody = "Name: " . $name . "\nEmail: " . $senderEmail . "\nPhone: " . $senderPhone . "\nMessage: " . $message;
    
    $success = mail($recipient, $subject, $msgBody, $headers);

    // Redirect to a thank you page
    if ($success) {
        header('Location: thank-you.html');
    } else {
        // Redirect to an error page or display an error message
        header('Location: contact.html?message=Failed');
    }
} else {
    // Redirect to an error page or display an error message
    header('Location: contact.html?message=Failed');
}

?>
>>>>>>> dd7f35ff432aa9d063afdd0909376ba226a52ed2
