<?php
/* @var $this UsuariosistemaController */
/* @var $model usuariosistema */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'usuariosistema-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioTipoUsuario'); ?>
		<?php echo $form->textField($model,'UsuarioTipoUsuario'); ?>
		<?php echo $form->error($model,'UsuarioTipoUsuario'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioEmail'); ?>
		<?php echo $form->textField($model,'UsuarioEmail',array('size'=>30,'maxlength'=>30)); ?>
		<?php echo $form->error($model,'UsuarioEmail'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioNombre'); ?>
		<?php echo $form->textField($model,'UsuarioNombre',array('size'=>30,'maxlength'=>30)); ?>
		<?php echo $form->error($model,'UsuarioNombre'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioContrasena'); ?>
		<?php echo $form->textField($model,'UsuarioContrasena',array('size'=>32,'maxlength'=>32)); ?>
		<?php echo $form->error($model,'UsuarioContrasena'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioEstadousuario'); ?>
		<?php echo $form->textField($model,'UsuarioEstadousuario'); ?>
		<?php echo $form->error($model,'UsuarioEstadousuario'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->