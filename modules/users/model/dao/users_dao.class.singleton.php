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

    public function create_users_dao($db, $arrArgument) {
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

        $sql = "INSERT INTO users (name_user, passwd, avatar, named, surname, "
              . "date_birthday, email, phone, country, province, town ) "
              . "VALUES ('$name_user', '$passwd', '$avatar', '$named', '$surname', "
              . "'$date_birthday', '$email', '$phone', '$country', '$province', '$town')";

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
}
