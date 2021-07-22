<?php
/* @var $this AlertaController */
/* @var $model Alerta */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'alerta-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'AlertaidAsignacion'); ?>
		<?php echo $form->textField($model,'AlertaidAsignacion'); ?>
		<?php echo $form->error($model,'AlertaidAsignacion'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'AlertaFechaDesde'); ?>
		<?php echo $form->textField($model,'AlertaFechaDesde'); ?>
		<?php echo $form->error($model,'AlertaFechaDesde'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'AlertaFechaHasta'); ?>
		<?php echo $form->textField($model,'AlertaFechaHasta'); ?>
		<?php echo $form->error($model,'AlertaFechaHasta'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'estadoAlerta'); ?>
		<?php echo $form->textField($model,'estadoAlerta'); ?>
		<?php echo $form->error($model,'estadoAlerta'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->