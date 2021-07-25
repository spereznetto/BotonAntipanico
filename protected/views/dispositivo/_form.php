<?php
/* @var $this DispositivoController */
/* @var $model dispositivo */
/* @var $form CActiveForm */
?>

<div class="container" >
<div class="form">

<?php $form=$this->beginWidget('booster.widgets.TbActiveForm', array(
	'id'=>'dispositivo-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Los datos con  <span class="required">*</span> son requeridos.</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="row">
   
			<div class="col-sm">

					<?php echo $form->textFieldGroup($model,'IMEI',array('size'=>20,'maxlength'=>20)); ?>
					<?php echo $form->error($model,'IMEI'); ?>
				
			</div>

		<div class="col-sm">
					<?php echo $form->textFieldGroup($model,'estadoDispositivo'); ?>
					<?php echo $form->error($model,'estadoDispositivo'); ?>
		</div>

		<div class="col-sm">

	<?php
             echo $form->select2Group(
                    $model,
                    'tipoDispositivo',
                    array(
                        'widgetOptions' => array(
                            'data' => CHtml::listData(tipodispositivo::model()->findAll(), 'idTipoDispositivo', 'Descripcion'),
                            'options' => array(
                                'placeholder' => 'Seleccione una Zona',
                            )
                        )
                    )
                );
            
            ?>       
	</div>
	</div>
	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Guardar' : 'Guardar'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->