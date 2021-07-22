<?php

/**
 * This is the model class for table "agente".
 *
 * The followings are the available columns in table 'agente':
 * @property integer $idAgente
 * @property string $AgenteNombre
 * @property integer $AgenteTelefono
 */
class Agente extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'agente';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('AgenteTelefono', 'numerical', 'integerOnly'=>true),
			array('AgenteNombre', 'length', 'max'=>30),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('idAgente, AgenteNombre, AgenteTelefono', 'safe', 'on'=>'search'),
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
			'idAgente' => 'Id Agente',
			'AgenteNombre' => 'Agente Nombre',
			'AgenteTelefono' => 'Agente Telefono',
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

		$criteria->compare('idAgente',$this->idAgente);
		$criteria->compare('AgenteNombre',$this->AgenteNombre,true);
		$criteria->compare('AgenteTelefono',$this->AgenteTelefono);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return agente the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
