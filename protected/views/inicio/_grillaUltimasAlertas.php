<?php

if (!$arrayAlertas){
echo "no hay nada";
die;
}
$this->widget('booster.widgets.TbExtendedGridView', array(
'id' => 'alertas-inicio-grid',
 'dataProvider' => $arrayAlertas,
 'template' => "{items}",
 'type' => 'striped condensed bordered hover',
 'columns' => array(
  array(
    'name' => 'idAlerta',
     'header' => 'Numero',
     ),
    
 array(
'name' => 'UsuarioFinalNombre',
 'header' => 'Nombre',
 ),

 array(
'name' => 'AlertaFechaDesde',
 'header' => 'Fecha Desde',
 ),
 array(
'name' => 'AlertaFechaHasta',
 'header' => 'Fecha Hasta'
),
array(
  'name' => 'IMEI',
   'header' => 'Equipo'
  ),
 
array(
  'name' => 'tipoDispositivo',
   'header' => 'Tipo Dispositivo'
  ),
 array(
'name' => 'AlertaEstado',
 'header' => 'Estado'
),

  array(
  'class' => 'booster.widgets.TbButtonColumn',
  'header' => 'Acciones',
  'template'=>'{verposiciones}{envio}{compartir}{descarga}',
 
    'buttons' => array
    (
      
    'verposiciones' => array
    (
      'label' => 'Ver Posiciones',
      'icon' => 'search',
      'url' => 'Yii::app()->createUrl("mensajehistorico/verposicionesalerta", array("idAlerta"=>$data["idAlerta"]))',
      'options' => array(
      'style' => 'margin:7px;',
     
      ),
   ),
   
  'envio' => array
  (
    'label' => 'Envio SMS Check',
    'icon' => 'map-marker',
    'url' => 'Yii::app()->createUrl("alerta/envioSMS", array("idAlerta"=>$data["idAlerta"]))',
    'options' => array(
    'style' => 'margin:7px;',
    
    ),
 ),
 'compartir' => array
    (
      'label' => 'Compartir posiscion Whatsapp',
      'icon' => 'inbox',
      'url' => 'Yii::app()->createUrl("alerta/compartirubicacion", array("idAlerta"=>$data["idAlerta"]))',
      'options' => array(
      'style' => 'margin:7px;',
     
      ),
   ),
 'descarga' => array
  (
      'label' => 'Descargar Alerta',
      'icon' => 'download',
      'url' => 'Yii::app()->createUrl("informes/descargarposicion", array("idAlerta"=>$data["idAlerta"]))',
      'options' => array(
      'style' => 'margin:7px;'
      ),
  ),
 ),
 'htmlOptions' => array(
'style' => 'width: 110px',
 ),
 )
)
));

//".$data["fechaHora"]!="MOVIL SIN POSICION" ? "<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>" : ""
//<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>
?>