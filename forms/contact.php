<?php

  $receiving_email_address = 'kuntalsarkar00@gmail.com';

  $to = $receiving_email_address;
  $name = $_POST['name'];
  $email = $_POST['email'];
  $subject = $_POST['subject'];
  $msg = $_POST['message'];
  //$msg += " From ".$name." email: ".$email;


  $msg = wordwrap($msg,70);

// send email
  mail($to,$subject,$msg);
?>
