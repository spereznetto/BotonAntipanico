/* --------------------------------------------------------------- */
/* FUNCIONES ACCIONES Y LISTENERS PARA TODOS LOS ITEMS DEL LISTADO */
/* --------------------------------------------------------------- */

function inicializar_listados() {
    // listados que los items se cargan al ir scroleando hacia abajo
    init_ver_mas();
}

// funcion para ver mas items cuando scrolean hacia abajo en el listado
function init_ver_mas() {
    $('ul[name="listado-de-items"][data-ver-mas="activado"]').on('mousewheel', function () {
        var listadoCaller = $(this);
        var controlador = listadoCaller.attr("data-controlador");
        var listado_de = listadoCaller.attr("data-listado");

        var scrollTop = $(this).scrollTop();
        if (scrollTop > parseInt($(this).attr("data-scrolltop")) && scrollTop + $(this).innerHeight() >= this.scrollHeight) {
            verMasItems('#listado-' + listado_de, controlador, filtrosArray[listado_de].filtroAplicado);
        }

        $(this).attr("data-scrolltop", scrollTop);
    });
}

/* /FUNCIONES ACCIONES Y LISTENERS PARA TODOS LOS ITEMS DEL LISTADO */

/* ------------------------------------------- */
/* FUNCIONES PARA AGREGAR ITEMS A LOS LISTADOS */
/* ------------------------------------------- */

function agregarItemListado(listado_id, items_datos, controlador, agregar_como) {
    switch (modulo) {
        case 'logistica':
            switch (controlador) {
                case 'movil':
                    logistica_agregarItemMovil(listado_id, items_datos, controlador, agregar_como);
                    break;
                case 'categoria':
                    logistica_agregarItemCategoria(listado_id, items_datos, controlador, agregar_como);
                    break;
                case 'punto':
                    logistica_agregarItemPunto(listado_id, items_datos, controlador, agregar_como);
                    break;
                case 'ruta':
                    logistica_agregarItemRuta(listado_id, items_datos, controlador, agregar_como);
                    break;
                case 'recorrido':
                    logistica_agregarItemRecorrido(listado_id, items_datos, controlador, agregar_como);
                    break;
            }
            break;
        case 'rastreo':
            break;
    }
}

