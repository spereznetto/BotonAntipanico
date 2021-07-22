<?php
/* @var $this DispositivoController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Dispositivos',
);

$this->menu=array(
	array('label'=>'Create dispositivo', 'url'=>array('create')),
	array('label'=>'Manage dispositivo', 'url'=>array('admin')),
);
?>

<h1>Dispositivos</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
