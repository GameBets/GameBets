<?php
  class users_bll {

      private $dao;
      private $db;
      static $_instance;

      private function __construct() {
          $this->dao = users_dao::getInstance();
          $this->db = db::getInstance();
      }

      public static function getInstance() {
          if (!(self::$_instance instanceof self))
              self::$_instance = new self();
          return self::$_instance;
      }

      public function create_users_bll($arrArgument) {
          return $this->dao->create_users_dao($this->db, $arrArgument);
      }

      public function obtain_paises_bll($url) {
          return $this->dao->obtain_paises_dao($url);
      }

      public function obtain_provincias_bll() {
          return $this->dao->obtain_provincias_dao();
      }

      public function obtain_poblaciones_bll($arrArgument) {
          return $this->dao->obtain_poblaciones_dao($arrArgument);
      }

  }
