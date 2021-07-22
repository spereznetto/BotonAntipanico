<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */

$this->breadcrumbs=array(
	'Usuariosistemas'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List usuariosistema', 'url'=>array('index')),
	array('label'=>'Create usuariosistema', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#usuariosistema-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h3>Administrar Usuarios de Sistema</h3>

<a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuariosistema/create') ?>" role="button" aria-haspopup="true" >Crear Usuario de Sistema</a><nr>


<?php $this->widget('booster.widgets.TbExtendedGridView', array(
	'id'=>'usuariosistema-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'idUsuario',
		'UsuarioTipoUsuario',
		'UsuarioEmail',
		'UsuarioNombre',
		'UsuarioEstadousuario',
		
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
