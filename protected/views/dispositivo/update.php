<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */

$this->breadcrumbs=array(
	'Dispositivos'=>array('index'),
	$model->IMEI=>array('view','id'=>$model->IMEI),
	'Update',
);

$this->menu=array(
	array('label'=>'List dispositivo', 'url'=>array('index')),
	array('label'=>'Create dispositivo', 'url'=>array('create')),
	array('label'=>'View dispositivo', 'url'=>array('view', 'id'=>$model->IMEI)),
	array('label'=>'Manage dispositivo', 'url'=>array('admin')),
);
?>

<h1>Update dispositivo <?php echo $model->IMEI; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>