// agregar item al listado de moviles de logistica
function logistica_agregarItemMovil(listado, respuesta, controlador, agregarComo) {
    var emptyListItem = $("#for_clone_" + controlador);
    var items = respuesta.items;
    // datos para agregar
    var listadoHTML = '';

    // plantilla de un item
    // --------------------
    var newListItem = emptyListItem.clone();
    newListItem.addClass("active");
    // datos para modificar del item
    // -----------------------------
    var tooltip_propiedad = $('#filtros-listado-moviles span.accion-btn-marker-tooltip-cambiar').find('i.activado').attr('name');
    var dato_icono_1 = $(newListItem).find('span[name="icono_movil_container"] i[name="icono_movil_tipo1"]');
    var dato_icono_4 = $(newListItem).find('span[name="icono_movil_container"] i[name="icono_movil_tipo4"]');
    var dato_icono_8 = $(newListItem).find('span[name="icono_movil_container"] i[name="icono_movil_tipo8"]');
    var dato_icono = $(newListItem).find('span[name="icono_movil_container"] i[name="icono_movil_tipo"]');
    var dato_boton_quitar = $(newListItem).find('div[name="columnas_datos"]').find('i.listado-item-boton-quitar');
    var dato_boton_buscar = $(newListItem).find('div[name="columnas_datos"]').find('i.listado-item-boton-buscar');
    var dato_nombre = $(newListItem).find('div[name="columnas_datos"]').find('div[name="valor_1"]');
    var dato_dominio = $(newListItem).find('div[name="columnas_datos"]').find('div[name="valor_2"]');
    var dato_fecha_desde = $(newListItem).find('input[name="movil-historico-fecha-desde"]');
    var dato_fecha_hasta = $(newListItem).find('input[name="movil-historico-fecha-hasta"]');
    var dato_hora_desde = $(newListItem).find('input[name="movil-historico-hora-desde"]');
    var dato_hora_hasta = $(newListItem).find('input[name="movil-historico-hora-hasta"]');
    var dato_boton_recorrido = $(newListItem).find('button[name="btn-buscar-recorrido"]');
    var dato_checkbox_mapa = $(newListItem).find('div[name="columnas_datos"]').find('div[name="valor_3"] input[name="chk_agregar_al_mapa"]');

    var dispositivos_agregados = [];
    $.each(items, function (index, item) {
        $(newListItem).attr("id", "item_" + controlador + "_" + item.IdMovil);
        $(newListItem).attr("data-item", item.IdMovil);
        $(newListItem).attr("data-dispositivo", item.Movil_Dispositivo);

        var tooltipMovilHTML = '';
        tooltipMovilHTML += '<div class="marker-tooltip">';
        tooltipMovilHTML += '   <div class="marker-tooltip-movil-nombre" style="display:' + ((tooltip_propiedad == "nombre" || tooltip_propiedad == "ambos") ? "block" : "none") + ';">';
        tooltipMovilHTML += '   ' + item.Movil_Nombre;
        tooltipMovilHTML += '   </div>';
        tooltipMovilHTML += '   <div class="marker-tooltip-movil-dominio" style="display:' + ((tooltip_propiedad == "dominio" || tooltip_propiedad == "ambos") ? "block" : "none") + ';">';
        tooltipMovilHTML += '   ' + item.Movil_Dominio;
        tooltipMovilHTML += '   </div>';
        tooltipMovilHTML += '</div>';
        $(newListItem).attr("data-mapa-tooltip", tooltipMovilHTML);

        switch (item.Movil_Icono) {
            case "1":
                dato_icono_1.css("display", "flex");
                dato_icono_4.css("display", "none");
                dato_icono_8.css("display", "none");
                dato_icono.css("display", "none");
                break;
            case "4":
                dato_icono_1.css("display", "none");
                dato_icono_4.css("display", "flex");
                dato_icono_8.css("display", "none");
                dato_icono.css("display", "none");
                break;
            case "8":
                dato_icono_1.css("display", "none");
                dato_icono_4.css("display", "none");
                dato_icono_8.css("display", "flex");
                dato_icono.css("display", "none");
                break;
            default:
                dato_icono_1.css("display", "none");
                dato_icono_4.css("display", "none");
                dato_icono_8.css("display", "none");
                dato_icono.css("display", "flex");
                break;
        }

        dato_boton_quitar.attr("data-dispositivo", item.Movil_Dispositivo);
        dato_boton_quitar.attr("data-item", item.IdMovil);
        dato_boton_buscar.attr("data-item", item.Movil_Dispositivo);
        if (!item.Movil_EnMapa) {
            dato_boton_buscar.addClass("boton-apagado");
        }

        dato_nombre.empty().append(item.Movil_Nombre);
        dato_dominio.empty().append(item.Movil_Dominio);

        var fecha_de_hoy = new Date();
        var fecha_mes_hoy = fecha_de_hoy.getMonth() + 1;
        var fecha_dia_hoy = fecha_de_hoy.getDate();
        var fecha_de_hoy_format =
            fecha_de_hoy.getFullYear() + "-" +
            (fecha_mes_hoy < 10 ? '0' : '') + fecha_mes_hoy + "-" +
            (fecha_dia_hoy < 10 ? '0' : '') + fecha_dia_hoy;

        dato_fecha_desde.attr("value", fecha_de_hoy_format);
        dato_fecha_hasta.attr("value", fecha_de_hoy_format);
        dato_hora_desde.attr("value", "00:05");
        dato_hora_hasta.attr("value", "23:55");
        dato_checkbox_mapa.attr("value", item.Movil_Dispositivo);
        dato_checkbox_mapa.attr("checked", item.Movil_EnMapa);

        if (!item.Listado_Excluido) {
            dispositivos_agregados.push(item.Movil_Dispositivo);
            listadoHTML += newListItem[0].outerHTML;
        }
    });

    if (typeof agregarComo === 'undefined') {
        $(listadoHTML).appendTo(listado);
    } else {
        switch (agregarComo) {
            case "nuevo":
                $(listadoHTML).hide().prependTo(listado).fadeIn(1500);
                break;
            case "editado":
                break;
        }
    }

    setTimeout(function () {
        transformicons.add('button.listado-item-boton-colapsable');

        // para cada dispositivo agregado
        $.each(dispositivos_agregados, function (index, dispositivo) {
            var li = $(listado + ' li[data-dispositivo="' + dispositivo + '"]');

            // inicializar buscador de recorridos
            var recorrido_fecha_desde = li.find('input[name="movil-historico-fecha-desde"]');
            var recorrido_fecha_hasta = li.find('input[name="movil-historico-fecha-hasta"]');
            var recorrido_hora_desde = li.find('input[name="movil-historico-hora-desde"]');
            var recorrido_hora_hasta = li.find('input[name="movil-historico-hora-hasta"]');
            li.find('button[name="btn-buscar-recorrido"]').on("click", function () {
                var parentPanel = li.find('div[name="ver-mas-parent"]');
                var loadingGif = parentPanel.find('div[name="verMasLoadinGif"]');
                var buttonCaller = $(this);
                var movil_id = li.attr('data-item');

                parentPanel.find('div[name="panel_historico_movil_' + movil_id + '"]').remove();
                buttonCaller.prop("disabled", true);
                loadingGif.css("display", "flex");

                quitarMovilRecorridoDelMapa(movil_id);

                $.ajax({
                    url: 'index.php?r=movil/historial',
                    data: {
                        movil: movil_id,
                        desde: recorrido_fecha_desde.val() + " " + recorrido_hora_desde.val(),
                        hasta: recorrido_fecha_hasta.val() + " " + recorrido_hora_hasta.val(),
                        geo: true
                    },
                    type: 'POST',
                    dataType: 'JSON',
                    success: function (respuesta) {
                        if (respuesta.estado === 1) {
                            // agregar panel de opciones
                            var newPanelHistorico = $('div[name="panel_movil_historico_for_clone"]').clone();
                            newPanelHistorico.attr("name", "panel_historico_movil_" + movil_id);
                            newPanelHistorico.attr("data-movil", movil_id);

                            // dibujar reportes
                            var reportes = respuesta.reportes;
                            // revisamos la configuracion guardada
                            var agruparMetros = 0,
                                suavizadoTiempo = 0,
                                flagUnirLinea = true,
                                flagMostrarNro = false,
                                flagIgnorarPosicion = false,
                                lineaColor = 'rgb(118, 118, 118)',
                                eventoTexto = '';
                            if (typeof respuesta.configuracion != 'undefined') { // si hay una config cargada
                                var configuracion = respuesta.configuracion;

                                if (typeof configuracion.logistica_movil_config__agrupar_dist != 'undefined') {
                                    agruparMetros = parseFloat(configuracion.logistica_movil_config__agrupar_dist);
                                }
                                if (typeof configuracion.logistica_movil_config__suavizado != 'undefined') {
                                    suavizadoTiempo = parseFloat(configuracion.logistica_movil_config__suavizado);
                                }
                                if (typeof configuracion.logistica_movil_config__unir_linea != 'undefined') {
                                    flagUnirLinea = configuracion.logistica_movil_config__unir_linea == 'true';
                                }
                                if (typeof configuracion.logistica_movil_config__mostrar_nro != 'undefined') {
                                    flagMostrarNro = configuracion.logistica_movil_config__mostrar_nro == 'true';
                                }
                                if (typeof configuracion.logistica_movil_config__ignorar_posicion != 'undefined') {
                                    flagIgnorarPosicion = configuracion.logistica_movil_config__ignorar_posicion == 'true';
                                }
                                if (typeof configuracion.logistica_movil_config__linea_color != 'undefined') {
                                    lineaColor = configuracion.logistica_movil_config__linea_color;
                                }
                                if (typeof configuracion.logistica_movil_config__linea_color != 'undefined') {
                                    eventoTexto = configuracion.logistica_movil_config__filtro_evento;
                                }
                            }

                            var movil_recorrido =
                                agregarMovilRecorridoAlMapa(
                                    movil_id,
                                    reportes,
                                    agruparMetros,
                                    suavizadoTiempo,
                                    flagUnirLinea,
                                    flagMostrarNro,
                                    flagIgnorarPosicion,
                                    lineaColor,
                                    eventoTexto);
                            $(movil_recorrido).trigger("mapa_centrar");

                            // Limpiar historico buscadp
                            var limpiarHistoricoBuscado = newPanelHistorico.find('i[name="boton-quitar-del-mapa"]');
                            limpiarHistoricoBuscado.on('click', function () {
                                quitarMovilRecorridoDelMapa(movil_id);
                                parentPanel.find('div[name="panel_historico_movil_' + movil_id + '"]').remove();
                            });

                            // boton guardar configuración: 
                            var guardarConfiguracionHistoricoMovil = newPanelHistorico.find('i[name="boton-guardar-configuracion"]');
                            guardarConfiguracionHistoricoMovil.on('click', function () {
                                var btnGuardarConfig = $(this);
                                if (!btnGuardarConfig.prop('disabled')) {
                                    btnGuardarConfig.prop('disabled', true);
                                    btnGuardarConfig.addClass('boton-apagado');

                                    var propiedades = [
                                        "logistica_movil_config__unir_linea",
                                        "logistica_movil_config__linea_color",
                                        "logistica_movil_config__mostrar_nro",
                                        "logistica_movil_config__ignorar_posicion",
                                        "logistica_movil_config__agrupar_dist",
                                        "logistica_movil_config__suavizado",
                                        "logistica_movil_config__filtro_evento"
                                    ];

                                    var valores = [
                                        chk_unir_reportes_con_linea.prop("checked"),
                                        divColorParent.find('div.div-color-opcion.activada').css('background-color'),
                                        chk_mostrar_numero_de_orden.prop("checked"),
                                        chk_ignorar_reportes_posicion.prop("checked"),
                                        sldAgruparPorDistancia.noUiSlider.get(),
                                        sldSuavizadoPorTiempo.noUiSlider.get(),
                                        filtro_por_evento.val()
                                    ];

                                    var onSuccess = function () {
                                        mensaje('Configuración guardada');
                                    };

                                    var onError = function () {
                                        mensaje('ERROR: No se pudo guardar su configuración');
                                    }

                                    var onComplete = function () {
                                        btnGuardarConfig.prop('disabled', false);
                                        btnGuardarConfig.removeClass('boton-apagado');
                                    }

                                    guardarPropiedadCSS(propiedades, valores, onSuccess, onError, onComplete);
                                }
                            });

                            // centrar el mapa
                            mdc.ripple.MDCRipple.attachTo($(newPanelHistorico).find('i[name="centrar-el-mapa"]')["0"]);
                            var button_centrar_el_mapa = newPanelHistorico.find('i[name="centrar-el-mapa"]');
                            button_centrar_el_mapa.on('click', function () {
                                $(movil_recorrido).trigger("mapa_centrar");
                            });

                            // elegir color de la linea
                            var divColorParent = newPanelHistorico.find('div.div-color-parent');
                            $(divColorParent).on('desactivar', function () {
                                $(this).css({
                                    "opacity": "0.4",
                                    "pointer-events": "none"
                                });
                            });
                            $(divColorParent).on('activar', function () {
                                $(this).css({
                                    "opacity": "1",
                                    "pointer-events": "all"
                                });
                            });
                            $.each(newPanelHistorico.find('div.div-color-opcion'), function () {
                                var divColor = $(this);
                                divColor.css('background-color', divColor.attr('data-color'));

                                // set color click listener
                                divColor.on('click', function () {
                                    var divColorClickeado = $(this);
                                    var color = divColorClickeado.attr('data-color');
                                    newPanelHistorico.find('div.div-color-opcion').removeClass('activada');
                                    divColorClickeado.addClass('activada');
                                    divColorClickeado.css('background-color', color);
                                    movil_recorrido.polyline.options.color = color;
                                    $(movil_recorrido.polyline._path).css('stroke', color);
                                });

                                // si es la opcion de color guardada
                                if (lineaColor == divColor.attr('data-color')) {
                                    divColor.addClass('activada');
                                }
                            });

                            // dibujar linea
                            var chk_unir_reportes_con_linea = newPanelHistorico.find('input[name="chk_unir_reportes_con_linea"]');
                            chk_unir_reportes_con_linea.prop('checked', flagUnirLinea);
                            chk_unir_reportes_con_linea.on('click', function () {
                                var chkCaller = $(this);

                                if (chkCaller.prop("checked")) {
                                    modulo_mapa.addLayer(movil_recorrido.polyline);
                                    $(divColorParent).trigger("activar");
                                } else {
                                    modulo_mapa.removeLayer(movil_recorrido.polyline);
                                    $(divColorParent).trigger("desactivar");
                                }
                            });

                            // mostrar numero de orden
                            var chk_mostrar_numero_de_orden = newPanelHistorico.find('input[name="chk_mostrar_numero_de_orden"]');
                            chk_mostrar_numero_de_orden.prop('checked', flagMostrarNro);
                            chk_mostrar_numero_de_orden.on('click', function () {
                                var chkCaller = $(this);

                                if (chkCaller.prop("checked")) {
                                    $.each(movil_recorrido.markers, function (index, item) {
                                        var marker = $(item);
                                        var icono = $(marker["0"]._icon);

                                        icono.find('.grupo-punto-marker').removeClass("activado");
                                        icono.find('.punto-marker').removeClass("activado");
                                        icono.find('.grupo-punto-marker-orden').addClass("activado");
                                        icono.find('.punto-marker-orden').addClass("activado");
                                    });
                                } else {
                                    $.each(movil_recorrido.markers, function (index, item) {
                                        var marker = $(item);
                                        var icono = $(marker["0"]._icon);

                                        icono.find('.grupo-punto-marker-orden').removeClass("activado");
                                        icono.find('.punto-marker-orden').removeClass("activado");
                                        icono.find('.punto-marker').addClass("activado");
                                        icono.find('.grupo-punto-marker').addClass("activado");
                                    });
                                }
                            });

                            // ignorar reportes de posicion
                            var chk_ignorar_reportes_posicion = newPanelHistorico.find('input[name="chk_ignorar_reportes_posicion"]');
                            chk_ignorar_reportes_posicion.prop('checked', flagIgnorarPosicion);
                            chk_ignorar_reportes_posicion.on('click', function () {
                                var chkCaller = $(this);

                                quitarMovilRecorridoDelMapa(movil_id);
                                movil_recorrido = agregarMovilRecorridoAlMapa(
                                    movil_id,
                                    reportes,
                                    sldAgruparPorDistancia.noUiSlider.get(),
                                    sldSuavizadoPorTiempo.noUiSlider.get(),
                                    chk_unir_reportes_con_linea.prop("checked"),
                                    chk_mostrar_numero_de_orden.prop("checked"),
                                    chk_ignorar_reportes_posicion.prop("checked"),
                                    divColorParent.find('div.div-color-opcion.activada').css('background-color'),
                                    filtro_por_evento.val());
                            });

                            // agrupar por distancia
                            var sldAgruparPorDistancia = newPanelHistorico.find('div#sld-agrupar-puntos-por-distancia')[0];
                            noUiSlider.create(sldAgruparPorDistancia, {
                                // el color de la barra se muestra desde la izquierda pero no desde la derecha
                                connect: [true, false],
                                // metros de entrada  
                                start: [agruparMetros],
                                // me muevo de a un metro
                                step: 1,
                                tooltips: [false],
                                // puedo desplazar el rango completo
                                behaviour: 'tap-drag',
                                // desde 50 metros hasta 500 metros
                                range: {
                                    'min': 0,
                                    'max': 400
                                },
                                // un pipe cada 100 metros
                                pips: {
                                    mode: 'steps',
                                    filter: function fncFilter(value) {
                                        if (value % 100 === 0 || value == 50) {
                                            // valor largo 
                                            return 1;
                                        } else {
                                            if (value % 25 === 0) {
                                                // valor largo
                                                return 2;
                                            }
                                        }
                                        // nada
                                        return 0;
                                    },
                                    format: {
                                        to: function (metros) {
                                            return metros;
                                        },
                                        from: function (metros) {
                                            return metros;
                                        }
                                    }
                                }
                            });
                            // after update
                            var agruparCaller;
                            var flag_first = true;
                            sldAgruparPorDistancia.noUiSlider.on('update', function (values, handle) {
                                // si no es la primera vez (se triggerea sola cuando se carga el elemento al DOM)
                                if (!flag_first) {
                                    var metros = values[handle];
                                    clearTimeout(agruparCaller);
                                    agruparCaller = setTimeout(function () {
                                        quitarMovilRecorridoDelMapa(movil_id);
                                        movil_recorrido = agregarMovilRecorridoAlMapa(
                                            movil_id,
                                            reportes,
                                            metros,
                                            sldSuavizadoPorTiempo.noUiSlider.get(),
                                            chk_unir_reportes_con_linea.prop("checked"),
                                            chk_mostrar_numero_de_orden.prop("checked"),
                                            chk_ignorar_reportes_posicion.prop("checked"),
                                            divColorParent.find('div.div-color-opcion.activada').css('background-color'),
                                            filtro_por_evento.val());
                                    }, 500);
                                } else {
                                    flag_first = false;
                                }
                            });

                            // suavizado por tiempo
                            var sldSuavizadoPorTiempo = newPanelHistorico.find('div#sld-suavizado-por-tiempo')[0];
                            noUiSlider.create(sldSuavizadoPorTiempo, {
                                connect: [true, false],
                                start: [suavizadoTiempo],
                                step: 1,
                                tooltips: [false],
                                behaviour: 'tap-drag',
                                range: {
                                    'min': 0,
                                    'max': 60
                                },
                                pips: {
                                    mode: 'steps',
                                    filter: function fncFilter(value) {
                                        if (value % 30 === 0) {
                                            // valor largo 
                                            return 1;
                                        } else if (value % 10 === 0) {
                                            // valor largo
                                            return 2;
                                        }

                                        // nada
                                        return 0;
                                    },
                                    format: {
                                        to: function (minutos) {
                                            return minutos;
                                        },
                                        from: function (minutos) {
                                            return minutos;
                                        }
                                    }
                                }
                            });
                            // after update
                            var suavizarCaller;
                            var flag_first_suavizar = true;
                            sldSuavizadoPorTiempo.noUiSlider.on('update', function (values, handle) {
                                // si no es la primera vez (se triggerea sola cuando se carga el elemento al DOM)
                                if (!flag_first_suavizar) {
                                    var minutos = values[handle];
                                    clearTimeout(suavizarCaller);
                                    suavizarCaller = setTimeout(function () {
                                        quitarMovilRecorridoDelMapa(movil_id);
                                        movil_recorrido = agregarMovilRecorridoAlMapa(
                                            movil_id,
                                            reportes,
                                            sldAgruparPorDistancia.noUiSlider.get(),
                                            minutos,
                                            chk_unir_reportes_con_linea.prop("checked"),
                                            chk_mostrar_numero_de_orden.prop("checked"),
                                            chk_ignorar_reportes_posicion.prop("checked"),
                                            divColorParent.find('div.div-color-opcion.activada').css('background-color'),
                                            filtro_por_evento.val());
                                    }, 500);
                                } else {
                                    flag_first_suavizar = false;
                                }
                            });

                            // filtro por evento 
                            var inputEventTimeOut;
                            var filtro_por_evento = newPanelHistorico.find('input[id="filtrado-por-evento"]');
                            filtro_por_evento.val(eventoTexto);
                            filtro_por_evento.on('input', function () {
                                var inputText = $(this).val();
                                clearTimeout(inputEventTimeOut);
                                inputEventTimeOut = setTimeout(() => {
                                    quitarMovilRecorridoDelMapa(movil_id);
                                    movil_recorrido = agregarMovilRecorridoAlMapa(
                                        movil_id,
                                        reportes,
                                        sldAgruparPorDistancia.noUiSlider.get(),
                                        sldSuavizadoPorTiempo.noUiSlider.get(),
                                        chk_unir_reportes_con_linea.prop("checked"),
                                        chk_mostrar_numero_de_orden.prop("checked"),
                                        chk_ignorar_reportes_posicion.prop("checked"),
                                        divColorParent.find('div.div-color-opcion.activada').css('background-color'),
                                        inputText);
                                }, 500);
                            });

                            $(newPanelHistorico).appendTo(parentPanel).css("display", "flex").css("opacity", 0).animate({
                                opacity: 1
                            }, 1000);

                            inicializar_tooltip(listado + ' .tooltip_sub_item', 200, 500, 0);
                        } else {
                            mensaje("ERROR: NO SE PUDO LEER EL RECORRIDO DEL MOVIL BUSCADO", 10000);
                        }
                    },
                    error: function () {
                        mensaje("ERROR: NO SE PUDO LEER EL RECORRIDO DEL MOVIL BUSCADO", 10000);
                    },
                    complete: function () {
                        loadingGif.css("display", "none");
                        buttonCaller.prop("disabled", false);
                    }
                });
            });

            // agreamos los moviles al mapa
            li.find('input[name="chk_agregar_al_mapa"]').trigger("sin_centrar_sin_guardar");
        });

        inicializar_tooltip(listado + ' .tooltip_item', 200, 500, 0);
    }, 300);
}

