

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
 'header' => 'Fecha',
 ),
 array(
'name' => 'MensajeNivelBateria',
 'header' => 'Nivel Bateria'
),

 array(
'header' => '',
 'type' => 'raw',
 'value' => '"<div class=\"btn-group\">
    <li><a id=\"".$data["idMensaje"]."\" href=\"javascript:void(0)\" onclick=\"verposicion(".$data["MensajeLatitud"].",".$data["MensajeLongitud"].");\">Ver en el mapa</a></li>
      </div>"',
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
      'url' => 'Yii::app()->createUrl("alerta/verposiciones")',
      'options' => array(
      'style' => 'margin:7px;',
     
      ),
   ),
  'envio' => array
  (
    'label' => 'Compartir Ubicacion',
    'icon' => 'map-marker',
    'url' => 'Yii::app()->createUrl("alerta/enviosms", array("idalerta"=>$data["idMensaje"]))',
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