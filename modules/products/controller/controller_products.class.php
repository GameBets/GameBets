<?php
class controller_products {

    function __construct() {
        include(UTILS_PRODUCTS_PATH . "utils.inc.php");
       $_SESSION['module'] = "products";
    }

    function list_products() {
      include_once(INC_PATH . "top.php");
      include_once(INC_PATH . "header.php");
      include_once(INC_PATH . "menu.php");

        loadView('modules/products/view/', 'list_products.php');

        include_once(INC_PATH . "footer.php");
        include_once(INC_PATH . "bottom.php");
    }

    function autocomplete_products() {

        if ((isset($_POST["autocomplete"])) && ($_POST["autocomplete"] === "true")) {
            set_error_handler('ErrorHandler');
            try {

                //throw new Exception();
                $nom_productos = loadModel(MODEL_PRODUCTS_PATH, "products_model", "live_search", "");
            } catch (Exception $e) {
                showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
            }
            restore_error_handler();

            if ($nom_productos) {
                $jsondata["nom_productos"] = $nom_productos;
                echo json_encode($jsondata);
                exit;
            } else {
                showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
            }
        }
    }

    function nom_products() {
        if (($_POST["nom_product"])) {
            //filtrar $_GET["nom_product"]
            $result = filter_string($_POST["nom_product"]);
            if ($result['resultado']) {
                $criteria = $result['datos'];
            } else {
                $criteria = '';
            }

            set_error_handler('ErrorHandler');
            try {
                //throw new Exception();
                $product = loadModel(MODEL_PRODUCTS_PATH, "products_model", "obtain_product", $criteria);
            } catch (Exception $e) {
                showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
            }
            restore_error_handler();

            if ($product[0]) {
                $jsondata["product_autocomplete"] = $product[0];
                echo json_encode($jsondata);
                exit;
            } else {
                showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
            }
        }
    }

    function count_products() {
        if (($_POST["count_product"])) {
            //filtrar $_GET["count_product"]
            $result = filter_string($_POST["count_product"]);
            if ($result['resultado']) {
                $criteria = $result['datos'];
            } else {
                $criteria = '';
            }

            set_error_handler('ErrorHandler');
            try {
                //throw new Exception();
                $result = loadModel(MODEL_PRODUCTS_PATH, "products_model", "total_rows_like", $criteria);
                $total_rows = $result[0]['total'];
            } catch (Exception $e) {
                showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
            }
            restore_error_handler();

            if ($total_rows) {
                $jsondata["num_products"] = $total_rows;
                echo json_encode($jsondata);
                exit;
            } else {
                showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
            }
        }
    }

    function num_pages_products() {
        //obtain num total pages
        if ((isset($_POST["num_pages"])) && ($_POST["num_pages"] === "true")) {
            $item_per_page = 3;

            if (isset($_POST["keyword"])) {
                $result = filter_string($_POST["keyword"]);
                if ($result['resultado']) {
                    $criteria = $result['datos'];
                } else {
                    $criteria = '';
                }
            } else {
                $criteria = '';
            }


            //change work error apache
            set_error_handler('ErrorHandler');

            try {
                //throw new Exception();
                $arrValue = loadModel(MODEL_PRODUCTS_PATH, "products_model", "total_products", $criteria);
                $get_total_rows = $arrValue[0]["total"]; //total records
                $pages = ceil($get_total_rows / $item_per_page); //break total records into pages
            } catch (Exception $e) {
                showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
            }

            //change to defualt work error apache
            restore_error_handler();

            if ($get_total_rows) {
                $jsondata["pages"] = $pages;
                echo json_encode($jsondata);
                exit;
            } else {
                showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
            }
        }
    }

    function view_error_true() {
        if ((isset($_POST["view_error"])) && ($_POST["view_error"] === "true")) {
            showErrorPage(0, "ERROR - 503 BD Unavailable");
        }
    }

    function view_error_false() {
        if ((isset($_POST["view_error"])) && ($_POST["view_error"] === "false")) {
            //showErrorPage(0, "ERROR - 404 NO DATA");
            showErrorPage(3, "RESULTS NOT FOUND");
        }
    }

    function idProduct() {

        if (isset($_POST["idProduct"])) {
            $arrValue = null;
            $result = filter_num_int($_POST["idProduct"]);
            if ($result['resultado']) {
                $id = $result['datos'];
            } else {
                $id = 1;
            }

            set_error_handler('ErrorHandler');
            try {
                //throw new Exception();
                $arrValue = loadModel(MODEL_PRODUCTS_PATH, "products_model", "details_products", $id);
            } catch (Exception $e) {
                showErrorPage(2, "ERROR - 503 BD", 'HTTP/1.0 503 Service Unavailable', 503);
            }
            restore_error_handler();

            if ($arrValue) {
                $jsondata["product"] = $arrValue[0];
                echo json_encode($jsondata);
                exit;
            } else {
                showErrorPage(2, "ERROR - 404 NO DATA", 'HTTP/1.0 404 Not Found', 404);
            }
        }
    }

    function obtain_products() {
        //filter to $_POST["page_num"]
        if (isset($_POST["page_num"])) {
            $result = filter_num_int($_POST["page_num"]);
            if ($result['resultado']) {
                $page_number = $result['datos'];
            }
        } else {
            $page_number = 1;
        }



        //filter $_GET["keyword"]
        if (isset($_POST["keyword"])) {
            $result = filter_string($_POST["keyword"]);
            if ($result['resultado']) {
                $criteria = $result['datos'];
            } else {
                $criteria = '';
            }
        } else {
            $criteria = '';
        }

        //to paging when we have not empty keyword
        if (isset($_POST["keyword"])) {
            $result = filter_string($_POST["keyword"]);
            if ($result['resultado']) {
                $criteria1 = $result['datos'];
            } else {
                $criteria1 = '';
            }
        } else {
            $criteria1 = '';
        }

        if (isset($_POST["keyword"])) {
            $criteria = $criteria1;
        }

        set_error_handler('ErrorHandler');
        try {
            $item_per_page = 3;
            //throw new Exception();
            $position = (($page_number - 1) * $item_per_page);

            $arrArgument = array(
                'position' => $position,
                'item_per_page' => $item_per_page,
                'criteria' => $criteria
            );


            $arrValue = loadModel(MODEL_PRODUCTS_PATH, "products_model", "page_products", $arrArgument);
        } catch (Exception $e) {
            showErrorPage(0, "ERROR - 503 BD Unavailable");
        }
        restore_error_handler();

        if ($arrValue) {
            paint_template_products($arrValue);
        } else {
            showErrorPage(0, "ERROR - 404 NO PRODUCTS");
        }
    }

}
