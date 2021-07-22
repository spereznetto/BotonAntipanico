<?php
/* @var $this MensajehistoricoController */
/* @var $model mensajehistorico */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idMensaje'); ?>
		<?php echo $form->textField($model,'idMensaje'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeIdTemporal'); ?>
		<?php echo $form->textField($model,'MensajeIdTemporal'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajetipoMensaje'); ?>
		<?php echo $form->textField($model,'MensajetipoMensaje'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeIMEI'); ?>
		<?php echo $form->textField($model,'MensajeIMEI'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeidAsignacion'); ?>
		<?php echo $form->textField($model,'MensajeidAsignacion'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeCompleto'); ?>
		<?php echo $form->textField($model,'MensajeCompleto',array('size'=>60,'maxlength'=>100)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'Mensajedireccion'); ?>
		<?php echo $form->textField($model,'Mensajedireccion',array('size'=>60,'maxlength'=>100)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeFechaHora'); ?>
		<?php echo $form->textField($model,'MensajeFechaHora'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeLatitud'); ?>
		<?php echo $form->textField($model,'MensajeLatitud'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeLongitud'); ?>
		<?php echo $form->textField($model,'MensajeLongitud'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'MensajeAlertaEstado'); ?>
		<?php echo $form->textField($model,'MensajeAlertaEstado'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->