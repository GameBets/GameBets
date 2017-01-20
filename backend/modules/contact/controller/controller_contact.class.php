
<?php
    class controller_contact {

        public function __construct() {
            $_SESSION['module'] = "contact";
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

        try {
            /*
            if (enviar_email($arrArgument)) {
                $value = true;
            } else {
                $value = false;
            }*/

            enviar_email($arrArgument);

        } catch (Exception $e) {
            $value = false;
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
          try {
              /*
              if (enviar_email($arrArgument) && $value) {
                  echo "true|Tu mensaje ha sido enviado correctamente ";
              } else {
                  echo  "false|Error en el servidor. Intentelo más tarde...";
              }*/

              sleep(5);
              enviar_email($arrArgument);
              echo "true|Tu mensaje ha sido enviado correctamente";

          } catch (Exception $e) {
              echo "false|Error en el servidor. Intentelo más tarde...";
          }
          restore_error_handler();
      } else {
          echo  "false|Error en el servidor. Intentelo más tarde...";
      }
  }

}