// agregar item al listado de categorias de logistica
function logistica_agregarItemCategoria(listado, respuesta, controlador, agregarComo) {
    var emptyListItem = $("#for_clone_" + controlador);
    var items = respuesta.items;

    $.each(items, function (index, item) {
        item = item[0];
        var newListItem = emptyListItem.clone();
        var checkbox = $(newListItem).find("input[name='chk_agregar_al_mapa']");

        $(newListItem).attr("id", "item_" + controlador + "_" + item.IdTipoPuntoInteres);
        $(newListItem).attr("data-item", item.IdTipoPuntoInteres);

        var categoriaEnMapaData = {
            id: item.IdTipoPuntoInteres,
            color: item.TipoPI_Color,
            descripcion: item.TipoPI_Descripcion,
            puntos: item.Puntos.map((punto) => {
                return {
                    lat: punto.PI_Latitud,
                    lng: punto.PI_Longitud
                };
            })
        };

        checkbox.attr("value", JSON.stringify(categoriaEnMapaData));
        checkbox.attr("checked", item.Categoria_EnMapa);

        var iconoHTML = '';
        iconoHTML += '<i name="icono_categoria" class="material-icons grilla-icono-item" style="color:' + item.TipoPI_Color + ';">';
        iconoHTML += '  ' + item.TipoPI_Icono;
        iconoHTML += '</i>';

        $(newListItem).find("span[name='icono_categoria_container']").empty().append(iconoHTML);
        $(newListItem).find("i.listado-item-boton-editar").attr("data-item", item.IdTipoPuntoInteres);
        var columnas_datos = $(newListItem).find("div[name='columnas_datos']");

        // valor descripcion
        $(columnas_datos).find("div[name='valor_1']").empty().append(item.TipoPI_Descripcion);

        if (typeof agregarComo === 'undefined') {
            $(newListItem).appendTo(listado).addClass("active");
        } else {
            switch (agregarComo) {
                case "nuevo":
                    $(newListItem).hide().prependTo(listado).addClass("active").fadeIn(1500);
                    break;
                case "editado":
                    var listadoItem = $(listado + " li[id='item_" + controlador + "_" + item.IdTipoPuntoInteres + "']");
                    $(newListItem).insertAfter($(listado + " li:eq(" + listadoItem.index() + ")")).hide().addClass("active");
                    listadoItem.fadeOut(350, function () {
                        listadoItem.delay(100).next().fadeIn("slow");
                        listadoItem.remove();
                    });
                    break;
            }
        }

        // luego de que termina la animacion que remueve el item del listado, llamamos al checkbox que la agrega al mapa
        setTimeout(function () {
            checkbox.trigger("sin_centrar_sin_guardar");
        }, 700);
    });

    inicializar_tooltip(listado + ' .tooltip_item', 200, 500, 0);
}

// agregar punto al listado de puntos de logistica
function logistica_agregarItemPunto(listado, respuesta, controlador, agregarComo) {
    var emptyListItem = $("#for_clone_" + controlador);
    var items = respuesta.items;
    var categorias = respuesta.categorias;

    // agregar categorias
    if (typeof agregarComo === 'undefined') {
        listadoAgregarCategorias(listado, categorias);
    }

    // agregar items al listado    
    var pos = 0;
    var categoria_anterior = -1;
    var listadoHTML = '';
    var item;

    // plantilla de un item
    // --------------------
    var newListItem = emptyListItem.clone();
    newListItem.addClass("active");
    // datos para modificar del item
    // -----------------------------
    //var dato_icono = $(newListItem).find('div[name="icono"]');
    var dato_descripcion = $(newListItem).find('div[name="descripcion"]');
    var dato_btn_buscar = $(newListItem).find("i.listado-item-boton-buscar");
    var dato_btn_editar = $(newListItem).find("i.listado-item-boton-editar");
    var dato_categoria_color;
    var dato_categoria_icono;

    while (pos < items.length) {
        item = items[pos];

        // Carga de datos al item
        // ---------------------------------------------------------------------------------
        $(newListItem).attr("id", "item_" + controlador + "_" + item.IdPuntoInteres);
        $(newListItem).attr("data-item", item.IdPuntoInteres);
        $(newListItem).attr("data-categoria", item.PI_IdTipoPI);

        // categoria datos
        if (categoria_anterior == -1 || categoria_anterior != item.PI_IdTipoPI) {
            $.each(categorias, function (f, categoria) {
                if (categoria.IdTipoPuntoInteres == item.PI_IdTipoPI) {
                    dato_categoria_color = categoria.TipoPI_Color;
                    dato_categoria_icono = categoria.TipoPI_Icono;
                }
            });
        }

        var checkbox = $(newListItem).find("div[name='valor_2'] input[name='chk_agregar_al_mapa']");;
        checkbox.val(JSON.stringify(Object.assign({
            icono: dato_categoria_icono,
            color: dato_categoria_color
        }, item)));

        // var iconoHTML = '';
        // iconoHTML += '<i class="material-icons" style="color:' + dato_categoria_color + ';">';
        // iconoHTML += '  ' + dato_categoria_icono;
        // iconoHTML += '</i>';

        //dato_icono.empty().append(iconoHTML);
        dato_descripcion.empty().append(item.PI_Descripcion);
        dato_btn_buscar.attr("data-latitud", item.PI_Latitud);
        dato_btn_buscar.attr("data-longitud", item.PI_Longitud);
        dato_btn_editar.attr("data-item", item.IdPuntoInteres);

        // Logica para agregar item al listado
        // ---------------------------------------------------------------------------------
        if (categoria_anterior != -1 && categoria_anterior != item.PI_IdTipoPI) {
            var newItemParentSelector = listado + " li[name='categoria_" + categoria_anterior + "'] ul[name='categoria_puntos']";
            $(listadoHTML).appendTo(newItemParentSelector);
            listadoHTML = '';
        }

        listadoHTML += newListItem[0].outerHTML;
        categoria_anterior = item.PI_IdTipoPI;

        pos++;
    }

    // agregar la ulima tanda de datos
    var newItemParentSelector = listado + " li[name='categoria_" + categoria_anterior + "'] ul[name='categoria_puntos']";
    if (typeof agregarComo === 'undefined') {
        $(listadoHTML).appendTo(newItemParentSelector);
    } else {
        // si la categoria no esta agregada la agregamos
        if ($(newItemParentSelector).length === 0) {
            $.each(categorias, function (h, categoria) {
                if (categoria.IdTipoPuntoInteres == categoria_anterior) {
                    listadoAgregarCategoria(listado, categoria);
                }
            });
        }

        switch (agregarComo) {
            case "nuevo":
                // agregar item al listado
                $(listadoHTML).hide().prependTo(newItemParentSelector).fadeIn(1500);
                break;
            case "editado":
                var listadoItem = $(newItemParentSelector + " li[id='item_" + controlador + "_" + item.IdPuntoInteres + "']");
                if (listadoItem.length > 0) {
                    // si mantiene la categoria 
                    $(listadoHTML).insertAfter($(newItemParentSelector + " li:eq(" + listadoItem.index() + ")")).hide();
                    listadoItem.fadeOut(350, function () {
                        listadoItem.delay(100).next().fadeIn("slow");
                        listadoItem.remove();
                    });
                } else {
                    // si cambia de categoria
                    listadoItem = $('li[id="item_' + controlador + '_' + item.IdPuntoInteres + '"]');
                    $(listadoHTML).prependTo('li[name="categoria_' + item.PI_IdTipoPI + '"] ul[name="categoria_puntos"]');
                    listadoItem.fadeOut(350, function () {
                        listadoItem.remove();
                    });
                }

                break;
        }
    }

    // los headers que no tienen items los removemos
    setTimeout(function () {
        $.each($(listado).find('li.header-categoria'), function (index, item) {
            if ($(item).find('ul[name="categoria_puntos"] > li').length === 0) {
                $(item).remove();
            }
        });
    }, 300);
}

