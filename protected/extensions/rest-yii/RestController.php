<?php

use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\ExpiredException;

/**
 * @author      Agustín Ronco
 * @license     http://mit-license.org/
 */

class RestController extends CController
{
    protected function beforeAction($action)
    {
        if (Yii::app()->request->getRequestType() == 'OPTIONS') {
            $this->restPreflight();
        }

        return true;
    }

    protected function restPreflight()
    {
        http_response_code(200);
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
        header("Access-Control-Allow-Headers: Authorization, Content-Type");
        header('Content-type: application/json');
        Yii::app()->end();
        die;
    }

    public function read($secure = true)
    {
        $request = null;
        try {
            $request = Yii::app()->rest->read($secure);
        } catch (SessionNotFoundException $e) {
            $this->status(401, 41, "Sesion no activa");
        } catch (ExpiredException $e) {
            $this->status(401, 61, "Token expirado");
        } catch (UnexpectedValueException $e) {
            $this->status(401, 63, "Token incorrecto");
        } catch (SignatureInvalidException $e) {
            $this->status(401, 62, "Token invalido");
        } catch (Exception $e) {
            $this->status(500, 99, $e->getMessage());
        }

        return $request;
    }

    public function send($data = [], $status = 200, $code = null, $info = null, $secure = true)
    {
        try {
            Yii::app()->rest->send($data, $status, $code, $info, $secure);
        } catch (SessionNotStoredException $e) {
            Yii::app()->rest->send(null, 500, 42, "Sesion no encontrada", false);
        } catch (Exception $e) {
            Yii::app()->rest->send(null, 500, 99, $e->getMessage(), false);
        }
    }

    public function status($status = 200, $code = null, $info = null, $secure = false)
    {
        try {
            Yii::app()->rest->send(null, $status, $code, $info, $secure);
        } catch (SessionNotStoredException $e) {
            Yii::app()->rest->send(null, 500, 42, "Sesion no encontrada", false);
        } catch (Exception $e) {
            Yii::app()->rest->send(null, 500, 99, $e->getMessage(), false);
        }
    }

    public function authorize($device_uid = null)
    {
        try {
            return Yii::app()->rest->authorize($device_uid);
        } catch (SessionNotSavedException $e) {
            $this->status(500, 44, "Error guardando sesion");
        } catch (Exception $e) {
            $this->status(500, 99, $e->getMessage());
        }
    }

    public function reauthorize($token)
    {
        try {
            $session_uid = Yii::app()->rest->session->getExpiredSession($token);
            return Yii::app()->rest->reauthorize($session_uid);
        } catch (SessionNotFoundException $e) {
            $this->status(401, 41, "Sesion no activa");
        } catch (SessionNotSavedException $e) {
            $this->status(500, 44, "Error guardando sesion");
        } catch (Exception $e) {
            $this->status(500, 99, $e->getMessage());
        }
    }

    public function logout($session_uid = null)
    {
        try {
            Yii::app()->rest->deauthorize($session_uid);
        } catch (SessionNotStoredException $e) {
            $this->status(500, 42, "Sesion no encontrada");
        } catch (Exception $e) {
            $this->status(500, 99, $e->getMessage());
        }
    }

    public function formatUpper($str)
    {
        if(empty($str))
            return null;
            
        return mb_strtoupper(utf8_encode(
            strtr(
                utf8_decode(trim($str)),
                utf8_decode('àáâãäçèéêëìíîïòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝ'),
                'aaaaaceeeeiiiiooooouuuuyyAAAAACEEEEIIIIOOOOOUUUUY'
            )
        ));
    }

}