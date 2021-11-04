

<?php


$this->widget('booster.widgets.TbExtendedGridView', array(
'id' => 'ultpos-inicio-grid',
 'dataProvider' => $arrayDataProvider,
 'filter' => $filtersForm,
 'template' => "{items}",
 'type' => 'striped condensed bordered hover',
 'ajaxUrl' => Yii::app()->createUrl('flota/index'),
'columns' => array(
array(
'name' => 'MensajeIMEI',
 'header' => 'MensajeIMEI',
 ),
 array(
'name' => 'UsuarioFinalNombre',
 'header' => 'UsuarioFinalNombre'
),
 array(
'name' => 'MensajeFechaHora',
 'header' => 'Fecha Ultimo Registro',
 ),
 array(
'name' => 'MensajeNivelBateria',
 'header' => 'Nivel Bateria'
),
/*
  array(
  'class' => 'booster.widgets.TbButtonColumn',
  'header' => 'Acciones',
  'template'=>'{gestion}{verposiciones}{envio}',
 
    'buttons' => array
    (
      'gestion' => array
      (
      'label'=>'Gestion Alerta',
      'icon'=>'warning-sign',
      'url' => 'Yii::app()->createUrl("alerta/gestionalertas")',
      'options'=>array(
      'onclick'=>'return false;',
      'style'=>'margin:7px;',
      ),
    ), 
    'verposiciones' => array
    (
      'label' => 'Ver Posicion',
      'icon' => 'search',
      'url' => 'Yii::app()->createUrl("alerta/verposiciones", array("idMensaje"=>$data["idMensaje"]))',
      'options' => array(
      'style' => 'margin:7px;',
      ),
   ),
  'envio' => array
  (
    'label' => 'Compartir Ubicacion',
    'icon' => 'map-marker',
    'url' => 'Yii::app()->createUrl("alerta/enviosmsbateria", array("movil"=>$data["MensajeIMEI"]))',
    'options' => array(
    'style' => 'margin:7px;',
    ),
 ),
),
 
 'htmlOptions' => array(
'style' => 'width: 110px',
 ),
 )
 */
)
));

//".$data["fechaHora"]!="MOVIL SIN POSICION" ? "<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>" : ""
//<li><a href=\"index.php?r=datosMoviles/listarsensores&dom=".$data["dominio"]."\">Certificado de Cobertura</a></li>
?>