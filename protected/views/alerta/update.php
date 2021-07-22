<?php
/* @var $this AlertaController */
/* @var $model Alerta */

$this->breadcrumbs=array(
	'Alertas'=>array('index'),
	$model->idAlerta=>array('view','id'=>$model->idAlerta),
	'Update',
);

$this->menu=array(
	array('label'=>'List Alerta', 'url'=>array('index')),
	array('label'=>'Create Alerta', 'url'=>array('create')),
	array('label'=>'View Alerta', 'url'=>array('view', 'id'=>$model->idAlerta)),
	array('label'=>'Manage Alerta', 'url'=>array('admin')),
);
?>

<h1>Update Alerta <?php echo $model->idAlerta; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>