<?php

/**
 * This is the model class for table "usuariosistema".
 *
 * The followings are the available columns in table 'usuariosistema':
 * @property integer $idUsuario
 * @property integer $UsuarioTipoUsuario
 * @property string $UsuarioEmail
 * @property string $UsuarioNombre
 * @property string $UsuarioContrasena
 * @property integer $UsuarioEstadousuario
 */
class UsuarioSistema extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'usuariosistema';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('UsuariootipoUsuario, UsuarioEmail, UsuarioEstadousuario', 'required'),
			array('UsuarioTipoUsuario, UsuarioEstadousuario', 'numerical', 'integerOnly'=>true),
			array('UsuarioEmail, UsuarioNombre', 'length', 'max'=>30),
			array('UsuarioContrasena', 'length', 'max'=>32),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('idUsuario, UsuarioTipoUsuario, UsuarioEmail, UsuarioNombre, UsuarioContrasena, UsuarioEstadousuario', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'UsuarioTipoUsuario' => array(self::BELONGS_TO, 'TipoUsuario', 'idTipoUsuario'),
			'UsuarioEstadousuario' => array(self::BELONGS_TO, 'EstadosUsuario', 'idEstadoUsuario'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'idUsuario' => 'Id Usuario',
			'UsuarioTipoUsuario' => 'Tipo Usuario',
			'UsuarioEmail' => 'Usuario Email',
			'UsuarioNombre' => 'Usuario Nombre',
			'UsuarioContrasena' => 'Usuario Contrasena',
			'UsuarioEstadousuario' => 'Usuario Estadousuario',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('idUsuario',$this->idUsuario);
		$criteria->compare('UsuarioTipoUsuario',$this->UsuarioTipoUsuario);
		$criteria->compare('UsuarioEmail',$this->UsuarioEmail,true);
		$criteria->compare('UsuarioNombre',$this->UsuarioNombre,true);
		$criteria->compare('UsuarioContrasena',$this->UsuarioContrasena,true);
		$criteria->compare('UsuarioEstadousuario',$this->UsuarioEstadousuario);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return usuariosistema the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
