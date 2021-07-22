<?php

class WebController extends Controller {

    /**
     * Declares class-based actions.
     */
    public function actions() {
        return array(
            // page action renders "static" pages stored under 'protected/views/site/pages'
            // They can be accessed via: index.php?r=site/page&view=FileName
            'page' => array(
                'class' => 'CViewAction',
            ),
        );
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError() {
        //echo "hola"; die;
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }

    /**
     * Displays the login page
     */
    public function actionLogin() {
        //echo "hola"; die;
        $this->layout = "//layouts/loginLayout";

        $model = new LoginForm;

        // if it is ajax validation request
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'login-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }

        // collect user input data
        if (isset($_POST['LoginForm'])) {
            $model->attributes = $_POST['LoginForm'];

            $cantLogins = !empty(Yii::app()->session['wrongPass']) ? intval(Yii::app()->session['wrongPass']) : 0;
            if ($model->validate() && $model->login()){
                    $this->redirect(Yii::app()->user->returnUrl);
            }
        }
        // display the login form
        $this->render('login', array('model' => $model));
    }

    /**
     * Desconecta la sesion actual del usuario y redirecciona a la pantalla de login.
     */
    public function actionLogout() {
        Yii::app()->user->logout(false);
        $this->redirect(Yii::app()->user->loginUrl);
    }
    
    /**
     * Recibe por GET el hash en md5 que fue generado al momento del registro de usuario y lo compara con el que se encuentra en la
     * base de datos. Si existe, activa el usuario (estado 1) y borra ese hash almacenado.
     */
    
    public function actionRecuperarpassoword() {

        $modelForm = new RecuperaPasswordForm();
        $this->layout = "//layouts/loginLayout";


        if (isset($_POST['RecuperaPasswordForm'])) {

            $model = new Usuarios();
            $model = $model->findByAttributes(array('Usua_Usuario' => $_POST['RecuperaPasswordForm']['usuario']));

            if ($model) {
                $password = rand(10000, 99999);
                $model->Usua_Contrasena = md5($password);

                if ($model->save(false)) {

                     $name = '=?UTF-8?B?' . base64_encode("Sistema de seguimiento gps itego") . '?=';
                     $subject = '=?UTF-8?B?' . base64_encode("Su nueva password - Sistema gps...") . '?=';
                    // $headers = "From: $name <gps@divisiongps.com.ar>\r\n" .
                    //         "Bcc: gps@divisiongps.com.ar" . 
                    //         "Reply-To:gps@divisiongps.com.ar \r\n" .
                    //         "Content-type: text/html; charset=UTF-8";

                    $body = "<h1>Recuperacion de password</h1><br>";
                    $body .="{$model->Usua_Nombre}, este es un mail generado automaticamente por el sistema";
                    $body .="<h2 style='margin-top:30px'>Datos de acceso:</h2><br>";
                    $body .="Usuario: <strong>{$model->Usua_Email}</strong><br>";
                    $body .="Contrasena: <strong>$password</strong><br></br>";
                    $body .="Ingrese con estos datos en el siguiente link:<br>";
                    $url = Yii::app()->createAbsoluteUrl('web/login');
                    $body .= "<a href='$url'>$url</a></br>";
                    $body .="<strong><p>Este es un mail automatico generado por el sistema. No lo responda</p></strong>";

                    // $mail = mail($model->Usua_Emal, $subject, $body, $headers, "-fgps@divisiongps.com.ar");
                    // if($mail) {
                    //     echo "OK";
                    // } else {
                    //     echo "NO";
                    // }
                    //mail($model->Usua_Email, $subject, $body, $headers,"-fgps@divisiongps.com.ar");

                    Yii::import('application.extensions.phpmailer.JPhpMailer');
                    $mail = new JPhpMailer;
                    $mail->IsSMTP();
                    $mail->Host = 'mail2.divisiongps.com.ar';
                    $mail->Port = 587;
                    $mail->SMTPAuth = true;
                    $mail->Username = 'alertas3@divisiongps.com.ar';
                    $mail->Password = 'Power2021';
                    $mail->setLanguage('es');
                    $mail->AddReplyTo('gps@divisiongps.com.ar', 'Sistema de seguimiento gps itego');
                    $mail->SetFrom('gps@divisiongps.com.ar', $name);
                    $mail->Subject = $subject;
                    $mail->AltBody = 'Para ver el mensaje por favor use un cliente compatible con HTML';
                    $mail->CharSet = 'UTF-8';
                    $mail->addBcc("alertas3@divisiongps.com.ar");
                    $mail->MsgHTML($body);
                    $mail->AddAddress($model->Usua_Email, $model->Usua_Nombre);
                    
                  if($mail->send()){  
                    $user = Yii::app()->getComponent('user');
                    $user->setFlash(
                            'success', "Se ha enviado un email con los pasos para recuperar su password a
                            <strong>{$_POST['RecuperaPasswordForm']['usuario']}</strong>"
                    );
                    $this->refresh();
                 }else{
                    $user = Yii::app()->getComponent('user');
                    $user->setFlash(
                            'error', "Error Enviando Correo".$mail->ErrorInfo()
                    );
                    $this->refresh();
                    }
                }
            } else {
                $user = Yii::app()->getComponent('user');
                $user->setFlash(
                        'error', "Usuario o email invalidos. Verifique nuevamente los datos ingresados"
                );
                $this->refresh();
            }
        }
        $this->render('recuperaPassword', array('modelForm' => $modelForm));
    }
    public function actionLinkRecuperarPasswordMobile(){
        $this->layout = "//layouts/recuperarMobile";
        $servicio = $_REQUEST['servicio'];
        $user = $_REQUEST['user'];
        $this->render('link_recuperar_password_mobile', array('servicio' => $servicio, 'user' => $user));
    }
   

}
