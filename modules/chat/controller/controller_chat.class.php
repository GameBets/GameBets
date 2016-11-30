<?php
    class controller_chat
    {
        public function __construct()
        {
            // include(UTILS_USERS_PATH . "utils_chat.inc.php");
          $response = array();
            $_SESSION['module'] = 'chat';
        }

        public function chat_users()
        {
            include_once INC_PATH.'top.php';
            include_once INC_PATH.'header.php';
            include_once INC_PATH.'menu.php';

            loadView('modules/chat/view/', 'chat.php');

            include_once INC_PATH.'footer.php';
            include_once INC_PATH.'bottom.php';
        }

        public function checkLogged()
        {
            $response = array();
            $response = array('logged' => false);

            if (isset($_POST['user'])) {
                $gravatar = loadModel(MODEL_CHAT_PATH, 'chat_model', 'obtain_gravatar', ($_POST['user']));
                if ($gravatar) {
                    $response['logged'] = true;
                    $response['loggedAs'] = array(
                        'name' => ($_POST['user']),
                        'gravatar' => $gravatar,
                    );
                    echo json_encode($response);
                    exit;
                } else {
                    echo json_encode($response);
                    exit;
                }
            }
        }

        public function view_error_true()
        {
            if ((isset($_POST['view_error'])) && ($_POST['view_error'] === 'true')) {
                showErrorPage(0, 'ERROR - 503 BD Unavailable');
            }
        }

        public function view_error_false()
        {
            if ((isset($_POST['view_error'])) && ($_POST['view_error'] === 'false')) {
                //showErrorPage(0, "ERROR - 404 NO DATA");
                showErrorPage(3, 'USERS NOT FOUND');
            }
        }
    }
