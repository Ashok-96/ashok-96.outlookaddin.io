
<?php
 header('Access-Control-Allow-Origin: *');
 $ch=curl_init();
 $txt = $_SERVER['HTTP_ORIGIN'];
$pattern = "/moz-extension\\:\\/\\//i";
$count=preg_match($pattern, $txt);
 if(($count>0)){
    $data['soucre']='Thunderbird';
    $data['data']=(array)json_decode(file_get_contents('php://input'));
    $headers = ['Content-Type: application/json'];
    curl_setopt($ch,CURLOPT_URL,'https://paramantra.us/paramantra/receive/outlook');
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));
    $res=curl_exec($ch);
    echo json_encode($res);
 }else{
   $res['error']='Request Not Allowed';
   echo json_encode($res);
 }
 
 ?>

