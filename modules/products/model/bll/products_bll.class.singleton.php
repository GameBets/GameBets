<?php
class products_bll {
    private $dao;
    private $db;
    static $_instance;

    private function __construct() {
        $this->dao = products_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function list_products_BLL() {
        return $this->dao->list_products_DAO($this->db);
    }

    public function details_products_BLL($id) {
        return $this->dao->details_products_DAO($this->db, $id);
    }

    public function page_products_BLL($arrArgument) {
        return $this->dao->page_products_DAO($this->db, $arrArgument);
    }

    public function total_products_BLL($criteria) {
        return $this->dao->total_products_DAO($this->db, $criteria);
    }

    public function live_search_BLL() {
        return $this->dao->live_search_DAO($this->db);
    }

    public function obtain_product_BLL($criteria) {
        return $this->dao->obtain_product_DAO($this->db, $criteria);
    }

    public function total_rows_like_BLL($criteria) {
        return $this->dao->total_rows_like_DAO($this->db, $criteria);
    }

}
