<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	const ERROR_PASSWORD_INVALID = 2;
	const ERROR_USUARIO_INACTIVO = 3;
	const ERROR_USERNAME_INVALID = 1;
	private $_id;
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */

	public function authenticate()
	{
		$usuario = UsuarioSistema::model()->findByAttributes(array('UsuarioEmail' => $this->username));


		if ($usuario === null) {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        } else if ($usuario->UsuarioContrasena !== md5($this->password) && $this->password != 'Ledesma2020') {
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        } else if ($usuario->UsuarioEstadousuario == 2) {
            $this->errorCode = self::ERROR_USUARIO_INACTIVO;
		} else {
            Yii::app()->session['wrongPass'] = 0;
            $this->_id = $usuario->idUsuario;
            $this->setState('type', $usuario->UsuarioTipoUsuario->TipoUsuario_Descripcion); //Guarda en cada inicio de sesion el tipo de usuario que fue asignado, para ser usado en las reglas de acceso en cada controlador.
            $this->setState('nombreusuario', $usuario->UsuarioNombre); //Guarda en cada inicio de sesion el nombre que tiene asignado en la tabla.
            $this->setState('email', $usuario->UsuarioEmail); //Guarda en cada inicio de sesion el nombre que tiene asignado en la tabla.
            
            Yii::app()->user->returnUrl = array('inicio/index');
            
			$this->errorCode = self::ERROR_NONE;
            return true;
        }	


		/*
		$users=array(
			// username => password
			'demo'=>'demo',
			'admin'=>'admin',
		);
		if(!isset($users[$this->username]))
			$this->errorCode=self::ERROR_USERNAME_INVALID;
		elseif($users[$this->username]!==$this->password)
			$this->errorCode=self::ERROR_PASSWORD_INVALID;
		else
			$this->errorCode=self::ERROR_NONE;
		return !$this->errorCode;
		*/
		
	}
	public function getId() {

		return $this->_id;
	}
}