// Agrega al listado los nuevos header (li) de las categorias y refresca el filtro de categorias del listado.
// categorias: contiene todos los datos de las categorias del cliente.
function listadoAgregarCategorias(listado_id, categorias) {
    $.each(categorias, function () {
        var datos = $(this)["0"];

        listadoAgregarCategoria(listado_id, datos);

        // si la categoria existe en el filtro edito la descripcion
        if ($('#filtro-categoria option[value="' + datos.IdTipoPuntoInteres + '"]').length > 0) {
            // edito la descripcion (por si hay que actualizarla)
            $('#filtro-categoria option[value="' + datos.IdTipoPuntoInteres + '"]')["0"].text = datos.TipoPI_Descripcion;
        } else {
            // agrego la categoria al filtro de categorias
            $('#filtro-categoria').append('<option value="' + datos.IdTipoPuntoInteres + '">' + datos.TipoPI_Descripcion + '</option>');
        }
    });

    // refresco el listado
    $('#filtro-categoria').multipleSelect('refresh');
}

function listadoAgregarCategoria(listado_id, datos) {
    // agrego el header al listado
    var categoriaHTML = '';
    categoriaHTML += '<li class="item-lista hover-no-shadow active header-categoria" name="categoria_' + datos.IdTipoPuntoInteres + '">';
    categoriaHTML += '  <div class="header-categoria-container">';
    categoriaHTML += '    <span class="grilla-icono-parent">';
    categoriaHTML += '      <i class="material-icons grilla-icono-item" style="color:' + datos.TipoPI_Color + ';">';
    categoriaHTML += '      ' + datos.TipoPI_Icono;
    categoriaHTML += '      </i>';
    categoriaHTML += '    </span>';
    categoriaHTML += '    <div class="header-categoria-body">';
    categoriaHTML += '      <div name="valor_0" class="letra11">' + datos.TipoPI_Descripcion + '</div>';
    categoriaHTML += '          <div name="valor_2" class="valor_2">';
    categoriaHTML += '              <div class="mdc-form-field">';
    categoriaHTML += '                  <div class="mdc-checkbox">';
    categoriaHTML += '                      <input name="chk_agregar_al_mapa" type="checkbox" class="mdc-checkbox__native-control" value="' + datos.IdTipoPuntoInteres + '" />';
    categoriaHTML += '                      <div class="mdc-checkbox__background">';
    categoriaHTML += '                          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">';
    categoriaHTML += '                              <path class="mdc-checkbox__checkmark__path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />';
    categoriaHTML += '                          </svg>';
    categoriaHTML += '                          <div class="mdc-checkbox__mixedmark"></div>';
    categoriaHTML += '                      </div>';
    categoriaHTML += '                  </div>';
    categoriaHTML += '              <label name="label-para-mdc-checkbox-trigger-click" for="chk_agregar_al_mapa">En mapa</label>';
    categoriaHTML += '              </div>';
    categoriaHTML += '          </div>';
    categoriaHTML += '      </div>';
    categoriaHTML += '      <div style="right: 32px; position: absolute;">';
    categoriaHTML += '        <button name="collapseListadoIcono' + datos.IdTipoPuntoInteres + '" type="button" class="tcon tcon-menu--xbutterfly listado-item-boton-colapsable active" aria-label="toggle menu" style="padding: 0 3px;">';
    categoriaHTML += '          <span class="tcon-menu__lines" aria-hidden="true"></span>';
    categoriaHTML += '          <span class="tcon-visuallyhidden">toggle menu</span>';
    categoriaHTML += '        </button>';
    categoriaHTML += '      </div>';
    categoriaHTML += '    </div>';
    categoriaHTML += '  </div>';
    categoriaHTML += '  <div name="item-panel-ver-mas" class="header-categoria-btn-ver-mas">';
    categoriaHTML += '    <ul name="categoria_puntos" class="mdc-list listado-items mdc-list--avatar-list">';
    categoriaHTML += '    </ul>';
    categoriaHTML += '  </div>';
    categoriaHTML += '</li>';

    $(listado_id).prepend(categoriaHTML);
    transformicons.add(listado_id + ' button[name="collapseListadoIcono' + datos.IdTipoPuntoInteres + '"]');
}

