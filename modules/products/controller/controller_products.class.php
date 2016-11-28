<?php
    class controller_products{

        public function __construct() {
        	 include(UTILS_PRODUCTS_PATH . "utils.inc.php");

            $_SESSION['module'] = 'products';
        }

        public function list_products() {
            include_once(INC_PATH . "top.php");
            include_once(INC_PATH . "header.php");
            include_once(INC_PATH . "menu.php");

            loadView('modules/products/view/', 'list_products.php');

            include_once(INC_PATH . "footer.php");
            include_once(INC_PATH . "bottom.php");
        }

        public function autocomplete()
        {
            if ((isset($_POST['autocomplete'])) && ($_POST['autocomplete'] === 'true')) {
                set_error_handler('ErrorHandler');
                try {
                    $nameProducts = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'select_column_products', 'prod_name');
                } catch (Exception $e) {
                    showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                }
                restore_error_handler();

                if ($nameProducts) {
                    $jsondata['nom_productos'] = $nameProducts;
                    echo json_encode($jsondata);
                    exit;
                } else {
                    showErrorPage(2, 'ERROR - 404 NO DATA', 'HTTP/1.0 404 Not Found', 404);
                }
            }
        }
        public function count_product()
        {
            if (($_POST['count_product'])) {
                //filtrar $_POST["count_product"]
                    $result = filter_string($_POST['count_product']);
                if ($result['resultado']) {
                    $criteria = $result['datos'];
                } else {
                    $criteria = '';
                }
                set_error_handler('ErrorHandler');
                try {
                    $arrArgument = array(
                            'column' => 'prod_name',
                            'like' => $criteria,
                        );
                    $total_rows = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'count_like_products', $arrArgument);
                        //throw new Exception(); //que entre en el catch
                } catch (Exception $e) {
                    showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                }
                restore_error_handler();

                if ($total_rows) {
                    $jsondata['num_products'] = $total_rows[0]['total'];
                    echo json_encode($jsondata);
                    exit;
                } else {
                    //if($total_rows){ //que lance error si no existe el producto
                        showErrorPage(2, 'ERROR - 404 NO DATA', 'HTTP/1.0 404 Not Found', 404);
                }
            }
        }

        public function nom_product()
        {
            if (($_POST['nom_product'])) {
                //filtrar $_POST["nom_product"]

                    $result = filter_string($_POST['nom_product']);
                if ($result['resultado']) {
                    $criteria = $result['datos'];
                } else {
                    $criteria = '';
                }
                set_error_handler('ErrorHandler');
                try {
                    $arrArgument = array(
                            'column' => 'prod_name',
                            'like' => $criteria,
                        );
                    $producto = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'select_like_products', $arrArgument);

                        //throw new Exception(); //que entre en el catch
                } catch (Exception $e) {
                    showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                }
                restore_error_handler();

                if ($producto) {
                    $jsondata['product_autocomplete'] = $producto;
                    echo json_encode($jsondata);
                    exit;
                } else {
                    //if($producto){{ //que lance error si no existe el producto
                        showErrorPage(2, 'ERROR - 404 NO DATA', 'HTTP/1.0 404 Not Found', 404);
                }
            }
        }

        public function view_error()
        {
            if ((isset($_POST['view_error'])) && ($_POST['view_error'] === 'true')) {
                /* paint_template_error("ERROR BD");
              die(); */
            showErrorPage(0, 'ERROR - 503 BD Unavailable', 503);
            }
            if ((isset($_POST['view_error'])) && ($_POST['view_error'] === 'false')) {
                //showErrorPage(0, "ERROR - 404 NO PRODUCTS");
            showErrorPage(3, 'RESULTS NOT FOUND <br> Please, check over if you misspelled any letter of the search word');
            }
        }

        public function id_product()
        {
            if (isset($_POST['idProducto'])) {
                $result = filter_num_int($_POST['idProducto']);
                if ($result['resultado']) {
                    $id = $result['datos'];
                } else {
                    $id = 1;
                }
                set_error_handler('ErrorHandler');
                try {
                    $producto = false;
                    $producto = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'details_products', $id);

                } catch (Exception $e) {
                    showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                }
                restore_error_handler();

                if ($producto) {
                    $jsondata['product'] = $producto[0];
                    echo json_encode($jsondata);
                    exit;
                } else {
                    showErrorPage(2, 'ERROR - 404 NO DATA', 'HTTP/1.0 404 Not Found', 404);
                }
            } else {
                $item_per_page = 3;

                if (isset($_POST['page_num'])) {
                    $result = filter_num_int($_POST['page_num']);
                    if ($result['resultado']) {
                        $page_number = $result['datos'];
                    }
                } else {
                    $page_number = 1;
                }

                if (isset($_POST['keyword'])) {
                    $result = filter_string($_POST['keyword']);
                    if ($result['resultado']) {
                        $criteria = $result['datos'];
                    } else {
                        $criteria = '';
                    }
                } else {
                    $criteria = '';
                }

                if (isset($_POST['keyword'])) {
                    $result = filter_string($_POST['keyword']);
                    if ($result['resultado']) {
                        $criteria = $result['datos'];
                    } else {
                        $criteria = '';
                    }
                }

                $position = (($page_number - 1) * $item_per_page);
                $limit = $item_per_page;
                $arrArgument = array(
            'column' => 'prod_name',
            'like' => $criteria,
            'position' => $position,
            'limit' => $limit,
        );
                set_error_handler('ErrorHandler');
                try {
                    $resultado = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'select_like_limit_products', $arrArgument);
                } catch (Exception $e) {
                    /* paint_template_error("ERROR BD");
              die(); */

            showErrorPage(0, 'ERROR - 503 BD Unavailable', 503);
                }
                restore_error_handler();

                if ($resultado) {
                    paint_template_products($resultado);
                } else {
                    //paint_template_error("NO PRODUCTS");
            showErrorPage(0, 'ERROR - 404 NO PRODUCTS', 404);
                }
            }
        }

        public function num_pages()
        {
            if ((isset($_POST['num_pages'])) && ($_POST['num_pages'] === 'true')) {
                //filtrar $_POST["keyword"]
                    if (isset($_POST['keyword'])) {
                        $result = filter_string($_POST['keyword']);
                        if ($result['resultado']) {
                            $criteria = $result['datos'];
                        } else {
                            $criteria = ' ';
                        }
                    } else {
                        $criteria = ' ';
                    }
                $item_per_page = 3;
                set_error_handler('ErrorHandler');
                try {
                    if (isset($_POST['keyword'])) {
                        //loadmodel
                        $arrArgument = array(
                            'column' => 'prod_name',
                            'like' => $criteria,
                        );
                        $resultado = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'count_like_products', $arrArgument);
                    } else {
                        $resultado = loadModel(MODEL_PRODUCTS_PATH, 'products_model', 'count_products', '');
                    }
                    $resultado = $resultado[0]['total'];
                    $pages = ceil($resultado / $item_per_page); //break total records into pages
                } catch (Exception $e) {
                    showErrorPage(2, 'ERROR - 503 BD', 'HTTP/1.0 503 Service Unavailable', 503);
                }
                restore_error_handler();

                if ($resultado) {
                    $jsondata['pages'] = $pages;
                    echo json_encode($jsondata);
                    exit;
                } else {
                    //if($get_total_rows){ //que lance error si no hay productos
                        showErrorPage(2, 'ERROR - 404 NO DATA', 'HTTP/1.0 404 Not Found', 404);
                }
            }
        }
    }
