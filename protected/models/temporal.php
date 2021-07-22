<?php

/**
 * This is the model class for table "temporal".
 *
 * The followings are the available columns in table 'temporal':
 * @property integer $IdReporte
 * @property string $Temporal_FechaServidor
 * @property string $Temporal_FechaGPS
 * @property string $Temporal_Completo
 * @property string $Temporal_Puerto
 * @property string $Temporal_PC
 * @property string $Temporal_TipoMensaje
 * @property string $Temporal_Evento
 * @property string $Temporal_NumeroMensaje
 * @property string $Temporal_IdDispositivo
 * @property string $Temporal_Modelo
 */
class temporal extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'temporal';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('Temporal_FechaServidor, Temporal_Completo, Temporal_IdDispositivo, Temporal_Modelo', 'required'),
			array('Temporal_Completo', 'length', 'max'=>1000),
			array('Temporal_Puerto', 'length', 'max'=>10),
			array('Temporal_PC, Temporal_TipoMensaje, Temporal_NumeroMensaje, Temporal_Modelo', 'length', 'max'=>45),
			array('Temporal_Evento', 'length', 'max'=>30),
			array('Temporal_IdDispositivo', 'length', 'max'=>20),
			array('Temporal_FechaGPS', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('IdReporte, Temporal_FechaServidor, Temporal_FechaGPS, Temporal_Completo, Temporal_Puerto, Temporal_PC, Temporal_TipoMensaje, Temporal_Evento, Temporal_NumeroMensaje, Temporal_IdDispositivo, Temporal_Modelo', 'safe', 'on'=>'search'),
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
			'IdReporte' => 'Id Reporte',
			'Temporal_FechaServidor' => 'Temporal Fecha Servidor',
			'Temporal_FechaGPS' => 'Temporal Fecha Gps',
			'Temporal_Completo' => 'Temporal Completo',
			'Temporal_Puerto' => 'Temporal Puerto',
			'Temporal_PC' => 'Temporal Pc',
			'Temporal_TipoMensaje' => 'Temporal Tipo Mensaje',
			'Temporal_Evento' => 'Temporal Evento',
			'Temporal_NumeroMensaje' => 'Temporal Numero Mensaje',
			'Temporal_IdDispositivo' => 'Temporal Id Dispositivo',
			'Temporal_Modelo' => 'Temporal Modelo',
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

		$criteria->compare('IdReporte',$this->IdReporte);
		$criteria->compare('Temporal_FechaServidor',$this->Temporal_FechaServidor,true);
		$criteria->compare('Temporal_FechaGPS',$this->Temporal_FechaGPS,true);
		$criteria->compare('Temporal_Completo',$this->Temporal_Completo,true);
		$criteria->compare('Temporal_Puerto',$this->Temporal_Puerto,true);
		$criteria->compare('Temporal_PC',$this->Temporal_PC,true);
		$criteria->compare('Temporal_TipoMensaje',$this->Temporal_TipoMensaje,true);
		$criteria->compare('Temporal_Evento',$this->Temporal_Evento,true);
		$criteria->compare('Temporal_NumeroMensaje',$this->Temporal_NumeroMensaje,true);
		$criteria->compare('Temporal_IdDispositivo',$this->Temporal_IdDispositivo,true);
		$criteria->compare('Temporal_Modelo',$this->Temporal_Modelo,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return temporal the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
