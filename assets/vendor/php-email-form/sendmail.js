document.getElementById('send-mail').addEventListener('click',function(){
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var subject = document.getElementById("subject").value;
var message = document.getElementById("message").value;
// Returns successful data submission message when the entered information is stored in database.
 
  var request = new XMLHttpRequest();
  var data = new FormData();
    data.append('name',name);
    data.append('email',email);
    data.append('email',email);
    data.append('message',message);
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("sent-message").style.display="block";
    }
  };
 request.open("POST", "upload.php", true);
request.send(data);
  

});