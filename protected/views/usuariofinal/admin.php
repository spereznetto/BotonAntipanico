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

<h1>Manage Usuariofinals</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('booster.widgets.TbExtendedGridView', array(
	'id'=>'usuariofinal-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'idUsuarioFinal',
		'UsuarioFinalNombre',
		'UsuarioFinalDni',
		'UsuarioFinalEstadoUsuario',
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
