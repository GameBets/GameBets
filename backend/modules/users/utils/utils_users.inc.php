<?php

  function validate_signup($value) {
      $error = array();
      $valido = true;

      //FILTER
      //Valores que se pueden verificar con expresiones regulares
      $filtro = array(
          'password' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])(?=.{8,})/')

          ),
          'email' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
          ),
      );

      //Filtramos los datos con su expresion regular
      //return true or false
      $resultado = filter_var_array($value, $filtro);

      if ($resultado != null && $resultado) {

          if (!$resultado['password']) {
              $error['password'] = 'Debe contener 8 caracteres minimo entre los cuales debe haber 1 letra, 1 numero y 1 caracter especial';
              $valido = false;
          }

          if (!$resultado['email']) {
              $error['email'] = 'Ejemplo: micorreo@ejemplo.com';
              $valido = false;
          }

      } else {
          $valido = false;
      };

      return $return = array('resultado' => $valido, 'error' => $error, 'datos' => $resultado);
  };

  function validate_users($value) {
      $error = array();
      $valido = true;

      //FILTER
      //Valores que se pueden verificar con expresiones regulares
      $filtro = array(
          'name_user' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^[0-9a-zA-z]+$/')
          ),
          'passwd' => array(
            'filter' => FILTER_VALIDATE_REGEXP,
            'options' => array('regexp' => '/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])(?=.{8,})/')
          ),
          'named' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^[a-zA-Z]+$/')
          ),
          'surname' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^[a-zA-Z\ ]+$/')
          ),
          'date_birthday' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/')
          ),
          'email' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
          ),
          'phone' => array(
              'filter' => FILTER_VALIDATE_REGEXP,
              'options' => array('regexp' => '/^[0-9]{9}$/')
          ),
      );

      //Filtramos los datos con su expresion regular
      //return true or false
      $resultado = filter_var_array($value, $filtro);

      //NO FILTER
      //Valores qu no se pueden expresar con expresiones regulares
      $resultado['country'] = $value['country'];
      $resultado['province'] = $value['province'];
      $resultado['town'] = $value['town'];

      //RESULT
      //Si el resultado del valor es correcto, mantendremos el valor del resultado en true
      //Si el resultado del valor es incorrecto, asignamos un mensaje de error

      if($resultado['date_birthday'] != "") {
        if ($resultado['date_birthday']) {
            $date = validate_age($resultado['date_birthday'], 18);
            if (!$date){
                $error['date_birthday'] ="Debes de tener más de 18 años";
                $valido = false;
            }
        }
      }


      if($resultado['country'] != "") {
        if ($resultado['country'] === "Selecciona un Pais") {
            $error['country'] = "Selecciona un pais";
            $valido = false;
        }
      }
      if($resultado['province'] != "") {
        if ($resultado['province'] === "Selecciona una Provincia") {
            $error['province'] = "Selecciona una provincia";
            $valido = false;
        }
      }
      if($resultado['town'] != "") {
        if ($resultado['town'] === "Selecciona una Poblacion") {
            $error['town'] = "Selecciona una poblacion";
            $valido = false;
        }
      }

      if ($resultado != null && $resultado) {
        if($resultado['name_user'] != "") {
            if (!$resultado['name_user']) {
                $error['name_user'] = 'Solo puede contener numeros y letras';
                $valido = false;
            }
          }
          if($resultado['passwd'] != "") {
            if (!$resultado['passwd']) {
                $error['passwd'] = 'Debe contener 8 caracteres minimo entre los cuales debe haber 1 letra, 1 numero y 1 caracter especial';
                $valido = false;
            }
          }
          if($resultado['named'] != "") {
            if (!$resultado['named']) {
                $error['named'] = 'Solo puede contener letras';
                $valido = false;
            }
          }
          if($resultado['surname'] != "") {
            if (!$resultado['surname']) {
                $error['surname'] = 'Solo puede contener letras y 1 espacio';
                $valido = false;
            }
          }
          if($resultado['date_birthday'] != "") {
            if (!$resultado['date_birthday']) {
                if ($resultado['date_birthday'] == "") {
                    $error['date_birthday'] = "El campo esta vacio";
                    $valido = false;
                } else {
                    $error['date_birthday'] = 'Error formato de fecha [mm/dd/yyyy]';
                    $valido = false;
                }
            }
          }

          if($resultado['email'] != "") {
            if (!$resultado['email']) {
                $error['email'] = 'Ejemplo: micorreo@ejemplo.com';
                $valido = false;
            }
          }

          if($resultado['phone'] != "") {
            if (!$resultado['phone']) {
                $error['phone'] = 'Debe contener 9 digitos';
                $valido = false;
            }
          }
      } else {
          $valido = false;
      }

      return $return = array('resultado' => $valido, 'error' => $error, 'datos' => $resultado);
  };

  //FUNCTIONS

  //Funcion de comparar dos fechas
  //La primera fecha debe ser anterior o igual a la segunda fecha
  function compare_dates($start_days, $dayslight) {

      $dia_one = substr($start_days, 0, 2);
      $mes_one = substr($start_days, 3, 2);
      $anio_one = substr($start_days, 6, 4);
      $dia_two = substr($dayslight, 0, 2);
      $mes_two = substr($dayslight, 3, 2);
      $anio_two = substr($dayslight, 6, 4);

      $dateOne = new DateTime($anio_one . "-" . $mes_one . "-" . $dia_one);
      $dateTwo = new DateTime($anio_two . "-" . $mes_two . "-" . $dia_two);

      if ($dateOne <= $dateTwo) {
          return true;
      }
      return false;
  }

  // validate birthday
  function validate_age($birthday, $age = 18) {
      // $birthday can be UNIX_TIMESTAMP or just a string-date.
      if (is_string($birthday)) {
          $birthday = strtotime($birthday);
      }

      // check
      // 31536000 is the number of seconds in a 365 days year.
      if (time() - $birthday < $age * 31536000) {
          return false;
      }

      return true;
  }

  function send_email($arrArgument, $type) {
      $mail = array(
          'type' => $type,
          'token' => $arrArgument['token'],
          'inputEmail' => $arrArgument['email']
      );
      set_error_handler('ErrorHandler');
      try {
          enviar_email($mail);
          return true;
      } catch (Exception $e) {
          return false;
      }
      restore_error_handler();
  }