/* -------------------------------------------------- */
/* FUNCIONES PARA MOSTRAR/OCULTAR EL PANEL DE FILTROS */
/* -------------------------------------------------- */

// array de funciones de guardado, una para cada listado diferente
var guardarFiltrosPanelLogistica = {};

// array de filtros aplicados a cada listado
var filtrosArray = {};

function inicializar_filtros() {
    // inicializar el boton de collapse
    transformicons.add('button[name="btn-filtros-toggle"]');

    // inicializar array de filtros: uno por cada listado que tenga filtros
    $.each($('div[name="filtros-listado-container"]'), function (index, item) {
        var filtros_container = $(item);
        var listado_de = filtros_container.attr("data-listado");

        filtrosArray[listado_de] = {
            // filtro que ingresa el usuario pero todavia no se realiza la busqueda
            filtroIngresado: {
                filtros: {}
            },
            // ultimo filtro que fue aplicado por el usuario, para un listado en especifico
            filtroAplicado: {
                filtros: {}
            }
        };
    });

    inicializar_filtros_inputs();
    inicializar_filtros_botones();

    // ocultar los listados que el usuario tenia ocultos (por defecto se muestran)
    $.each($('div[name="filtros-panel-container"]'), function (index, item) {
        var panel = $(item);
        if (panel.attr("data-estado") === "ocultar") {
            panelFiltrosOcultar(panel.prop("id"));
            transformicons.transform('button#btn-filtros-toggle-' + panel.attr("data-listado"));
        }
    });

    // mostrar parent de filtros de todos los listados cargados
    $('div[name="filtros-listado-container"]').delay(200).animate({
        opacity: 1
    });
}

// mostrar panel de filtros de un listado
function panelFiltrosMostrar(panel_id) {
    $('#' + panel_id).css("height", "auto").animate({
        display: "table",
        opacity: 1
    });
}

// ocultar panel de filtros de un listado
function panelFiltrosOcultar(panel_id) {
    $('#' + panel_id).animate({
        height: 0,
        display: "none",
        opacity: 0
    }, "fast");
}

/* /FUNCIONES PARA MOSTRAR/OCULTAR EL PANEL DE FILTROS */


/* ------------------------------------------- */
/* FUNCIONES PARA INCILIAZAR INPUTS DE FILTROS */
/* ------------------------------------------- */

function inicializar_filtros_inputs() {
    // filtros tipo texto (mdc)
    init_inpt_texto();

    // filtros tipo listado (multiselect)
    init_inpt_listado();

    // filtros tipo boolean
    init_inpt_boolean();

    // filtros tipo fecha
    init_inpt_fecha();
}

// inputs tipo texto
function init_inpt_texto() {
    // inicializar inputs tipo texto de filtros (mdc)
    var filtros_inputs_texto = document.querySelectorAll('div[name="filtros-listado-container"] .filtro-item-textfield');
    for (var i = 0, input_texto; input_texto = filtros_inputs_texto[i]; i++) {
        mdc.textfield.MDCTextfield.attachTo(input_texto);
    }

    // asignar listeners para los botones
    $.each($('div[name="filtros-listado-container"] input[data-tipo="texto"]'), function () {
        var inputCaller = $(this);
        var filtros_container = inputCaller.closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var target = inputCaller.attr("data-target");
        var tipo = inputCaller.attr("data-tipo");

        inputCaller.on("keyup", function (event) {
            if (typeof filtrosArray[listado_de].filtroIngresado.filtros[target] === 'undefined') {
                filtrosArray[listado_de].filtroIngresado.filtros[target] = {
                    "tipo": tipo,
                    "valor": ""
                };
            }

            filtrosArray[listado_de].filtroIngresado.filtros[target].valor = $(this).val();

            if (event.which === 13) {
                $('div[id="filtros-listado-' + listado_de + '"] .filtros-btn-filtrar').click();
            }
        });
    });
}

