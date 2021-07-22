<?php
/* @var $this AgenteController */
/* @var $model agente */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'agente-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Los campos con <span class="required">*</span> son requeridos.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'AgenteNombre'); ?>
		<?php echo $form->textField($model,'AgenteNombre',array('size'=>30,'maxlength'=>30)); ?>
		<?php echo $form->error($model,'AgenteNombre'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'AgenteTelefono'); ?>
		<?php echo $form->textField($model,'AgenteTelefono'); ?>
		<?php echo $form->error($model,'AgenteTelefono'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Guardar' : 'Guardar'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->