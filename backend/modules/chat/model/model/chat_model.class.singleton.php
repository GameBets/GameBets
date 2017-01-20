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

    public function getMessages() {
        return $this->bll->getMessages_BLL();
    }

    public function addMessage($arrArgument) {
        return $this->bll->addMessage_BLL($arrArgument);
    }

    public function removeMessages() {
        return $this->bll->removeMessages_BLL();
    }

    public function removeOldMessages() {
        return $this->bll->removeOldMessages_BLL();
    }

    public function getOnline() {
        return $this->bll->getOnline_BLL();
    }

    public function getIpOnline() {
        return $this->bll->getIpOnline_BLL();
    }

    public function updateOnline($arrArgument) {
        return $this->bll->updateOnline_BLL($arrArgument);
    }

    public function clearOffline() {
        return $this->bll->clearOffline_BLL();
    }
}