// inputs tipo listado
function init_inpt_listado() {
    // inicializar plugin de listados (multiselect)
    $.each($('div[name="filtros-listado-container"] select[data-tipo="listado"]'), function () {
        var selectCaller = $(this);
        var selectCaller_id = selectCaller[0].id;
        var filtros_container = selectCaller.closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");

        selectCaller.multipleSelect({
            selectAll: false,
            filter: true,
            minimumCountSelected: 4,
            countSelected: "Seleccionados # de %",
            allSelected: "Todos los items estan seleccionados",
            placeholder: "Categoria",
            width: "100%",
            onClick: function () {
                var tipo = "listado";
                var target = "PI_IdTipoPI";
                var valores = selectCaller.multipleSelect('getSelects');

                if (typeof filtrosArray[listado_de].filtroIngresado.filtros[target] === 'undefined') {
                    filtrosArray[listado_de].filtroIngresado.filtros[target] = {
                        "tipo": "listado",
                        "valor": []
                    };
                }

                filtrosArray[listado_de].filtroIngresado.filtros[target].valor = valores;
            }
        });
    });
}

// inputs tipo boolean
function init_inpt_boolean() {
    $.each($('div[name="filtros-listado-container"] button[data-tipo="boolean"]'), function () {
        var botonCaller = $(this);
        var filtros_container = botonCaller.closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");

        botonCaller.on("click", function () {
            var boton = $(this);
            var target = boton.attr("data-target");
            var tipo = boton.attr("data-tipo");

            if (typeof filtrosArray[listado_de].filtroIngresado.filtros[target] === 'undefined') {
                filtrosArray[listado_de].filtroIngresado.filtros[target] = {
                    "tipo": tipo,
                    "valor": ""
                };
            }

            if (boton.hasClass("indistinto")) {
                boton.removeClass("indistinto").addClass("si");
                boton.text("activada");
                filtrosArray[listado_de].filtroIngresado.filtros[target].valor = "1";
            } else if (boton.hasClass("si")) {
                boton.removeClass("si").addClass("no");
                boton.text("desactivada");
                filtrosArray[listado_de].filtroIngresado.filtros[target].valor = "0";
            } else if (boton.hasClass("no")) {
                boton.removeClass("no").addClass("indistinto");
                boton.text("indistinto");
                filtrosArray[listado_de].filtroIngresado.filtros[target].valor = "X";
            }
        });
    });
}

// inputs tipo fecha
function init_inpt_fecha() {
    $.each($('div[name="filtros-listado-container"] input.filtro-tipo-fecha'), function () {
        var fechaCaller = $(this);
        var filtros_container = fechaCaller.closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var tipo = fechaCaller.attr("data-tipo");

        switch (tipo) {
            case "item>fecha": // los target que tienen una fecha mayor a la ingresada
                var fecha_minima = ((new Date()).getFullYear() - 1) + "/01/01";

                fechaCaller.datetimepicker({
                    fixed: true,
                    timepicker: false,
                    format: 'd/m/Y',
                    onShow: function (ct) {
                        var input_techo = fechaCaller.attr("data-techo");

                        // si hay otro input de fecha que pone un nuevo maximo
                        if (typeof input_techo !== 'undefined') {
                            var nuevaFechaMaxima = false;

                            if ($('#' + input_techo).val()) {
                                nuevaFechaMaxima = $('#' + input_techo).datetimepicker('getValue');
                                nuevaFechaMaxima.setDate(nuevaFechaMaxima.getDate() - 1);

                                var anio = nuevaFechaMaxima.getFullYear();
                                var mes = nuevaFechaMaxima.getMonth() + 1;
                                var dia = nuevaFechaMaxima.getDate();

                                nuevaFechaMaxima = anio + "/" + mes + "/" + dia;
                            }

                            this.setOptions({
                                maxDate: nuevaFechaMaxima
                            });
                        }
                    },
                    validateOnBlur: true,
                    allowBlank: true,
                    mask: false,
                    minDate: fecha_minima
                });
                break;
            case "item<fecha": // los target que tienen una fecha menor a la ingresada
                var fecha_maxima = ((new Date()).getFullYear() + 1) + "/12/31";

                fechaCaller.datetimepicker({
                    fixed: true,
                    timepicker: false,
                    format: 'd/m/Y',
                    onShow: function (ct) {
                        var input_piso = fechaCaller.attr("data-piso");

                        // si hay otro input de fecha que pone un nuevo minimo
                        if (typeof input_piso !== 'undefined') {
                            var nuevaFechaMinima = false;

                            if ($('#' + input_piso).val()) {
                                nuevaFechaMinima = $('#' + input_piso).datetimepicker('getValue');
                                nuevaFechaMinima.setDate(nuevaFechaMinima.getDate() + 1);

                                var anio = nuevaFechaMinima.getFullYear();
                                var mes = nuevaFechaMinima.getMonth() + 1;
                                var dia = nuevaFechaMinima.getDate();

                                nuevaFechaMinima = anio + "/" + mes + "/" + dia;
                            }

                            this.setOptions({
                                minDate: nuevaFechaMinima
                            });
                        }
                    },
                    validateOnBlur: true,
                    allowBlank: true,
                    mask: false,
                    maxDate: fecha_maxima
                });
                break;
        }

        fechaCaller.on("change", function () {
            var ct = $(this).val();
            var anio, mes, dia;

            if (ct.length === 10) {
                var fechaDesde = ct.split("/");

                anio = fechaDesde[2];
                mes = fechaDesde[1];
                dia = fechaDesde[0];
            } else if (ct === "") {
                anio = (new Date()).getFullYear() - 1;
                mes = 1;
                dia = 1;
            }

            var stringFechaDesde = anio + "-" + mes + "-" + dia;
            var target = $(this).attr("data-target");
            var tipo = $(this).attr("data-tipo");

            if (typeof filtrosArray[listado_de].filtroIngresado.filtros[target] === 'undefined') {
                filtrosArray[listado_de].filtroIngresado.filtros[target] = {
                    "tipo": tipo,
                    "valor": ""
                };
            }

            filtrosArray[listado_de].filtroIngresado.filtros[target].valor = stringFechaDesde;
        });
    });
}

