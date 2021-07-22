<?php

/**
 * This is the model class for table "asigaciondipositivousuario".
 *
 * The followings are the available columns in table 'asigaciondipositivousuario':
 * @property integer $idAsignacion
 * @property string $AsignacionIMEI
 * @property integer $AsignacionIdUsuarioFinal
 * @property string $AsignacionFechaAlta
 */
class AsignacionDispositivoUsuario extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'asigaciondipositivousuario';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('AsignacionIMEI, AsignacionIdUsuarioFinal', 'required'),
			array('AsignacionIdUsuarioFinal', 'numerical', 'integerOnly'=>true),
			array('AsignacionIMEI', 'length', 'max'=>20),
			array('AsignacionFechaAlta', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('idAsignacion, AsignacionIMEI, AsignacionIdUsuarioFinal, AsignacionFechaAlta', 'safe', 'on'=>'search'),
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
			'AsignacionIMEI' => array(self::BELONGS_TO, 'Dispositivo', 'IMEI'),
			'AsignacionIdUsuarioFinal' => array(self::BELONGS_TO, 'UsuarioFinal', 'idUsuarioFinal'),

		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'idAsignacion' => 'Id Asignacion',
			'AsignacionIMEI' => 'Asignacion Imei',
			'AsignacionIdUsuarioFinal' => 'Asignacion Id Usuario Final',
			'AsignacionFechaAlta' => 'Asignacion Fecha Alta',
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

		$criteria->compare('idAsignacion',$this->idAsignacion);
		$criteria->compare('AsignacionIMEI',$this->AsignacionIMEI,true);
		$criteria->compare('AsignacionIdUsuarioFinal',$this->AsignacionIdUsuarioFinal);
		$criteria->compare('AsignacionFechaAlta',$this->AsignacionFechaAlta,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return asignaciondispositivousuario the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
