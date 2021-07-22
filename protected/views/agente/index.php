<?php
/* @var $this AgenteController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Agentes',
);

$this->menu=array(
	array('label'=>'Create agente', 'url'=>array('create')),
	array('label'=>'Manage agente', 'url'=>array('admin')),
);
?>

<h1>Agentes</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
