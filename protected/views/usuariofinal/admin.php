<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */

$this->breadcrumbs=array(
	'Usuariofinals'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List usuariofinal', 'url'=>array('index')),
	array('label'=>'Create usuariofinal', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$('#usuariofinal-grid').yiiGridView('update', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h13>Administracion de Usuarios Finales</h3>

<a href="<?php echo Yii::app()->CreateAbsoluteUrl('usuariofinal/create') ?>" role="button" aria-haspopup="true" >Crear Usuario Final</a><nr>



<?php $this->widget('booster.widgets.TbExtendedGridView', array(
	'id'=>'usuariofinal-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'idUsuarioFinal',
		'UsuarioFinalNombre',
		'UsuarioFinalDni',
		'UsuarioFinalEstadoUsuario',
		'UsuarioFinalTelefono',
		['header' => 'Estado del Usuario',
		'value' => '$dataProvider->UsuarioFinalEstadoUsuario->Descripcion',
		],
		
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
