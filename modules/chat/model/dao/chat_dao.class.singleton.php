<?php
class chat_dao {

    static $_instance;

    private function __construct() {

    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }
    //
    // public function checkLogged_DAO($db) {
    //     $sql = "SELECT name_user FROM users";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }


    public function delete_chats_low_than_10min_DAO($db) {
        $sql = "DELETE FROM webchat_lines WHERE ts < SUBTIME(NOW(),'0:10:0')";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_users_online_DAO($db) {
        $sql = "SELECT name_user, avatar FROM users WHERE online= 1 ORDER BY name_user ASC LIMIT 18";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function get_chats_DAO($db) {
        $sql = "SELECT * FROM webchat_lines ORDER BY id ASC";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function get_n_users_online_DAO($db) {
        $sql = "SELECT COUNT(*) as cnt FROM users where online=1";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function obtain_gravatar_DAO($db, $user) {
        $sql = "SELECT avatar FROM users WHERE name_user='".$user."'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_chat_DAO($db, $datos) {
      $sql = "INSERT INTO webchat_lines (author, gravatar, text)
        VALUES ('".$datos[0]."','".$datos[1][0]['avatar']."','".$datos[2]."')";
      $stmt = $db->ejecutar($sql);
      return $db->listar($stmt);
    }


}
