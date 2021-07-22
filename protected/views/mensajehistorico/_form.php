<?php
/* @var $this MensajehistoricoController */
/* @var $model mensajehistorico */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'mensajehistorico-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeIdTemporal'); ?>
		<?php echo $form->textField($model,'MensajeIdTemporal'); ?>
		<?php echo $form->error($model,'MensajeIdTemporal'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajetipoMensaje'); ?>
		<?php echo $form->textField($model,'MensajetipoMensaje'); ?>
		<?php echo $form->error($model,'MensajetipoMensaje'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeIMEI'); ?>
		<?php echo $form->textField($model,'MensajeIMEI'); ?>
		<?php echo $form->error($model,'MensajeIMEI'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeidAsignacion'); ?>
		<?php echo $form->textField($model,'MensajeidAsignacion'); ?>
		<?php echo $form->error($model,'MensajeidAsignacion'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeCompleto'); ?>
		<?php echo $form->textField($model,'MensajeCompleto',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'MensajeCompleto'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'Mensajedireccion'); ?>
		<?php echo $form->textField($model,'Mensajedireccion',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'Mensajedireccion'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeFechaHora'); ?>
		<?php echo $form->textField($model,'MensajeFechaHora'); ?>
		<?php echo $form->error($model,'MensajeFechaHora'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeLatitud'); ?>
		<?php echo $form->textField($model,'MensajeLatitud'); ?>
		<?php echo $form->error($model,'MensajeLatitud'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeLongitud'); ?>
		<?php echo $form->textField($model,'MensajeLongitud'); ?>
		<?php echo $form->error($model,'MensajeLongitud'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'MensajeAlertaEstado'); ?>
		<?php echo $form->textField($model,'MensajeAlertaEstado'); ?>
		<?php echo $form->error($model,'MensajeAlertaEstado'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->