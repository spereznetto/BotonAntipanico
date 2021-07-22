<?php
/* @var $this MensajehistoricoController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Mensajehistoricos',
);

$this->menu=array(
	array('label'=>'Create mensajehistorico', 'url'=>array('create')),
	array('label'=>'Manage mensajehistorico', 'url'=>array('admin')),
);
?>

<h1>Mensajehistoricos</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
