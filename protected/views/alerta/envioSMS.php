
<div class="container">
	
<?php if(isset($respuestaSMS)) { ?>

	<div class="row">
		Confirmacion de envio:  El SMS fue enviado con exito!!  
	</div>
<?php   } else  {  ?>

<?php $form = $this->beginWidget('booster.widgets.TbActiveForm', array(
    'id' => 'envio-sms',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
    'enableAjaxValidation' => false,
)); ?>

	<div class="row">
		Envio de confirmacion de alerta recibida para el usuario <?php echo $arrayDatos->UsuarioFinalNombre; ?>* 
	</div>
	<div class="row">

	   <h3>Numero de contacto</h3>
            <?php echo CHtml::textField('numeroaenviar',$arrayDatos->UsuarioFinalTelefono);?>
            <br />
            <div class="alert alert-danger" role="alert">
                Recuerde el formato del numero debe ser Codigo de area (Ej:11) + Numero sin 15<br />
                <br />
                <b>Ejemplo: </b>1155669988
            </div>
      </div>
      <div class="row">
    	<?php echo CHtml::submitButton('Enviar'); ?>
      </div>
    </div>
  </div>


<div class="row buttons">

</div>

</div>
</div>

<?php $this->endWidget(); ?> 

</div>

<?php } ?>
