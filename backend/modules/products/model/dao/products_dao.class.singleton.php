<?php
class products_dao {

    static $_instance;

    private function __construct() {
        
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function list_products_DAO($db) {
        $sql = "SELECT * FROM products";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function details_products_DAO($db, $id) {
        $sql = "SELECT * FROM products WHERE id=" . $id;
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function page_products_DAO($db, $arrArgument) {
        $position = $arrArgument['position'];
        $item_per_page = $arrArgument['item_per_page'];
        $criteria = $arrArgument['criteria'];

        $sql = "SELECT DISTINCT * FROM products WHERE name like '%" . $criteria . "%' ORDER BY id ASC LIMIT " . $position . ", " . $item_per_page;

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function total_products_DAO($db, $criteria) {
        $sql = "SELECT COUNT(*) as total FROM products WHERE name like '%" . $criteria . "%'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function live_search_DAO($db) {
        $sql = "SELECT name FROM products ORDER BY name";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function obtain_product_DAO($db, $criteria) {
        $sql = "SELECT DISTINCT * FROM products WHERE name like '%" . $criteria . "%'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function total_rows_like_DAO($db, $criteria) {
        $sql = "SELECT COUNT(*) as total FROM products WHERE name like '%" . $criteria . "%'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}