<?php


$this->widget('booster.widgets.TbExtendedGridView', array(
'id' => 'ultpos-inicio-grid',
 'dataProvider' => $arrayAlertas,
 'filter' => $filtersForm,
 'template' => "{items}",
 'type' => 'striped condensed bordered hover',
 'ajaxUrl' => Yii::app()->createUrl('flota/index'),
'columns' => array(
array(
'name' => 'UsuarioFinalNombre',
 'header' => 'Nombre',
 ),
 array(
'name' => 'UsuarioFinalNombre',
 'header' => 'UsuarioFinalNombre'
),
 array(
'name' => 'AlertaFechaDesde',
 'header' => 'Fecha Desde',
 ),
 array(
'name' => 'AlertaFechaHAsta',
 'header' => 'Fecha HAsta'
),
array(
  'name' => 'AlertaFechaHAsta',
   'header' => 'Fecha HAsta'
  ),
  
 array(
'name' => 'AlertaEstado',
 'header' => 'Estado'
),

  array(
  'class' => 'booster.widgets.TbButtonColumn',
  'header' => 'Acciones',
  'template'=>'{verposiciones}{envio}{descarga}',
 
    'buttons' => array
    (
    'verposiciones' => array
    (
      'label' => 'Ver Posiciones',
      'icon' => 'search',
      'url' => 'Yii::app()->createUrl("alerta/verposiciones", array("movil"=>$data["idAlerta"]))',
      'options' => array(
      'style' => 'margin:7px;',
     
      ),
   ),
  'envio' => array
  (
    'label' => 'Compartir Ubicacion',
    'icon' => 'map-marker',
    'url' => 'Yii::app()->createUrl("alerta/enviosms", array("movil"=>$data["idMensaje"]))',
    'options' => array(
    'style' => 'margin:7px;',
    
    ),
 ),
 'descarga' => array
  (
      'label' => 'Descargar Alerta',
      'icon' => 'download',
      'url' => 'Yii::app()->createUrl("informes/descargarposicion", array("movil"=>$data["idMensaje"]))',
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