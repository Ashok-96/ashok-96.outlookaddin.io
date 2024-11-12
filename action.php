<?php
 $ch=curl_init();
 $data=[];
 $headers = ['Content-Type: application/json'];
 $data['soucre']='outlook';
 $data['data']=(array)json_decode(file_get_contents('php://input'));
 curl_setopt($ch,CURLOPT_URL,'https://paramantra.us/paramantra/receive/outlook');
 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
 curl_setopt($ch,CURLOPT_POST,1);
 curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));
 $res=curl_exec($ch);
 echo json_encode($res);
 ?>