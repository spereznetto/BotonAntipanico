<?php

/**
 * This is the model class for table "mensajehistorico".
 *
 * The followings are the available columns in table 'mensajehistorico':
 * @property integer $idMensaje
 * @property integer $MensajeIdTemporal
 * @property integer $MensajetipoMensaje
 * @property integer $MensajeIMEI
 * @property integer $MensajeidAsignacion
 * @property string $MensajeCompleto
 * @property string $Mensajedireccion
 * @property string $MensajeFechaHora
 * @property double $MensajeLatitud
 * @property double $MensajeLongitud
 * @property integer $MensajeAlertaEstado
 */
class mensajehistorico extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'mensajehistorico';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('MensajeIdTemporal, MensajetipoMensaje, MensajeIMEI, MensajeidAsignacion, MensajeCompleto', 'required'),
			array('MensajeIdTemporal, MensajetipoMensaje, MensajeIMEI, MensajeidAsignacion, MensajeAlertaEstado, MensajeNivelBateria', 'numerical', 'integerOnly'=>true),
			array('MensajeLatitud, MensajeLongitud', 'numerical'),
			array('MensajeCompleto, Mensajedireccion', 'length', 'max'=>100),
			array('MensajeFechaHora', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('idMensaje, MensajeIdTemporal, MensajetipoMensaje, MensajeIMEI, MensajeidAsignacion, MensajeCompleto, Mensajedireccion, MensajeFechaHora, MensajeLatitud, MensajeLongitud, MensajeAlertaEstado, MensajeNivelBateria', 'safe', 'on'=>'search'),
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
			'idMensaje' => 'Id Mensaje',
			'MensajeIdTemporal' => 'Mensaje Id Temporal',
			'MensajetipoMensaje' => 'Mensajetipo Mensaje',
			'MensajeIMEI' => 'Mensaje Imei',
			'MensajeidAsignacion' => 'Mensajeid Asignacion',
			'MensajeCompleto' => 'Mensaje Completo',
			'Mensajedireccion' => 'direccion',
			'MensajeFechaHora' => ' Fecha Hora',
			'MensajeLatitud' => ' Latitud',
			'MensajeLongitud' => ' Longitud',
			'MensajeAlertaEstado' => ' Alerta Estado',
			'MensajeNivelBateria' => 'Nivel Bateria',
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

		$criteria->compare('idMensaje',$this->idMensaje);
		$criteria->compare('MensajeIdTemporal',$this->MensajeIdTemporal);
		$criteria->compare('MensajetipoMensaje',$this->MensajetipoMensaje);
		$criteria->compare('MensajeIMEI',$this->MensajeIMEI);
		$criteria->compare('MensajeidAsignacion',$this->MensajeidAsignacion);
		$criteria->compare('MensajeCompleto',$this->MensajeCompleto,true);
		$criteria->compare('Mensajedireccion',$this->Mensajedireccion,true);
		$criteria->compare('MensajeFechaHora',$this->MensajeFechaHora,true);
		$criteria->compare('MensajeLatitud',$this->MensajeLatitud);
		$criteria->compare('MensajeLongitud',$this->MensajeLongitud);
		$criteria->compare('MensajeAlertaEstado',$this->MensajeAlertaEstado);
		$criteria->compare('MensajeNivelBateria',$this->MensajeNivelBateria);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return mensajehistorico the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function obtenerPosiciones($idDispMovil = null,$datos = null) {
		
		if ($datos['desde'] != '') {
			$hoy = $datos['hasta'];
			$unasemana =  $datos['desde']; 
	  
		}else{
			  $hoy = date("Y-m-d H:i:s");
			  $unasemana =  date('Y-m-d H:i:s', strtotime($hoy . ' -31 day')); 
			}	
			
		  // Aca el sql de un solo movil
		  $sql = "SELECT idMensaje,MensajeIdTemporal,MensajetipoMensaje,MensajeIMEI,UsuarioFinalNombre,MensajeFechaHora,
		   MensajeLatitud,MensajeLongitud, MensajeNivelBateria
		  FROM mensajehistorico a
		  INNER JOIN asigaciondipositivousuario b ON a.MensajeIMEI = b.AsignacionIMEI AND asignacionfechabaja IS NULL
		  INNER JOIN usuariofinal c ON c.idUsuarioFinal = b.AsignacionIdUsuarioFinal 
		  WHERE MensajeFechaHora >= '".$unasemana."' AND MensajeFechaHora <= '".$hoy."' 
		  ORDER BY MensajeFechaHora DESC";


		 // echo $sql;
		  //die;
		  $consulta = Yii::app()->db->createCommand($sql)->queryAll();
		  return $consulta;
	}	

	public function verUltimasPosiciones($datos = null) {
		
		if ($datos['desde'] != '') {
			$hoy = $datos['hasta'];
			$unasemana =  $datos['desde']; 
	  
		}else{
			  $hoy = date("Y-m-d H:i:s");
			  $unasemana =  date('Y-m-d H:i:s', strtotime($hoy . ' -31 day')); 
			}	
			
		  // Aca el sql de un solo movil
		  $sql = "SELECT idreporte,temporal_fechaservidor,temporal_fechagps,temporal_Completo,
		  temporal_puerto,temporal_evento,Temporal_IdDispositivo, temporal_modelo
		  FROM temporal_9001 
		  WHERE temporal_fechaservidor >= '".$unasemana."' AND temporal_fechaservidor <= '".$hoy."' 
		  ORDER BY idreporte DESC";


		 // echo $sql;
		  //die;
		  $consulta = Yii::app()->db->createCommand($sql)->queryAll();
		  return $consulta;
	}		  	  
}
