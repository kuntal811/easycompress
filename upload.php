<?php
if (isset($_FILES['file'])){

	$output = array('error_msg' => "",'output_file'=>"",'output_file_size'=>"",'file_name'=>"" );

	$target_dir = 'uploads/';
	$target_file= $target_dir.$_FILES['file']['name'];
	$source_img = $_FILES['file']['tmp_name'];
	$img_size	= $_FILES['file']['size'];
	$img_ext	= strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
	$file_name	= pathinfo($target_file,PATHINFO_BASENAME);
	$compression_range = 100-$_POST['range'];
	$output['file_name'] = pathinfo($target_file,PATHINFO_BASENAME);
	//echo $compression_range;
	
	// allowed extensions
	$allowed_extensions = array("jpg","jpeg","png","gif");

	if(!in_array($img_ext, $allowed_extensions)){

			$output['error_msg']= "Invalid Format ! only .jpg .jpeg .png .gif suported";
			echo json_encode($output); 
		}elseif($img_size>15728640){

			$output['error_msg']= "Invalid size ! Max 15MB suported";
			echo json_encode($output); 

		}elseif(move_uploaded_file($source_img, $target_file)){

			//load img
			switch ($img_ext) {
				case 'jpg':
					$img = imagecreatefromjpeg($target_file);
					break;
				case 'jpeg':
					$img = imagecreatefromjpeg($target_file);
					break;
				case 'png':
					$img = imagecreatefrompng($target_file);
					break;
				case 'gif':
					$img = imagecreatefromgif($target_file);
					break;
				
				default:
					$error_msg= "invalid file format";
					break;
			}
			//$img = imagecreatefromjpeg($target_file);
			$output_file = 'compressed/'.rand().".".$img_ext;
			imagejpeg($img,$output_file,$compression_range);
			$output['output_file'] = $output_file;
			$output['output_file_size'] = filesize($output_file);
			echo json_encode($output); 
			imagedestroy($img);
		}else{

			$output['error_msg']=" Failed Photo Uploading";
			echo json_encode($output); 
		}
}else{
	$output['error_msg']="Please Select Image first";
			echo json_encode($output); 
}
?>