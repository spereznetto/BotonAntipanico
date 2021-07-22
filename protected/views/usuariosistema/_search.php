<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idUsuario'); ?>
		<?php echo $form->textField($model,'idUsuario'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioTipoUsuario'); ?>
		<?php echo $form->textField($model,'UsuarioTipoUsuario'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioEmail'); ?>
		<?php echo $form->textField($model,'UsuarioEmail',array('size'=>30,'maxlength'=>30)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioNombre'); ?>
		<?php echo $form->textField($model,'UsuarioNombre',array('size'=>30,'maxlength'=>30)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioContrasena'); ?>
		<?php echo $form->textField($model,'UsuarioContrasena',array('size'=>32,'maxlength'=>32)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioEstadousuario'); ?>
		<?php echo $form->textField($model,'UsuarioEstadousuario'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->