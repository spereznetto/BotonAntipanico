<?php

/**
 * This is the model class for table "ultima_posicion".
 *
 * The followings are the available columns in table 'ultima_posicion':
 * @property string $IdReporte
 * @property string $Reporte_IdDisp
 * @property string $Reporte_FechaGPS
 * @property string $Reporte_FechaServidor
 * @property integer $Reporte_Velocidad
 * @property integer $Reporte_Rumbo
 * @property string $Reporte_Latitud
 * @property string $Reporte_Longitud
 * @property string $Reporte_Evento
 * @property string $Reporte_Entradas
 * @property string $Reporte_Edad
 * @property string $Reporte_Completo
 * @property string $Reporte_Puerto
 * @property string $Reporte_IP
 */
class UltimaAlerta extends CActiveRecord {

  /**
   * @return string the associated database table name
   */
  public function tableName() {
    return 'mensajehistorico';
  }

  /**
   * @return array validation rules for model attributes.
   */
  public function rules() {
    // NOTE: you should only define rules for those attributes that
    // will receive user inputs.
    return array(
        array('Reporte_Rumbo', 'numerical', 'integerOnly' => true),
        array('Reporte_IdDisp', 'length', 'max' => 30),
        array('Reporte_Latitud, Reporte_Longitud', 'length', 'max' => 50),
        array('Reporte_Evento, Reporte_Entradas', 'length', 'max' => 2),
        array('Reporte_Edad', 'length', 'max' => 4),
        array('Reporte_Completo', 'length', 'max' => 1000),
        array('Reporte_Puerto', 'length', 'max' => 45),
        array('Reporte_FechaGPS, Reporte_FechaServidor', 'safe'),
        // The following rule is used by search().
        // @todo Please remove those attributes that should not be searched.
        array('IdReporte, Reporte_IdDisp, Reporte_FechaGPS, Reporte_FechaServidor, Reporte_Velocidad, Reporte_Rumbo, Reporte_Latitud, Reporte_Longitud, Reporte_Evento, Reporte_Entradas, Reporte_Edad, Reporte_Completo, Reporte_Puerto, Reporte_IP, Reporte_Ignicion, Reporte_Mileage', 'safe', 'on' => 'search'),
    );
  }

  /**
   * @return array relational rules.
   */
  public function relations() {
    // NOTE: you may need to adjust the relation name and the related
    // class name for the relations automatically generated below.
    return array(
    );
  }

