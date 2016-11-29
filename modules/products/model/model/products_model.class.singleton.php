<?php
class products_model {

    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = products_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function list_products() {
        return $this->bll->list_products_BLL();
    }

    public function details_products($id) {
        return $this->bll->details_products_BLL($id);
    }

    public function page_products($arrArgument) {
        return $this->bll->page_products_BLL($arrArgument);
    }

    public function total_products($criteria) {
        return $this->bll->total_products_BLL($criteria);
    }

    public function live_search() {
        return $this->bll->live_search_BLL();
    }

    public function obtain_product($criteria) {
        return $this->bll->obtain_product_BLL($criteria);
    }

    public function total_rows_like($criteria) {
        return $this->bll->total_rows_like_BLL($criteria);
    }

}
