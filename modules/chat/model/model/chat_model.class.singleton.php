<?php

class chat_model
{
    private $bll;
    public static $_instance;

    private function __construct()
    {
        $this->bll = chat_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function checkLogged()
    {
        return $this->bll->checkLogged_BLL();
    }

    public function obtain_gravatar($user)
    {
        return $this->bll->obtain_gravatar_BLL($user);
    }
    public function delete_chats_low_than_10min()
    {
        return $this->bll->delete_chats_low_than_10min_BLL();
    }
    public function get_users_online()
    {
        return $this->bll->get_users_online_BLL();
    }
}
