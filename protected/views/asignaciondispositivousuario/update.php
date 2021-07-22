<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */

$this->breadcrumbs=array(
	'Asignacion Dispositivo Usuarios'=>array('index'),
	$model->idAsignacion=>array('view','id'=>$model->idAsignacion),
	'Update',
);

$this->menu=array(
	array('label'=>'List AsignacionDispositivoUsuario', 'url'=>array('index')),
	array('label'=>'Create AsignacionDispositivoUsuario', 'url'=>array('create')),
	array('label'=>'View AsignacionDispositivoUsuario', 'url'=>array('view', 'id'=>$model->idAsignacion)),
	array('label'=>'Manage AsignacionDispositivoUsuario', 'url'=>array('admin')),
);
?>

<h1>Update AsignacionDispositivoUsuario <?php echo $model->idAsignacion; ?></h1>

<?php $this->renderPartial('_form', array('model'=>$model)); ?>