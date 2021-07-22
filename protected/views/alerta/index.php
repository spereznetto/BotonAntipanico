<?php
/* @var $this AlertaController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Alertas',
);

$this->menu=array(
	array('label'=>'Create Alerta', 'url'=>array('create')),
	array('label'=>'Manage Alerta', 'url'=>array('admin')),
);
?>

<h1>Alertas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
