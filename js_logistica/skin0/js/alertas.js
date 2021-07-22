var btnAlertasModal;
var alertasModal;
var guardarModalEstado;
var guardarConfig_ActivarSonido;
var guardarConfig_CambiarSonido;
var guardarConfig_ActivarMsjFlotante;
var chkActivarSonido;
var alertaSonidoSlc;
var chkActivarMsjFlotante;
var alertasListado;

function inicializar_alertas(alertas_configuracion) {
    // plugin notify, notificaciones personalizadas 
    htmlNotifyCustom = '';
    htmlNotifyCustom += '<div>';
    htmlNotifyCustom += '   <div class="titulo">';
    htmlNotifyCustom += '       <div class="icono-container">';
    htmlNotifyCustom += '           <span class="icono-parent">';
    htmlNotifyCustom += '               <i class="material-icons" data-notify-html="icono"></i>';
    htmlNotifyCustom += '           </span>';
    htmlNotifyCustom += '       </div>';
    htmlNotifyCustom += '       <div class="texto" data-notify-html="titulo"></div>';
    htmlNotifyCustom += '   </div>';
    htmlNotifyCustom += '   <div class="mensaje" data-notify-html="mensaje"></div>';
    htmlNotifyCustom += '</div>';

    // Al AGREGAR/QUITAR/EDITAR un color, hacerlo tambien en alertas.css
    $.notify.addStyle('skinAlertas', {
        html: htmlNotifyCustom,
        classes: {
            informacion: {
                "background-color": "#a9a9a9"
            },
            correcto: {
                "background-color": "#67b960"
            },
            aviso: {
                "background-color": "#bec44f"
            },
            evento_11: {
                "background-color": "#699ddd"
            },
            evento_12: {
                "background-color": "#699ddd"
            },
            evento_13: {
                "background-color": "#699ddd"
            },
            evento_3: {
                "background-color": "#c25757"
            }
        }
    });

    btnAlertasModal = $('div[name="btn-alertas-modal"]');
    alertasModal = $('div[name="alertas-modal"]');

    // mostrar el boton
    btnAlertasModal.animate({
        opacity: 1
    }, 350);

    // listener click del boton de abrir modal
    btnAlertasModal.on('click', function () {
        btnAlertasModal.addClass('activar');

        // mostrar modal
        $(alertasModal).delay(250).css({
            'display': 'flex',
            'opacity': 0
        }).animate({
            'opacity': 1
        }, 250, function () {
            btnAlertasModal.removeClass('activar');
        });

        clearTimeout(guardarModalEstado);
        guardarModalEstado = setTimeout(function () {
            guardarPropiedadCSS('skinalertas_visible', $(alertasModal).css('display'));
        }, 5000);
    });

    // listener click cerrar el modal
    var closeButton = alertasModal.find('button[name="btn-close"]');
    closeButton.on('click', function () {
        alertasModal.css('display', 'none');

        clearTimeout(guardarModalEstado);
        guardarModalEstado = setTimeout(function () {
            guardarPropiedadCSS('skinalertas_visible', $(alertasModal).css('display'));
        }, 5000);
    });

    // listener cambiar sonido skin alerta
    alertaSonidoSlc = $('#slc-alerta-sonido');
    var opctionSonidoSelected = alertaSonidoSlc.find('option[value="' + alertas_configuracion.alarma_sonido + '"]');
    if (opctionSonidoSelected.length > 0) {
        opctionSonidoSelected.prop('selected', 'selected');
    }
    alertaSonidoSlc.multipleSelect({
        selectAll: false,
        filter: false,
        single: true,
        minimumCountSelected: 4,
        countSelected: "Seleccionados # de %",
        allSelected: false,
        maxHeight: 150,
        onClick: function () {
            clearTimeout(guardarConfig_CambiarSonido);
            guardarConfig_CambiarSonido = setTimeout(function () {
                guardarSkinAlertaConfiguracion('alarma_sonido', alertaSonidoSlc.multipleSelect("getSelects")[0]);
            }, 5000);

            setTimeout(function () {
                var sonido_url = base_url + '/sounds/logistica/alarmas/alarma_' + alertaSonidoSlc.multipleSelect("getSelects")[0] + '.mp3';
                new Audio(sonido_url).play();
            }, 100);
        }
    });


    // listener activar/desactivar sonido skin alerta
    chkActivarSonido = $('input#chk-skin-alerta-sonido');
    chkActivarSonido.on('change', function (e) {
        var checked = $(this).prop('checked');
        var sonidoParent = alertasModal.find('div.sonido-parent');

        if (checked) {
            sonidoParent.removeClass('desactivado');

            if (e.type != 'change_init') {
                var sonido_url = base_url + '/sounds/logistica/alarmas/alarma_' + alertaSonidoSlc.multipleSelect("getSelects")[0] + '.mp3';
                new Audio(sonido_url).play();
            }
        } else {
            sonidoParent.addClass('desactivado');
        }

        clearTimeout(guardarConfig_ActivarSonido);
        guardarConfig_ActivarSonido = setTimeout(function () {
            guardarSkinAlertaConfiguracion('activar_sonido', (checked ? 'true' : 'false'));
        }, 5000);
    });
    chkActivarSonido.prop('checked', alertas_configuracion.activar_sonido == 1).trigger('change_init');

    // listener mensaje flotante
    chkActivarMsjFlotante = $('input[name="chk-mensaje-flotante"]');
    chkActivarMsjFlotante.on('change change_init', function (e) {
        var checked = $(this).prop('checked');

        if (checked) {
            $('label[for="chk-mensaje-flotante"]').css('opacity', 1);

            if (e.type != 'change_init') {
                $.notify({
                    titulo: "MENSAJE FLOTANTE",
                    mensaje: "ACTIVADO: aqui se veran las alertas nuevas",
                    icono: "notifications_active"
                }, {
                    style: 'skinAlertas',
                    className: 'informacion',
                    globalPosition: 'right middle',
                    autoHideDelay: 4000,
                    showDuration: 300
                });
            }
        } else {
            $('label[for="chk-mensaje-flotante"]').css('opacity', 0.4);
        }

        clearTimeout(guardarConfig_ActivarMsjFlotante);
        guardarConfig_ActivarMsjFlotante = setTimeout(function () {
            guardarSkinAlertaConfiguracion('activar_msj_flotante', (checked ? 'true' : 'false'));
        }, 5000);
    });
    chkActivarMsjFlotante.prop('checked', alertas_configuracion.activar_msj_flotante == 1).trigger('change_init');

    alertasModal.find('div.alertas-configuracion').animate({
        'opacity': 1
    }, 450);

    // traer alertas sin leer
    taskAlertasSinLeer(false);
}

