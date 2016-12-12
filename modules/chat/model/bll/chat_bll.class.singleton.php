<?php
class chat_bll {
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = chat_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function checkLogged_BLL() {
        return $this->dao->checkLogged_DAO($this->db);
    }

    public function obtain_gravatar_BLL($user) {
        return $this->dao->obtain_gravatar_DAO($this->db, $user);
    }
    public function delete_chats_low_than_10min_BLL() {
        return $this->dao->delete_chats_low_than_10min_DAO($this->db);
    }

    public function get_users_online_BLL() {
        return $this->dao->get_users_online_DAO($this->db);
    }
}
