<?php
 $ch=curl_init();
 $data=json_encode($_POST);
 $headers = ['Content-Type: application/json'];
 curl_setopt($ch,CURLOPT_URL,'https://paramantra.us/paramantra/receive/outlook');
 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
 curl_setopt($ch,CURLOPT_POST,1);
 curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
 $res=curl_exec($ch);
 echo json_encode($res);
 ?>
