<?php
    class controller_users {

        public function __construct() {
        	include(UTILS_USERS_PATH . "utils_users.inc.php");
        	include(UTILS_PATH . "upload.php");

          $_SESSION['module'] = "users";
        }

        public function form_users() {
            loadView('modules/users/view/', 'create_users.php');
        }

        public function result_users() {
            loadView('modules/users/view/', 'result_users.php');
        }

        public function alta_users(){
          //Si hay datos del formulario en el json enviado por el controlador de javascript
        	if(isset($_POST['create_users'])){
          //Validamos los datos correctamente
          //Si los datos estan correctos, los guardamos y devolvemos un json con el resultado
          //Silos datos no estan correctos, devolvemos el resultado y los errores en un json
        		$jsondata = array();
        		$usersJSON = json_decode($_POST["create_users"], true);

        		$result = validate_users($usersJSON); //Validamos los datos
        		if (empty($_SESSION['result_avatar'])){ //Comprobamos si hay imagen en el dropzone, sino utilizamos la de por defecto
        			$_SESSION['result_avatar'] = array('resultado' => true, 'error' =>"", 'datos' => 'media/default-results.png');
        		}

        		$result_avatar = $_SESSION['result_avatar'];

        		if ($result['resultado'] && $result_avatar['resultado']) { //Guardamos los datos si el resultado es positivo
        				$arrArgument = array(
        					'name_user' => $result['datos']['name_user'],
        					'password' => $result['datos']['password'],
        					'avatar' => $result_avatar['datos'],
        					'name' => $result['datos']['name'],
        					'surname' => $result['datos']['surname'],
        					'date_birthday' => $result['datos']['date_birthday'],
        					'email' => $result['datos']['email'],
        					'phone' => $result['datos']['phone'],
        					'country' => $result['datos']['country'],
        					'province' => $result['datos']['province'],
        					'town' => $result['datos']['town'],
        				);

                /////////////////insert into BD////////////////////////
                $arrValue = false;
                try {
                  $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "create_users", $arrArgument);
                } catch (Exception $e) {
                  showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
                }

                if ($arrValue)
                    $mensaje = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
                else
                    $mensaje = "No se ha podido realizar su alta. Intentelo mas tarde";

        				//redirigir a otra pagina con los datos de $arrArgument y $mensaje
        				$_SESSION['users'] = $arrArgument;
        				$_SESSION['msje'] = $mensaje;
        				$callback="../../users/result_users/";

        				$jsondata["success"] = true;
        				$jsondata["redirect"] = $callback;
        				echo json_encode($jsondata);
        				exit;
        		} else {  //Devolvemos los errores si el resultado es negativo
        				//$error = $result['error'];
        				//$error_image = $result_image['error'];
        				$jsondata["success"] = false;
        				$jsondata["error"] = $result['error'];
        				$jsondata["error_avatar"] = $result_avatar['error'];

        				$jsondata["success_avatar"] = false;
        				if ($result_avatar['resultado']) {
        						$jsondata["success_avatar"] = true;
        						$jsondata["img_users"] = $result_avatar['datos'];
        				}
        				echo json_encode($jsondata);
        				exit;
        		}
        	}
        }

        public function upload_avatar_users() {
          //Subir avatar en dropzone.js
        	if(isset($_POST["upload"]) && $_POST["upload"] == true) {
        		$result_avatar = upload_files();
        		$_SESSION['result_avatar'] = $result_avatar;
        	}
        }

        public function delete_avatar_users() {
          //Eliminar avatar en dropzone.js
        	if (isset($_POST["delete"]) && $_POST["delete"] == true) {
        		$_SESSION['result_avatar'] = array();
        		$result = remove_files();
        		if ($result === true) {
        			echo json_encode(array("res" => true));
        		} else {
        			echo json_encode(array("res" => false));
        		}
        	}
        }

        public function load_result_users() {
          //Recuperamos los datos del formulario antes de cerrar sesion
        	if (isset($_POST["load"]) && $_POST["load"] == true) {
        		$jsondata = array();
        		if (isset($_SESSION['users'])) {
        			$jsondata['users'] = $_SESSION['users'];
        		}
        		if (isset($_SESSION['msje'])) {
        			$jsondata['msje'] = $_SESSION['msje'];
        		}

            unset($_SESSION['users']);
            unset($_SESSION['msje']);
            $_SESSION = array();
            session_destroy();
        		echo json_encode($jsondata);
        		exit;
        	}
        }

        public function load_data_users() {
          //Si hay datos en la sesion los pintamos en el formulario
          //Si no hay datos en la session, pintamos los datos por defecto
        	if (isset($_POST["load_data"]) && $_POST['load_data'] == true) {
        		$jsondata = array();

        		if (isset($_SESSION['users'])){
        			$jsondata['users'] = $_SESSION['users'];
        			echo json_encode($jsondata);
        			exit;
        		} else {
        			$jsondata['users'] = "";
        			echo json_encode($jsondata);
        			exit;
        		}
        	}
        }

        public function load_pais_users() {
        	if(  (isset($_POST["load_pais"])) && ($_POST["load_pais"] == true)  ){
        		$json = array();

            $url = 'http://www.oorsprong.org/websamples.countryinfo/CountryInfoService.wso/ListOfCountryNamesByName/JSON';

            try {
              $json = loadModel(MODEL_USERS_PATH, "users_model", "obtain_paises", $url);
            } catch (Exception $e) {
              $json = array();
            }

        		if($json){
        			echo $json;
        			exit;
        		}else{
        			$json = "error";
        			echo $json;
        			exit;
        		}
        	}
        }

        public function load_pepi_users() {
          echo json_encode("HOLA");
          exit;
        	if(  (isset($_POST["load_provincias"])) && ($_POST["load_provincias"] == true)  ){
        		$jsondata = array();
            $json = array();

            try {
              $json = loadModel(MODEL_USERS_PATH, "users_model", "obtain_provincias");
            } catch (Exception $e) {
              $json = array();
            }

        		if($json){
        			$jsondata["provincias"] = $json;
        			echo json_encode($jsondata);
        			exit;
        		}else{
        			$jsondata["provincias"] = "error";
        			echo json_encode($jsondata);
        			exit;
        		}
        	}
        }

        public function load_provincias_users() {
          echo json_encode("HOLA");
          exit;
        	if(  (isset($_POST["load_provincias"])) && ($_POST["load_provincias"] == true)  ){
        		$jsondata = array();
            $json = array();

            try {
              $json = loadModel(MODEL_USERS_PATH, "users_model", "obtain_provincias");
            } catch (Exception $e) {
              $json = array();
            }

        		if($json){
        			$jsondata["provincias"] = $json;
        			echo json_encode($jsondata);
        			exit;
        		}else{
        			$jsondata["provincias"] = "error";
        			echo json_encode($jsondata);
        			exit;
        		}
        	}
        }

        public function load_poblacion_users() {
        	if(  isset($_POST['idPoblac']) ){
      	    $jsondata = array();
            $json = array();

            try {
              $json = loadModel(MODEL_USERS_PATH, "users_model", "obtain_poblaciones", $_POST['idPoblac']);
            } catch (Exception $e) {
              $json = array();
            }

        		if($json){
        			$jsondata["poblaciones"] = $json;
        			echo json_encode($jsondata);
        			exit;
        		}else{
        			$jsondata["poblaciones"] = "error";
        			echo json_encode($jsondata);
        			exit;
        		}
          }
        }
      }
