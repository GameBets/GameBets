<?php
    class controller_users {

        public function __construct() {
        	include(UTILS_USERS_PATH . "utils_users.inc.php");
        	include(UTILS_PATH . "upload.php");
          include (LIBS . 'password_compat-master/lib/password.php');

          $_SESSION['module'] = "users";
        }

/////////////SIGNIN/////////////////////////////////////////////////////////////

        public function signin() {
          loadView('modules/users/view/', 'signin.php');
        }

        public function signin_users() {
          if(isset($_POST['login_json'])){
              $user = json_decode($_POST['login_json'], true);

            $arrArgument = array(
                'column' => array('email'),
                'like' => array($user['email']),
                'field' => array('passwd')
            );

            set_error_handler('ErrorHandler');
            try {
                //loadModel
                $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "select", $arrArgument);
                $pass = password_hash($user['password'], PASSWORD_BCRYPT);
                $arrValue = password_verify($user['password'], $arrValue[0]['passwd']);
            } catch (Exception $e) {
                $arrValue = "error";
            }
            restore_error_handler();

            if ($arrValue !== "error") {
                if ($arrValue) { //OK
                    set_error_handler('ErrorHandler');
                    try {
                        $arrArgument = array(
                            'column' => array("email", "active"),
                            'like' => array($user['email'], "1")
                        );
                        $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "count", $arrArgument);

                        if ($arrValue[0]["total"] == 1) {
                            $arrArgument = array(
                                'column' => array('email'),
                                'like' => array($user['email']),
                                'field' => array('online'),
                                'new' => array('1')
                            );
                            set_error_handler('ErrorHandler');
                            try {
                                $value = loadModel(MODEL_USERS_PATH, "users_model", "update", $arrArgument);
                            } catch (Exception $e) {
                                $value = false;
                            }
                            if ($value) {
                              $arrArgument = array(
                                  'column' => array("email"),
                                  'like' => array($user['email']),
                                  'field' => array('*')
                              );
                              $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "select", $arrArgument);
                              echo json_encode($arrValue);
                              exit();
                            } else {
                              $value = array(
                                  "error" => true,
                                  "datos" => "No se ha podido verificar el acceso, vuelvelo a intentar"
                              );
                              echo json_encode($value);
                              exit();
                            }
                        } else {
                            $value = array(
                                "error" => true,
                                "datos" => "El usuario no ha sido activado, revise su correo"
                            );
                            echo json_encode($value);
                            exit();
                        }
                    } catch (Exception $e) {
                        showErrorPage(4, "", 'HTTP/1.0 503 Service Unavailable', 503);
                    }
                } else {
                    $value = array(
                        "error" => true,
                        "datos" => "El usuario y la contraseña no coinciden"
                    );
                    echo json_encode($value);
                }
            } else {
                showErrorPage(4, "", 'HTTP/1.0 503 Service Unavailable', 503);
            }
          }
        }

/////////////END SIGNIN/////////////////////////////////////////////////////////

////////////LOGOUT//////////////////////////////////////////////////////////////
        public function logout() {
            if (isset($_POST['login_json'])) {
                $user = json_decode($_POST['login_json'], true);
                $arrArgument = array(
                    'column' => array('token'),
                    'like' => array($user['token']),
                    'field' => array('online'),
                    'new' => array('0')
                );
                set_error_handler('ErrorHandler');
                try {
                    $value = loadModel(MODEL_USERS_PATH, "users_model", "update", $arrArgument);
                } catch (Exception $e) {
                    $value = false;
                }
                restore_error_handler();

                echo json_encode($value);
                exit;
            }
        }
////////////END LOGOUT//////////////////////////////////////////////////////////