/* /FUNCIONES PARA INCILIAZAR INPUTS DE FILTROS */

/* ---------------------------------------------- */
/* FUNCIONES PARA INCILIAZAR LISTENERS DE BOTONES */
/* ---------------------------------------------- */

function inicializar_filtros_botones() {
    // boton de items excluidos del listado
    init_btn_quitados();

    // boton agregar todos al mapa
    init_btn_agregar_todos();

    // boton que alterna el tooltip de los marker de moviles en el mapa 
    init_btn_marker_tooltip_cambiar();

    // crear un elemento de un listado
    init_btn_crear();

    // importar elementos a un listado
    init_btn_importar();

    // muestra/oculta un panel de filtros
    init_btn_colapsar_panel();

    // filtrar elementos
    init_btn_filtrar_panel();

    // limpiar los inputs dentro de un panel de filtros
    init_btn_limpiar_panel();
}

// muestra los items quitados del listado al que pertenecian antes de ser quitados
function init_btn_quitados() {
    // al cargarlo mostrar el icono transformado (la barra de menos)
    transformicons.add('button[name="excluidosListBtn"]');
    transformicons.transform('button[name="excluidosListBtn"]');
    $('button[name="excluidosListBtn"]').css('opacity', 1);

    // correccion de bug
    $('button[name="excluidosListBtn"]').on('click', function (e) {
        // para que el boton no se transforme cuando le damos click (solo se transforma cuando nosotros forzamos el efecto)
        e.preventDefault();
        e.stopPropagation();
        transformicons.transform('button[name="excluidosListBtn"]');
        $("span.filtros-btn-quitados").trigger("click");
        return false;
    });

    // tomamos el color inicial para usar luego en la animacion
    var filtros_btn_quitados_background_color = $("span.filtros-btn-quitados:first").css("background-color");

    // biendeamos una animacion para cuando el usuario quita un item del listado
    $("span.filtros-btn-quitados").on("animarItemQuitado", function () {
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");

        transformicons.revert($('#filtros-listado-' + listado_de).find('button[name="excluidosListBtn"]')[0]);

        $(this).animate({
            "background-color": "red"
        }, 400, function () {
            $(this).delay(350).animate({
                "background-color": filtros_btn_quitados_background_color
            }, 650);
        });

        setTimeout(function () {
            transformicons.transform($('#filtros-listado-' + listado_de).find('button[name="excluidosListBtn"]')[0]);
        }, 750);
    });

    // listener de click para mostrar el listado
    $("span.filtros-btn-quitados").on("click", function (e) {
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var controlador = filtros_container.attr("data-controlador");
        var numero_panel = filtros_container.attr("data-numero-panel");

        mostrarPanel(
            "excluidos",
            "LISTADO DE QUITADOS",
            "panel-" + numero_panel,
            controlador,
            "quitados",
            "");
    });
}

var guardarMarkerMovilTooltipPropiedad;

