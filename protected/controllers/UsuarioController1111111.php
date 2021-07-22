<?php

class UsuarioController extends Controller
{
	
	public $defaultAction = 'datos';
	
	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
				'accessControl',
		);
	}
	
	/**
	 * Especifica las reglas de acceso para el controlador segun el tipo de usuario.
	 * Este metodo es utilizado por el 'accessControl' del metodo filter.
	 *
	 */
	public function accessRules()
	{
		if((Yii::app()->user->getState('type') =="ADMINISTRADOR")||(Yii::app()->user->getState('type') =="OPERADOR")||(Yii::app()->user->getState('type') =="CLIENTE")|| (Yii::app()->user->getState('type') =="FLOTA")){
			$permisos =array('datos','cambiarcontrasena');   // acceso a todos los action para los usuarios administradores
		}
		else{
			$permisos = array('');	//Si no es un usuario logueado, devuelve el array vacio de manera que no deje utilizar ninguna accion
		}
	
		return array(
				array('allow',
						'actions'=>$permisos,	//Acciones permitidas a el usuario logueado
						'users'=>array('@'),
				),
				array('deny',  // deny all users
						'users'=>array('*'),
				),
		);
	}

	/**
	 * Metodo que renderiza un formulario donde el usuario logueado puede ver sus datos y realizar un cambio de contrase�a.
	 * Menu disponible para cualquier tipo de usuario.
	 */
	
	public function actionDatos(){
	
		$model = new Usuarios();
		$model = $model->findByAttributes(array('Usua_Usuario'=>Yii::app()->user->name,'Usua_Email'=>Yii::app()->user->getState('email')));
		
		if (isset($_POST['Usuarios'])){
			$model->attributes=$_POST['Usuarios'];
			
			if ($_POST['Usuarios']['Usua_Telefono']!=$model->Usua_Telefono) {
				$model->Usua_Telefono = $_POST['Usuarios']['Usua_Telefono'];
			}	
			
			if ($model->save(false)) {
				$user = Yii::app()->getComponent('user');
				$user->setFlash(
						'success',
						"Datos actualizado correctamente!"
				);
				$this->refresh();
			}
			else{
				$user = Yii::app()->getComponent('user');
				$user->setFlash(
						'error',
						"Se produjo un error al guardar los cambios. Intentelo nuevamente"
				);
				$this->refresh();
			}
		}
		else{
			if ($model) {
				$this->render('datos',array('model'=>$model));
			}			
			
		}

	}
	
	/**
	 * Action que renderiza el formulario de cambio de contrase�a, y la cambia en caso de existir el cambio.
	 * Al actualizarlo envia un mail con los nuevos datos. 
	 */
	
	public function actionCambiarcontrasena(){
		
		$model = new CambioPasswordForm();
		
		if(isset($_POST['ajax']) && $_POST['ajax']==='datos-usuario-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
		
		if(isset($_POST['CambioPasswordForm']))
		{
			$model->attributes=$_POST['CambioPasswordForm'];
			
			// Validar input del usuario y cambiar contrase�a.
			if($model->validate() && $model->changePassword())
			{
				$email = Yii::app()->user->getState('email');
				$user = Yii::app()->user->getState('nombre');
				
				$name='=?UTF-8?B?'.base64_encode("Sistema GPS ").'?=';
				$subject='=?UTF-8?B?'.base64_encode("Cambio de password - Sistema gps...").'?=';
				$headers="From: $name <gps@divisiongps.com.ar>\r\n".
                                        "Bcc: gps@divisiongps.com.ar" . 
						"Reply-To:gps@divisiongps.com.ar \r\n".
						"Content-type: text/html; charset=UTF-8";
				$body = "<h4>Nuevo password</h4><br>";
				$body .="$user, este es un mail generado automaticamente por el sistema GPS.";
				$body .="<h2 style='margin-top:30px'>Datos de acceso:</h2><br>";
				$body .="Usuario: <strong>$email</strong><br>";
				$body .="Contrasena: <strong>{$_POST['CambioPasswordForm']['newPassword']}</strong><br></br>";
				$body .="Ingrese con los datos sumistrados en el link:<br>";
				$url = Yii::app()->createAbsoluteUrl('web/login');
				$body .= "<a href='$url'>$url</a></br>";
				$body .="<strong><p>Este es un mail automatico generado por el sistema. No lo responda</p></strong>";
				
				//echo $email." ---  ".$subject." ---  ".$body." ---  ".$headers;
				//die;
				
				mail($email,$subject,$body,$headers);
				
				$user = Yii::app()->getComponent('user');
				$user->setFlash(
						'success',
						"Su password fue cambiado correctamente!"
				);
				$this->refresh();
			}
		}
		$this->render('cambioPassword',array('model'=>$model));
	}
	
}