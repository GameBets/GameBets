<?php
    /*** nullify any existing autoloads ***/
    spl_autoload_register(null, false);

    spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');
    //spl_autoload_extensions('.php,.class.php,.class.singleton.php,.inc.php,.conf.php,.conf.class.php');

    spl_autoload_register('loadClasses');

    function loadClasses($className)
    {
      $ext = '.class.singleton.php';
      $arrArguments = explode("_", $className);

      if (count($arrArguments) > 1) {
          if (file_exists(MODULES_PATH . $arrArguments[0] . "/model/" . $arrArguments[1] . "/" . $className . $ext)) {
              set_include_path(MODULES_PATH . $arrArguments[0] . "/model/" . $arrArguments[1] . "/");
              spl_autoload($className);
          }
      } else {
          if (file_exists('classes/' . $className . "/" . $className . $ext)) {
              set_include_path('classes/' . $className . "/");
              spl_autoload($className);
          } elseif (file_exists(MODEL_PATH . $className . $ext)) {
              set_include_path(MODEL_PATH);
              spl_autoload($className);
          } elseif (file_exists(LIBS . 'PHPMailer_v5.1/class.' . $className . '.php')) {
              set_include_path(LIBS . 'PHPMailer_v5.1/');
              spl_autoload('class.' . $className);
          } elseif (file_exists(LIBS . $className . '.class.php')) {
              set_include_path(LIBS);
              spl_autoload($className);
          }
      }
    }