// alterna el tooltip del marker que se muestra en el mapa
function init_btn_marker_tooltip_cambiar() {
    $("span.accion-btn-marker-tooltip-cambiar").on("click", function (e) {
        var btnCaller = $(this);
        var propiedad = btnCaller.find('i.activado').attr('name');
        var propiedad_nueva;
        var propiedad_nombre;

        switch (propiedad) {
            case 'dominio':
                btnCaller.find('i.activado').removeClass('activado');
                btnCaller.find('i[name="nombre"]').addClass('activado');

                // actualizar tooltips
                $.each(mapa_dispositivos_array, function (index, item) {
                    var marker = $(item)[0];
                    var tooltipContent = $(marker.getTooltip()._content).clone();
                    tooltipContent.find('div.marker-tooltip-movil-dominio').css("display", "none");
                    tooltipContent.find('div.marker-tooltip-movil-nombre').css("display", "block");
                    marker.setTooltipContent(tooltipContent["0"].outerHTML);
                });
                propiedad_nombre = "moviles_tooltip_propiedad";
                propiedad_nueva = "nombre";
                break;
            case 'nombre':
                btnCaller.find('i.activado').removeClass('activado');
                btnCaller.find('i[name="ambos"]').addClass('activado');

                // actualizar tooltips
                $.each(mapa_dispositivos_array, function (index, item) {
                    var marker = $(item)[0];
                    var tooltipContent = $(marker.getTooltip()._content).clone();
                    tooltipContent.find('div.marker-tooltip-movil-dominio').css("display", "block");
                    tooltipContent.find('div.marker-tooltip-movil-nombre').css("display", "block");
                    marker.setTooltipContent(tooltipContent["0"].outerHTML);
                });
                propiedad_nombre = "moviles_tooltip_propiedad";
                propiedad_nueva = "ambos";
                break;
            case 'ambos':
                btnCaller.find('i.activado').removeClass('activado');
                btnCaller.find('i[name="dominio"]').addClass('activado');

                // actualizar tooltips
                $.each(mapa_dispositivos_array, function (index, item) {
                    var marker = $(item)[0];
                    var tooltipContent = $(marker.getTooltip()._content).clone();
                    tooltipContent.find('div.marker-tooltip-movil-nombre').css("display", "none");
                    tooltipContent.find('div.marker-tooltip-movil-dominio').css("display", "block");
                    marker.setTooltipContent(tooltipContent["0"].outerHTML);
                });
                propiedad_nombre = "moviles_tooltip_propiedad";
                propiedad_nueva = "dominio";
                break;
            case 'descripcion_off':
                btnCaller.find('i.activado').removeClass('activado');
                btnCaller.find('i[name="descripcion_on"]').addClass('activado');
                // actualizar tooltips
                $.each(mapa_puntos_fijos_array, function (index, item) {
                    var marker = item.punto;
                    var tooltipContent = $(marker.getTooltip()._content).clone();
                    tooltipContent.find('div.marker-tooltip-punto-nombre').css("display", "block");
                    marker.setTooltipContent(tooltipContent["0"].outerHTML);
                });
                propiedad_nombre = "punto_tooltip_propiedad";
                propiedad_nueva = "descripcion_on";
                break;
            case 'descripcion_on':
                btnCaller.find('i.activado').removeClass('activado');
                btnCaller.find('i[name="descripcion_off"]').addClass('activado');

                // actualizar tooltips
                $.each(mapa_puntos_fijos_array, function (index, item) {
                    var marker = item.punto;
                    var tooltipContent = $(marker.getTooltip()._content).clone();
                    tooltipContent.find('div.marker-tooltip-punto-nombre').css("display", "none");
                    marker.setTooltipContent(tooltipContent["0"].outerHTML);
                });
                propiedad_nombre = "punto_tooltip_propiedad";
                propiedad_nueva = "descripcion_off";
                break;
        }

        clearTimeout(guardarMarkerMovilTooltipPropiedad);
        guardarMarkerMovilTooltipPropiedad = setTimeout(function () {
            guardarPropiedadCSS(propiedad_nombre, propiedad_nueva);
        }, 5000);
    });
}

// por cada listado guardamos true si sus items estan agregados al listado o false si no lo estan
var flag_agregados_array = {};

