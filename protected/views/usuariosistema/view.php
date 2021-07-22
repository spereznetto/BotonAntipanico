<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */

$this->breadcrumbs=array(
	'Usuariosistemas'=>array('index'),
	$model->idUsuario,
);

$this->menu=array(
	array('label'=>'List usuariosistema', 'url'=>array('index')),
	array('label'=>'Create usuariosistema', 'url'=>array('create')),
	array('label'=>'Update usuariosistema', 'url'=>array('update', 'id'=>$model->idUsuario)),
	array('label'=>'Delete usuariosistema', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->idUsuario),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage usuariosistema', 'url'=>array('admin')),
);
?>

<h3>Ver informacion de usuario  de sistema numero <?php echo $model->idUsuario; ?></h3>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'idUsuario',
		'UsuarioTipoUsuario',
		'UsuarioEmail',
		'UsuarioNombre',
		'UsuarioContrasena',
		'UsuarioEstadousuario',
	),
)); ?>
