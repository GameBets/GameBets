<?php
    //require (MODEL_PATH . "db.class.singleton.php");
    //require(DAO_USERS . "user_dao.class.singleton.php");

    class products_bll
    {
        private $dao;
        private $db;
        public static $_instance;

        private function __construct()
        {
            $this->dao = products_dao::getInstance();
            $this->db = db::getInstance();
        }

        public static function getInstance()
        {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        // public function create_products_BLL($arrArgument)
        // {
        //     return $this->dao->create_products_DAO($this->db, $arrArgument);
        // }

        public function list_products_BLL()
        {
            return $this->dao->list_products_DAO($this->db);
        }

        public function details_products_BLL($id)
        {
            return $this->dao->details_products_DAO($this->db, $id);
        }

        public function list_limit_products_BLL($arrArgument)
        {
            return $this->dao->list_limit_products_DAO($this->db, $arrArgument);
        }

        public function count_products_BLL()
        {
            return $this->dao->count_products_DAO($this->db);
        }

        public function select_column_products_BLL($arrArgument)
        {
            return $this->dao->select_column_products_DAO($this->db, $arrArgument);
        }

        public function select_like_products_BLL($arrArgument)
        {
            return $this->dao->select_like_products_DAO($this->db, $arrArgument);
        }

        public function count_like_products_BLL($arrArgument)
        {
            return $this->dao->count_like_products_DAO($this->db, $arrArgument);
        }

        public function select_like_limit_products_BLL($arrArgument)
        {
            return $this->dao->select_like_limit_products_DAO($this->db, $arrArgument);
        }
    }
