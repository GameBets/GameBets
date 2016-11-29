
<?php
    class controller_contact {

        public function __construct() {

            $_SESSION['module'] = "contact";
        }

        public function view_contact() {
          include_once(INC_PATH . "top.php");
          include_once(INC_PATH . "header.php");
          include_once(INC_PATH . "menu.php");

            loadView(CONTACT_VIEW_PATH, 'contact.php');
            
            include_once(INC_PATH . "footer.php");
            include_once(INC_PATH . "bottom.php");
        }

        public function process_contact() {
            if($_POST['token'] === "contact_form"){

                //////////////// Envio del correo al usuario
                $arrArgument = array(
									'type' => 'contact',
									'token' => '',
									'inputName' => $_POST['inputName'],
									'inputEmail' => $_POST['inputEmail'],
									'inputSubject' => $_POST['inputSubject'],
									'inputMessage' => $_POST['inputMessage']
								);
				set_error_handler('ErrorHandler');
				try{
				    /*
                    if (enviar_email($arrArgument)){
                        echo "<div class='alert alert-success'>Your message has been sent </div>";
                    } else {
                        echo "<div class='alert alert-error'>Server error. Try later...</div>";
                    }
                    */
                    echo "<div class='alert alert-success'>".enviar_email($arrArgument)." </div>";
				} catch (Exception $e) {
					echo "<div class='alert alert-error'>Server error. Try later...</div>";
				}
				restore_error_handler();


                //////////////// Envio del correo al admin de la ap web
                $arrArgument = array(
									'type' => 'admin',
									'token' => '',
									'inputName' => $_POST['inputName'],
									'inputEmail' => $_POST['inputEmail'],
									'inputSubject' => $_POST['inputSubject'],
									'inputMessage' => $_POST['inputMessage']
								);
                set_error_handler('ErrorHandler');
				try{
				    /*
                    if (enviar_email($arrArgument)){
                        echo "<div class='alert alert-success'>Your message has been sent </div>";
                    } else {
                        echo "<div class='alert alert-error'>Server error. Try later...</div>";
                    }
                    */
                    sleep(5);
                    echo "<div class='alert alert-success'>".enviar_email($arrArgument)." </div>";
				} catch (Exception $e) {
					echo "<div class='alert alert-error'>Server error. Try later...</div>";
				}
				restore_error_handler();

            }else{
                echo "<div class='alert alert-error'>Server error. Try later...</div>";
            }
        }
    }
