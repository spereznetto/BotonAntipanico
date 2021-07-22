<?php

/**
 * This is the model class for table "Alerta".
 *
 * The followings are the available columns in table 'Alerta':
 * @property integer $idAlerta
 * @property integer $AlertaidAsignacion
 * @property string $AlertaFechaDesde
 * @property string $AlertaFechaHasta
 * @property integer $estadoAlerta
 */
class Alerta extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'Alerta';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('AlertaidAsignacion, estadoAlerta', 'required'),
			array('AlertaidAsignacion, estadoAlerta', 'numerical', 'integerOnly'=>true),
			array('AlertaFechaDesde, AlertaFechaHasta', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('idAlerta, AlertaidAsignacion, AlertaFechaDesde, AlertaFechaHasta, estadoAlerta', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'idAlerta' => 'Id Alerta',
			'AlertaidAsignacion' => 'Alertaid Asignacion',
			'AlertaFechaDesde' => 'Alerta Fecha Desde',
			'AlertaFechaHasta' => 'Alerta Fecha Hasta',
			'estadoAlerta' => 'Estado Alerta',
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

		$criteria->compare('idAlerta',$this->idAlerta);
		$criteria->compare('AlertaidAsignacion',$this->AlertaidAsignacion);
		$criteria->compare('AlertaFechaDesde',$this->AlertaFechaDesde,true);
		$criteria->compare('AlertaFechaHasta',$this->AlertaFechaHasta,true);
		$criteria->compare('estadoAlerta',$this->estadoAlerta);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Alerta the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
