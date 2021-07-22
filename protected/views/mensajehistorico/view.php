<?php
/* @var $this MensajehistoricoController */
/* @var $model mensajehistorico */

$this->breadcrumbs=array(
	'Mensajehistoricos'=>array('index'),
	$model->idMensaje,
);

$this->menu=array(
	array('label'=>'List mensajehistorico', 'url'=>array('index')),
	array('label'=>'Create mensajehistorico', 'url'=>array('create')),
	array('label'=>'Update mensajehistorico', 'url'=>array('update', 'id'=>$model->idMensaje)),
	array('label'=>'Delete mensajehistorico', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idMensaje),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage mensajehistorico', 'url'=>array('admin')),
);
?>

<h1>View mensajehistorico #<?php echo $model->idMensaje; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idMensaje',
		'MensajeIdTemporal',
		'MensajetipoMensaje',
		'MensajeIMEI',
		'MensajeidAsignacion',
		'MensajeCompleto',
		'Mensajedireccion',
		'MensajeFechaHora',
		'MensajeLatitud',
		'MensajeLongitud',
		'MensajeAlertaEstado',
	),
)); ?>
