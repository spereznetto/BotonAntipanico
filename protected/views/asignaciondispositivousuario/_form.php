<?php
/* @var $this AsignaciondispositivousuarioController */
/* @var $model AsignacionDispositivoUsuario */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('booster.widgets.TbActiveForm', array(
	'id'=>'AsignacionDispositivoUsuario',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Los campos con <span class="required">*</span> son obligatorios.</p>

	<?php echo $form->errorSummary($model); ?>

	
    <div class="row">
        <div class="col-lg-12">
            
				<?php echo $form->dropDownListGroup($model,'AsignacionIMEI',array(
					'widgetOptions' => array(
						'data' => CHtml::listData(Dispositivo::model()->findAll(),'IMEI', 'IMEI'),
					'htmlOptions'=>array('empty'=>'Seleccione el Dispositivo')	
					)
			)); ?>
					
        </div>
    </div>
	<div class="row">
        <div class="col-lg-12">

		<?php echo $form->dropDownListGroup($model,'AsignacionIdUsuarioFinal',array(
			'widgetOptions' => array(
				'data' => CHtml::listData(UsuarioFinal::model()->findAll(), 'idUsuarioFinal', 'UsuarioFinalNombre'),
			'htmlOptions'=>array('empty'=>'Seleccione la Usuario')	
			)
	)); ?>
		
        </div>
    </div>

	

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Guardar' : 'Guardar'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->