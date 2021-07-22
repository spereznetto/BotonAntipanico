<?php

/**
 * @author      Agustín Ronco
 * @license     http://mit-license.org/
 */

require_once "RestSession.php";
require_once "RestIO.php";

class Rest extends CComponent
{
    public $time = 3600;
    //public $time = 5;
    public $io = null;
    public $session = null;

    public function init()
    {
        $this->io = new RestIO();
        $this->session = new RestSession();
        $this->session->time = $this->time;
    }

    public function send($data = [], $status = 200, $code = null, $info = null, $secure = true)
    {
        $session = $this->getSessionGlobal();
        if ($session === null && $secure == true)
            throw new SessionNotStoredException("Sesion no encontrada");

        $token = $this->getTokenGlobal();
        if ($token === null && $secure == true)
            $token = $this->session->regenerateToken($session);

        $response = [];
        if ($secure == true)
            $response['token'] = $token;

        if (!empty($data))
            $response['data'] = $data;

        $this->unsetSessionGlobal();
        $this->unsetTokenGlobal();

        if (empty($code) && $status == 200)
            $code = 1;
        else if (empty($code))
            $code = $status;

        $this->io->response($response, $status, $code, $info);
    }

    public function read($secure = true)
    {
        $this->unsetSessionGlobal();

        $request = $this->io->getBodyInfo();

        if ($secure == false)
            return $request;

        $token = $this->getTokenHeader();
        if (empty($token)) {
            $this->io->response(null, 400);
        }

        try {
            $session = $this->session->validateToken($token);
        } catch (Exception $e) {
            throw $e;
        }

        $this->setSessionGlobal($session);

        $request['rest_session_token'] = $token;
        $request['rest_session_uid'] = $session;

        return $request;
    }

    public function getTokenHeader()
    {
        $headers = apache_request_headers();
        if (empty($headers['Authorization']) || empty(mb_split(" ", $headers['Authorization'])[1])) {
            return null;
        }

        return mb_split(" ", $headers['Authorization'])[1];
    }

    public function authorize($device_uid = null)
    {
        $token = $this->session->generateToken($device_uid);
        $session = $this->session->validateToken($token);
        $this->setSessionGlobal($session);
        $this->setTokenGlobal($token);

        return $session;
    }

    public function reauthorize($session)
    {
        $token = $this->session->regenerateToken($session);
        $this->setSessionGlobal($session);
        $this->setTokenGlobal($token);

        return $session;
    }

    public function deauthorize($session_uid = null)
    {
        if ($session_uid === null && ($session_uid = $this->getSessionGlobal()) === null)
            throw new SessionNotStoredException("Sesion no encontrada");

        try {
            $this->session->deleteToken($session_uid);
        } catch (Exception $e) {
            throw $e;
        }

        $this->unsetSessionGlobal();
        $this->unsetTokenGlobal();
    }

    private function getSessionGlobal()
    {
        return !empty(Yii::app()->session['rest_session_uid']) ? Yii::app()->session['rest_session_uid'] : null;
    }

    private function setSessionGlobal($session)
    {
        Yii::app()->session['rest_session_uid'] = $session;
    }

    private function unsetSessionGlobal()
    {
        if (!empty(Yii::app()->session['rest_session_uid'])) {
            Yii::app()->session['rest_session_uid'] = null;
            unset(Yii::app()->session['rest_session_uid']);
        }
    }

    private function getTokenGlobal()
    {
        return !empty(Yii::app()->session['rest_session_token']) ? Yii::app()->session['rest_session_token'] : null;
    }

    private function setTokenGlobal($token)
    {
        Yii::app()->session['rest_session_token'] = $token;
    }

    private function unsetTokenGlobal()
    {
        if (!empty(Yii::app()->session['rest_session_token'])) {
            Yii::app()->session['rest_session_token'] = null;
            unset(Yii::app()->session['rest_session_token']);
        }
    }
}