function logistica_agregarItemRuta(listado, respuesta, controlador, agregarComo) {
    var emptyListItem = $("#for_clone_" + controlador);
    var items = respuesta.items;

    $.each(items, function (index, item) {
        item = item[0];
        var newListItem = emptyListItem.clone();

        $(newListItem).attr("id", "item_" + controlador + "_" + item.IdRuta);
        $(newListItem).attr("data-item", item.IdRuta);
        $(newListItem).attr("data-puntos", JSON.stringify(item.RutaPuntos));
        $(newListItem).attr("data-routing", item.RutaRouting);
        $(newListItem).attr("data-routing-configuracion", JSON.stringify(item.RoutingConfiguracion));
        $(newListItem).attr("data-color", item.RutaColor);
        $(newListItem).attr("data-descripcion", item.RutaNombre);
        var iconoContainer = $(newListItem).find("span[name='icono_ruta_container']");

        iconoContainer.css("background-color", item.RutaColor);
        if (item.RutaRouting == 1) {
            iconoContainer.prop("title", "Routing activado");
            $(newListItem).find("i[name='icono_ruta_routing']").addClass("RUTA_ROUTING_SI");
        } else {
            iconoContainer.prop("title", "Sin Routing");
            $(newListItem).find("i[name='icono_ruta_routing']").addClass("RUTA_ROUTING_NO");
        }

        var columnas_datos = $(newListItem).find("div[name='columnas_datos']");

        $(columnas_datos).find("div[name='valor_1']").empty().append(item.RutaNombre);

        var aLinkImprimir = $(columnas_datos).find("i.grilla-item-btn-imprimir").closest("a");
        var linkImprimirSinParametros = aLinkImprimir.attr("href");
        aLinkImprimir.attr("href", linkImprimirSinParametros + "&ruta=" + item.IdRuta);
        $(columnas_datos).find("i.listado-item-boton-editar").attr("data-item", item.IdRuta);
        var btnInstrucicones = $(columnas_datos).find("button.listado-item-boton-colapsable");
        btnInstrucicones.attr("data-item", item.IdRuta);
        btnInstrucicones.attr("data-routing", item.RutaRouting);
        if (btnInstrucicones.hasClass("boton-apagado")) {
            btnInstrucicones.removeClass("boton-apagado");
        }

        setTimeout(function () {
            transformicons.add('button.listado-item-boton-colapsable');
        }, 100);

        var btnBuscar = $(columnas_datos).find("i.listado-item-boton-buscar");
        btnBuscar.attr("data-item", item.IdRuta);
        if (!item.Ruta_EnMapa) {
            btnBuscar.addClass("boton-apagado");
        }

        var checkbox = $(columnas_datos).find("div[name='valor_2'] input[name='chk_agregar_al_mapa']");
        checkbox.val(item.IdRuta);
        checkbox.prop("checked", item.Ruta_EnMapa);

        if (typeof agregarComo === 'undefined') {
            $(newListItem).appendTo(listado).addClass("active");
        } else {
            switch (agregarComo) {
                case "nuevo":
                    $(newListItem).hide().prependTo(listado).addClass("active").fadeIn(1500);
                    break;
                case "editado":
                    var listadoItem = $(listado + " > li[id='item_" + controlador + "_" + item.IdRuta + "']");
                    $(newListItem).insertAfter($(listado + " > li:eq(" + listadoItem.index() + ")")).hide().addClass("active");
                    // animacion que remueve la ruta del listado
                    listadoItem.fadeOut(350, function () {
                        listadoItem.delay(100).next().fadeIn("slow");
                        listadoItem.remove();
                    });
                    break;
            }
        }

        // luego de que termina la animacion que remueve el item del listado, llamamos al checkbox que la agrega al mapa
        setTimeout(function () {
            checkbox.trigger("sin_centrar_sin_guardar");
        }, 700);

        var selectPuntosDesde = $(newListItem).find("select[name='instrucciones-desde']");
        $.each(item.RutaPuntos, function (index, punto) {
            var selected = "";
            if (index === 0) {
                selected = "selected";
            }

            selectPuntosDesde.append('<option data-id="' + punto.id + '" data-tipo-descripcion="' + punto.tipoPI_descripcion + '" data-icono="' + punto.icono + '" data-color="' + punto.color + '" data-descripcion="' + punto.descripcion + '" data-orden="' + (index + 1) + '" data-latitud="' + punto.latitud + '" data-longitud="' + punto.longitud + '" value="' + punto.id + '" ' + selected + '>' + (index + 1) + "-" + punto.descripcion + '</option>');
        });

        selectPuntosDesde.multipleSelect({
            selectAll: false,
            filter: true,
            single: true,
            minimumCountSelected: 4,
            countSelected: "Seleccionados # de %",
            allSelected: false,
            placeholder: "Desde",
            width: "90%"
        });

        var selectPuntosHasta = $(newListItem).find("select[name='instrucciones-hasta']");
        $.each(item.RutaPuntos, function (index, punto) {
            var selected = "";
            if (index === item.RutaPuntos.length - 1) {
                selected = "selected";
            }

            selectPuntosHasta.append('<option data-id="' + punto.id + '" data-tipo-descripcion="' + punto.tipoPI_descripcion + '" data-icono="' + punto.icono + '" data-color="' + punto.color + '" data-descripcion="' + punto.descripcion + '" data-orden="' + (index + 1) + '" data-latitud="' + punto.latitud + '" data-longitud="' + punto.longitud + '" value="' + punto.id + '" ' + selected + '>' + (index + 1) + "-" + punto.descripcion + '</option>');
        });

        selectPuntosHasta.multipleSelect({
            selectAll: false,
            filter: true,
            single: true,
            minimumCountSelected: 4,
            countSelected: "Seleccionados # de %",
            allSelected: false,
            placeholder: "Desde",
            width: "90%"
        });

        var checkboxIntermedios = $(newListItem).find("input[name='instrucciones-intermedios']");

        $(newListItem).find("button[name='btn-buscar-instrucciones']").on("click", function () {
            var parentPanel = $(newListItem).find("div[name='listado_de_instrucciones']");
            var loadingGif = parentPanel.find("div[name='rutaLoadigGif']");
            var buttonCaller = $(this);
            var liParent = parentPanel.closest("li");
            var chkEnMapaBusqueda = parentPanel.find('input[name="mostrarInstruccionesEnMapa"]');
            var busquedaEnMapa = chkEnMapaBusqueda.prop("checked");

            parentPanel.find('div[name="instrucciones-panel"]').remove();

            var instruccion_previa_en_mapa = getInstruccionEnMapa(item.IdRuta);
            if (instruccion_previa_en_mapa) {
                quitarInstruccionDelMapa(item.IdRuta);
            }

            buttonCaller.prop("disabled", true);
            loadingGif.css("display", "flex");

            var puntoDesde = selectPuntosDesde.find('option[data-orden="' + (selectPuntosDesde.multipleSelect('getSelects', 'text')[0]).split('-')[0] + '"]');
            var puntoHasta = selectPuntosHasta.find('option[data-orden="' + (selectPuntosHasta.multipleSelect('getSelects', 'text')[0]).split('-')[0] + '"]');
            var traerIntermedios = checkboxIntermedios.prop("checked");
            var puntosInstruccion = [];

            var puntoPartida = {};
            puntoPartida.latitud = puntoDesde.attr("data-latitud");
            puntoPartida.longitud = puntoDesde.attr("data-longitud");
            puntoPartida.orden = puntoDesde.attr("data-orden");
            puntoPartida.descripcion = puntoDesde.attr("data-descripcion");
            puntoPartida.color = puntoDesde.attr("data-color");
            puntoPartida.icono = puntoDesde.attr("data-icono");
            puntoPartida.tipoDescripcion = puntoDesde.attr("data-tipo-descripcion");
            puntoPartida.id = puntoDesde.attr("data-id");

            puntosInstruccion.push(puntoPartida);

            if (traerIntermedios) {
                var puntoActualOrden;
                var puntoIntermedio;
                if (parseInt(puntoDesde.attr("data-orden")) < parseInt(puntoHasta.attr("data-orden"))) {
                    puntoActualOrden = parseInt(puntoDesde.attr("data-orden")) + 1;

                    while (parseInt(puntoActualOrden) < parseInt(puntoHasta.attr("data-orden"))) {
                        puntoIntermedio = selectPuntosDesde.find('option[data-orden="' + puntoActualOrden + '"]');
                        puntoDatos = {};
                        puntoDatos.latitud = puntoIntermedio.attr("data-latitud");
                        puntoDatos.longitud = puntoIntermedio.attr("data-longitud");
                        puntoDatos.orden = puntoIntermedio.attr("data-orden");
                        puntoDatos.descripcion = puntoIntermedio.attr("data-descripcion");
                        puntoDatos.color = puntoIntermedio.attr("data-color");
                        puntoDatos.icono = puntoIntermedio.attr("data-icono");
                        puntoDatos.tipoDescripcion = puntoIntermedio.attr("data-tipo-descripcion");
                        puntoDatos.id = puntoIntermedio.attr("data-id");

                        puntosInstruccion.push(puntoDatos);

                        puntoActualOrden++;
                    }
                } else {
                    puntoActualOrden = parseInt(puntoDesde.attr("data-orden")) - 1;

                    while (parseInt(puntoActualOrden) > parseInt(puntoHasta.attr("data-orden"))) {
                        puntoIntermedio = selectPuntosDesde.find('option[data-orden="' + puntoActualOrden + '"]');
                        puntoDatos = {};
                        puntoDatos.latitud = puntoIntermedio.attr("data-latitud");
                        puntoDatos.longitud = puntoIntermedio.attr("data-longitud");
                        puntoDatos.orden = puntoIntermedio.attr("data-orden");
                        puntoDatos.descripcion = puntoIntermedio.attr("data-descripcion");
                        puntoDatos.color = puntoIntermedio.attr("data-color");
                        puntoDatos.icono = puntoIntermedio.attr("data-icono");
                        puntoDatos.tipoDescripcion = puntoIntermedio.attr("data-tipo-descripcion");
                        puntoDatos.id = puntoIntermedio.attr("data-id");

                        puntosInstruccion.push(puntoDatos);

                        puntoActualOrden--;
                    }
                }
            }

            var puntoFinal = {};
            puntoFinal.latitud = puntoHasta.attr("data-latitud");
            puntoFinal.longitud = puntoHasta.attr("data-longitud");
            puntoFinal.orden = puntoHasta.attr("data-orden");
            puntoFinal.descripcion = puntoHasta.attr("data-descripcion");
            puntoFinal.color = puntoHasta.attr("data-color");
            puntoFinal.icono = puntoHasta.attr("data-icono");
            puntoFinal.tipoDescripcion = puntoHasta.attr("data-tipo-descripcion");
            puntoFinal.id = puntoHasta.attr("data-id");

            puntosInstruccion.push(puntoFinal);

            var opciones = "fastest;car;traffic:enabled";
            if (item.RutaRouting == 1) {
                opciones = item.RoutingConfiguracion.modo + ";" + item.RoutingConfiguracion.vehiculo + ";traffic:" + item.RoutingConfiguracion.trafico + ";" + item.RoutingConfiguracion.evitar.join();
            }

            var onSuccess = function (ruta, instrucciones) {
                $.each(instrucciones, function (index, item) {
                    var newPanel = $('div[name="for_clone_instrucciones"]').clone();

                    if (index === 0) {
                        newPanel.find('div[name="instrucciones_botonera"]').css("display", "flex");

                        // boton limpiar instrucciones
                        var limpiarInstrucciones = newPanel.find('i[name="boton-quitar-del-mapa"]');
                        limpiarInstrucciones.on('click', function () {
                            quitarInstruccionDelMapa(ruta);
                            $(liParent).find('div[name="instrucciones-panel"]').empty();
                        });

                        // Agregar instrucciones buscadas al mapa
                        var instruccionObject = {
                            "instruccion": ruta,
                            "polyline": false,
                            "arrows": false,
                            "puntos": []
                        };

                        var array_local_puntos_instruccion = [];
                        $.each(puntosInstruccion, function (index, punto) {
                            var punto_en_mapa = getPuntoEnMapa(punto.id);
                            if (!punto_en_mapa) {
                                var nuevo_punto = agregarPuntoAlMapa(punto);
                                array_local_puntos_instruccion.push(nuevo_punto);
                            } else {
                                array_local_puntos_instruccion.push(punto_en_mapa);
                            }

                            if (agregarRelacionPunto("instrucciones", ruta, punto.id, {
                                    "color": "black",
                                    "orden": punto.orden
                                })) {
                                instruccionObject.puntos.push(punto.id);
                            }
                        });

                        var camino_puntos = [];
                        $.each(instrucciones, function (index, item) {
                            $.each(item.indicaciones, function (f, indicacion) {
                                $.each(indicacion.camino, function (h, coordenadas) {
                                    var coord = coordenadas.split(',');
                                    camino_puntos.push({
                                        lat: coord[0],
                                        lng: coord[1]
                                    });
                                });
                            });
                        });

                        var nuevaPolylineRouting = new L.Polyline(camino_puntos, {
                            color: "black",
                            weight: "12",
                            opacity: "0.2",
                            smoothFactor: 3
                        });

                        var polylineArrows = L.polylineDecorator(nuevaPolylineRouting, {
                            patterns: [{
                                offset: '5%',
                                repeat: '5%',
                                symbol: L.Symbol.marker({
                                    rotate: true,
                                    markerOptions: {
                                        icon: L.icon({
                                            iconUrl: base_url + "/images/arrows/arrow.png",
                                            iconSize: [14, 8],
                                            iconAnchor: [7, 4]
                                        })
                                    }
                                })
                            }]
                        }).addTo(modulo_mapa);

                        nuevaPolylineRouting.addTo(modulo_mapa);

                        instruccionObject.polyline = nuevaPolylineRouting;
                        instruccionObject.arrows = polylineArrows;

                        mapa_instrucciones_array.push(instruccionObject);

                        centrarMapaEn_LatitudLongitudArray(nuevaPolylineRouting.getLatLngs());
                        // Fin agregar instrucciones al mapa

                        newPanel.on("remove", function (e) {
                            var instruccion_previa_en_mapa = getInstruccionEnMapa(ruta);
                            if (instruccion_previa_en_mapa) {
                                quitarInstruccionDelMapa(ruta);
                            }
                        });
                    }

                    newPanel.attr("name", "instrucciones-panel");

                    var iconoPartida = '';
                    iconoPartida += '<i name="icono_instruccion_punto" title="Categoria: ' + item.partida.tipoDescripcion + '" class="material-icons tooltip_sub_item grilla-icono-item" style="color:' + item.partida.color + ';">';
                    iconoPartida += '  ' + item.partida.icono;
                    iconoPartida += '</i>';

                    newPanel.find('div[name="partida-icono"]').append(iconoPartida);
                    newPanel.find('div[name="partida-descripcion"]').text(item.partida.orden + "-" + item.partida.descripcion);
                    newPanel.find('div[name="partida-ubicacion"]').text(item.partida.ubicacion);

                    var iconoDestino = '';
                    iconoDestino += '<i name="icono_instruccion_punto" title="Categoria: ' + item.destino.tipoDescripcion + '" class="material-icons tooltip_sub_item grilla-icono-item" style="color:' + item.destino.color + ';">';
                    iconoDestino += '  ' + item.destino.icono;
                    iconoDestino += '</i>';

                    newPanel.find('div[name="destino-icono"]').append(iconoDestino);
                    newPanel.find('div[name="destino-descripcion"]').text(item.destino.orden + "-" + item.destino.descripcion);
                    newPanel.find('div[name="destino-ubicacion"]').text(item.destino.ubicacion);

                    var listadoInstrucciones = newPanel.find('div[name="instrucciones_listado"]');
                    $.each(item.indicaciones, function (index, indicacion) {
                        var newInstruccion = $(newPanel).find('div[name="for_clone_instruccion"]').clone();

                        newInstruccion.attr("name", "intruccion_" + index);
                        newInstruccion.find('div[name="instruccion_icono"] > span').addClass(indicacion.accion);
                        newInstruccion.find('div[name="instruccion_texto"]').append(indicacion.instruccion);
                        newInstruccion.appendTo(listadoInstrucciones).css("display", "flex");
                        newInstruccion.on("click", function () {
                            centrarMapaEn_LatitudLongitud(indicacion.coordenadas.latitud, indicacion.coordenadas.longitud);
                            setTimeout(function () {
                                showTouchMapAnimado(indicacion.coordenadas.latitud, indicacion.coordenadas.longitud);
                            }, 200);
                        });
                    });

                    newPanel.appendTo(parentPanel).css("display", "flex").css("opacity", 0).animate({
                        opacity: 1
                    }, 1000);
                });

                inicializar_tooltip(listado + ' .tooltip_sub_item', 200, 500, 0);

                setTimeout(function () {
                    var checkboxNuevaBusqueda = parentPanel.find('input[name="mostrarInstruccionesEnMapa"]');
                    checkboxNuevaBusqueda.prop("checked", busquedaEnMapa);
                    if (busquedaEnMapa) {
                        checkboxNuevaBusqueda.trigger("change");
                    }
                }, 100);
            };

            var onError = function (respuesta) {
                if (typeof respuesta !== 'undefined') {
                    mensaje(respuesta.mensaje, 10000);
                }
            };

            var onComplete = function () {
                loadingGif.css("display", "none");
                buttonCaller.prop("disabled", false);
            };

            getInstruccionesRuta(item.IdRuta, puntosInstruccion, opciones, onSuccess, onError, onComplete);
        });
    });

    inicializar_tooltip(listado + ' .tooltip_item', 200, 500, 0);
}

