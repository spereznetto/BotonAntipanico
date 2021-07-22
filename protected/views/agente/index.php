<?php
/* @var $this AgenteController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Agentes',
);

$this->menu=array(
	array('label'=>'Crear agente', 'url'=>array('create')),
	array('label'=>'Administrar agente', 'url'=>array('admin')),
);
?>

<h3>Agentes</h3>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
