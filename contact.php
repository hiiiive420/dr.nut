<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize inputs
    $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    // Validate inputs
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
                alert('Please fill all fields correctly.');
                window.history.back();
              </script>";
        exit;
    }

    // Email details
    $to = "hive4201@email.com"; 
    $subject = "New Contact Form Message - Dr. Nut Website";

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $name <$email>";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        echo "<script>
                alert('Thank you! Your message has been sent successfully.');
                window.location.href = 'contact.html';
              </script>";
    } else {
        echo "<script>
                alert('Something went wrong. Please try again later.');
                window.history.back();
              </script>";
    }
}
?>