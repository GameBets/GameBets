<?php

class controller_chat{

    public function __construct() {
        $_SESSION['module'] = "chat";
    }

    public function listAction() {
        $this->setHeader(array('Content-Type' => 'application/json'));
        $messages = $this->getModel()->getMessages();
        foreach($messages as &$message) {
            $message->me = $this->getServer('REMOTE_ADDR') === $message->ip;
        }
        return json_encode($messages);
    }

    public function saveAction() {
        $username = $this->getPost('username');
        $message = $this->getPost('message');
        $ip = $this->getServer('REMOTE_ADDR');
        $this->setCookie('username', $username, 9999 * 9999);
        $result = array('success' => false);
        if ($username && $message) {
            $cleanUsername = preg_replace('/^'.ADMIN_USERNAME_PREFIX.'/', '', $username);
            $result = array(
                'success' => $this->getModel()->addMessage($cleanUsername, $message, $ip)
            );
        }
        if ($this->_isAdmin($username)) {
            $this->_parseAdminCommand($message);
        }
        $this->setHeader(array('Content-Type' => 'application/json'));
        return json_encode($result);
    }

    public function pingAction() {
        $ip = $this->getServer('REMOTE_ADDR');
        $hash = $this->_getMyUniqueHash();
        $this->getModel()->updateOnline($hash, $ip);
        $this->getModel()->clearOffline();
        $this->getModel()->removeOldMessages();
        $onlines = $this->getModel()->getOnline();
        $this->setHeader(array('Content-Type' => 'application/json'));
        return json_encode($onlines);
    }
}
