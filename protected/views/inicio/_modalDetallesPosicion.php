<?php
$this->beginWidget('booster.widgets.TbModal', array('id' => 'dialogDetallePosicion'));
?>
<div style="position: absolute; background-color: #333; width: 100%; height:100%; z-index: 1000; display:none; opacity: 0.8; top: 0px; left: 0px" id="cargandoDatosPosicion">
    <i class="fa fa-spinner fa-spin fa-5x" style="margin-top: 150px; left: 50%; margin-left: -35px; position: absolute; color: #fff;"></i>
</div>
<div class="modal-header">
    <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
    <h3 class="pmd-card-title-text tituloDetallePosicion"><span class="glyphicon glyphicon-map-marker"></span> Detalle de la Posicion <span style="float: right; font-size: 12px; margin-right: 20px" id="tiempo_detenido"></span></h3>
</div>

<div class="modal-body contentModalDetallePosicion">
    <div class="row">
        <div class="col-md-4">
            <div class="breakDetalle">
                <span id="tituloDetalles">Nombre de Movil222</span>
                <br />
                <span id="movilPosicion"></span>
            </div>
            <div class="breakDetalle">
                <span id="tituloDetalles">Vehiculo</span>
                <br />
                <span id="marcaPosicion"></span> <span id="modeloPosicion"></span> <span id="anioPosicion"></span>
            </div>

        </div>
        <div class="col-md-4">
            <div class="breakDetalle">
                <span id="tituloDetalles">Dominio</span>
                <br />
                <span id="dominioPosicion"></span>
            </div>
            <div class="breakDetalle">
                <span id="tituloDetalles">Fecha del Reporte</span>
                <br />
                <span id="fechaPosicion"></span>
            </div>

        </div>
        <div class="col-md-4">
            <div class="breakDetalle">
                <span id="tituloDetalles">Rumbo</span>
                <br />
                <span id="rumboPosicion"></span>
            </div>
            <div class="breakDetalle">
                <span id="tituloDetalles">Evento</span>
                <br />
                <span id="eventoPosicion"></span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="breakDetalle" id="verMileage" style="display: none">
                <span id="tituloDetalles">Kilometraje Registrado</span>
                <br />
                <span id="mileage"></span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="breakDetalle">
                <span id="tituloDetalles">Direccion</span>
                <br />
                <span id="direccionPosicion"></span>
            </div>
        </div>
    </div>
    <div class="row" id="boxTiempoDetenidoIg">
         <div class="col-md-12">
            <div class="breakDetalle">
                <span id="tituloDetalles">Tiempo detenido con ignicion(calculado el dia de hoy desde las 00:00 hs)</span>
                <br />
                <span id="detenido_ignicion"></span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="breakDetalle" id="datoKilometraje" style="display:none;">
                <span id="tituloDetalles">Kilometraje Virtual</span>
                <br />
                <span id="kmPosicion"></span>
            </div>
        </div>
        <div class="col-md-6">
            <div class="breakDetalle" id="datoCronometraje" style="display:none;">
                <span id="tituloDetalles">Horas de uso Virtual</span>
                <br />
                <span id="hsPosicion"></span>
            </div>
        </div>
    </div>

     
<!-- inicio los datoa del GTCAN-->
 <div class="row">
      <div class="col-md-4">
            <div id="datoFechaCANVista" class="breakDetalle"  style="display:none;">
                <h5 style="text-align: center">FechaCAN</h5>
                <div id="datoFechaCAN"></div>
            </div>
       </div>
       <div class="col-md-4">     
        <div id="datoRPMVista" class="breakDetalle"  style="display:none;">
            <h5 style="text-align: center">RPM</h5>
            <div id="datoRPM" style="text-align: center; margin-left: 10px"></div>
        </div>
       </div>
       <div class="col-md-4">     
          <div id="datoTemperaturaMotorVista" class="breakDetalle"  style="display:none;">
            <h5 style="text-align: center">TemperaturaMotor</h5>
            <div id="datoTemperaturaMotor" style="text-align: center; margin-left: 10px"></div>
         </div>
       </div>
  </div>      
      
 <div class="row">
      <div class="col-md-4">
        <div id="datoConsumoPromedioCombustibleVista" class="breakDetalle"  style="display:none;">
            <h5 style="text-align: center">Consumo Promedio Combustible</h5>
            <div id="datoConsumoPromedioCombustible" style="text-align: center; margin-left: 10px"></div>
        </div>
      </div>
      <div class="col-md-4">
          <div  id="datoNivelCombustibleVista" class="breakDetalle"  style="display:none;">
            <h5 style="text-align: center">Nivel Combustible</h5>
            <div id="datoNivelCombustible" style="text-align: center; margin-left: 10px"></div>
        </div>
      </div>
 </div>
