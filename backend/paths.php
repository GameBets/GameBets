<?php
  //SITE ROOT
  $path = $_SERVER['DOCUMENT_ROOT'] . '/Gamebets/backend/';
  define('SITE_ROOT', $path);

  //SITE PATH
  define('SITE_PATH', 'http://'.$_SERVER['HTTP_HOST'].'/Gamebets/backend/');

  //LOG
  define('LOG_DIR', SITE_ROOT . 'classes/Log.class.singleton.php');
  define('GENERAL_LOG_DIR', $path . 'log/general/Site_General_errors.log');
  define('PRODUCTS_LOG_DIR', $path . 'log/products/Site_Products_errors.log');

  //PRODUCTION
  define('PRODUCTION', true);

  //PRETTY URL
  define('URL_AMIGABLES', true);

  //LIBS
  define('LIBS', SITE_ROOT . 'libs/');

  //MODEL
  define('MODEL_PATH', SITE_ROOT . 'model/');

  //RESOURCES
  define('RESOURCES_PATH', SITE_ROOT . 'resources/');

  //MEDIA
  define('MEDIA_PATH', SITE_ROOT . 'media/');

  //UTILS
  define('UTILS_PATH', SITE_ROOT . 'utils/');

  //VIEW
  define('CSS_PATH', SITE_PATH . 'view/css/');
  define('JS_PATH', SITE_PATH . 'view/js/');
  define('INC_PATH', SITE_ROOT . 'view/inc/');
  define('IMAGES_PATH', SITE_PATH . 'view/images/');

  //MODULES
  define('MODULES_PATH', SITE_ROOT . 'modules/');

  //MODULE USERS
  define('CONTROLLER_USERS_PATH', MODULES_PATH . 'users/controller/');
  define('MODEL_USERS_PATH', MODULES_PATH . 'users/model/model/');
  define('BLL_USERS_PATH', MODULES_PATH . 'users/model/bll/');
  define('DAO_USERS_PATH', MODULES_PATH . 'users/model/dao/');
  define('UTILS_USERS_PATH', MODULES_PATH . 'users/utils/');
  define('JS_USERS_PATH', SITE_PATH . 'modules/users/view/js/');
  define('CSS_USERS_PATH', SITE_PATH . 'modules/users/view/css/');
  define('USERS_IMG_PATH', SITE_PATH . 'modules/users/view/images/');

  //MODULE PRODUCTS
  define('CONTROLLER_PRODUCTS_PATH', MODULES_PATH . 'products/controller/');
  define('MODEL_PRODUCTS_PATH', MODULES_PATH . 'products/model/model/');
  define('BLL_PRODUCTS_PATH', MODULES_PATH . 'products/model/bll/');
  define('DAO_PRODUCTS_PATH', MODULES_PATH . 'products/model/dao/');
  define('UTILS_PRODUCTS_PATH', MODULES_PATH . 'products/utils/');
  define('JS_PRODUCTS_PATH', SITE_PATH . 'modules/products/view/js/');
  define('CSS_PRODUCTS_PATH', SITE_PATH . 'modules/products/view/css/');

  // MODULE CONTACT
  define('CONTACT_JS_PATH', SITE_PATH . 'modules/contact/view/js/');
  define('CONTACT_CSS_PATH', SITE_PATH . 'modules/contact/view/css/');
  define('CONTACT_LIB_PATH', SITE_PATH . 'modules/contact/view/lib/');
  define('CONTACT_IMG_PATH', SITE_PATH . 'modules/contact/view/img/');
  define('CONTACT_VIEW_PATH', 'modules/contact/view/');

  //MODULE CHAT
  define('JS_CHAT_PATH', SITE_PATH . 'modules/chat/view/js/');
  define('CSS_CHAT_PATH', SITE_PATH . 'modules/chat/view/css/');
  define('MODEL_CHAT_PATH', MODULES_PATH . 'chat/model/model/');
  define('CHAT_VIEW_PATH', 'modules/chat/view/');