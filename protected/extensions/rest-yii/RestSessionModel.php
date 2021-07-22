<?php

/**
 * @author      Agustín Ronco
 * @license     http://mit-license.org/
 */

require_once "SessionNotFoundException.php";
require_once "SessionInvalidException.php";
require_once "SessionNotSavedException.php";
require_once "SessionNotStoredException.php";

class RestSessionModel extends CActiveRecord
{
    public static function model($className = __class__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'rest_sessions';
    }

    public function primaryKey()
    {
        return 'session';
    }

    public static function createSession($session_uid, $token, $time, $device_uid = null)
    {
        $session = RestSessionModel::model();

        $session->session = $session_uid;
        $session->token = $token;
        $session->ip = self::getRealIpAddr();
        $session->device = $device_uid;
        $session->expiration = date("Y-m-d H:i:s", $time);
        $session->updated_at = $session->created_at = date("Y-m-d H:i:s");

        $session->setIsNewRecord(true);

        //self::checkOldSessions($device_uid); // Chequeo que no hayan sesiones viejas del dispositivo sin cerrar

        if (!$session->save())
            throw new SessionNotSavedException($session->getErrors());
    }

    public static function validateSession($session_uid, $token)
    {
        $session = RestSessionModel::model()->findByAttributes(['session' => $session_uid, 'deleted_at' => null]);
        if (empty($session))
            throw new SessionNotFoundException("Sesion no activa");

        // Ya no hay un token único por sesión
        // if ($session->token != $token)
        //     throw new SessionInvalidException("Sesion con token invalido");
    }

    public static function updateSession($session_uid, $token, $time, $device_uid = null)
    {
        $session = RestSessionModel::model()->findByAttributes(['session' => $session_uid, 'deleted_at' => null]);
        if (empty($session))
            throw new SessionNotFoundException("Sesion no activa");

        $session->token = $token;
        $session->ip = self::getRealIpAddr();
        $session->expiration = date("Y-m-d H:i:s", $time);
        $session->updated_at = date("Y-m-d H:i:s");

        $session->setIsNewRecord(false);

        if (!$session->save())
            throw new SessionNotSavedException(json_encode($session->getErrors()));
        
        //self::checkOldSessions($device_uid); // Chequeo que no hayan sesiones viejas del dispositivo sin cerrar
    }

    public static function deleteSession($session_uid)
    {
        $session = RestSessionModel::model()->findByAttributes(['session' => $session_uid, 'deleted_at' => null]);
        if (empty($session))
            throw new SessionNotFoundException("Sesion no activa");

        $session->updated_at = $session->deleted_at = date("Y-m-d H:i:s");

        $session->setIsNewRecord(false);

        if (!$session->save())
            throw new SessionNotSavedException(json_encode($session->getErrors()));
    }

    public static function destroySession($session_uid)
    {
        $session = RestSessionModel::model()->findByAttributes(['session' => $session_uid]);
        if (empty($session))
            throw new SessionNotFoundException("Sesion no encontrada");

        $session->setIsNewRecord(false);

        if (!$session->delete())
            throw new SessionNotSavedException(json_encode($session->getErrors()));
    }

    private static function checkOldSessions($device_uid)
    {
        $sessions = RestSessionModel::model()->findAllByAttributes(['device' => $device_uid, 'deleted_at' => null]);

        $today = DateTime::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s"));
        foreach ($sessions as $session) {
            if (!empty($session->expiration) &&
                $today > DateTime::createFromFormat("Y-m-d H:i:s", $session->expiration)) {
                        self::deleteSession($session->session);
                }
        }
    }

    private static function getRealIpAddr()
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
        {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
        {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
}