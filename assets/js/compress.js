// AJAX Code To Submit Form.

document.querySelector('#file').addEventListener('change',function(){
        var upload_img_src = window.URL.createObjectURL(document.querySelector('#file').files[0]);
        var img_size = document.querySelector('#file').files[0].size/1024;
        document.querySelector('#original-size-1').innerText = img_size.toFixed(2).toString(10)+" KB";
        document.querySelector('#original-size-2').innerText = img_size.toFixed(2).toString(10)+" KB";
        document.getElementById('original-img').src = upload_img_src;
        document.querySelector('#d-btn').style.display = "none";
		var data = new FormData();
		data.append('file',document.querySelector('#file').files[0]);
		data.append('range',document.querySelector('#range').value);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	//document.getElementById("original-img").innerHTML = document.querySelector('#file').files[0];
                //document.getElementById("compressed").innerHTML = this.responseText;
                var output = JSON.parse(this.responseText);
                document.getElementById("compress-img").src =output.output_file;
                document.querySelector('#compress-size-1').innerText = (output.output_file_size/1024).toFixed(2).toString(10)+" KB";
                document.querySelector('#compress-size-2').innerText = (output.output_file_size/1024).toFixed(2).toString(10)+" KB";
                document.querySelector('#d-btn').download ="EasyCompress"+output.file_name;
                document.querySelector('#d-btn').href =output.output_file;
                //error msg
                document.getElementById('error_msg').innerText = output.error_msg;
                if (!output.error_msg=="") {
                    document.getElementById("compress-img").src = "assets/img/compress.svg";
                    document.getElementById("original-img").src = "assets/img/compress.svg";
                }
            }
        };
        request.open("POST", "upload.php", true);
        request.send(data);
    
});
document.querySelector('#range').addEventListener('change',function(){
        document.querySelector('#d-btn').style.display = "none";
        changeCompressValue();
		var data = new FormData();
		data.append('file',document.querySelector('#file').files[0]);
		data.append('range',document.querySelector('#range').value);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	//document.getElementById("original-img").innerHTML = document.querySelector('#file').files[0];
                //document.getElementById("compressed").innerHTML= this.responseText;
                var output = JSON.parse(this.responseText);
                document.getElementById("compress-img").src = output.output_file;
                document.querySelector('#compress-size-1').innerText = (output.output_file_size/1024).toFixed(2).toString(10)+" KB";
                document.querySelector('#compress-size-2').innerText = (output.output_file_size/1024).toFixed(2).toString(10)+" KB";
                document.querySelector('#d-btn').download ="EasyCompress"+output.file_name;
                document.querySelector('#d-btn').href =output.output_file;
                //error msg
                document.getElementById('error_msg').innerText = output.error_msg;
                if (!output.error_msg=="") {
                    document.getElementById("compress-img").src = "assets/img/compress.svg";
                    document.getElementById("original-img").src = "assets/img/compress.svg";
                }
            }
        };
        request.open("POST", "upload.php", true);
        request.send(data);
    
});

function changeCompressValue(){
        var range = document.getElementById('range').value;
        document.getElementById('compress-val').innerText = range;
    }
document.querySelector('#compress-now').addEventListener('click',function(){
    document.querySelector('#d-btn').style.display = "block";
});