<!-- aca termina los dato del GTCAN-->

    
    <div class="row">
        <div class="col-md-6">
            <div class="tituloDetalleCond">
                Datos del Conductor
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="fotoConductor">
                        <div class="sombraImgCond">
                            Ver<br />
                            Imagenes
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="datosConductor">
                        <span id="conductorPosicionNombre"></span>
                        <br />
                        <span id="conductorPosicionDni"></span>
                        <br />
                        <span id="conductorPosicionTelefono"></span>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="tituloDetalleMovil">
                Imagenes del Movil
            </div>
            <div class="imagenesMovil">

                <!--<div class="imagenesMovilImg">
                    <div class="sombraImgMovil">
                        Ver<br />
                        Imagenes
                    </div>
                </div>
                <div class="imagenesMovilImg">
                    <div class="sombraImgMovil">
                        Ver<br />
                        Imagenes
                    </div>
                </div>
                <div class="imagenesMovilImg">
                    <div class="sombraImgMovil">
                        Ver<br />
                        Imagenes
                    </div>
                </div>-->
            </div>
        </div>
    </div>
    <hr />
    <div class="row">

        <div style="float:left">
            <h5 style="text-align: center">Velocidad</h5>
            <div id="chart_div"></div>
        </div>


        <div id="datoBateria" style="display: none; float: left">
            <h5 style="text-align: center">Bateria</h5>
            <div id="chart_div2" style="text-align: center; margin-left: 10px"></div>
        </div>


        <div id="datoCombustible" style="display: none; float: left">
            <h5 style="text-align: center">Combustible</h5>
            <div id="chart_div3" style="text-align: center; margin-left: 10px"></div>
        </div>
        <div id="datoTemperatura" style="display: none; float: left">
            <h5 style="text-align: center">Temperatura</h5>
            <div id="chart_div4" style="text-align: center; margin-left: 10px"></div>
        </div>
        <div id="datoEquipoFrio" style="display: none; float: left">
            <h5 style="text-align: center">Equipo Frio</h5>
            <div id="chart_div5" style="text-align: center; margin-left: 10px"></div>
        </div>
        <div id="datoSensorTemperatura" style="display: none; float: left">
            <h5 style="text-align: center">Sensor Temperatura</h5>
            <div id="chart_div6" style="text-align: center; margin-left: 10px"></div>
        </div>
        <div id="datoSensorHumedad" style="display: none; float: left">
            <h5 style="text-align: center">Humedad</h5>
            <div id="chart_div7" style="text-align: center; margin-left: 10px"></div>
        </div>
        <div id="divIbutton" style="text-align:center; margin-left: 10px; float: left">
            <h5 style="text-align:center">Estado de Ibutton</h5>
            <div style="display: none" id="ibuttonOn"><span class="glyphicon glyphicon-ok" style="font-size: 40px; color: #008000"></span> <h4>Encendido</h4></div>
            <div style="display: block" id="ibuttonOff"><span class="glyphicon glyphicon-off" style="font-size: 40px; color: #C00"></span> <h4>Apagado</h4></div>
            <div style="display: none" id="ibuttonDisable"><span class="glyphicon glyphicon-remove" style="font-size: 40px; color: #008000"></span> <h4>Deshabilitado</h4></div>
        </div>
        <div id="datoObservaciones" class="col-md-12" style="display: none; float: left">
            <h3>Observaciones</h3>
            <div class="observaciones col-md-12">
            </div>
        </div>
    </div>
    
 