// boton para agregar todos los items de un listado al mapa
function init_btn_agregar_todos() {
    // inicializamos el array con los estados de cada listado
    $.each($("span.accion-btn-agregar-todos"), function () {
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");

        flag_agregados_array[listado_de] = true;
    });

    $("span.accion-btn-agregar-todos").on("click", function (e) {
        var btnCaller = $(this);
        var filtros_container = btnCaller.closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");

        // Mostrar el icono de cargando
        btnCaller.find("i[name='toggle']").hide();
        btnCaller.find("i[name='toggling']").show();

        // checkbox para agregar al mapa
        var checkboxEnMapaArray = $('#listado-' + listado_de).find("input[type='checkbox'][name='chk_agregar_al_mapa']");

        // Se hace un checkeo previo: 
        // - Si estan todos tildados y no estan en disabled entonces los quita 
        // (ya estaban agregados y no van a agregarse ni quitarse otros moviles)
        // - Si estan todos destildados y no estan en disabled entonces los agrega 
        // (ya estaban quitados y no van a agregarse ni quitarse otros moviles)
        var flag_todos_agregados = true; // Vale true si estan todos los moviles agregados 
        var flag_todos_quitados = true; // Vale true si estan todos los moviles quitados 
        var flag_ninguno_disabled = true; // Vale true si ninguno esta en disabled 
        $.each(checkboxEnMapaArray, function (i, item) {
            var checkbox = $(item);

            if (!checkbox.prop("checked")) {
                // Por lo menos uno esta sin agregar
                flag_todos_agregados = false;
            }

            if (checkbox.prop("checked")) {
                // Por lo menos uno esta agregado
                flag_todos_quitados = false;
            }

            if (checkbox.prop("disabled")) {
                // Por lo menos uno se esta agregando o quitando al momento de hacerle click al boton
                flag_ninguno_disabled = false;
            }
        });

        // Si estan todos agregados y no se van agregar ni quitar nuevos moviles, quitamos todos
        if (flag_ninguno_disabled && flag_todos_agregados) {
            flag_agregados_array[listado_de] = false;
        }

        // Si estan todos quitados y no se van agregar ni quitar nuevos moviles, agregamos todos
        if (flag_ninguno_disabled && flag_todos_quitados) {
            flag_agregados_array[listado_de] = true;
        }

        // Recorremos todo el array 
        $.each(checkboxEnMapaArray, function (i, item) {
            var checkbox = $(item);

            // Si el checkbox no esta deshabilitado, es decir solo modificamos moviles que no se estan agregando ni quitando previamente
            if (!checkbox.prop("disabled")) {
                // Con el flag alternamos entre agregar y quitar
                checkbox.prop('checked', flag_agregados_array[listado_de]).trigger("sin_centrar");
            }
        });

        // Cambiar el flag, si agrego todos en el siquiente click los quita, o si quito en el siquiente click los agrega 
        flag_agregados_array[listado_de] = !flag_agregados_array[listado_de];

        // Deshabilitar el boton caller y mostrar el icono de cargando     
        btnCaller.find("i[name='toggling']").hide();
        btnCaller.find("i[name='toggle']").show();
    });
}

// boton para crear un nuevo elemento de un listado
function init_btn_crear() {
    $("span.filtros-btn-crear").on("click", function (e) {
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var controlador = filtros_container.attr("data-controlador");
        var numero_panel = filtros_container.attr("data-numero-panel");

        listadoCargarItem(controlador, numero_panel, "");
    });
}

// boton para importar elementos a un listado
function init_btn_importar() {
    $("span.filtros-btn-importar").on("click", function (e) {
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var controlador = filtros_container.attr("data-controlador");
        var numero_panel = filtros_container.attr("data-numero-panel");

        listadoImportarItem(controlador, numero_panel);
    });
}

// boton que muestra/oculta un panel de filtros
function init_btn_colapsar_panel() {
    $('button[name="btn-filtros-toggle"]').on("click", function (event) {
        var btnCaller = $(this);
        var panel_id = btnCaller.attr("data-filtros-panel");

        if (btnCaller.hasClass("tcon-transform")) {
            panelFiltrosOcultar(panel_id);
        } else {
            panelFiltrosMostrar(panel_id);
        }

        clearTimeout(guardarFiltrosPanelLogistica[panel_id]);
        guardarFiltrosPanelLogistica[panel_id] = setTimeout(function () {
            if (btnCaller.hasClass("tcon-transform")) {
                guardarPropiedadCSS(modulo + "_" + panel_id, "ocultar");
            } else {
                guardarPropiedadCSS(modulo + "_" + panel_id, "mostrar");
            }
        }, 5000);
    });
}