/* ----------------------------------- */
/* FUNCIONES PARA EL MANEJO DE ALERTAS */
/* ----------------------------------- */

// traer alertas sin leer
// boolean flag_animaciones: 
//  si llega en false no se puede emitir ni mensaje flotante ni sonido aunque esten activados
//  si llega en true se pueden emitir sonido y mensaje flotante si estan activados
function taskAlertasSinLeer(animaciones) {
    alertasListado = alertasModal.find('div[name="alertas-listado"]'); // inicializar DOM listado de alertas

    $.ajax({
        url: 'index.php?r=skinAlertas/pendientes',
        type: 'POST',
        dataType: 'JSON',
        success: function (respuesta) {
            if (respuesta.estado) {
                if (respuesta.alertas.length > 0) {
                    btnAlertasModal.addClass("alertas_si");

                    // agregar alertas al listado
                    var flag_sonido_emitido = false;
                    $.each(respuesta.alertas, function (index, item) {
                        var alerta = new SkinAlerta();
                        alerta.movil_id = item.movil;
                        alerta.movil_descripcion = item.movil_desc;
                        alerta.tipo = item.tipo;
                        alerta.descripcion = item.descripcion;
                        alerta.id = item.id;
                        alerta.fecha_creada = item.fecha;
                        alerta.fuente = item.fuente;
                        alerta.icono = item.icono;
                        alerta.latitud = item.latitud;
                        alerta.longitud = item.longitud;

                        if (alertasListado.find('div[name="alerta_' + alerta.id + '"]').length === 0) { // si el alerta no esta agregada
                            // el sonido es unico para toda la tanda de reportes por eso lo emitimos solo una vez (si corresponde emitirlo porque esta activado)
                            // el mensaje flotante se puede usar siempre (si corresponde emitirlo porque esta activado)
                            alerta.agregar(!flag_sonido_emitido && animaciones, animaciones);
                            flag_sonido_emitido = true;
                        }
                    });
                } else {
                    // si todas las alertas estan leidas
                    btnAlertasModal.addClass("alertas_no");
                }
            }
        },
        error: function () {
            mensaje('ERROR: NO PUDO LEERSE SI HAY ALERTAS PENDIENTES', 10000);
        },
        complete: function () {

        }
    });
}