  /**
   * @return array customized attribute labels (name=>label)
   */
  public function attributeLabels() {
    return array(
        'IdReporte' => 'Id',
        'Reporte_IdDisp' => 'ID Dispositivo',
        'Reporte_FechaGPS' => 'Fecha Gps',
        'Reporte_FechaServidor' => 'Fecha Servidor',
        'Reporte_Velocidad' => 'Velocidad',
        'Reporte_Rumbo' => 'Rumbo',
        'Reporte_Latitud' => 'Latitud',
        'Reporte_Longitud' => 'Longitud',
        'Reporte_Evento' => 'Evento',
        'Reporte_Entradas' => 'Entradas',
        'Reporte_Edad' => 'Edad dato',
        'Reporte_Completo' => 'Reporte Completo',
        'Reporte_Puerto' => 'Puerto',
        'Reporte_IP' => 'IP',
        'Reporte_Ignicion' => 'Ignicion',
        'Reporte_Mileage' => 'Mileage'
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
  public function search() {
    // @todo Please modify the following code to remove attributes that should not be searched.

    $criteria = new CDbCriteria;

    $criteria->compare('IdReporte', $this->IdReporte, true);
    $criteria->compare('Reporte_IdDisp', $this->Reporte_IdDisp, true);
    $criteria->compare('Reporte_FechaGPS', $this->Reporte_FechaGPS, true);
    $criteria->compare('Reporte_FechaServidor', $this->Reporte_FechaServidor, true);
    $criteria->compare('Reporte_Velocidad', $this->Reporte_Velocidad);
    $criteria->compare('Reporte_Rumbo', $this->Reporte_Rumbo);
    $criteria->compare('Reporte_Latitud', $this->Reporte_Latitud, true);
    $criteria->compare('Reporte_Longitud', $this->Reporte_Longitud, true);
    $criteria->compare('Reporte_Evento', $this->Reporte_Evento, true);
    $criteria->compare('Reporte_Entradas', $this->Reporte_Entradas, true);
    $criteria->compare('Reporte_Edad', $this->Reporte_Edad, true);
    $criteria->compare('Reporte_Completo', $this->Reporte_Completo, true);
    $criteria->compare('Reporte_Puerto', $this->Reporte_Puerto, true);
    $criteria->compare('Reporte_IP', $this->Reporte_IP, true);
    $criteria->compare('Reporte_Ignicion', $this->Reporte_Ignicion, true);

    return new CActiveDataProvider($this, array(
        'criteria' => $criteria,
    ));
  }

  /**
   * @return CDbConnection the database connection used for this class
   */
  public function getDbConnection() {
    return Yii::app()->dbGpsReportes;
  }

  /**
   * Devuelve las ultimas posiciones de todos los moviles del usuario que se encuentra logueado.
   * Si recibe por parametro un numero de ID no nulo, quiere decir que solo devolverá los datos de el movil seleccionado.
   *
   * @return: latitud, longitud, fecha, velocidad, rumbo, dominio, id de dispositivo y src del icono que tiene asignado cada movil.
   */
  public function obternerPosicionesRelacionadas($idDispMovil = null, $usuarioAdmin = false, $usuarioMobile = null) {
      
    if(!empty($usuarioMobile)){
        $idUsuario = $usuarioMobile;
    }else{
        $idUsuario = Yii::app()->user->getId();
    }
    

    if ($idDispMovil != null && $usuarioAdmin == false) {

      // Aca el sql de un solo movil
      $sql = "SELECT c.IdMovil,c.Movil_Dominio,c.Movil_Nombre,c.Movil_Marca,c.Movil_Modelo, c.Movil_Anio,
					 c.Movil_Icono, d.Disp_ID, f.Icono_Azul,f.Icono_Rojo,f.Icono_Verde,f.Icono_Amarillo, e.Reporte_FechaGPS,e.Reporte_Latitud,e.Reporte_Longitud,
					 ROUND(e.Reporte_Velocidad) as Reporte_Velocidad,e.Reporte_Rumbo, case when i.DispConf_Esconder = 1 then 'EVENTO DE SISTEMA' else e.Reporte_EventoDescripcion end as Reporte_EventoDescripcion, e.Reporte_Evento, e.Reporte_FechaServidor, e.Reporte_Ignicion, e.Reporte_Direccion, h.Conductor_Nombre, h.Conductor_Apellido, e.Reporte_Mileage
					FROM gps.asignacion_moviles_usuario AS a
					LEFT JOIN gps.asignacion_dispositivo AS b ON b.AsigDisp_IdMovil = a.IdMovil
					LEFT JOIN gps.moviles AS c ON c.IdMovil = a.IdMovil
					LEFT JOIN gps.dispositivos AS d ON b.AsigDisp_IdDispositivo = d.IdDispositivo
					LEFT JOIN gps_reportes.ultima_posicion AS e ON d.Disp_ID = e.Reporte_IdDisp
					LEFT JOIN gps.iconos AS f ON c.Movil_Icono = f.id
                                        LEFT JOIN gps.asignacion_movil_conductor as g ON a.IdMovil = g.AsignacionMovCond_IdMovil AND AsignacionMovCond_FechaBaja IS NULL
                                        LEFT JOIN gps.conductores as h ON g.AsignacionMovCond_IdConductor = h.IdConductor
                                        LEFT JOIN gps.dispositivos_configuracion as i ON e.Reporte_IdDisp = i.DispConf_DispID and e.Reporte_Evento = i.DispConf_NroEvento
					WHERE a.IdUsuario = $idUsuario AND d.Disp_ID = $idDispMovil AND b.AsigDisp_Estado = 1 AND b.IdAsignacionDispositivo IS NOT NULL ORDER BY c.Movil_Dominio ASC";
    } elseif ($usuarioAdmin == false) { //Si no recibio ningun movil especifico, devuelve todos los del usuario
      $sql = "SELECT distinctrow c.Movil_Dominio, c.IdMovil,c.Movil_Dominio,c.Movil_Nombre,c.Movil_Marca,c.Movil_Modelo, c.Movil_Anio,
					 c.Movil_Icono, d.Disp_ID, f.Icono_Azul,f.Icono_Rojo,f.Icono_Verde,f.Icono_Amarillo, e.Reporte_FechaGPS,e.Reporte_Latitud,e.Reporte_Longitud,
					 ROUND(e.Reporte_Velocidad) as Reporte_Velocidad,e.Reporte_Rumbo, case when l.DispConf_Esconder = 1 then 'EVENTO DE SISTEMA' else e.Reporte_EventoDescripcion end as Reporte_EventoDescripcion, e.Reporte_Evento, e.Reporte_FechaServidor, e.Reporte_Ignicion, e.Reporte_Direccion, h.Conductor_Nombre as Conductor, k.Conductor_Nombre as Conductor2, h.Conductor_Apellido, k.Conductor_Apellido as Conductor2_apellido
					FROM gps.asignacion_moviles_usuario AS a
					LEFT JOIN gps.asignacion_dispositivo AS b ON b.AsigDisp_IdMovil = a.IdMovil and b.AsigDisp_Estado = 1
					LEFT JOIN gps.moviles AS c ON c.IdMovil = a.IdMovil
					LEFT JOIN gps.dispositivos AS d ON b.AsigDisp_IdDispositivo = d.IdDispositivo
					LEFT JOIN gps_reportes.ultima_posicion AS e ON d.Disp_ID = e.Reporte_IdDisp
					LEFT JOIN gps.iconos AS f ON c.Movil_Icono = f.id
                                        LEFT JOIN gps.asignacion_movil_conductor as g ON a.IdMovil = g.AsignacionMovCond_IdMovil AND AsignacionMovCond_FechaBaja IS NULL
                                        LEFT JOIN gps.conductores as h ON g.AsignacionMovCond_IdConductor = h.IdConductor
                                        #LEFT JOIN gps.ibutton as i ON d.Disp_ID = i.Ibutton_UltDispositivo
                                        LEFT JOIN (select ia.* from gps.ibutton as ia join (select max(Ibutton_UltFecha) as fecha, Ibutton_UltDispositivo from gps.ibutton group by Ibutton_UltDispositivo) as ib where ia.Ibutton_UltFecha = ib.fecha and ia.Ibutton_UltDispositivo = ib.Ibutton_UltDispositivo) as i on d.Disp_ID = i.Ibutton_UltDispositivo and i.Ibutton_UltEstado = 51 
                                        LEFT JOIN gps.asignacion_movil_conductor as j on i.IdIbutton = j.AsignacionMovCond_IdIbutton and j.AsignacionMovCond_FechaBaja IS NULL 
                                        LEFT JOIN gps.conductores as k ON j.AsignacionMovCond_IdConductor = k.IdConductor
                                        LEFT JOIN gps.dispositivos_configuracion as l ON e.Reporte_IdDisp = l.DispConf_DispID and e.Reporte_Evento = l.DispConf_NroEvento
                                        #LEFT JOIN gps.parking as m on e.Reporte_IdDisp = m.OarkingImei AND c.Movil_Dominio = m.ParkingDominio ANDParkingEstado = 1
					WHERE a.IdUsuario = $idUsuario AND b.AsigDisp_Estado = 1 AND b.IdAsignacionDispositivo IS NOT NULL ORDER BY c.Movil_Dominio ASC";

    }

    //si el usuario es administrador u operador, no restringe la busqueda al usuario logueado
    if ($usuarioAdmin) {
      $sql = "SELECT distinctrow c.Movil_Dominio, c.IdMovil,c.Movil_Dominio,c.Movil_Nombre,c.Movil_Marca,c.Movil_Modelo, c.Movil_Anio,
					 c.Movil_Icono, d.Disp_ID, f.Icono_Azul,f.Icono_Rojo,f.Icono_Verde,f.Icono_Amarillo, e.Reporte_FechaGPS,e.Reporte_Latitud,e.Reporte_Longitud,
					ROUND(e.Reporte_Velocidad) as Reporte_Velocidad,e.Reporte_Rumbo, e.Reporte_EventoDescripcion, e.Reporte_Evento, e.Reporte_FechaServidor, e.Reporte_Ignicion, e.Reporte_Direccion, h.Conductor_Nombre, h.Conductor_Apellido, e.Reporte_Mileage
					FROM gps.asignacion_dispositivo AS b
					LEFT JOIN gps.moviles AS c ON c.IdMovil = b.AsigDisp_IdMovil
					LEFT JOIN gps.dispositivos AS d ON b.AsigDisp_IdDispositivo = d.IdDispositivo and b.AsigDisp_Estado = 1
					LEFT JOIN gps_reportes.ultima_posicion AS e ON e.Reporte_IdDisp = d.Disp_ID
					LEFT JOIN gps.iconos AS f ON c.Movil_Icono = f.id
                                        LEFT JOIN gps.asignacion_movil_conductor as g ON c.IdMovil = g.AsignacionMovCond_IdMovil AND AsignacionMovCond_FechaBaja IS NULL
                                        LEFT JOIN gps.conductores as h ON g.AsignacionMovCond_IdConductor = h.IdConductor
                                        #LEFT JOIN gps.ibutton as i ON d.Disp_ID = i.Ibutton_UltDispositivo
                                        LEFT JOIN (select ia.* from gps.ibutton as ia join (select max(Ibutton_UltFecha) as fecha, Ibutton_UltDispositivo from gps.ibutton group by Ibutton_UltDispositivo) as ib where ia.Ibutton_UltFecha = ib.fecha and ia.Ibutton_UltDispositivo = ib.Ibutton_UltDispositivo) as i on d.Disp_ID = i.Ibutton_UltDispositivo and i.Ibutton_UltEstado = 51 
                                        LEFT JOIN gps.asignacion_movil_conductor as j on i.IdIbutton = j.AsignacionMovCond_IdIbutton and j.AsignacionMovCond_FechaBaja IS NULL 
                                        LEFT JOIN gps.conductores as k ON j.AsignacionMovCond_IdConductor = k.IdConductor
					WHERE d.Disp_ID = $idDispMovil ";
    }
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function celPosDriverReporta($id) {
    $sql = "SELECT Reporte_Val1, Reporte_Val2 FROM gps_reportes.LOG_$id WHERE Reporte_Val1 is not null and Reporte_Val1 != '' ORDER BY Reporte_FechaGPS DESC LIMIT 1";
    $consulta = Yii::app()->db->createCommand($sql)->queryRow();
    return $consulta;
  }

  public function datosAdicionales($id) {
    $sql = "SELECT Reporte_Val1 FROM gps_reportes.LOG_$id WHERE Reporte_RUS = 2 and Reporte_Val1 is not null and Reporte_Val1 != '' ORDER BY Reporte_FechaGPS DESC LIMIT 1";
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function datosAdicionales2($id) {//nivel de combustible
    $sql = "SELECT Reporte_Val1, Reporte_Val2, Reporte_Val3 FROM gps_reportes.LOG_$id WHERE Reporte_RUS = 1 and Reporte_Val1 is not null and Reporte_Val1 != '' and Reporte_Val3 != '0000' AND Reporte_Evento = '12' ORDER BY Reporte_FechaGPS DESC LIMIT 1";
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function datosAdicionales3($id) {//equipo de frio
    $sql = "SELECT Reporte_Val1, Reporte_Val2, Reporte_Val3 FROM gps_reportes.LOG_$id WHERE Reporte_RUS = 1 and Reporte_Val1 is not null and Reporte_Val1 != '' and Reporte_Val3 != '0000' AND Reporte_Evento = '04' ORDER BY Reporte_FechaGPS DESC LIMIT 1";
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function datosAdicionales4($id) {//sensor temp.
    $sql = "SELECT Reporte_Val1, Reporte_Val2 FROM gps_reportes.LOG_$id WHERE Reporte_RUS = 4 and Reporte_Val1 is not null and Reporte_Val1 != '' and Reporte_Val2 IS NOT NULL AND Reporte_Evento = '67' ORDER BY Reporte_FechaGPS DESC LIMIT 1";
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function datosAdicionales5($id) { // sensor humedad

    $sql = "SELECT Reporte_Val3 FROM gps_reportes.ultima_posicion WHERE Reporte_IdDisp = $id and Reporte_Val3 is not null and Reporte_Val3 != '' ";
    // $sql = "SELECT * FROM gps_reportes.ultima_posicion WHERE Reporte_Val3 is not null and Reporte_Val3 != '' ";
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    
    // var_dump($consulta);
    // die;

    
    return $consulta;
  }
  
   public function datosCAN($id) { // sensor humedad

    $sql = "SELECT reporte_fechagps, reporte_rpm,reporte_temperaturamotor, reporte_consumofuelprom, reporte_fuelnivel FROM gps_reportes.LOG_CAN_".$id."  order by reporte_fechagps desc limit 1 ";
    // $sql = "SELECT * FROM gps_reportes.ultima_posicion WHERE Reporte_Val3 is not null and Reporte_Val3 != '' ";
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    
    // var_dump($consulta);
    // die;

    
    return $consulta;
  }

  public function datoIbutton($id) {
    $sql = "SELECT Ibutton_UltEstado
FROM gps.`ibutton` AS a
LEFT JOIN gps.`asignacion_movil_conductor` AS b ON b.`AsignacionMovCond_IdIbutton` = a.`IdIbutton`
WHERE a.`Ibutton_UltDispositivo` = '$id' AND b.`AsignacionMovCond_FechaBaja` IS NULL
ORDER BY a.`Ibutton_UltFecha` DESC
LIMIT 1;";
    //echo $sql;
    //die;
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function recargarPosiciones($moviles) {

    $sql = "SELECT Reporte_IdDisp, Reporte_Rumbo, Reporte_Latitud, Reporte_Longitud, Reporte_Ignicion FROM gps_reportes.ultima_posicion WHERE Reporte_IdDisp IN (" . $moviles . ")";
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  public function verificarCaidos($tiempoMinutos = 60, $mov = 0, $cli = 0, $ultEnvio = null) {

    /* $sql = "SELECT e.Clie_RazonSocial, f.EstadoClie_Descripcion , d.Movil_Dominio, a.Reporte_IdDisp ,g.EstadoMovil_Descripcion, a.Reporte_FechaServidor,
      e.Clie_Tel, e.Clie_Tel2, e.Clie_Email, e.Clie_NumeroOtroSistema, e.IdCliente
      FROM gps_reportes.ultima_posicion AS a
      LEFT JOIN gps.dispositivos AS b ON b.Disp_ID = a.Reporte_IdDisp
      LEFT JOIN gps.asignacion_dispositivo AS c ON c.AsigDisp_IdDispositivo = b.IdDispositivo and c.AsigDisp_Estado = 1
      LEFT JOIN gps.moviles AS d ON d.IdMovil = c.AsigDisp_IdMovil
      LEFT JOIN gps.clientes AS e ON d.Movil_IdCliente = e.IdCliente
      LEFT JOIN gps.estados_cliente AS f ON f.IdEstadoClie = Clie_Estado
      LEFT JOIN gps.estados_movil AS g ON g.IdEstadoMovil = d.Movil_Estado
      WHERE (SELECT TIMESTAMPDIFF(MINUTE,Reporte_FechaServidor, NOW())AS DIFERENCIA_EN_DIAS) > $tiempoMinutos AND c.AsigDisp_Estado = 1 ORDER BY a.Reporte_FechaServidor DESC"; */
    $sql = "SELECT e.Clie_RazonSocial, f.EstadoClie_Descripcion , d.Movil_Dominio, a.Reporte_IdDisp ,g.EstadoMovil_Descripcion, a.Reporte_FechaServidor,
e.Clie_Tel, e.Clie_Tel2, e.Clie_Email, e.Clie_NumeroOtroSistema, e.IdCliente, b.Disp_ID, b.Disp_Linea, b.Disp_Linea2, i.LogFecha,e.Clie_Empresa
#FROM gps_reportes.ultima_posicion AS a
FROM gps.dispositivos AS b
LEFT JOIN gps_reportes.ultima_posicion AS a ON a.Reporte_IdDisp = b.Disp_ID
#LEFT JOIN gps.dispositivos AS b ON b.Disp_ID = a.Reporte_IdDisp
LEFT JOIN gps.asignacion_dispositivo AS c ON c.AsigDisp_IdDispositivo = b.IdDispositivo AND c.AsigDisp_Estado = 1
LEFT JOIN gps.moviles AS d ON d.IdMovil = c.AsigDisp_IdMovil
LEFT JOIN gps.clientes AS e ON d.Movil_IdCliente = e.IdCliente
LEFT JOIN gps.estados_cliente AS f ON f.IdEstadoClie = Clie_Estado
LEFT JOIN gps.estados_movil AS g ON g.IdEstadoMovil = d.Movil_Estado
LEFT JOIN (SELECT LogIdCliente,LogIdMovil,MAX(logfecha) as LogFecha 
FROM gps.log_caidos AS logca 
GROUP BY logidcliente,LogIdMovil
ORDER BY LogFecha DESC ) AS i ON i.LogIdCliente = e.IdCliente AND i.LogIdMovil = d.IdMovil  ";
    $where = " WHERE (a.Reporte_FechaServidor IS NULL OR (SELECT TIMESTAMPDIFF(MINUTE,a.Reporte_FechaServidor, NOW())AS DIFERENCIA_EN_DIAS) > $tiempoMinutos) AND c.AsigDisp_Estado = 1 AND b.Disp_Estado = 2 ";

    if ($cli)
      $where .= " AND e.Clie_Estado=1 ";
    if ($mov)
      $where .= " AND d.Movil_Estado=1 ";
    if ($ultEnvio)
      $where .= " AND i.LogFecha IS NOT NULL AND i.LogFecha >= '" . date("Y-m-d H:i:s", strtotime("-" . $ultEnvio . " hours")) . "' ";

    $order = " ORDER BY a.Reporte_FechaServidor DESC ";

    
    $sql .= $where . $order;
    //echo $sql;
    
    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  /**
   * 	Devuelve por cada puerto: fecha/hora del ultimo reporte que le entro y cantidad de moviles que le llegan
   */
  public function estadisticaDePuertos() {

    $sql = "SELECT Reporte_PC, MAX(Reporte_FechaServidor), Reporte_Puerto, COUNT(Reporte_IdDisp) FROM gps_reportes.ultima_posicion left join gps.dispositivos on Reporte_IdDisp = Disp_ID where substring(Reporte_PC, 1, 3) = 'mod' and IdDispositivo is not null and  Reporte_FechaGPS > DATE_SUB(NOW(),INTERVAL 3 DAY)  GROUP BY Reporte_Puerto, Reporte_PC ORDER BY Reporte_Puerto DESC";

    $consulta = Yii::app()->db->createCommand($sql)->queryAll();
    return $consulta;
  }

  /**
   * Returns the static model of the specified AR class.
   * Please note that you should have this exact method in all your CActiveRecord descendants!
   * @param string $className active record class name.
   * @return UltimaPosicion the static model class
   */
  public static function model($className = __CLASS__) {
    return parent::model($className);
  }

}
