var data=document.getElementById('data');
var Email=document.getElementById('InputEmail1')
var InputName=document.getElementById('InputName')
var subject=document.getElementById('subject')
 var phone=document.getElementById('phone')
var message=document.getElementById('message')
var phonelist=document.getElementById('phonelist')
  var phoneman=document.getElementById('phoneman')
  async function loadoutlook() {
   
      
      await Office.onReady((info) => {   
       
        if (info.host === Office.HostType.Outlook) {
          $('.cform').removeClass('d-none')
            Email.value=Office.context.mailbox.item.from.emailAddress
            InputName.value=Office.context.mailbox.item.from.displayName;
            subject.value=Office.context.mailbox.item.subject;
            Office.context.mailbox.item.body.getAsync("text", function(result) {
          
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          
            message.value=result.value;
             var string =  message.value
            var getNum = string.match(/(\d+)/g);
          
             if(getNum.length>0){
                for(let i=0;i<=getNum.length-1;i++){
                   
                    if(getNum[i].length>=10){
                         $('#phonelist').append(`<option value="${getNum[i]}">${getNum[i]}</option>`)
                    }
                   
                }
                 
                
            }
           
        } else {
            console.error("Error reading email body: " + result.error.message);
        }
    })
        }else if(info.host==null){
          $(function(){
            console.log(info.host)
           $('#staticBackdrop2').modal('show')
          
          })
         }else{
          console.log(info)
          $('#staticBackdrop2').modal('show')
         }
    });
  }
  
  loadoutlook();



                
        
$(function(){
var phonefax ='';
$('input[type=checkbox]').change(function(){
$('#phonelist').hasClass('d-none')?( $('#phonelist').removeClass('d-none'),$('#phoneman').addClass('d-none'),$('#phonelist').attr('required',true),$('#phoneman').attr('required',false)):( $('#phonelist').addClass('d-none'),$('#phoneman').removeClass('d-none'),$('#phonelist').attr('required',false),$('#phoneman').attr('required',true));

})
$('#leadmform').submit(function(e){
e.preventDefault();


var f_name=$('#InputName').val();
  var subject=$('#subject').val();
  var InputEmail1=$('#InputEmail1').val();
  if($('#phoneman').hasClass('d-none')){
      phonefax=$('#phonelist option:selected').val();
  }else if($('#phonelist').hasClass('d-none')){
      phonefax=$('#phoneman').val();
  }
  var source='outlook';
  var subject=$('#subject').val();
  var channel_id='outlook';
  var id="66cec8ccabb55a8dabcb0d52";
  var notes=$('#message').val();
  var rep_id=$('#username').val();
  if(phonefax.match(/(\d{10,})/g)){
    $('#phonelist').hasClass('is-invalid')&&($('#phonelist').removeClass('is-invalid'));
    $('#phoneman').hasClass('is-invalid')&&($('#phoneman').removeClass('is-invalid'));
    $('.cform').addClass('d-none');
    $('.preloader').removeClass('d-none');
    var arr={
"f_name": f_name,
"email": InputEmail1,
"phonefax":phonefax,
"subject":subject,
"notes":notes,
"rep_id":rep_id,
"channel_id":channel_id,
"id":id,
"notes":notes
};

const options={
  method:'POST',
  header:{
    "X-Source":"Outlook-Addin"
      },
  body:JSON.stringify(arr),

}
fetch('action.php',options)
.then(response=>{
  
  if(!response.ok){
    throw new Error('Network response was not ok')
  }
  return response.json()
})
.then(data=>{
  if(data.error){
    $('#smessage').html(`${data.error}`)
    $('#staticBackdrop').modal('show')
    throw new Error('Network response was not ok')
  }else{
    let Rdata=JSON.parse(data);
    if(Rdata[0].status==409){
      $('#smessage').html(`${Rdata[0].message.replace('_',' ')} : ref #${Rdata[0].unique_id}`)
      $('#staticBackdrop').modal('show')
    }else if(Rdata[0].status==200){
      $('#smessage').html(`Lead Created succesfully : ref #${Rdata[0].unique_id}`)
      $('#staticBackdrop').modal('show')
     
    }else{
      $('#smessage').html(`${Rdata}`)
      $('#staticBackdrop').modal('show')
    }
  }

 

})
 .catch(err=>console.log(err))
 $('#bmodal').click(function(){
           
  window.location.href=''
 
})

  }else{
    $('#smessage').html(`Please fill all the details`)
    $('#staticBackdrop').modal('show')
    $('#InputName').val().length==0?($('#InputName').addClass('is-invalid')):($('#InputName').hasClass('is-invalid')?($('#InputName').removeClass('is-invalid'),$('#InputName').addClass('is-valid')):$('#InputName').addClass('is-valid'));
    $('#subject').val().length==0? ($('#subject').addClass('is-invalid')):($('#subject').hasClass('is-invalid')?($('#subject').removeClass('is-invalid'),$('#subject').addClass('is-valid')):$('#subject').addClass('is-valid'));
    $('#InputEmail1').val().length==0?($('#InputEmail1').addClass('is-invalid')):($('#InputEmail1').hasClass('is-invalid')?($('#InputEmail1').removeClass('is-invalid'),$('#InputEmail1').addClass('is-valid')):$('#InputEmail1').addClass('is-valid'));
    $('#username').val().length==0?$('#username').addClass('is-invalid'):($('#username').hasClass('is-invalid')?($('#username').removeClass('is-invalid'),$('#username').addClass('is-valid')):$('#username').addClass('is-valid'));
    $('#phonelist option:selected').val().length<10?$('#phonelist').addClass('is-invalid'):($('#phonelist').hasClass('is-invalid')?($('#phonelist').removeClass('is-invalid'),$('#phonelist').addClass('is-valid')):$('#phonelist').addClass('is-valid'));
    $('#phoneman').val().length<10?$('#phoneman').addClass('is-invalid'):($('#phoneman').hasClass('is-invalid')?($('#phoneman').removeClass('is-invalid'),$('#phoneman').addClass('is-valid')):$('#phoneman').addClass('is-valid'));
a
  }

})
})