// guardar configuracion de alertas
function guardarSkinAlertaConfiguracion(propiedad, valor) {
    $.ajax({
        url: 'index.php?r=skinAlertas/guardarConfiguracion',
        type: 'POST',
        data: {
            propiedad: propiedad,
            valor: valor
        },
        dataType: 'JSON',
        success: function (respuesta) {
            if (respuesta.estado !== 1) {
                mensaje(respuesta.mensaje, 10000);
            }
        },
        errror: function () {
            mensaje("ERROR: AL GUARDAR CONFIGURACION DE ALERTAS", 10000);
        }
    });
}

// definimos como es una alerta
function SkinAlerta() {
    // propiedades
    this.id;
    this.movil_id;
    this.movil_descripcion;
    this.tipo;
    this.descripcion;
    this.fecha_creada;
    this.fecha_leida;
    this.btnCentrarMapa;
    this.btn_leida;
    this.fuente;
    this.icono;
    this.latitud;
    this.longitud;

    // agregar alerta al listado
    this.agregar = function (flag_sonido, flag_msj_flotante) {
        var alerta = this;

        var newalerta = alertasListado.find('div[name="alerta_for_clone"]').clone();

        // los elementos que tienen tooltipster deben tener esta clase
        var tooltipClass = 'toltip-alerta-' + alerta.id;

        newalerta.attr('name', 'alerta_' + alerta.id);
        newalerta.find('i[name="icono"]').append(alerta.icono);
        newalerta.find('div[name="movil"]').text(alerta.movil_descripcion);
        newalerta.find('div[name="fuente"]').text(alerta.fuente);

        var fecha_hora = alerta.fecha_creada.split(' ');
        var fecha = fecha_hora[0].split('-');
        var anio = fecha[0];
        var mes = fecha[1];
        var dia = fecha[2];
        newalerta.find('div[name="fecha_creada"]').text(dia + '/' + mes + '/' + anio + ' ' + fecha_hora[1]);
        newalerta.find('div[name="descripcion"]').text(alerta.descripcion);

        var botoneraContainer = newalerta.find('div[name="botonera"]');
        var btnCentrarMapaHTML = '';
        btnCentrarMapaHTML += '<i name="btn-centrar-mapa" class="material-icons grilla-item-btn ' + tooltipClass + '" title="Centrar mapa en alerta">';
        btnCentrarMapaHTML += ' gps_fixed';
        btnCentrarMapaHTML += '</i>';
        $(btnCentrarMapaHTML).appendTo(botoneraContainer);

        alerta.btnCentrarMapa = $(botoneraContainer).find('i[name="btn-centrar-mapa"]');

        var leidaContainer = newalerta.find('div[name="leida"]');
        var leidaHTML = '';
        leidaHTML += '<button name="btn-alerta-leida" class="mdc-button mdc-button--dense mdc-button--raised" style="background-color: rgba(46, 121, 185, 0.75);">';
        leidaHTML += '  LEIDA';
        leidaHTML += '</button>';
        $(leidaHTML).appendTo(leidaContainer);

        alerta.btn_leida = $(leidaContainer).find('button[name="btn-alerta-leida"]');
        mdc.ripple.MDCRipple.attachTo(alerta.btn_leida["0"]);

        newalerta.addClass(alerta.tipo);
        newalerta.addClass('alerta-agregada');

        // Agregar alerta al DOM
        newalerta.prependTo(alertasListado).css('display', 'flex');

        // tooltipster
        $('.' + tooltipClass).tooltipster({
            theme: 'tooltipster-punk',
            maxWidth: 200,
            delay: [400, 350]
        });

        // listener centrar mapa
        alerta.btnCentrarMapa.on('click', function () {
            if (alerta.latitud != null && alerta.longitud != null) {
                centrarMapaEn_LatitudLongitud(alerta.latitud, alerta.longitud);
                setTimeout(function () {
                    showTouchMapAnimado(alerta.latitud, alerta.longitud);
                }, 350);
            } else {
                mensaje('ALERTA SIN COORDENADAS, NO SE PUDO UBICAR EN EL MAPA', 2300);
            }
        });

        // listener leida        
        alerta.btn_leida.on('click', function () {
            alerta.btn_leida.prop('disabled', true);
            alerta.btn_leida.css('opacity', '0.4');
            alerta.leida();
        });

        // si se puede emitir sonido
        if (flag_sonido) {
            // emitir sonido si corresponde
            if (chkActivarSonido.prop('checked')) {
                var sonido_url = base_url + '/sounds/logistica/alarmas/alarma_' + alertaSonidoSlc.multipleSelect("getSelects")[0] + '.mp3';
                new Audio(sonido_url).play();
            }
        }

        // si se puede emitir msj flotante
        if (flag_msj_flotante) {
            // mensaje flotante si corresponde
            if (chkActivarMsjFlotante.prop('checked')) {
                $.notify({
                    titulo: alerta.movil_descripcion,
                    mensaje: alerta.descripcion,
                    icono: alerta.icono
                }, {
                    style: 'skinAlertas',
                    className: alerta.tipo,
                    globalPosition: 'right middle',
                    autoHideDelay: 6000,
                    showDuration: 300,
                    autoHide: ((alerta.tipo == "evento_3") ? false : true)
                });
            }
        }

        // cambiamos los colores del boton
        btnAlertasModal.removeClass("alertas_no");
        btnAlertasModal.addClass("alertas_si");
    };

    // marcar alerta leida
    this.leida = function () {
        var alerta = this;

        $.ajax({
            url: 'index.php?r=skinAlertas/leida',
            type: 'POST',
            data: {
                alerta: alerta.id
            },
            dataType: 'JSON',
            success: function (respuesta) {
                if (respuesta.estado) {
                    // guardamos el id de la nueva alerta
                    alerta.remover();
                }
            },
            error: function () {
                mensaje('ERROR: NO SE PUDO MARCAR UNA ALERTA COMO LEIDA', 10000);
                alerta.btn_leida.prop('disabled', false);
                alerta.btn_leida.css('opacity', '1');
            },
            complete: function () {

            }
        });
    };

    // remover una alerta del listado
    this.remover = function () {
        var alerta = this;

        alertasListado.find('div[name="alerta_' + alerta.id + '"]').css('opacity', '0.8').animate({
            'background-color': 'red',
            'opacity': 0.5
        }, 350, function () {
            $(this).animate({
                'background-color': 'grey'
            }, 350, function () {
                $(this).remove();

                // si no quedan mas alertas
                if (alertasListado.find('div.alerta-agregada').length === 0) {
                    // cambiamos los colores del boton
                    btnAlertasModal.removeClass("alertas_si");
                    btnAlertasModal.addClass("alertas_no");
                }
            });
        });
    };
}

/* /FUNCIONES PARA EL MANEJO DE ALERTAS */