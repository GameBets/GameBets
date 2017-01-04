<?php
    function debugPHP($array){
		echo "<pre>";
		print_r($array);
		echo "</pre><br>";
		//die(); no va
	}

	function redirect($url){
		die('<script>window.location.href="'.$url .'";</script>');
	}

	function close_session() {
		$_SESSION = array (); // Destruye todas las variables de la sesión
		session_destroy(); // Destruye la sesión
	}

  function amigable($url, $return = false) {
      $amigableson = URL_AMIGABLES;
      $link = "";
      if ($amigableson) {
          $url = explode("&", str_replace("?", "", $url));
          foreach ($url as $key => $value) {
              $aux = explode("=", $value);
              $link .=  $aux[1]."/";
          }
      } else {
          $link = "index.php" . $url;
      }
      if ($return) {
          return SITE_PATH . $link;
      }
      echo SITE_PATH . $link;
  }

  function get_gravatar( $email, $s = 80, $d = 'identicon', $r = 'g', $img = false, $atts = array() ){
      $email = trim($email);
      $email = strtolower($email);
      $email_hash = md5($email);

      $url = "http://www.gravatar.com/avatar/".$email_hash;
      $url .= md5( strtolower( trim( $email ) ) );
      $url .= "?s=$s&d=$d&r=$r";
      if ( $img ) {
          $url = '<img src="' . $url . '"';
          foreach ( $atts as $key => $val )
              $url .= ' ' . $key . '="' . $val . '"';
          $url .= ' />';
      }
      return $url;
  }
