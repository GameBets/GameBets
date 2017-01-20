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

    public function getMessages_BLL() {
        return $this->dao->getMessages_DAO($this->db);
    }

    public function addMessage_BLL($arrArgument) {
        return $this->dao->addMessage_DAO($this->db, $arrArgument);
    }

    public function removeMessages_BLL() {
        return $this->dao->removeMessages_DAO($this->db);
    }

    public function removeOldMessages_BLL() {
        return $this->dao->removeOldMessages_DAO($this->db);
    }

    public function getOnline_BLL() {
        return $this->dao->getOnline_DAO($this->db);
    }

    public function getIpOnline_BLL() {
        return $this->dao->getIpOnline_DAO($this->db);
    }

    public function updateOnline_BLL($arrArgument) {
        return $this->dao->updateOnline_DAO($this->db, $arrArgument);
    }

    public function clearOffline_BLL() {
        return $this->dao->clearOffline_DAO($this->db);
    }
}
