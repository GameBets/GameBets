<?php
    class controller_chat {

        public function __construct() {
        	// include(UTILS_USERS_PATH . "utils_chat.inc.php");

          $_SESSION['module'] = "chat";
        }

        public function chat_users() {
          include_once(INC_PATH . "top.php");
          include_once(INC_PATH . "header.php");
          include_once(INC_PATH . "menu.php");

          loadView('modules/chat/view/', 'chat.php');

          include_once(INC_PATH . "footer.php");
          include_once(INC_PATH . "bottom.php");
        }

        function checkLogged() {
          $response = array('logged' => false);

      		if($_SESSION['user']['name']){
      			$response['logged'] = true;
      			$response['loggedAs'] = array(
      				'name'		=> $_SESSION['user']['name'],
      				'gravatar'	=> Chat::gravatarFromHash($_SESSION['user']['gravatar'])
      			);
      		}

      		return $response;
        }
  }
