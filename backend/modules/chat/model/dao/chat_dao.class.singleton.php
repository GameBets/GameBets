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

    public function getMessages_DAO($db) {
        $sql = "SELECT * FROM messages ORDER BY `date` DESC LIMIT 150 ORDER BY `date` ASC";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function addMessage_DAO($db, $datos) {
        $sql = "INSERT INTO messages VALUES (NULL, '".$datos['username']."', '".$datos['message']."', '".$datos['ip']."', NOW())";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function removeMessages_DAO($db) {
        $sql = "TRUNCATE TABLE messages";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function removeOldMessages_DAO($db) {
        $sql = "DELETE FROM messages WHERE id NOT IN (SELECT id FROM messages ORDER BY date DESC LIMIT 150)");

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getOnline_DAO($db) {
        $sql = "SELECT count(*) as total FROM online";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function getIpOnline_DAO($db) {
        $sql = "SELECT ip FROM online";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function updateOnline_DAO($db, $datos) {
        $sql = "REPLACE INTO online VALUES ('".$datos['$hash']."', '".$datos['$ip']."', NOW())";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function clearOffline_DAO($db) {
        $sql = "DELETE FROM online WHERE last_update <= (NOW() - INTERVAL 1 MINUTE)";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}
