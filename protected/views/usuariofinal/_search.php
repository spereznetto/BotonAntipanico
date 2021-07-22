<?php
/* @var $this UsuariofinalController */
/* @var $model usuariofinal */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'idUsuarioFinal'); ?>
		<?php echo $form->textField($model,'idUsuarioFinal'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioFinalNombre'); ?>
		<?php echo $form->textField($model,'UsuarioFinalNombre',array('size'=>60,'maxlength'=>100)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioFinalDni'); ?>
		<?php echo $form->textField($model,'UsuarioFinalDni'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UsuarioFinalEstadoUsuario'); ?>
		<?php echo $form->textField($model,'UsuarioFinalEstadoUsuario'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->