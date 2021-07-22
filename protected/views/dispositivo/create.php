
<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */

$this->breadcrumbs=array(
	'Dispositivos'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List dispositivo', 'url'=>array('index')),
	array('label'=>'Manage dispositivo', 'url'=>array('admin')),
);
?>

<h3>Crear dispositivo</h3>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>
