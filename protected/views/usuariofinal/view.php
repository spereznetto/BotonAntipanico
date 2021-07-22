<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */

$this->breadcrumbs=array(
	'Usuariofinals'=>array('index'),
	$model->idUsuarioFinal,
);

$this->menu=array(
	array('label'=>'List usuariofinal', 'url'=>array('index')),
	array('label'=>'Create usuariofinal', 'url'=>array('create')),
	array('label'=>'Update usuariofinal', 'url'=>array('update', 'id'=>$model->idUsuarioFinal)),
	array('label'=>'Delete usuariofinal', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idUsuarioFinal),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage usuariofinal', 'url'=>array('admin')),
);
?>

<h3>Ver informacion del  Usuario Final Numero <?php echo $model->idUsuarioFinal; ?></h3>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idUsuarioFinal',
		'UsuarioFinalNombre',
		'UsuarioFinalDni',
		'UsuarioFinalEstadoUsuario',
	),
)); ?>
