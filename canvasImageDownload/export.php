<?php
	$dir = 'images';

	if(isset($_GET['img']))
	{
		$filename = $dir.DIRECTORY_SEPARATOR.$_GET['img'];
		header('Content-type: octet/stream');
		header('Content-disposition: attachment; filename='.$filename.';');
		header('Content-Length: '.filesize($filename));
		readfile($filename);
		unlink($filename);
	}
	else
	{
		if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
		{
			$rawImage=$GLOBALS['HTTP_RAW_POST_DATA'];
			$removeHeaders=substr($rawImage, strpos($rawImage, ",")+1);
			$decode=base64_decode($removeHeaders);
			$file = rand(1,999999).'.png';
			$imageFile = $dir.DIRECTORY_SEPARATOR.$file;
			$fopen = fopen($imageFile, 'w' );
			if(fwrite( $fopen, $decode)){
				echo $file;
			}
			fclose( $fopen );
		}
	}
?>