</div>
<style>
    .tituloDetallePosicion {
        color: #c62828;
        font-size: 14px;
    }
    .breakDetalle {
        margin-top: 10px;
        font-size: 11px;
    }
    .tituloDetalleCond {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .tituloDetalleMovil {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .datosConductor span{
        font-size: 9px;
    }
    .fotoConductor {
        /*background-image: url('images/fondoConductor.jpg');*/
        background-image: url('images/fondoConductor.jpg');
        height: 80px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        border-radius: 50%;
    }
    .imagenesMovilImg {
        background-image: url('images/ejemploImgMovil1.jpg');
        height: 80px;
        width: 30%;
        margin-right: 2px;
        float: left;
        background-size: cover;
        background-position: center center;
    }
    .sombraImgCond {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        color: #fff;
        text-align: center;
        padding-top: 25px;
        font-size: 9px;
        display: none;
        cursor: pointer;
    }
    .sombraImgMovil {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        color: #fff;
        text-align: center;
        padding-top: 25px;
        font-size: 9px;
        display: none;
        cursor: pointer;
    }
    .nodisponible {
        width: 100%;
        font-style: italic;
        font-size: 14px;
        margin-top: 20px;
        text-align: center;
    }
    .observaciones {
        overflow-y: scroll;
        max-height: 260px;
        border: 1px solid #cccccc;
        border-radius: 5px;
    }
</style>


<?php $this->endWidget(); ?>
<script>
    $('.fotoConductor').on('click', function () {
        if ($(this).data('fotos') == null) {
            alert("No posee imagenes");
        }
        $('.contentModalGalefiaFotos .carouselFotos').html('');
        var fotos = $(this).data('fotos');
        if (fotos.length > 0) {
            var foto = fotos.split('?');
            for (i = 0; i < foto.length - 1; i++) {
                if (i == 0) {
                    $('.contentModalGalefiaFotos .carouselFotos').append('<div class="item active customFoto"><img src="' + foto[i] + '" /></div>');
                } else {
                    $('.contentModalGalefiaFotos .carouselFotos').append('<div class="item customFoto"><img src="' + foto[i] + '" /></div>');
                }

            }
        }

        //$(".modal-body #bookId").val( myBookId );
        $('#dialogGaleriaFotos .carousel').carousel();
        $('#dialogGaleriaFotos').modal('show');
    });
    $('.fotoConductor').hover(
            function () {
                $('.sombraImgCond').fadeIn(200);
            }, function () {
        $('.sombraImgCond').fadeOut(200);
    }
    );
    /*$('.imagenesMovilImg').hover(
     function () {
     $(this).find('.sombraImgMovil').fadeIn(200);
     }, function () {
     $(this).find('.sombraImgMovil').fadeOut(200);
     }
     );*/
    $(document).on('mouseenter', '.imagenesMovilImg', function () {
        $(this).find('.sombraImgMovil').fadeIn(200);
    });
    $(document).on('mouseleave', '.imagenesMovilImg', function () {
        $(this).find('.sombraImgMovil').fadeOut(200);
    });
    $(document).on('click', '.imagenesMovilImg', function () {
        $('.contentModalGalefiaFotos .carouselFotos').html('');
        var fotos = $(this).data('fotos');
        if (fotos.length > 0) {
            var foto = fotos.split('?');
            for (i = 0; i < foto.length - 1; i++) {
                if (i == 0) {
                    $('.contentModalGalefiaFotos .carouselFotos').append('<div class="item active customFoto"><img src="' + foto[i] + '" /></div>');
                } else {
                    $('.contentModalGalefiaFotos .carouselFotos').append('<div class="item customFoto"><img src="' + foto[i] + '" /></div>');
                }

            }
        } else {
            $('.contentModalGalefiaFotos .carouselFotos').html('<div class="item active customFoto">No hay fotos disponibles</div>')
        }

        //$(".modal-body #bookId").val( myBookId );
        //$('#dialogGaleriaFotos .carousel').carousel();
        $('#dialogGaleriaFotos').modal('show');
    });


</script>
