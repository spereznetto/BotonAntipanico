<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'IMEI'); ?>
		<?php echo $form->textField($model,'IMEI',array('size'=>20,'maxlength'=>20)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'tipoDispositivo'); ?>
		<?php echo $form->textField($model,'tipoDispositivo'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'estadoDispositivo'); ?>
		<?php echo $form->textField($model,'estadoDispositivo'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->