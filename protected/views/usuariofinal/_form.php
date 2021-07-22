<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'usuariofinal-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Los campos con  <span class="required">*</span> son requeridos.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioFinalNombre'); ?>
		<?php echo $form->textField($model,'UsuarioFinalNombre',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'UsuarioFinalNombre'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioFinalDni'); ?>
		<?php echo $form->textField($model,'UsuarioFinalDni'); ?>
		<?php echo $form->error($model,'UsuarioFinalDni'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'UsuarioFinalEstadoUsuario'); ?>
		<?php echo $form->textField($model,'UsuarioFinalEstadoUsuario'); ?>
		<?php echo $form->error($model,'UsuarioFinalEstadoUsuario'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Guardar' : 'Guardar'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->