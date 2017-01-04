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

          loadView(CHAT_VIEW_PATH, 'chat.php');
        }

        public function checkLogged()
        {
            $response = array();
            $response = array('logged' => false);
            // El user es el email
            if (isset($_POST['user'])) {
                $gravatar = loadModel(MODEL_CHAT_PATH, 'chat_model', 'obtain_gravatar', ($_POST['user']));
                // echo json_encode($gravatar);
                // exit;
                if ($gravatar) {
                    $gravatar = $gravatar[0]['avatar'];
                    $response['logged'] = true;
                    $response['loggedAs'] = array(
                        'name' => ($_POST['user']),
                        'gravatar' => $gravatar,
                    );
                    echo json_encode($response);
                    exit;
                } else {
                    $response['redirect'] = amigable('?module=users&function=signin');
                    var_dump($response['redirect']);
                    exit;
                    echo json_encode($response);
                    exit;
                }
            }
        }

        public function getUsers()
        {
            // Deleting chats older than 10 minutes
          //  $h = loadModel(MODEL_CHAT_PATH, 'chat_model', 'delete_chats_low_than_10min',"");

          $result = loadModel(MODEL_CHAT_PATH, 'chat_model', 'get_users_online', '');
          $j = 0;
          $array = [];
          foreach ($result as $key) {
            if ($key != "") {
                $array['name'][$j] = $result[$j]['email'];
                $array['gravatar'][$j] = $result[$j]['avatar'];
                $j++;
            }

          }
            echo json_encode(array(
                  'users' => $array,
                  'total' => loadModel(MODEL_CHAT_PATH, 'chat_model', 'get_n_users_online', ''),
              ));
            exit;
        }

        public function getChats()
        {
      		$result =  loadModel(MODEL_CHAT_PATH, 'chat_model', 'get_chats', '');
          // DB::query('SELECT * FROM webchat_lines WHERE id > '.$lastID.' ORDER BY id ASC');
          $j = 0;
          $array = [];
      		// $chats = array();
          foreach ($result as $key) {
            if ($key != "") {
                $array['id'][$j] = $result[$j]['id'];
                $array['author'][$j] = $result[$j]['author'];
                $array['gravatar'][$j] = $result[$j]['gravatar'];
                $array['text'][$j] = $result[$j]['text'];
                $array['time'][$j] = array(
                  	'hours'		=> gmdate('H',strtotime($result[$j]['ts'])),
            				'minutes'	=> gmdate('i',strtotime($result[$j]['ts']))
                );
                $array['ts'][$j] = $result[$j]['ts'];
                $j++;
            }
          }
          echo json_encode( array(
                'chats' => $array
            ));
          exit;
        }
        public function submitMessage()
        {
          $gravatar = loadModel(MODEL_CHAT_PATH, 'chat_model', 'obtain_gravatar', ($_POST['user']));
          $array = [$_POST['user'], $gravatar, $_POST['text']];
          $result =  loadModel(MODEL_CHAT_PATH, 'chat_model', 'insert_chat', $array);
          echo json_encode($result);
          exit;
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