function logistica_agregarItemRecorrido(listado, respuesta, controlador, agregarComo) {
    var emptyListItem = $("#for_clone_" + controlador);
    var items = respuesta.items;

    // datos para agregar
    var listadoHTML = '';

    // plantilla de un item
    // --------------------
    var newListItem = emptyListItem.clone();
    newListItem.addClass("active");
    // datos para modificar del item
    // -----------------------------
    var dato_icono = $(newListItem).find('div[name="icono"]>i');
    var dato_descripcion = $(newListItem).find('div[name="descripcion"]');
    var dato_estado = $(newListItem).find('div[name="estado"]>i');
    var dato_editar = $(newListItem).find('i.listado-item-boton-editar');
    var dato_enviar_whatsapp = $(newListItem).find('.listado-item-boton-enviar-whatsapp');
    var dato_colapsable = $(newListItem).find('button.listado-item-boton-colapsable');
    // datos del panel colapsable
    var dato_fecha_desde = $(newListItem).find('input[name="seguimiento-fecha-desde"]');
    var dato_fecha_hasta = $(newListItem).find('input[name="seguimiento-fecha-hasta"]');
    var dato_boton_limpiar = $(newListItem).find('button[name="btn-limpiar-recorrido"]');
    var dato_boton_buscar = $(newListItem).find('button[name="btn-actualizar-recorrido"]');

    var ultimo_item_agregado = -1;
    // guardamos items que tienen tooltip para inicializar luego de agregarlos al listado
    var tooltip_recorridos_nuevos = [];
    // para cada item nuevo recibido
    $.each(items, function (index, item) {
        tooltip_recorridos_nuevos.push(item.IdRecorrido);

        $(newListItem).attr("id", "item_" + controlador + "_" + item.IdRecorrido);
        $(newListItem).attr("data-item", item.IdRecorrido);

        dato_icono.attr('name', 'recorrido_icono_' + item.IdRecorrido);
        dato_icono.empty().append(item.RecorridoRepeticion == 1 ? "autorenew" : "call_made");
        if (item.RecorridoRepeticion == 1) {
            dato_icono.attr('title', 'el movil debe hacer el recorrido los dias seleccionados entre la hora desde y la hora hasta');
        } else {
            dato_icono.attr('title', 'el movil debe hacer el recorrido por unica vez entre la fecha-hora desde y la fecha-hora hasta');
        }

        dato_descripcion.empty().append(item.RecorridoDescripcion);

        dato_estado.removeClass();
        dato_estado.addClass('material-icons ' + item.RecorridoEstado.estado);
        dato_estado.attr('name', "recorrido_estado_" + item.IdRecorrido);
        dato_estado.attr('data-recorrido-estado', item.RecorridoEstado.estado);
        dato_estado.attr('data-movil-icono', item.RecorridoMoviles[0].icono);
        dato_estado.attr('data-movil-nombre', item.RecorridoMoviles[0].nombre);
        dato_estado.attr('data-movil-dominio', item.RecorridoMoviles[0].dominio);
        dato_estado.attr('data-ruta-descripcion', item.RutaDescripcion);
        dato_estado.attr('data-ruta-routing', item.RutaRouting);
        dato_estado.attr('data-fecha-desde', item.RecorridoFechaDesde);
        dato_estado.attr('data-fecha-hasta', item.RecorridoFechaHasta);
        dato_estado.attr('data-hora-desde', item.RecorridoHoraDesde);
        dato_estado.attr('data-hora-hasta', item.RecorridoHoraHasta);
        dato_estado.attr('data-repeticion', item.RecorridoRepeticion);
        dato_estado.attr('data-dias', item.RecorridoDias);

        dato_editar.attr('data-item', item.IdRecorrido);
        dato_enviar_whatsapp.attr('data-item', item.IdRecorrido);

        dato_colapsable.attr('name', 'boton_colapsable_' + item.IdRecorrido);

        // datos del panel colapsable
        var desdeFormat = item.RecorridoFechaDesde.split("/");
        var hastaFormat = item.RecorridoFechaHasta.split("/");
        dato_fecha_desde.attr('value', desdeFormat[2] + "-" + desdeFormat[1] + "-" + desdeFormat[0]);
        dato_fecha_hasta.attr('value', hastaFormat[2] + "-" + hastaFormat[1] + "-" + hastaFormat[0]);

        dato_boton_limpiar.attr('name', 'recorrido_boton_limpiar_' + item.IdRecorrido);
        dato_boton_limpiar.attr('fecha-desde', desdeFormat[2] + "-" + desdeFormat[1] + "-" + desdeFormat[0]);
        dato_boton_limpiar.attr('fecha-hasta', hastaFormat[2] + "-" + hastaFormat[1] + "-" + hastaFormat[0]);

        dato_boton_buscar.attr('name', 'recorrido_boton_buscar_' + item.IdRecorrido);

        listadoHTML += newListItem[0].outerHTML;
        ultimo_item_agregado = item.IdRecorrido;
    });

    // agregar items al listado
    if (typeof agregarComo === 'undefined') {
        $(listadoHTML).appendTo(listado);
    } else {
        switch (agregarComo) {
            case "nuevo":
                $(listadoHTML).hide().prependTo(listado).fadeIn(1500);
                break;
            case "editado":
                var listadoItem = $(listado + " li[id='item_" + controlador + "_" + ultimo_item_agregado + "']");
                $(listadoHTML).insertAfter(listadoItem).hide();
                listadoItem.fadeOut(350, function () {
                    listadoItem.delay(100).next().fadeIn("slow");
                    listadoItem.remove();
                });
                break;
        }
    }

    // inicializar tooltips de los items agregados
    tooltip_recorridos_nuevos.forEach(function (item) {
        $('button[name="recorrido_boton_limpiar_' + item + '"]').on("click", function () {
            var buttonCaller = $(this);
            var liParent = buttonCaller.closest("li");
            var parentPanel = liParent.find("div[name='historial_recorrido']");

            parentPanel.find("div[name^='movil_']").remove();
            liParent.find("input[name='seguimiento-fecha-desde']").val(buttonCaller.attr('fecha-desde'));
            liParent.find("input[name='seguimiento-fecha-hasta']").val(buttonCaller.attr('fecha-hasta'));
        });

        $('button[name="recorrido_boton_buscar_' + item + '"]').on("click", function () {
            var buttonCaller = $(this);
            var liParent = buttonCaller.closest("li");
            var parentPanel = liParent.find("div[name='historial_recorrido']");
            var loadingGif = parentPanel.find("div[name='historialLoadigGif']");

            parentPanel.find("div[name^='movil_']").remove();
            buttonCaller.prop("disabled", true);
            loadingGif.css("display", "flex");

            var fechaDesdeAplicada = liParent.find('input[name="seguimiento-fecha-desde"]').val();
            var fechaHastaAplicada = liParent.find('input[name="seguimiento-fecha-hasta"]').val();

            var onSuccess = function (respuesta) {
                if (respuesta.estado === 1) {
                    $.each(respuesta.grillas, function (index, datos) {
                        var newGrilla = $("div[name='grilla_movil_clone']").clone();

                        $(newGrilla).attr("name", "movil_" + datos.movil.id);
                        $(newGrilla).find("div[name='movil_nombre']").text(datos.movil.nombre + " / " + datos.movil.dominio);
                        $(newGrilla).find("div[name='ruta_nombre']").text(datos.ruta.nombre);

                        // boton imprimir
                        var aLinkImprimir = $(newGrilla).find('a[name="btn-imprimir-informe-recorrido-historico"]');
                        aLinkImprimir.attr("href", aLinkImprimir.attr("href") + "&recorrido=" + item + "&desde=" + fechaDesdeAplicada + "&hasta=" + fechaHastaAplicada);

                        // boton limpiar recorrido buscado
                        var limpiarRecorridoBuscado = newGrilla.find('i[name="boton-quitar-del-mapa"]');
                        limpiarRecorridoBuscado.on('click', function () {
                            $(liParent).find('div[name="historial_recorrido"] div[name^="movil_"]').remove();
                        });

                        // agregar movil al mapa
                        $(newGrilla).on('change', 'input[name="chk_trigger_agregar_al_mapa_movil"]', function () {
                            // trigger agregar al mapa movil
                            var chkEnMapa = $('ul#listado-moviles li#item_movil_' + datos.movil.id).find('input[name="chk_agregar_al_mapa"]');
                            if (chkEnMapa.length > 0) {
                                chkEnMapa.click();
                            } else {
                                mensaje("ALERTA: MOVIL NO ENCONTRADO");
                            }
                        });

                        // agregar historico al mapa
                        // flag que alterna entre agregar y quitar el historico
                        var flag_toggle_historico = true;
                        $(newGrilla).on('change', 'input[name="chk_trigger_agregar_al_mapa_historico"]', function () {
                            var liParentMovil = $('ul#listado-moviles li#item_movil_' + datos.movil.id);
                            var btnVerMasMovil = liParentMovil.find('button.listado-item-boton-colapsable');

                            if (liParentMovil.length > 0) {
                                // si hay que agregar el historico del movil al mapa
                                if (flag_toggle_historico) {
                                    // mostrar el panel "ver mas, del movil"                                    
                                    if (btnVerMasMovil.length > 0 && !btnVerMasMovil.hasClass('tcon-transform')) {
                                        btnVerMasMovil.click();
                                    }

                                    // setear fechas desde y hasta
                                    liParentMovil.find('input[name="movil-historico-fecha-desde"]').val(fechaDesdeAplicada);
                                    liParentMovil.find('input[name="movil-historico-fecha-hasta"]').val(fechaHastaAplicada);
                                    liParentMovil.find('input[name="movil-historico-hora-desde"]').val("00:05");
                                    liParentMovil.find('input[name="movil-historico-hora-hasta"]').val("23:55");

                                    // buscar historico del movil
                                    var btnBuscarRecorridoHistorico = liParentMovil.find('button[name="btn-buscar-recorrido"]');
                                    if (btnBuscarRecorridoHistorico.length > 0) {
                                        btnBuscarRecorridoHistorico.click();
                                    }
                                } else {
                                    // ocultar el panel "ver mas, del movil"
                                    if (btnVerMasMovil.length > 0 && btnVerMasMovil.hasClass('tcon-transform')) {
                                        btnVerMasMovil.click();
                                    }

                                    // quitar el historico del movil si esta dibujado
                                    var btnQuitarRecorridoHistorico = liParentMovil.find('i[name="boton-quitar-del-mapa"]');
                                    if (btnQuitarRecorridoHistorico.length > 0) {
                                        btnQuitarRecorridoHistorico.click();
                                    }
                                }

                                flag_toggle_historico = !flag_toggle_historico;
                            } else {
                                mensaje("ALERTA: MOVIL NO ENCONTRADO");
                            }
                        });

                        // agregar ruta al mapa
                        $(newGrilla).on('change', 'input[name="chk_trigger_agregar_al_mapa_ruta"]', function () {
                            // trigger agregar al mapa movil
                            var chkEnMapa = $('ul#listado-rutas li#item_ruta_' + datos.ruta.id).find('input[name="chk_agregar_al_mapa"]');
                            if (chkEnMapa.length > 0) {
                                chkEnMapa.click();
                            } else {
                                mensaje("ALERTA: RUTA NO ENCONTRADA");
                            }
                        });

                        var panelFechas = $(newGrilla).find("div[name='fechas']");
                        recorridoAgregarFechasAlPanel({
                            panel: panelFechas,
                            fechas: datos.fechas
                        });

                        $(newGrilla).appendTo(parentPanel).css("display", "flex").css("opacity", 0).animate({
                            opacity: 1
                        }, 1000);
                    });

                    inicializar_tooltip(listado + ' .tooltip_sub_item', 200, 500, 0);
                }
            };

            var onError = function (respuesta) {
                if (typeof respuesta !== 'undefined') {
                    mensaje(respuesta.mensaje, 10000);
                }
            };

            var onComplete = function () {
                loadingGif.css("display", "none");
                buttonCaller.prop("disabled", false);
            };

            recorridoLeerHistorial(liParent.attr('data-item'), fechaDesdeAplicada, fechaHastaAplicada, onSuccess, onError, onComplete);
        });

        transformicons.add('button[name="boton_colapsable_' + item + '"]');

        inicializar_tooltip('i[name="recorrido_icono_' + item + '"]', 200, 500, 0);

        $('i[name="recorrido_estado_' + item + '"]').tooltipster({
            theme: 'tooltipster-light',
            side: ['right', 'top', 'bottom', 'left'],
            distance: -2,
            trigger: 'custom',
            triggerOpen: {
                click: true,
                touchstart: true,
                tap: false,
                mouseenter: false
            },
            triggerClose: {
                click: true,
                originClick: true,
                scroll: true,
                touchleave: true,
                tap: true,
                mouseleave: false
            },
            interactive: false,
            maxWidth: 280,
            content: 'Cargando...',
            functionBefore: function (instance, helper) {
                var $origin = $(helper.origin);

                var tooltip_plantilla = $('div[name="tooltip_recorrido_estado_for_clone"').clone();
                tooltip_plantilla.attr('name', 'tooltip_item');

                // movil
                tooltip_plantilla.find('i[name="movil-icono"]').addClass('MOVIL_ICONO_' + $($origin).attr('data-movil-icono'));
                tooltip_plantilla.find('span[name="descripcion-movil"]').text($($origin).attr('data-movil-nombre') + ' / ' + $($origin).attr('data-movil-dominio'));

                // ruta 
                tooltip_plantilla.find('i[name="ruta-icono"]').addClass('RUTA_ROUTING_' + (($($origin).attr('data-ruta-routing') == 1) ? "SI" : "NO"));
                tooltip_plantilla.find('span[name="descripcion-ruta"]').text($($origin).attr('data-ruta-descripcion'));

                // fechas
                tooltip_plantilla.find('span[name="valor-fecha-desde"]').text($($origin).attr('data-fecha-desde'));
                tooltip_plantilla.find('span[name="valor-fecha-hasta"]').text($($origin).attr('data-fecha-hasta'));

                // horas
                tooltip_plantilla.find('span[name="valor-hora-desde"]').text($($origin).attr('data-hora-desde'));
                tooltip_plantilla.find('span[name="valor-hora-hasta"]').text($($origin).attr('data-hora-hasta'));

                // dias
                var flag_repeticion = $($origin).attr('data-repeticion') == 1;
                tooltip_plantilla.find('i[name="dias-icono"]').append(flag_repeticion ? "autorenew" : "call_made");
                if (!flag_repeticion) {
                    tooltip_plantilla.find('span[name="descripcion-repeticion"]').text('SIN REPETICION:');
                    tooltip_plantilla.find('span[name="valor-repeticion"]').text('el movil debe hacer el recorrido por unica vez entre la fecha-hora desde y la fecha-hora hasta');
                } else {
                    tooltip_plantilla.find('span[name="descripcion-repeticion"]').text('REPETICION:');
                    tooltip_plantilla.find('span[name="valor-repeticion"]').text('el movil debe hacer el recorrido los dias seleccionados entre la hora desde y la hora hasta');
                    tooltip_plantilla.find('div.dia-repeticion-container').addClass('activada');
                    var dias = $($origin).attr('data-dias');
                    if (dias.indexOf('L') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="lunes"]').addClass('activo');
                    }
                    if (dias.indexOf('M') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="martes"]').addClass('activo');
                    }
                    if (dias.indexOf('X') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="miercoles"]').addClass('activo');
                    }
                    if (dias.indexOf('J') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="jueves"]').addClass('activo');
                    }
                    if (dias.indexOf('V') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="viernes"]').addClass('activo');
                    }
                    if (dias.indexOf('S') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="sabado"]').addClass('activo');
                    }
                    if (dias.indexOf('D') >= 0) {
                        tooltip_plantilla.find('div.dia-repeticion[name="domingo"]').addClass('activo');
                    }
                }

                // estado
                var recorrido_estado = $($origin).attr('data-recorrido-estado');
                tooltip_plantilla.find('i[name="estado-icono"]').addClass(recorrido_estado);
                switch (recorrido_estado) {
                    case "RECORRIDO_ESPERANDO":
                        tooltip_plantilla.find('span[name="descripcion-recorrido-estado"]').text('ESPERANDO:');
                        tooltip_plantilla.find('span[name="valor-recorrido-estado"]').text('el movil debera hacer el recorrido mas tarde');
                        break;
                    case "RECORRIDO_ACTIVO":
                        tooltip_plantilla.find('span[name="descripcion-recorrido-estado"]').text('ACTIVO:');
                        tooltip_plantilla.find('span[name="valor-recorrido-estado"]').text('en este momento el movil debe hacer el recorrido');
                        break;
                    case "RECORRIDO_FINALIZADO":
                        tooltip_plantilla.find('span[name="descripcion-recorrido-estado"]').text('FINALIZADO:');
                        tooltip_plantilla.find('span[name="valor-recorrido-estado"]').text('el movil ya no debe hacer este recorrido');
                        break;
                }

                instance.content(tooltip_plantilla);
            }
        });
    });
}