/////////////SIGNUP/////////////////////////////////////////////////////////////

        public function signup() {
            loadView('modules/users/view/', 'signup.php');
        }

        public function signup_users(){
          //Si hay datos del formulario en el json enviado por el controlador de javascript
        	if(isset($_POST['alta_users'])){
          //Validamos los datos correctamente
          //Si los datos estan correctos, los guardamos y devolvemos un json con el resultado
          //Silos datos no estan correctos, devolvemos el resultado y los errores en un json
        		$jsondata = array();
        		$usersJSON = json_decode($_POST["alta_users"], true);

        		$result = validate_signup($usersJSON); //Validamos los datos

        		$avatar = get_gravatar($result['datos']['email'], $s = 400, $d = 'identicon', $r = 'g', $img = false, $atts = array());
            $_SESSION['result_avatar'] = array('resultado' => true, 'error' =>"", 'datos' => $avatar);
        		$result_avatar = $_SESSION['result_avatar'];

        		if ($result['resultado'] && $result_avatar['resultado']) { //Guardamos los datos si el resultado es positivo
        				$arrArgument = array(
        					'password' => password_hash($result['datos']['password'], PASSWORD_BCRYPT),
        					'avatar' => $result_avatar['datos'],
        					'email' => $result['datos']['email'],
                  'type' => "client",
                  'active' => 0,
                  'token' => "",
                  'online' => 0
        				);

                /* Control de registro */
                set_error_handler('ErrorHandler');
                try {
                    //loadModel
                    $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "count", array('column' => array('email'), 'like' => array($arrArgument['email'])));
                    if ($arrValue[0]['total'] == 1) {
                        $arrValue = false;
                        $result['error']['email'] = "Email ya registrado";
                    }
                } catch (Exception $e) {
                    $arrValue = false;
                }
                restore_error_handler();
                /* Fin de control de registro */

                if($arrValue) {
                    set_error_handler('ErrorHandler');
                    try {
                    $arrArgument['token'] = md5(uniqid(rand(), true));
                      $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "signup", $arrArgument);
                    } catch (Exception $e) {
                      showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
                    }
                    restore_error_handler();

                    if ($arrValue){
                        send_email($arrArgument, "alta");
                        $mensaje = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
                    }else{
                        $mensaje = "No se ha podido realizar su alta. Intentelo mas tarde";
                    }

            				//redirigir a otra pagina con los datos de $arrArgument y $mensaje
            				$_SESSION['users'] = $arrArgument;
            				$_SESSION['msje'] = $mensaje;

            				$jsondata["success"] = true;
                    $jsondata['msje'] = $mensaje;
            				echo json_encode($jsondata);
                    exit;
                } else {
                  $jsondata["success"] = false;
                  $jsondata["error"] = $result['error'];
                  echo json_encode($jsondata);
                  exit;
                }
        		} else {  //Devolvemos los errores si el resultado es negativo
        				$jsondata["success"] = false;
        				$jsondata["error"] = $result['error'];
        				echo json_encode($jsondata);
        				exit;
        		}
        	}
        }

        public function active() {
            if ($_GET['aux']) {
                $arrArgument = array(
                    'column' => array('token'),
                    'like' => array($_GET['aux']),
                    'field' => array('active'),
                    'new' => array('1')
                );
                set_error_handler('ErrorHandler');
                try {
                    $value = loadModel(MODEL_USERS_PATH, "users_model", "update", $arrArgument);
                } catch (Exception $e) {
                    $value = false;
                }
                restore_error_handler();

                if ($value) {
                    loadView('modules/users/view/', 'active.php');
                } else {
                    showErrorPage(4, "", 'HTTP/1.0 503 Service Unavailable', 503);
                }
            }
        }

/////////////END SIGNUP/////////////////////////////////////////////////////////

        public function update_users(){
          //Si hay datos del formulario en el json enviado por el controlador de javascript
          if(isset($_POST['create_users'])){
          //Validamos los datos correctamente
          //Si los datos estan correctos, los guardamos y devolvemos un json con el resultado
          //Silos datos no estan correctos, devolvemos el resultado y los errores en un json
            $jsondata = array();
            $usersJSON = json_decode($_POST["create_users"], true);

            $result = validate_users($usersJSON); //Validamos los datos
            if (empty($_SESSION['result_avatar'])){ //Comprobamos si hay imagen en el dropzone, sino utilizamos la de por defecto
              $avatar = get_gravatar($result['datos']['email'], $s = 400, $d = 'identicon', $r = 'g', $img = false, $atts = array());
              $_SESSION['result_avatar'] = array('resultado' => true, 'error' =>"", 'datos' => $avatar);
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
                  'token' => ""
                );

                /* Control de registro */
                set_error_handler('ErrorHandler');
                try {
                    //loadModel
                    $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "count", array('column' => array('name_user'), 'like' => array($arrArgument['name_user'])));
                    if ($arrValue[0]['total'] == 1) {
                        $arrValue = false;
                        $result['error']['name_user'] = "Nombre de usuario no disponible";
                    } else {
                        $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "count", array('column' => array('email'), 'like' => array($arrArgument['email'])));
                        if ($arrValue[0]['total'] == 1) {
                            $arrValue = false;
                            $result['error']['email'] = "Email ya registrado";
                        }
                    }
                } catch (Exception $e) {
                    $arrValue = false;
                }
                restore_error_handler();
                /* Fin de control de registro */

                if($arrValue) {
                    set_error_handler('ErrorHandler');
                    try {
                    $arrArgument['token'] = md5(uniqid(rand(), true));
                      $arrValue = loadModel(MODEL_USERS_PATH, "users_model", "create_users", $arrArgument);
                    } catch (Exception $e) {
                      showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
                    }
                    restore_error_handler();

                    if ($arrValue){
                        send_email($arrArgument, "alta");
                        $mensaje = "Su registro se ha efectuado correctamente, para finalizar compruebe que ha recibido un correo de validacion y siga sus instrucciones";
                    }else{
                        $mensaje = "No se ha podido realizar su alta. Intentelo mas tarde";
                    }

                    //redirigir a otra pagina con los datos de $arrArgument y $mensaje
                    $_SESSION['users'] = $arrArgument;
                    $_SESSION['msje'] = $mensaje;
                    $callback="../../users/result_users/";

                    $jsondata["success"] = true;
                    $jsondata["redirect"] = $callback;
                    echo json_encode($jsondata);
                    exit;
                } else {
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
            } else {  //Devolvemos los errores si el resultado es negativo
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
