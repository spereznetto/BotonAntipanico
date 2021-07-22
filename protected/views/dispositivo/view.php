<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */

$this->breadcrumbs=array(
	'Dispositivos'=>array('index'),
	$model->IMEI,
);

$this->menu=array(
	array('label'=>'List dispositivo', 'url'=>array('index')),
	array('label'=>'Create dispositivo', 'url'=>array('create')),
	array('label'=>'Update dispositivo', 'url'=>array('update', 'id'=>$model->IMEI)),
	array('label'=>'Delete dispositivo', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->IMEI),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage dispositivo', 'url'=>array('admin')),
);
?>

<h1>View dispositivo #<?php echo $model->IMEI; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'IMEI',
		'tipoDispositivo',
		'estadoDispositivo',
	),
)); ?>