// pega las fechas recibidas a un panel de fechas de un recorrido,
// si la fecha ya existia en el panel, quita la anterior y pega la nueva.
function recorridoAgregarFechasAlPanel(data_obj) {
    var panelFechas = data_obj.panel;
    var container = data_obj.container;

    $.each(data_obj.fechas, function (index, fecha) {
        var newRangoFechas = panelFechas.find("div[name='fecha_clone']").clone();
        newRangoFechas.attr("name", "fecha_" + index);

        var rangoDesde = newRangoFechas.find("div[name='rango_desde']");
        rangoDesde.attr('data-desde', fecha.desde.fecha);
        rangoDesde.find("div[name='dia']").text(fecha.desde.dia);
        rangoDesde.find("div[name='fecha']").text(fecha.desde.fecha);

        var rangoHasta = newRangoFechas.find("div[name='rango_hasta']");
        rangoHasta.attr('data-hasta', fecha.hasta.fecha);
        rangoHasta.find("div[name='dia']").text(fecha.hasta.dia);
        rangoHasta.find("div[name='fecha']").text(fecha.hasta.fecha);

        var panelReportes = newRangoFechas.find('div[name="reportes_listado"]');
        $.each(fecha.reportes, function (f, reporte) {
            var newReporte = panelReportes.find('div[name="reporte_for_clone"]').clone();
            newReporte.attr('name', 'reporte_' + f);
            newReporte.addClass('recorrido_reporte');
            newReporte.attr('data-estado', reporte.completado.estado);

            // orden interno
            newReporte.attr('data-orden', reporte.completado.orden + 1);
            // orden para mostrar
            newReporte.find('div[name="orden"]').text(reporte.completado.orden + 1);

            var iconoHTML = '';
            iconoHTML += '<i name="icono_reporte_punto" title="Categoria: ' + reporte.PI_TipoPI_Descripcion + '" class="material-icons tooltip_sub_item grilla-icono-item" style="color:' + reporte.PI_Color + ';">';
            iconoHTML += '  ' + reporte.PI_Icono;
            iconoHTML += '</i>';

            newReporte.find("div[name='icono']").append(iconoHTML);
            newReporte.find("div[name='descripcion']").text(reporte.PI_Descripcion);
            newReporte.find("div[name='dia']").text(reporte.completado.dia);
            newReporte.find("div[name='fecha']").text(reporte.completado.fecha);

            if (!reporte.completado.estado) {
                newReporte.css("background-color", "#ffdcdc");
            } else {
                newReporte.css("background-color", "rgba(184, 218, 184, 0.52)");
            }

            $(newReporte).appendTo(panelReportes).css("display", "flex");

            newReporte.on("click", function () {
                centrarMapaEn_LatitudLongitud(reporte.PI_Latitud, reporte.PI_Longitud);
                setTimeout(function () {
                    showTouchMapAnimado(reporte.PI_Latitud, reporte.PI_Longitud);
                }, 200);
            });
        });

        // si hay un container 
        if (typeof container !== 'undefined') {
            // Es una actualizacion de la fecha que ya estaba previamente cargada
            $(newRangoFechas).insertAfter(container).css("display", "flex").hide();
            container.fadeOut(350, function () {
                container.delay(100).next().fadeIn("slow");
                container.remove();
            });
        } else {
            // Si no hay un container, es un ingreso nuevo
            $(newRangoFechas).appendTo(panelFechas).css("display", "flex");
        }
    });
}

