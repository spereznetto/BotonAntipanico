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
			array('estadoAlerta', 'required'),
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

	public function obternerAlertas($datos = null) {
		
		if ($datos['desde'] != '') {
			$hoy = $datos['hasta'];
			$unasemana =  $datos['desde']; 
	  
		}else{
			  $hoy = date("Y-m-d H:i:s");
			  $unasemana =  date('Y-m-d H:i:s', strtotime($hoy . ' -31 day')); 
			}	
			
		  // Aca el sql de un solo movil
		  $sql = "
		  SELECT idAlerta,UsuarioFinalNombre,AlertaFechaDesde,AlertaFechaHasta,IMEI,e.Descripcion AS AlertaEstado, 
		  f.descripcion AS tipoDispositivo,
		  (SELECT MensajeLatitud FROM mensajehistorico h WHERE h.MensajeIMEI = d.IMEI ORDER BY idMensaje DESC LIMIT 1) AS AlertaLatitud,
		   (SELECT MensajeLongitud FROM mensajehistorico h WHERE h.MensajeIMEI = d.IMEI ORDER BY idMensaje DESC LIMIT 1) AS AlertaLongitud
		

					FROM alerta a
					LEFT JOIN asigaciondipositivousuario b ON b.idAsignacion = a.AlertaidAsignacion AND b.asignacionfechabaja IS NULL
					LEFT JOIN usuariofinal c ON c.idUsuarioFinal = b.AsignacionIdUsuarioFinal 
					LEFT JOIN dispositivo d ON d.IMEI = b.AsignacionIMEI 
					LEFT JOIN estadoalerta e ON e.idEstadoAlerta = a.estadoAlerta
					LEFT JOIN tipodispositivo f ON d.tipoDispositivo = f.idtipoDispositivo 
		  WHERE AlertaFechaDesde >= '".$unasemana."' AND AlertaFechaDesde <= '".$hoy."' 
		  ORDER BY AlertaFechaDesde DESC";


		 // echo $sql;
		  //die;
		  $consulta = Yii::app()->db->createCommand($sql)->queryAll();
		  return $consulta;
	}		  
	public function envioSMS($idAlerta = null) {
			
		  // Aca el sql de un solo movil
		  $sql = "
		  SELECT UsuarioFinalNombre,UsuarioFinalTelefono
					FROM alerta a
					LEFT JOIN asigaciondipositivousuario b ON b.idAsignacion = a.AlertaidAsignacion AND b.asignacionfechabaja IS NULL
					LEFT JOIN usuariofinal c ON c.idUsuarioFinal = b.AsignacionIdUsuarioFinal 
					WHERE idAlerta = '".$idAlerta."'";


		 // echo $sql;
		  //die;
		  $consulta = Yii::app()->db->createCommand($sql)->queryAll();
		  return $consulta;
	}		 

	public function alertultpos($idAlerta = null) {
			
		// Aca el sql de un solo movil
		$sql = "SELECT MensajeLatitud,MensajeLongitud
	FROM mensajehistorico a
	INNER JOIN asigaciondipositivousuario b ON a.MensajeIMEI = b.AsignacionIMEI
	INNER JOIN usuariofinal c ON c.idUsuarioFinal = b.AsignacionIdUsuarioFinal AND asignacionfechabaja IS NULL
	INNER JOIN alerta d ON d.AlertaidAsignacion = b.idAsignacion
	INNER JOIN estadoalerta e ON e.idEstadoAlerta = d.estadoAlerta
	WHERE idAlerta = '".$idAlerta."' AND MensajetipoMensaje = 'ALARMA'
	ORDER BY idMensaje DESC limit 1";
		


	   // echo $sql;
		//die;
		$consulta = Yii::app()->db->createCommand($sql)->queryAll();
		return $consulta;
  }

}
