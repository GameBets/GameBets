<?php

class users_dao {

    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function signup_dao($db, $arrArgument) {
        $token = $arrArgument['token'];
        $passwd = $arrArgument['password'];
        $avatar = $arrArgument['avatar'];
        $email = $arrArgument['email'];
        $active = $arrArgument['active'];
        $type = $arrArgument['type'];
        $online = $arrArgument['online'];

        $sql = "INSERT INTO users (token, passwd, avatar, email, active, type, online) "
              . "VALUES ('$token', '$passwd', '$avatar', '$email', '$active', '$type', '$online')";
        return $db->ejecutar($sql);
    }

    public function create_users_dao($db, $arrArgument) {
        $token = $arrArgument['token'];
        $name_user = $arrArgument['name_user'];
        $passwd = $arrArgument['password'];
        $avatar = $arrArgument['avatar'];
        $named = $arrArgument['name'];
        $surname = $arrArgument['surname'];
        $date_birthday = $arrArgument['date_birthday'];
        $email = $arrArgument['email'];
        $phone = $arrArgument['phone'];
        $country = $arrArgument['country'];
        $province = $arrArgument['province'];
        $town = $arrArgument['town'];
        $active = 0;

        $sql = "INSERT INTO users (token, name_user, passwd, avatar, named, surname, "
              . "date_birthday, email, phone, country, province, town, active ) "
              . "VALUES ('$token', '$name_user', '$passwd', '$avatar', '$named', '$surname', "
              . "'$date_birthday', '$email', '$phone', '$country', '$province', '$town', '$active')";
        return $db->ejecutar($sql);
    }

    public function obtain_paises_dao($url) {
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $url);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $file_contents = curl_exec($ch);
        curl_close($ch);

        return ($file_contents) ? $file_contents : FALSE;
    }

    public function obtain_provincias_dao() {
        $json = array();
        $tmp = array();

        $provincias = simplexml_load_file(RESOURCES_PATH ."provinciasypoblaciones.xml");
        $result = $provincias->xpath("/lista/provincia/nombre | /lista/provincia/@id");
        for ($i=0; $i<count($result); $i+=2) {
          $e=$i+1;
          $provincia=$result[$e];

          $tmp = array(
            'id' => (string) $result[$i], 'nombre' => (string) $provincia
          );
          array_push($json, $tmp);
        }
        return $json;
    }

    public function obtain_poblaciones_dao($arrArgument) {
        $json = array();
        $tmp = array();

        $filter = (string)$arrArgument;
        $xml = simplexml_load_file(RESOURCES_PATH . "provinciasypoblaciones.xml");
        $result = $xml->xpath("/lista/provincia[@id='$filter']/localidades");

        for ($i=0; $i<count($result[0]); $i++) {
          $tmp = array('poblacion' => (string) $result[0]->localidad[$i]);
          array_push($json, $tmp);
        }
        return $json;
    }

    public function count_dao($db, $arrArgument) {
        /* $arrArgument is composed by 2 array ("column" and "like"), this iterates
         * the number of positions the array have, this way we get a method that builds a
         * custom sql to select with the needed arguments
         */
        $i = count($arrArgument['column']);

        $sql = "SELECT COUNT(*) as total FROM users WHERE ";

        for ($j = 0; $j < $i; $j++) {
            if ($i > 1 && $j != 0)
                $sql.=" AND ";
            $sql .= $arrArgument['column'][$j] . " like '" . $arrArgument['like'][$j] . "'";
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_dao($db, $arrArgument) {
        $i = count($arrArgument['column']);
        $k = count($arrArgument['field']);
        $sql1 = "SELECT ";
        $sql2 = " FROM users WHERE ";
        $sql3 = '';
        $fields = '';

        for ($j = 0; $j < $i; $j++) {
            if ($i > 1 && $j != 0)
                $sql.=" AND ";
            $sql3 .= $arrArgument['column'][$j] . " like '" . $arrArgument['like'][$j] . "'";
        }

        for ($l = 0; $l < $k; $l++) {
            if ($l > 1 && $k != 0)
                $fields.=", ";
            $fields .= $arrArgument['field'][$l];
        }


        $sql = $sql1 . $fields . $sql2 . $sql3;

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_dao($db, $arrArgument) {
        /*
         * @param= $arrArgument( column => array(colum),
         *                          like => array(like),
         *                          field => array(field),
         *                          new => array(new)
         *                      );
         */
        $i = count($arrArgument['field']);
        $k = count($arrArgument['column']);
        $change = '';
        $sql3 = '';

        $sql1 = "UPDATE users SET ";
        $sql2 = "  WHERE ";

        for ($j = 0; $j < $i; $j++) {
            if ($i > 1 && $j != 0)
                $change.=", ";
            $change .= $arrArgument['field'][$j] . "='" . $arrArgument['new'][$j] . "'";
        }
        for ($l = 0; $l < $k; $l++) {
            if ($k > 1 && $l != 0)
                $sql.=" AND ";
            $sql3 .= $arrArgument['column'][$l] . " like '" . $arrArgument['like'][$l] . "'";
        }



        $sql = $sql1 . $change . $sql2 . $sql3;

        return $db->ejecutar($sql);
    }
}
