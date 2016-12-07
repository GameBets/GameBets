<?php
    class controller_users {

        public function __construct() {
        	include(UTILS_USERS_PATH . "utils_users.inc.php");
        	include(UTILS_PATH . "upload.php");
          include (LIBS . 'password_compat-master/lib/password.php');

          $_SESSION['module'] = "users";
        }

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
                  'token' => ""
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
//----------------------------------------------------------------------------------------------------------------/
 ////////////////////////////////////////////////////////////////// START PROFILE --- //////////////////////////////
        function profile() {
            loadView('modules/user/view/', 'profile.php');
        }

        public function modify(){
          
        }



////////////////////////////////////// END PROFILE -- /////////////////////////////////////////////////////

      }/// end