// boton para aplicar los filtros ingresados
function init_btn_filtrar_panel() {
    $("span.filtros-btn-filtrar").on("click", function () {
        // obtener acceso al panel de filtros completo
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var controlador = filtros_container.attr("data-controlador");
        var on_success = $(this).attr("data-on-success");

        if ($('#listado-' + listado_de).attr("data-buscando") === "false") {
            // buscar iconos
            var icono_buscar = filtros_container.find('i[name="buscar"]');
            var icono_buscando = filtros_container.find('i[name="buscando"]');

            // loading gif mostrar
            icono_buscar.hide();
            icono_buscando.show();

            // al terminar de buscar 
            var onComplete = function () {
                // loading gif ocultar
                icono_buscando.hide();
                icono_buscar.show();

                if (typeof window[on_success] === 'function') {
                    window[on_success].call();
                }
            };

            buscarItems('#listado-' + listado_de, controlador, filtrosArray[listado_de].filtroIngresado, true, 0, onComplete);
            filtrosArray[listado_de].filtroAplicado = filtrosArray[listado_de].filtroIngresado;
        } else {
            mensaje("AGUARDE A QUE FINALICE LA BUSQUEDA ANTERIOR", 2000);
        }
    });
}

// boton que limpia un panel de filtros (y los filtros aplicados)
function init_btn_limpiar_panel() {
    $('span.filtros-btn-limpiar').on("click", function () {
        // obtener acceso al panel de filtros completo
        var filtros_container = $(this).closest('div[name="filtros-listado-container"]');
        var listado_de = filtros_container.attr("data-listado");
        var controlador = filtros_container.attr("data-controlador");
        var on_success = $(this).attr("data-on-success");

        // buscar iconos
        var icono_limpiar = filtros_container.find('i[name="limpiar"]');
        var icono_limpiando = filtros_container.find('i[name="limpiando"]');

        // loading gif mostrar
        icono_limpiar.hide();
        icono_limpiando.show();

        // BLOQUE: blanqueo de inputs de filtros
        // -------------------------------------
        {
            // tipo texto y tipo fecha
            $.each($('#filtros-listado-' + listado_de).find('input[type="text"]'), function () {
                var input_texto = $(this);
                input_texto.val("").blur();
                input_texto.closest("div").removeClass("mdc-textfield--focused");
                input_texto.next().removeClass("mdc-textfield__label--float-above");
            });

            // tipo listado
            $.each($('#filtros-listado-' + listado_de).find('select[data-tipo="listado"]'), function () {
                $(this).multipleSelect('setSelects', []);
            });

            // tipo boolean
            $.each($('#filtros-listado-' + listado_de).find('button[data-tipo="boolean"]'), function () {
                var button_boolean = $(this);
                button_boolean.removeClass("si");
                button_boolean.removeClass("no");
                if (!button_boolean.hasClass("indistinto")) {
                    button_boolean.addClass("indistinto");
                }

                button_boolean.text("indistinto");
            });
        }

        // limpiar filtros, tanto ingresado como aplicado
        filtrosArray[listado_de].filtroIngresado = {
            filtros: {}
        };
        filtrosArray[listado_de].filtroAplicado = {
            filtros: {}
        };

        // al terminar de buscar 
        var onComplete = function () {
            // loading gif ocultar
            icono_limpiando.hide();
            icono_limpiar.show();

            if (typeof window[on_success] === 'function') {
                window[on_success].call();
            }
        };

        // refrescar el listado
        buscarItems('#listado-' + listado_de, controlador, filtrosArray[listado_de].filtroIngresado, true, 0, onComplete);
    });
}

/* /FUNCIONES PARA INCILIAZAR LISTENERS DE BOTONES */

/* ------------------------------------ */
/* FUNCIONES ON SUCCESS DE CADA LISTADO */
/* ------------------------------------ */

function listado_moviles_filtrar_on_success() {
    // al filtrar removemos todos los historicos cargados en el mapa
    $.each(mapa_movil_historico_array, function (index, item) {
        quitarMovilRecorridoDelMapa(item.id);
    });
}