<?php

/**
 * @author      Agustín Ronco
 * @license     http://mit-license.org/
 */


class RestIO
{
    public function response($data = null, $status = 200, $code = null, $info = null)
    {
        http_response_code($status);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 604800');
        header('Access-Control-Allow-Headers: x-requested-with, Content-Type');
        header('Content-type: application/json');

        if ($data !== null && !is_array($data))
            $data = ['extra' => $data];

        if($info === null && $status === 200)
            $info = "Operacion satisfactoria";

        $response = [
            'status' => $status,
            'code' => $code,
            'message' => $this->getStatusCodeMessage($status),
            'info' => $info
        ];

        if($data !== null)
            $response = $response + $data;

        echo CJSON::encode($response);
        Yii::app()->end();
        die;
    }

    public function getStatusCodeMessage($status)
    {
        $codes = array(
            200 => 'OK',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
        );
        return (isset($codes[$status])) ? $codes[$status] : '';
    }

    public function getBodyInfo()
    {
        $body = CJSON::decode(file_get_contents("php://input"));
        return !empty($body) ? $body : [];
    }
}