// trae los datos de los reportes de los moviles del recorrido entre las fechas desde y hasta recibidas.
function recorridoLeerHistorial(recorrido, desde, hasta, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    $.ajax({
        url: 'index.php?r=recorrido/historial',
        data: {
            recorrido: recorrido,
            desde: desde,
            hasta: hasta
        },
        type: 'POST',
        dataType: 'JSON',
        success: function (respuesta) {
            if (respuesta.estado === 1) {
                onSuccessCallBack(respuesta);
            } else {
                if (typeof onErrorCallBack !== 'undefined') {
                    onErrorCallBack(respuesta);
                }
            }
        },
        error: function () {
            if (typeof onErrorCallBack !== 'undefined') {
                var respuesta = {};
                respuesta.mensaje = "ERROR: NO SE PUDO LEER LOS REPORTES DEL RECORRIDO, INTENTE CON UN RANGO DE FECHAS MAS CORTO";
                onErrorCallBack(respuesta);
            }
        },
        complete: function () {
            if (typeof onCompleteCallBack !== 'undefined') {
                onCompleteCallBack();
            }
        }
    });
}

/* /FUNCIONES PARA AGREGAR ITEMS A LOS LISTADOS */

/* ------------------------------ */
/* FUNCIONES PARA MANEJO DE ITEMS */
/* ------------------------------ */

// busca los items de un listado en el servidor
function buscarItems(listado, controlador, filtros, clear, offset, onCompleteCallBack) {
    filtros.filtros.offset = {
        "tipo": "offset",
        "valor": offset
    };

    $(listado).attr("data-buscando", true);
    $.ajax({
        url: "index.php?r=" + controlador + "/buscarItems",
        data: filtros,
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado == 1) {
                if (clear) {
                    $(listado).empty();
                }

                // sabe como agregar un item a un listado
                agregarItemListado(listado, respuesta, controlador);
            } else {
                mensaje("ERROR: AL ACTUALIZAR ITEMS", 10000);
            }
        },
        error: function () {
            mensaje("ERROR: AL ACTUALIZAR ITEMS", 10000);
        },
        complete: function () {
            $(listado).attr("data-buscando", false);
            onCompleteCallBack();
        }
    });
}

// carga mas items al listado
function verMasItems(grilla, controlador, filtro) {
    // si no estoy buscando, puedo buscar
    if ($(grilla).attr("data-buscando") === "false" && $(grilla).attr("data-viendomas") === "false") {
        var functionCallBack = function () {
            setTimeout(function () {
                // ocultar loading gif
                $("#ver_mas_gif_loading").remove();

                $(grilla).attr("data-viendomas", false);
            }, 500); // cada cuento tiempo puedo volver a traer mas items
        };

        // logica para traer items
        var offsetItems = $(grilla).find("li").length;
        $(grilla).attr("data-viendomas", true);
        buscarItems(grilla, controlador, filtro, false, offsetItems, functionCallBack);

        // loading gif
        var loadingHTML = '';
        loadingHTML += '  <div id="ver_mas_gif_loading" style="opacity: 0; height: 0px; top:-10px; display: flex; align-items: center; justify-content: center; position: relative;">';
        loadingHTML += '    <svg style="background-color: rgba(255, 255, 255, 0.85); border-radius: 50%; height: 0px; width: 0px;" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-eclipse mdc-elevation--z7">';
        loadingHTML += '      <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 44 0 0 1 10 50" fill="var(--color-acentuado)" transform="rotate(59.6335 50 52)">';
        loadingHTML += '        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 52;360 50 52" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>';
        loadingHTML += '    </path>';
        loadingHTML += '    </svg>';
        loadingHTML += '  </div>';

        // incertar el loading gif
        $(loadingHTML).insertAfter(grilla);

        // mostrar el loading gif
        $("#ver_mas_gif_loading").animate({
            top: "-45px",
            opacity: 1
        }, 220);
        $("#ver_mas_gif_loading > svg").animate({
            width: 40,
            height: 40
        }, 220);
    }
}

// traer informacion de un item de un listado y mostrarlo
function listadoCargarItem(controlador, panel, item) {
    var panelID = "panel-" + controlador + "-abm";
    var panelTitulo = "CARGAR " + controlador.toUpperCase();
    var panelParent = "panel-" + panel;
    var panelControlador = controlador;
    var panelMetodo = "get" + controlador;
    var panelItem = item;

    mostrarPanel(
        panelID,
        panelTitulo,
        panelParent,
        panelControlador,
        panelMetodo,
        panelItem);
}

// mostrar el wizard para importar items a un listado
function listadoImportarItem(controlador, panel) {
    var panelID = "panel-" + controlador + "-importar";
    var panelTitulo = "IMPORTADOR";
    var panelParent = "panel-" + panel;
    var panelControlador = controlador;
    var panelMetodo = "importador";
    var panelItem = "";

    // se ejecuta cuando el panel se agrega al DOM y antes de dibujar el HTML de su contenido
    var panelAgregadoAlDOM = function () {
        // ancho al agregarlo
        var ancho_original = $('div[id="celda-izquierda"]').width();
        if (ancho_original < 670) {
            $('div[id="celda-izquierda"]').width(670);

            // si modificamos el ancho original,
            // lo restauramos al valor original al cerrar el importador
            $('div[id="' + panelID + '"]').on('remove', function () {
                $('div[id="celda-izquierda"]').width(ancho_original);

                // siempre que se cambia el "size" de la celda izquierda, 
                // actualizamos las propiedades del mapa
                refrescarTamanioDelMapa();
            });

            // siempre que se cambia el "size" de la celda izquierda, 
            // actualizamos las propiedades del mapa
            refrescarTamanioDelMapa();
        }
    };

    mostrarPanel(
        panelID,
        panelTitulo,
        panelParent,
        panelControlador,
        panelMetodo,
        panelItem,
        panelAgregadoAlDOM);
}

// agregar un item desde el servidor a un listado
function agregarItemLista(grilla, controlador, item) {
    $.ajax({
        url: "index.php?r=" + controlador + "/buscarItems",
        data: {
            item: item
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1 && respuesta.items.length > 0) {
                // funcion que sabe como agregar un item a la lista
                agregarItemListado(grilla, respuesta, controlador, "nuevo");
            } else {
                mensaje("ERROR: AL DIBUJAR ITEM EN SU LISTADO, SE RECOMIENDA RECARGAR LA PAGINA", 10000);
            }
        },
        error: function () {
            mensaje("ERROR: AL DIBUJAR ITEM EN SU LISTADO, SE RECOMIENDA RECARGAR LA PAGINA", 10000);
        },
        complete: function () {

        }
    });
}

// traer los datos del servidor para reemplazar un item que ya esta dibujado en el servidor
function modificarItemLista(grilla, controlador, item) {
    $.ajax({
        url: "index.php?r=" + controlador + "/buscarItems",
        data: {
            item: item
        },
        dataType: "JSON",
        type: "POST",
        success: function (respuesta) {
            if (respuesta.estado === 1 && respuesta.items.length > 0) {
                // funcion que sabe como agregar un item a la lista
                agregarItemListado(grilla, respuesta, controlador, "editado");
            } else {
                mensaje("ERROR: AL DIBUJAR ITEM EN SU LISTADO, SE RECOMIENDA RECARGAR LA PAGINA", 10000);
            }
        },
        error: function () {
            mensaje("ERROR: AL DIBUJAR ITEM EN SU LISTADO, SE RECOMIENDA RECARGAR LA PAGINA", 10000);
        },
        complete: function () {

        }
    });
}

// eliminar un item de un listado
function eliminarItemLista(listado, item) {
    var listadoItem = $(listado + " li[id='item_" + item + "']");

    listadoItem.delay(100)
        .animate({
            "background-color": "#F25960"
        }, 350, function () {
            listadoItem.fadeOut(700, function () {
                listadoItem.remove();
            });
        });
}

// primera carga de datos de los listados
function primeraCargaDeDatos() {
    $('.filtros-btn-filtrar').click();
}

function actualizarListado(listado_de) {
    $('div[id="filtros-listado-' + listado_de + '"] .filtros-btn-filtrar').click();
}

/* /FUNCIONES PARA MANEJO DE ITEMS */