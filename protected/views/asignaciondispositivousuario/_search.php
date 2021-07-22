<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idAsignacion'); ?>
		<?php echo $form->textField($model,'idAsignacion'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AsignacionIMEI'); ?>
		<?php echo $form->textField($model,'AsignacionIMEI',array('size'=>20,'maxlength'=>20)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AsignacionIdUsuarioFinal'); ?>
		<?php echo $form->textField($model,'AsignacionIdUsuarioFinal'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AsignacionFechaAlta'); ?>
		<?php echo $form->textField($model,'AsignacionFechaAlta'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->