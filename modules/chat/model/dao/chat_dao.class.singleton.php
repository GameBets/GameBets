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

    public function checkLogged_DAO($db) {
        $sql = "SELECT name_user FROM users";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}
