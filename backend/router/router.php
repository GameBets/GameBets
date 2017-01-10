<?php
	require_once("paths.php");
	require_once("autoload.php");

	include(LOG_DIR);
	include(UTILS_PATH . "common.inc.php");
	include(UTILS_PATH . "filters.inc.php");
	include(UTILS_PATH . "response_code.inc.php");
	include(UTILS_PATH . "utils.inc.php");
	include(UTILS_PATH . "mail.inc.php");

	if(PRODUCTION){ //estamos en producción
		ini_set('display_errors', '1');
		ini_set('error_reporting', E_ERROR | E_WARNING | E_NOTICE); //error_reporting(E_ALL) ;
	}else{
		ini_set('display_errors', '0');
		ini_set('error_reporting', '0'); //error_reporting(0);
	}


	session_start();
	$_SESSION['module'] = "";

	$filter = inputfilter::getInstance();
	$_POST = json_decode(file_get_contents('php://input'), true);
	$_POST = $filter->process($_POST);
	$_GET = $filter->process($_GET);

	function handlerRouter() {
	    if (!empty($_GET['module'])) {
			$URI_module = $_GET['module'];
		} else {
			$URI_module = 'main';
		}

		if (!empty($_GET['function'])) {
			$URI_function = $_GET['function'];
		} else {
			$URI_function = 'begin';
		}

	    handlerModule($URI_module, $URI_function);
	}

	function handlerModule($URI_module, $URI_function) {
	    $modules = simplexml_load_file('resources/modules.xml');
	    $exist = false;

	    foreach ($modules->module as $module) {
	        if (($URI_module === (String)$module->uri)) {
	            $exist = true;

	            $path = MODULES_PATH . $URI_module."/controller/controller_".$URI_module.".class.php";
								if (file_exists($path)) {
									require_once($path);

									$controllerClass = "controller_" . $URI_module;

									$obj = new $controllerClass;
								} else {
									showErrorPage(4, "", 'HTTP/1.0 400 Bad Request', 400);
								}
	            handlerfunction(((String)$module->name), $obj, $URI_function);
	            break;
	        }
	    }
	    if (!$exist) {
	        //die($URI_module . ' - Controlador no encontrado');
	        showErrorPage(4, "", 'HTTP/1.0 400 Bad Request', 400);
	    }
	}

	function handlerFunction($module, $obj, $URI_function) {
	    $functions = simplexml_load_file(MODULES_PATH . $module. "/resources/functions.xml");
	    $exist = false;

	    foreach ($functions->function as $function) {
	        if (($URI_function === (String)$function->uri)) {
	            $exist = true;
	            $event = (String) $function->name;
	            break;
	        }
	    }
	    if (!$exist) {
	        //die($URI_function . ' - Funci&oacute;n no encontrada');
	        showErrorPage(4, "", 'HTTP/1.0 400 Bad Request', 400);
	    } else {
	    	//$obj->$event();
			call_user_func(array($obj,$event));
	    }
	}

	handlerRouter();
