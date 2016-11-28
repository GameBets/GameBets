<?php
    //require(BLL_USERS . "user_bll.class.singleton.php");

    class products_model
    {
        private $bll;
        public static $_instance;

        private function __construct()
        {
            $this->bll = products_bll::getInstance();
        }

        public static function getInstance()
        {
            if (!(self::$_instance instanceof self)) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        // public function create_product($arrArgument)
        // {
        //     return $this->bll->create_product_BLL($arrArgument);
        // }

        public function list_products()
        {
            return $this->bll->list_products_BLL();
        }

        public function details_products($id)
        {
            return $this->bll->details_products_BLL($id);
        }

        public function list_limit_products($arrArgument)
        {
            return $this->bll->list_limit_products_BLL($arrArgument);
        }

        public function count_products()
        {
            return $this->bll->count_products_BLL();
        }

        public function select_column_products($arrArgument)
        {
            return $this->bll->select_column_products_BLL($arrArgument);
        }

        public function select_like_products($arrArgument)
        {
            return $this->bll->select_like_products_BLL($arrArgument);
        }

        public function count_like_products($arrArgument)
        {
            return $this->bll->count_like_products_BLL($arrArgument);
        }

        public function select_like_limit_products($arrArgument)
        {
            return $this->bll->select_like_limit_products_BLL($arrArgument);
        }
    }
