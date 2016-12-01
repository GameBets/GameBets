<?php
class chat_model {

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

    public function checkLogged() {
        return $this->bll->checkLogged_BLL();
    }

    public function obtain_gravatar($user) {
        return $this->bll->obtain_gravatar_BLL($user);
    }
}
