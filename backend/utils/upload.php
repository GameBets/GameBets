<?php
//Utilizar $_FILES['file'] por dropzone.js
//Sube una imagen con dropzone.js
function upload_files() {
    $error = "";
    $copiarFichero = false;
    $extensiones = array('jpg', 'jpeg', 'gif', 'png', 'bmp');

    if(!isset($_FILES)) {
        $error .=  'No existe $_FILES <br>';
    }
    if(!isset($_FILES['file'])) {
        $error .=  'No existe $_FILES[file] <br>';
    }

    $imagen = $_FILES['file']['tmp_name'];
    $nom_fitxer= $_FILES['file']['name'];
    $mida_fitxer=$_FILES['file']['size'];
    $tipus_fitxer=$_FILES['file']['type'];
    $error_fitxer=$_FILES['file']['error'];

    if ($error_fitxer>0) { // El error 0 quiere decir que se subió el archivo correctamente
        switch ($error_fitxer){
            case 1: $error .=  'Archivo mayor que tamaño maximo de subida de archivo <br>'; break;
            case 2: $error .=  'Archivo mayor que tamaño maximo de archivo <br>';break;
            case 3: $error .=  'Archivo solo parcialmente subido <br>';break;
            //case 4: $error .=  'No has pujat cap fitxer <br>';break; //assignarem a l'us default-avatar
        }
    }

    ////////////////////////////////////////////////////////////////////////////
    //if($_FILES['file']['error'] !== 0) { //Assignarem a l'us default-avatar
        //$error .=  'Archivo no subido correctamente <br>';
    //}

    ////////////////////////////////////////////////////////////////////////////
    if ($_FILES['file']['size'] > 5000000 ){
        $error .=  "Large File Size <br>";
    }

    ////////////////////////////////////////////////////////////////////////////
    //if ($_FILES['file']['name'] === "") { //Assignarem a l'us default-avatar
        //$error .= "No ha seleccionado ninguna imagen. Te proporcionamos un default-avatar<br>";
    //}

    if ($_FILES['file']['name'] !== "") {
        ////////////////////////////////////////////////////////////////////////////
        @$extension = strtolower(end(explode('.', $_FILES['file']['name']))); // Obtenemos la extensión, en minúsculas para poder comparar
        if( ! in_array($extension, $extensiones)) {
            $error .=  'Sólo se permite subir archivos con estas extensiones: ' . implode(', ', $extensiones).' <br>';
        }
        ////////////////////////////////////////////////////////////////////////////
        //getimagesize falla si $_FILES['file']['name'] === ""
        if (!@getimagesize($_FILES['file']['tmp_name'])){
            $error .=  "Invalid Image File... <br>";
        }
        ////////////////////////////////////////////////////////////////////////////
        list($width, $height, $type, $attr) = @getimagesize($_FILES['file']['tmp_name']);
        if ($width > 500 || $height > 500){
            $error .=   "Maximum width and height exceeded. Please upload images below 100x100 px size <br>";
        }
    }
        /*
            $image_size_info    = getimagesize($imagen); //get image size
            if($image_size_info){
                $image_width        = $image_size_info[0]; //image width
                $image_height       = $image_size_info[1]; //image height
                $image_type         = $image_size_info['mime']; //image type
            }else{
                die("Make sure image file is valid!");
            }
        */

    ////////////////////////////////////////////////////////////////////////////
    $upfile = MEDIA_PATH . $_FILES['file']['name'];
    if (is_uploaded_file($_FILES['file']['tmp_name'])){
        if (is_file($_FILES['file']['tmp_name'])) {
            $idUnico = rand();
            $nombreFichero = $idUnico."-".$_FILES['file']['name'];
            $_SESSION['nombreImagen'] = $nombreFichero;
            $copiarFichero = true;
            // I use absolute route to move_uploaded_file because this happens when i run ajax
            $upfile = $_SERVER['DOCUMENT_ROOT'].'/Gamebets/media/'.$nombreFichero;
        }else{
                $error .=   "Invalid File...";
        }
    }

    $i=0;
    if ($error == "") {
        if ($copiarFichero) {
            if (!move_uploaded_file($_FILES['file']['tmp_name'],$upfile)) {
                $error .= "<p>Error al subir la imagen.</p>";
                return $return=array('resultado'=>false,'error'=>$error,'datos'=>"");
            }
            //We need edit $upfile because now i don't need absolute route.
            $upfile ='media/'.$nombreFichero;
            return $return=array('resultado'=>true , 'error'=>$error,'datos'=>$upfile);
        }
        if($_FILES['file']['error'] !== 0) { //Assignarem a l'us default-image
            $upfile = '/media/default-image.png';
            return $return=array('resultado'=>true,'error'=>$error,'datos'=>$upfile);
        }
    }else{
        return $return=array('resultado'=>false,'error'=>$error,'datos'=>"");
    }
}

//Elimina la imagen subida en dropzone.js antes de guardar definitivamente los datos
function remove_files(){
	$name = $_POST["filename"];
	if(file_exists(MEDIA_PATH . $_SESSION['nombreImagen'])){
		unlink(MEDIA_PATH . $_SESSION['nombreImagen']);
		return true;
	}else{
		return false;
	}
}
