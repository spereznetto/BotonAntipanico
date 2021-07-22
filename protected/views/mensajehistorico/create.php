<?php
/* @var $this MensajehistoricoController */
/* @var $model mensajehistorico */

$this->breadcrumbs=array(
	'Mensajehistoricos'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List mensajehistorico', 'url'=>array('index')),
	array('label'=>'Manage mensajehistorico', 'url'=>array('admin')),
);
?>

<h1>Create mensajehistorico</h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>