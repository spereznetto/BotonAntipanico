

<?php


$this->widget('booster.widgets.TbExtendedGridView', array(
'id' => 'ultpos-inicio-grid',
 'dataProvider' => $arrayDataProvider,
 'template' => "{items}",
 'type' => 'striped condensed bordered hover',
 'ajaxUrl' => Yii::app()->createUrl('flota/index'),
'columns' => array(
array(
'name' => 'idreporte',
 'header' => 'Numero',
 ),
 array(
'name' => 'temporal_fechaservidor',
 'header' => 'FechaServidor'
),
 array(
'name' => 'temporal_fechagps',
 'header' => 'FechaGPS',
 ),
 array(
'name' => 'temporal_puerto',
 'header' => 'Puerto'
),
array(
  'name' => 'Temporal_IdDispositivo',
   'header' => 'IMEI'
  ),
  array(
    'name' => 'temporal_modelo',
     'header' => 'Tipo Dispositivo'
    ),
 
)
));

//".$data["fechaHora"]!="MOVIL SIN POSICION" ? "<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>" : ""
//<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>
?>