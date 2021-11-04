<?php
/* @var $this EstadoalertaController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Estado Alertas',
);

$this->menu=array(
	array('label'=>'Create estadoAlerta', 'url'=>array('create')),
	array('label'=>'Manage estadoAlerta', 'url'=>array('admin')),
);
?>

<h1>Estado Alertas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
