<?php
  //require(BLL_PRODUCTS_PATH . "products_bll.class.singleton.php");

  class users_model {

      private $bll;
      static $_instance;

      private function __construct() {
          $this->bll = users_bll::getInstance();
      }

      public static function getInstance() {
          if (!(self::$_instance instanceof self)){
              self::$_instance = new self();
          }
          return self::$_instance;
      }

      public function signup($arrArgument) {
          return $this->bll->signup_bll($arrArgument);
      }

      public function create_users($arrArgument) {
          return $this->bll->create_users_bll($arrArgument);
      }

      public function obtain_paises($url) {
          return $this->bll->obtain_paises_bll($url);
      }

      public function obtain_provincias() {
          return $this->bll->obtain_provincias_bll();
      }

      public function obtain_poblaciones($arrArgument) {
          return $this->bll->obtain_poblaciones_bll($arrArgument);
      }

      public function update($arrArgument) {
          return $this->bll->update_BLL($arrArgument);
      }

      public function count($arrArgument) {
          return $this->bll->count_BLL($arrArgument);
      }

       public function select($arrArgument) {
          return $this->bll->select_BLL($arrArgument);
      }

  }
