<?php
/* @var $this AlertaController */
/* @var $model Alerta */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idAlerta'); ?>
		<?php echo $form->textField($model,'idAlerta'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AlertaidAsignacion'); ?>
		<?php echo $form->textField($model,'AlertaidAsignacion'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AlertaFechaDesde'); ?>
		<?php echo $form->textField($model,'AlertaFechaDesde'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AlertaFechaHasta'); ?>
		<?php echo $form->textField($model,'AlertaFechaHasta'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'estadoAlerta'); ?>
		<?php echo $form->textField($model,'estadoAlerta'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->