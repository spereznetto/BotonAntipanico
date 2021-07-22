<?php
/* @var $this AlertaController */
/* @var $model Alerta */

$this->breadcrumbs=array(
	'Alertas'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Alerta', 'url'=>array('index')),
	array('label'=>'Manage Alerta', 'url'=>array('admin')),
);
?>

<h1>Create Alerta</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>