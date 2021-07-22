<?php

class ServerCelularController extends Controller
{

    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    /**
     * Especifica las reglas de acceso para el controlador segun el tipo de usuario.
     * Este metodo es utilizado por el 'accessControl' del metodo filter.
     *
     */
    public function accessRules()
    {
        if ((Yii::app()->user->getState('type') == "ADMINISTRADOR") || (Yii::app()->user->getState('type') == "OPERADOR") || (Yii::app()->user->getState('type') == "ADMINISTRATIVO")) {
            $permisos = array('admin', 'update', 'create', 'delete');   // acceso a todos los action para los usuarios administradores
        } else {
            $permisos = array(''); //Si no es un usuario logueado, devuelve el array vacio de manera que no deje utilizar ninguna accion
        }

        return array(
            array('allow',
                'actions' => $permisos, //Acciones permitidas a el usuario logueado
                'users' => array('@'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    public function actionAdmin()
    {
        $array = [];
        foreach (ServerCelular::model()->findAll() as $model) {
            $movil = AsignacionDispositivo::model()->find("AsigDisp_IdDispositivo='$model->ServerIdDisp' AND AsigDisp_Estado=1 AND AsigDisp_FechaBaja IS NULL")->asigDispIdMovil;
            $array[$model->IdServer] = [
                'idServer' => $model->IdServer,
                'movilId' => $movil->IdMovil,
                'movilDominio' => $movil->Movil_Dominio,
                'disp' => $model->ServerIdDisp,
                'dispID' => $model->serverIdDisp->Disp_ID,
                'host' => $model->ServerHost,
                'port' => $model->ServerPort,
                'fecha' => $model->ServerFecha
            ];
        }

        $data = new CArrayDataProvider($array, [
            'id' => 'idServer',
            'sort' => array(
                'attributes' => array(
                    'id', 'movilDominio', 'dispID', 'host', 'port', 'fecha'
                ),
            ),
            'pagination' => array(
                'pageSize' => 20,
            ),
        ]);

        $this->render('admin', ['data' => $data]);
    }

    public function actionCreate()
    {
        $model = new ServerCelular;

        if (isset($_POST['ServerCelular'])) {
            $model->attributes = $_POST['ServerCelular'];
            $model->ServerFecha = date("Y-m-d H:i:s");
            if ($model->save())
                $this->redirect(array('admin'));
        }

        $this->render('create', [
            'model' => $model
        ]);
    }

    public function actionUpdate($id)
    {
        $model = $this->loadModel($id);

        if (isset($_POST['ServerCelular'])) {
            $model->attributes = $_POST['ServerCelular'];
            $model->ServerFecha = date("Y-m-d H:i:s");
            if ($model->save()) {
                $this->enviarPushServer($model->ServerIdDisp);
                $this->redirect(array('admin'));
            }
        }

        $this->render('update', [
            'model' => $model
        ]);
    }

    public function actionDelete($id)
    {
        $this->loadModel($id)->delete();
    }

    public function loadModel($id)
    {
        $model = ServerCelular::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    private function enviarPushServer($dispositivo)
    {
        $apiKey = 'AAAA_7pnVhk:APA91bEec9mwpqWeyQaOPuUOem7dTeeLxg9xkXhyiyPdLPA0dleHlKsWB3xR72D2P6Zvgh8nUW6_4DyqFVlkgcUTysHYomiS3kx6_owgrruaNUTvNeDcKFbV7088yJQXC3sDlf7V4e4l';

        $server = ServerCelular::model()->find("ServerIdDisp='$dispositivo'");
        if (empty($dispositivo)) {
            echo "configuración no encontrada";
            die;
        }

        $post = [
            'to' => $server->ServerKeyFCM,
            'data' => ['cmd'=>'CMD_ACTUALIZAR_HOST_PORT', 'host' => $server->ServerHost, 'port' => $server->ServerPort],
        ];

        $headers = [
            'Authorization: key=' . $apiKey,
            'Content-Type: application/json'
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
        $result = curl_exec($ch);

        if (curl_errno($ch)) {
            echo 'GCM error: ' . curl_error($ch);
            die;
        }

        curl_close($ch);

        //print_r($post);
        //echo $result;
        //die;
    }
}
