// mapa cargado segun el modulo que se esta viendo
var modulo_mapa;

var tiempoEntreReportesCtrl; // Control para el tiempo entre reportes

// recuerda las propiedades segun el usuario logueado
function inicializar_mapa(latitud, longitud, zoom, layer) {
    modulo_mapa = L.map('modulo_mapa').setView([latitud, longitud], zoom);

    var appID = 'kDw247ifuRx8FSdbfLCR';
    var appCODE = 'GA9UZVt8ou_tUlV4u5Q6jQ';
    var layer_HERE = new L.tileLayer('//{s}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2020 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 18,
        minZoom: 3,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });

    var layer_LEAFLET = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        minZoom: 3
    });

    var accessToken = 'pk.eyJ1IjoibGVvZ2FicmllbG1hcnRpbmV6IiwiYSI6ImNpajM5cDNlaTAwNHF0dGtuMjg0Nnd3MDEifQ.lGyOsEezLEKFYzMM4pUa_w';
    //var layer_MAPBOX = new L.tileLayer('//api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=' + accessToken, {
    var layer_MAPBOX = new L.tileLayer('//api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {     
        attribution: '',
        maxZoom: 18,
        minZoom: 3
    });
    
    var layer_HERE_SATELITAL = new L.tileLayer('//{s}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2021 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 18,
        minZoom: 3,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });

    var layer_HERE_TRAFICO = new L.tileLayer('//{s}.traffic.maps.api.here.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2019 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 18,
        minZoom: 3,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });

    var baseLayers = {
        "Base": layer_HERE,
        "Base secundario": layer_LEAFLET,
        "Satelital": layer_MAPBOX,
        "Satelital 2": layer_HERE_SATELITAL,
        "Trafico": layer_HERE_TRAFICO
    };

    switch (layer) {
        case "Base":
            layer_HERE.addTo(modulo_mapa);
            break;
        case "Base secundario":
            layer_LEAFLET.addTo(modulo_mapa);
            break;
        case "Satelital":
            layer_MAPBOX.addTo(modulo_mapa);
            break;
        case "Satelital 2":
            layer_HERE_SATELITAL.addTo(modulo_mapa);
            break;
        case "Trafico":
            layer_HERE_TRAFICO.addTo(modulo_mapa);
            break;
        default:
            layer_HERE.addTo(modulo_mapa);
            break; 
    }

    // buscador
    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.Esri(),
        showMarker: true,
        searchLabel: "Buscar una direccion",
        notFoundMessage: "La direccion no pudo ser encontrada"
    }).addTo(modulo_mapa);
    L.Control.measureControl().addTo(modulo_mapa);
    L.control.scale().addTo(modulo_mapa);
    L.control.layers(baseLayers, null).addTo(modulo_mapa);

    /*  */

    // control para mostrar el tiempo entre dos reportes que el usuario selecciona
    tiempoEntreReportesCtrl = new L.control.custom({
        position: 'topright',
        content: '' +
            '<div class="tiempo-entre-reportes-container">' +
            '   <div class="trp-header mdc-elevation--z2">' +
            '       TIEMPO ENTRE REPORTES' +
            '       <i class="material-icons layer-help"' +
            '           title="Seleccione dos reportes haciendo click en su número de reporte, aquí podrá visualizar cual es el tiempo que transcurrió entre ellos">' +
            '           help_outline' +
            '       </i>' +
            '       <i class="material-icons layer-button cerrar">' +
            '           close' +
            '       </i>' +
            '   </div>' +
            '   <div class="trp-body"></div>' +
            '</div>',
        classes: 'leaflet-control-layers',
        style: {
            'background-color': 'white',
            display: 'none',
            opacity: 0
        },
        datas: {
            'reporte_uno': { // datos del reporte uno
                fecha: new Date(), // fecha del reporte
                latitud: 0, // latitud del reporte
                longitud: 0, // longitud del reporte
                numero: -1 // numero de reporte
            },
            'reporte_dos': { // datos del reporte dos
                fecha: new Date(), // fecha del reporte
                latitud: 0, // latitud del reporte
                longitud: 0, // longitud del reporte
                numero: -1 // numero de reporte
            },
            'reporte_actual': 'uno', // reporte que estamos actualizando
            'estado': 'cerrado' // para saber si se esta o no mostrando el layer control
        },
        events: {
            abrir: function () {
                $(tiempoEntreReportesCtrl.container).css('display', 'block');
                var widthContainer = $(tiempoEntreReportesCtrl.container).width();
                var heightContainer = $(tiempoEntreReportesCtrl.container).height();
                $(tiempoEntreReportesCtrl.container).css({
                    width: 0,
                    height: 0
                });
                $(tiempoEntreReportesCtrl.container).animate({
                    opacity: 1,
                    width: widthContainer,
                    height: heightContainer
                }, 'fast');

                tiempoEntreReportesCtrl.options.datas.estado = 'abierto';
            },
            cerrar: function () {
                var widthContainer = $(tiempoEntreReportesCtrl.container).width();
                var heightContainer = $(tiempoEntreReportesCtrl.container).height();
                $(tiempoEntreReportesCtrl.container).animate({
                    opacity: 0,
                    width: 0,
                    height: 0
                }, 'fast', function () {
                    $(this).css({
                        display: 'none',
                        width: widthContainer,
                        height: heightContainer
                    });
                });

                // resetear valores default
                tiempoEntreReportesCtrl.options.datas.reporte_uno.fecha = new Date();
                tiempoEntreReportesCtrl.options.datas.reporte_uno.latitud = 0;
                tiempoEntreReportesCtrl.options.datas.reporte_uno.longitud = 0;
                tiempoEntreReportesCtrl.options.datas.reporte_uno.numero = -1;
                tiempoEntreReportesCtrl.options.datas.reporte_dos.fecha = new Date();
                tiempoEntreReportesCtrl.options.datas.reporte_dos.latitud = 0;
                tiempoEntreReportesCtrl.options.datas.reporte_dos.longitud = 0;
                tiempoEntreReportesCtrl.options.datas.reporte_dos.numero = -1;
                tiempoEntreReportesCtrl.options.datas.reporte_actual = 'uno';
                tiempoEntreReportesCtrl.options.datas.estado = 'cerrado';
            },
            otro_reporte: function () {
                $(tiempoEntreReportesCtrl.container).find('div.trp-body').html('SELECCIONE OTRO REPORTE');
            },
            calcular_diferencia: function () {
                var reporte_uno = tiempoEntreReportesCtrl.options.datas.reporte_uno;
                var reporte_dos = tiempoEntreReportesCtrl.options.datas.reporte_dos;
                var fecha_uno = new Date(reporte_uno.fecha);
                var fecha_dos = new Date(reporte_dos.fecha);

                var diffMs = (fecha_dos > fecha_uno) ? (fecha_dos - fecha_uno) : (fecha_uno - fecha_dos); // diferencia en milisegundos
                var diffDias = Math.floor(diffMs / 86400000); // dias
                var diffHors = Math.floor((diffMs % 86400000) / 3600000); // horas
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutos

                var trpBody = $(tiempoEntreReportesCtrl.container).find('div.trp-body');

                var htmlTexto = '';
                htmlTexto += '<div class="trp-time-container">';
                htmlTexto += '  <div class="trp-reporte-container">';
                htmlTexto += '      <span>Desde</span>';
                htmlTexto += '      <div class="trp-reporte-nro" onclick="clickTrpReporte(' + reporte_uno.latitud + ', ' + reporte_uno.longitud + ')">';
                htmlTexto += '      ' + reporte_uno.numero;
                htmlTexto += '      </div>';
                htmlTexto += '  </div>';
                htmlTexto += '  <div class="trp-reporte-container">';
                htmlTexto += '      <span>Hasta</span>';
                htmlTexto += '      <div class="trp-reporte-nro" onclick="clickTrpReporte(' + reporte_dos.latitud + ', ' + reporte_dos.longitud + ')">';
                htmlTexto += '      ' + reporte_dos.numero;
                htmlTexto += '      </div>';
                htmlTexto += '  </div>';
                htmlTexto += '  <div class="trp-diferencia-container">';
                htmlTexto += '      <span>' + diffDias + ' Día' + ((diffDias == 1) ? '' : 's') + '</span>';
                htmlTexto += '      <span>' + diffHors + ' Hora' + ((diffHors == 1) ? '' : 's') + '</span>';
                htmlTexto += '      <span>' + diffMins + ' Minuto' + ((diffMins == 1) ? '' : 's') + '</span>';
                htmlTexto += '  </div>';
                htmlTexto += '</div>';

                trpBody.html(htmlTexto);
            }
        }

    });
    // agregar control al mapa
    tiempoEntreReportesCtrl.addTo(modulo_mapa);
    // boton cerrar el control
    $(tiempoEntreReportesCtrl.container).find('i.cerrar').on('click', function () {
        $(tiempoEntreReportesCtrl.options.events).trigger('cerrar');
    });
    // inicializar tooltip de ayuda
    $('i.layer-help').tooltipster({
        theme: 'tooltipster-punk',
        maxWidth: 200,
        delay: [100, 350]
    });

    init_mapa_eventos();
}

// centrar el mapa en el reporte que le hicieron click
function clickTrpReporte(latitud, longitud) {
    centrarMapaEn_LatitudLongitud(latitud, longitud);
    setTimeout(function () {
        showTouchMapAnimado(latitud, longitud);
    }, 350);
}

var guardarCentro;
var guardarLayer;

// eventos del mapa
function init_mapa_eventos() {
    // recordar las coordenadas y el zoom cuando cambian
    modulo_mapa.on('moveend', function (e) {
        clearTimeout(guardarCentro);
        guardarCentro = setTimeout(function () {
            actualizarUsuarioVistaMapa();
        }, 10000);
    });

    // recordar el layer cuando cambia
    modulo_mapa.on('baselayerchange', function (e) {
        clearTimeout(guardarLayer);
        guardarLayer = setTimeout(function () {
            actualizarUsuarioLayerMapa(e.name);
        }, 10000);
    });
}

/* --------------------------- */
/* FUNCIONES GENERALES DE MAPA */
/* --------------------------- */

function actualizarUsuarioVistaMapa() {
    var propiedades = [
        modulo + "_mapa_latitud",
        modulo + "_mapa_longitud",
        modulo + "_mapa_zoom"
    ];

    var valores = [
        modulo_mapa.getCenter().lat,
        modulo_mapa.getCenter().lng,
        modulo_mapa.getZoom()
    ]

    guardarPropiedadCSS(propiedades, valores);
}

function actualizarUsuarioLayerMapa(layer) {
    guardarPropiedadCSS(modulo + "_mapa_layer", layer);
}

// al modificar el tamaño disponible en la pantalla, actualizamos el tamaño del mapa
function refrescarTamanioDelMapa() {
    var container = $('div[name="modulo-container"]');
    var celda_izquierda = $('div[name="celda-izquierda"]');

    var container_ancho = container.width();
    var celda_izquierda_ancho = celda_izquierda.width();

    if (celda_izquierda.hasClass("active")) {
        $("#modulo_mapa").css("left", celda_izquierda_ancho);
        $("#modulo_mapa").css("width", container_ancho - celda_izquierda_ancho);
    } else {
        $("#modulo_mapa").css("left", "0");
        $("#modulo_mapa").css("width", container_ancho);
    }

    if (modulo_mapa !== null) {
        modulo_mapa.invalidateSize();
    }
}

// Mostrar una animacion touch en una posicion del mapa
function showTouchMapAnimado(latitud, longitud) {
    // Creamos un icono div
    var iconoHtml = '';
    iconoHtml += '<div name="marker-content" style="width: 30px; height: 30px; background-color: #ff8200; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0.8;">';
    iconoHtml += '  <div name="marker-ripple" style="width: 0px; height: 0px; background-color: #ffbf00; border-radius: 50%; display: flex; align-items: center; justify-content: center;">';
    iconoHtml += '    <div name="marker-ripple-interno" style="width: 0px; height: 0px; background-color: #ffeb00; border-radius: 50%; display: flex;">';
    iconoHtml += '    </div>';
    iconoHtml += '  </div>';
    iconoHtml += '</div>';

    var iconoTouch = L.divIcon({
        iconSize: [30, 30],
        className: 'touch-icon',
        html: iconoHtml
    });

    // Agregamos un marker en la posicion
    var latlng = L.latLng(latitud, longitud);

    var markerTouch = L.marker(latlng, {
        icon: iconoTouch
    });

    // Setear animaciones al agregar el marker 
    markerTouch.on('add', function () {
        var touchObject = $(markerTouch._icon).find('div[name="marker-content"]');
        var rippleEffect = touchObject.find('div[name="marker-ripple"]');
        var rippleEffectItnerno = rippleEffect.find('div[name="marker-ripple-interno"]');

        // Efecto ripple interno
        rippleEffectItnerno.delay(150).animate({
            opacity: 0.4,
            width: 30,
            height: 30
        }, 350);

        rippleEffect.animate({
            opacity: 0.4,
            width: 30,
            height: 30
        }, 350);

        // Efecto fadeOut
        touchObject.animate({
            opacity: 0
        }, 1000, function () {
            //Terminadas las animaciones limpiar el mapa
            modulo_mapa.removeLayer(markerTouch);
        });
    });

    // Agregar el marker al mapa
    markerTouch.addTo(modulo_mapa);
}

// centrar el mapa en un punto
function centrarMapaEn_LatitudLongitud(latitud, longitud) {
    // posicion del punto a editar
    var latlng = {
        lat: parseFloat(latitud),
        lng: parseFloat(longitud)
    };

    // zoom al punto
    modulo_mapa.flyTo(latlng, modulo_mapa.getZoom(), {
        duration: 0.35
    });
}

// centrar el mapa en un listado de puntos
function centrarMapaEn_LatitudLongitudArray(latlngArray) {
    var bounds = new L.LatLngBounds(latlngArray);

    modulo_mapa.fitBounds(bounds, {
        padding: [100, 100]
    });
}

// centrar el mapa en un listado de markers
function centrarMapaEn_MarkerArray(markers) {
    if (markers.length > 0) {
        var group = new L.featureGroup(markers);

        modulo_mapa.fitBounds(group.getBounds(), {
            padding: [100, 100]
        });
    }
}

// agrega un item (de cualquier tipo) al mapa
function agregarItemAlMapa(controlador, item_id, centrar, guardar, onSuccessCallBack, onCompleteCallBack) {
    // obtener el item si ya esta dibujado o false si no lo esta
    var item_en_mapa = getItemEnMapa(controlador, item_id);

    if (item_en_mapa) {
        // si ya estaba agregado antes de agregarlo lo removemos
        quitarItemDelMapa(controlador, item_id);
    }

    switch (modulo) {
        case "logistica":
            switch (controlador) {
                case "movil":
                    agregarDispositivoAlMapa(controlador, item_id, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
                    break;
                case "ruta":
                    agregarRutaAlMapa(controlador, item_id, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
                    break;
                case "punto":
                    // punto fijo en vez del id, recibe todos los datos del punto
                    agregarPuntoFijoAlMapa(controlador, item_id, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
                    break;
                case "categoria":
                    agregarCategoriaAlMapa(controlador, item_id, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
                    break;
            }
            break;
    }
}

// retorna un item (de cualquier tipo) de un mapa
function getItemEnMapa(controlador, item_id) {
    switch (modulo) {
        case "logistica":
            switch (controlador) {
                case "movil":
                    return getDispositivoEnMapa(item_id);
                case "ruta":
                    return getRutaEnMapa(item_id);
                case "instruccion":
                    return getInstruccionEnMapa(item_id);
                case "punto":
                    // punto fijo en vez del id, recibe todos los datos del punto
                    return getPuntoFijoEnMapa(item_id);
                case "categoria":
                    return getCategoriaEnMapa(item_id);
            }
            break;
    }

    return false;
}

// quita un item (de cualquier tipo) del mapa
function quitarItemDelMapa(controlador, item_id) {
    // obtener el item si ya esta dibujado o false si no lo esta
    var item_en_mapa = getItemEnMapa(controlador, item_id);

    // solo hace falta quitarlo del mapa si no esta agregado
    if (item_en_mapa) {
        switch (modulo) {
            case "logistica":
                switch (controlador) {
                    case "movil":
                        quitarDispositivoDelMapa(item_id);
                        break;
                    case "ruta":
                        quitarRutaDelMapa(item_id);
                        break;
                    case "instruccion":
                        quitarInstruccionDelMapa(item_id);
                        break;
                    case "punto":
                        // recibe un array con todos los puntos fijos que debe quitar
                        quitarPuntoFijoDelMapa(item_en_mapa);
                        break;
                    case "categoria":
                        quitarCategoriaDelMapa(item_id);
                        break;
                }
                break;
        }
    }
}

/* /FUNCIONES GENERALES DE MAPA */

/* ----------------------------- */
/* FUNCIONES PARA LAS CATEGORIAS */
/* ----------------------------- */
// array de categorias dibujadas en el mapa
var mapa_categorias_array = []; // array de categorias

function getCategoriaEnMapa(item_input) {
    var item = JSON.parse(item_input);
    var categoria_en_mapa = false;

    $.each(mapa_categorias_array, function () {
        if ($(this)["0"].id == item.id) {
            categoria_en_mapa = $(this)["0"];
            return;
        }
    });
    return categoria_en_mapa;
}

function agregarCategoriaAlMapa(controlador, item_input, centrar, guardar, onSuccessCallBack, onCompleteCallBack) {
    var datos_categoria = JSON.parse(item_input);
    if (!getCategoriaEnMapa(item_input) && datos_categoria.puntos && datos_categoria.puntos.length > 0) {
        var rectangulo = L.rectangle(datos_categoria.puntos, {
            color: datos_categoria.color,
            weight: 1
        });

        rectangulo.addTo(modulo_mapa);

        var tooltipHTML = '';
        tooltipHTML += '<div class="marker-tooltip">';
        tooltipHTML += '    <div class="marker-tooltip-punto-nombre" style="display:block">';
        tooltipHTML += '    ' + datos_categoria.descripcion;
        tooltipHTML += '    </div>';
        tooltipHTML += '</div>';

        var centroRectangulo = L.marker(rectangulo.getCenter()).bindTooltip(tooltipHTML, {
            permanent: true
        }).addTo(modulo_mapa);

        var categoria = {
            rectangulo: rectangulo,
            id: datos_categoria.id,
            centro: centroRectangulo,
            descripcion: datos_categoria.descripcion
        };

        // guardar en la base de datos que el dispositivo fue agregado al mapa
        if (guardar) {
            userMapaAgregarItem(modulo, controlador, datos_categoria.id);
        }

        if (centrar) {
            centrarMapaEn_LatitudLongitud(rectangulo.getCenter().lat, rectangulo.getCenter().lng);
        }

        mapa_categorias_array.push(categoria);

        if (typeof onCompleteCallBack == 'function') {
            onCompleteCallBack(); // habilitar checkbox de mostrar en mapa
        }
        // ejecutamos on success del llamado a agregar
        if (typeof onSuccessCallBack !== 'undefined') {
            if ($.isFunction(onSuccessCallBack)) {
                onSuccessCallBack();
            }
        }
    } else {
        mensaje("La categoría no posee puntos asignados", 2000);

        if (typeof onCompleteCallBack == 'function') {
            onCompleteCallBack(); // habilitar checkbox de mostrar en mapa
        }
    }
}

function quitarCategoriaDelMapa(item_id) {
    var item = JSON.parse(item_id);

    var item_index = -1;
    var categoria_en_mapa;
    $.each(mapa_categorias_array, function (index) {
        if ($(this)["0"].id == item.id) {
            item_index = index;
            categoria_en_mapa = $(this)["0"];
            return;
        }
    });

    modulo_mapa.removeLayer(categoria_en_mapa.rectangulo);
    modulo_mapa.removeLayer(categoria_en_mapa.centro);
    mapa_categorias_array.splice(item_index, 1);
}

/* ------------------------- */
/* FUNCIONES PARA LOS PUNTOS */
/* ------------------------- */

// array de puntos dibujados en el mapa
var mapa_puntos_array = []; // array de puntos de una ruta
var mapa_puntos_fijos_array = []; // array de puntos dibujados desde el listado de puntos y categorias

/**
 * Si recibe los datos de un punto lo agrega al mapa.
 * Si recibe un "IdTipoPuntoInteres", agrega todos los puntos de esa categoria al mapa
 * @param {*} item datos del item que deseamos dibujar en el mapa
 */
function agregarPuntoFijoAlMapa(controlador, item, centrar, guardar, onSuccessCallBack, onCompleteCallBack) {
    // si no es un número
    if (isNaN(item)) {
        // recibimos los datos del punto, agregarlo al mapa
        agregarPuntoFijo(controlador, item, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
    } else {
        agregarCategoriaFijaAlMapa(controlador, item, centrar, guardar, onSuccessCallBack, onCompleteCallBack);
    }
}

function agregarCategoriaFijaAlMapa(controlador, item, centrar, guardar, onSuccessCallBack, onCompleteCallBack) {
    var items = $('li[name="categoria_' + item + '"] input[name="chk_agregar_al_mapa"]');
    var cantidad_items = items.length;

    var arrayLatLng = [];
    var i = 0;
    while (i < cantidad_items - 1) {
        var inputChk = items[i + 1];
        $(inputChk).prop('checked', true).trigger('sin_centrar');
        var latLngInputChk = JSON.parse($(inputChk).val());
        arrayLatLng.push({
            lat: latLngInputChk.PI_Latitud,
            lng: latLngInputChk.PI_Longitud
        });
        i++;
    }
    if (typeof onCompleteCallBack == 'function') {
        onCompleteCallBack(); // habilitar checkbox de mostrar en mapa
    }

    centrarMapaEn_LatitudLongitudArray(arrayLatLng);

    // vuelve a tildar el chk de la categoria
    $('li[name="categoria_' + item + '"] input[name="chk_agregar_al_mapa"]:first').prop('checked', true);
}

/**
 * Agrega el punto que recive como parametro al mapa.
 * Si el punto ya estaba agregado primero lo quita, y luego lo agrega
 * @param {*} controlador se recibe solo por compatibilidad, pero no se usa
 * @param {*} punto_input punto que se quiere agregar al mapa
 * @param {*} centrar true si se quiere centrar el mapa en el punto agregado
 * @param {*} guardar se recibe solo por compatibilidad, pero no se usa
 * @param {*} onSuccessCallBack se recibe solo por compatibilidad, pero no se usa
 * @param {*} onCompleteCallBack funcion que se ejecuta luego de agregar el punto
 */
function agregarPuntoFijo(controlador, punto_input, centrar, guardar, onSuccessCallBack, onCompleteCallBack) {
    var punto = JSON.parse(punto_input);

    // Si ya esta agregado, lo quitamos
    var punto_en_mapa = getPuntoFijoEnMapa(punto_input);
    if (punto_en_mapa) {
        quitarPuntoFijoDelMapa(punto_en_mapa);
    }

    // lógica para agregar punto al mapa
    var iconoURL = base_url + "/images/iconosTiposPI/" + punto.icono + "/" + punto.color.replace("#", "_") + ".png";

    var iconoLayer = L.icon({
        iconUrl: iconoURL,
        iconSize: [32, 32]
    });

    var tooltip_propiedad = $('#filtros-listado-puntos span.accion-btn-marker-tooltip-cambiar').find('i.activado').attr('name');
    var tooltipHTML = '';
    tooltipHTML += '<div class="marker-tooltip">';
    tooltipHTML += '    <div class="marker-tooltip-punto-nombre" style="display: ' + (tooltip_propiedad == 'descripcion_on' ? 'block' : 'none') + '">';
    tooltipHTML += '    ' + punto.PI_Descripcion;
    tooltipHTML += '    </div>';
    tooltipHTML += '</div>';

    var puntoMarkerNuevo = L.marker([punto.PI_Latitud, punto.PI_Longitud], {
        id: punto.IdPuntoInteres,
        icon: iconoLayer,
        color: punto.color,
        idCategoria: punto.PI_IdTipoPI
    }).bindTooltip(tooltipHTML, {
        permanent: true
    }).addTo(modulo_mapa);

    // Agregamos un circulo con la tolerancia
    var punto_tolerancia = L.circle([punto.PI_Latitud, punto.PI_Longitud], {
        radius: punto.PI_RadioTolerancia,
        color: punto.color,
        stroke: false
    }).addTo(modulo_mapa);

    mapa_puntos_fijos_array.push({
        punto: puntoMarkerNuevo,
        tolerancia: punto_tolerancia
    });

    if (typeof onCompleteCallBack == 'function') {
        onCompleteCallBack(); // habilitar checkbox de mostrar en mapa
    }

    if (centrar) {
        setTimeout(() => {
            centrarMapaEn_LatitudLongitud(punto.PI_Latitud, punto.PI_Longitud);
        }, 250);
    }
    // una vez que el punto fue agregado, prendemos el boton de centrado
    $("#item_punto_" + punto.IdPuntoInteres).find('i.listado-item-boton-buscar').trigger('prender');

    return puntoMarkerNuevo;
}

/**
 * Quita todos los puntos fijos que estan dibujados en el mapa
 */
function quitarTodosLosPuntosFijosDelMapa() {
    while (mapa_puntos_fijos_array.length != 0) {
        var punto_en_mapa = mapa_puntos_fijos_array[0];
        modulo_mapa.removeLayer(punto_en_mapa.punto);
        modulo_mapa.removeLayer(punto_en_mapa.tolerancia);
        mapa_puntos_fijos_array.splice(0, 1);
    }
}

/**
 * Quita el objeto punto que recibe como parametro
 * @param {*} punto_input objeto punto
 */
function quitarPuntoFijo(punto_input) {
    var item_index = -1;
    var punto_en_mapa;
    $.each(mapa_puntos_fijos_array, function (index) {
        if ($(this)["0"].punto.options.id == punto_input.punto.options.id) {
            item_index = index;
            punto_en_mapa = $(this)["0"];
            return;
        }
    });

    if (item_index != -1) {
        $("#item_punto_" + punto_en_mapa.punto.options.id).find('input[name="chk_agregar_al_mapa"]').prop('checked', false);
        $("#item_punto_" + punto_en_mapa.punto.options.id).closest('li[name^="categoria_"]').find('input[name="chk_agregar_al_mapa"]:first').prop('checked', false);
        modulo_mapa.removeLayer(punto_en_mapa.punto);
        modulo_mapa.removeLayer(punto_en_mapa.tolerancia);
        mapa_puntos_fijos_array.splice(item_index, 1);
    }
}

/**
 * Quita todos los puntos fijos que recibe como parametro (en forma de array)
 * @param {*} item // array con los puntos para quitar
 */
function quitarPuntoFijoDelMapa(items) {
    var i = 0;
    while (i < items.length) {
        quitarPuntoFijo(items[i]);
        i++;
    }
}

/**
 * Puede recibir los datos de un punto, el cual buscamos para ver si hay que quitarlo del mapa
 * Si lo que recibe es un número, el mismo representa una categoría y 
 * hay que quitar todos los puntos de la categoría
 * @param {*} punto_input datos del punto que se desea quitar del mapa ó id de la categoría para quitar todos sus puntos
 * @returns un array con todos los items que debemos quitar del mapa (puede estar vacio)
 */
function getPuntoFijoEnMapa(punto_input) {
    var punto_en_mapa = [];

    // si no es un numero, son los datos de un punto
    if (isNaN(punto_input)) {
        // string con datos del punto y lo convertimos a JSON
        var punto = JSON.parse(punto_input);

        $.each(mapa_puntos_fijos_array, function () {
            if ($(this)["0"].punto.options.id === punto.IdPuntoInteres) {
                punto_en_mapa.push($(this)["0"]);
                return;
            }
        });
    } else {
        var idCategoria = +punto_input; // id con la categoría de la que queremos quitar sus puntos

        // si es un número, retornar un array con todos los puntos que debemos quitar
        $.each(mapa_puntos_fijos_array, function () {
            if ($(this)["0"].punto.options.idCategoria == idCategoria) {
                punto_en_mapa.push($(this)["0"]);
                return;
            }
        });
    }

    // para mantener compatibilidad con otras funciones de obtener objetos en el mapa
    if (punto_en_mapa.length == 0) {
        return false;
    }

    return punto_en_mapa;
}
// recibe los datos de un punto para agregarlo al mapa:
function agregarPuntoAlMapa(punto) {
    var iconoURL = base_url + "/images/iconosTiposPI/" + punto.icono + "/" + punto.color.replace("#", "_") + ".png";

    var iconoLayer = L.icon({
        iconUrl: iconoURL,
        iconSize: [32, 32]
    });

    var puntoMarkerNuevo = L.marker([punto.latitud, punto.longitud], {
        id: punto.id,
        icon: iconoLayer,
        color: punto.color,
        // en relaciones guardamos las relaciones del punto con los demas objetos que se dibujan en el mapa, por ejemplo un punto puede estar relacionado a varias rutas
        relaciones: {}
    }).bindTooltip("", {
        permanent: true,
        className: "labelNoArrow"
    }).bindPopup("", {}).addTo(modulo_mapa);

    puntoMarkerNuevo.setPopupContent(punto.descripcion);
    mapa_puntos_array.push(puntoMarkerNuevo);

    return puntoMarkerNuevo;
}

// recibe un id punto y lo quita del mapa
function quitarPuntoDelMapa(punto_id) {
    var item_index = -1;
    var punto_en_mapa;
    $.each(mapa_puntos_array, function (index) {
        if ($(this)["0"].options.id === punto_id) {
            item_index = index;
            punto_en_mapa = $(this)["0"];
            return;
        }
    });

    modulo_mapa.removeLayer(punto_en_mapa);
    mapa_puntos_array.splice(item_index, 1);
}

// recibe un id punto y retorna el objeto punto dibujado en el mapa o false si no lo encuentra en el mapa
function getPuntoEnMapa(punto_id) {
    var punto_en_mapa = false;

    $.each(mapa_puntos_array, function () {
        if ($(this)["0"].options.id === punto_id) {
            punto_en_mapa = $(this)["0"];
            return;
        }
    });

    return punto_en_mapa;
}

// devuelve true si el punto tiene por lo menos una relacion o false si no tiene
function checkPuntoRelaciones(punto) {
    for (var tipo in punto.options.relaciones) {
        if (punto.options.relaciones[tipo].length !== 0) {
            return true;
        }
    }

    return false;
}

// relaciona el punto con otro objeto
// tipo: es el nombre del objeto raiz.
// raiz: es el id del objeto que esta relacionado con uno o mas puntos.
// punto: es el id del punto que se va a relacionar con el objeto raiz. 
// opciones: aqui guardamos la informacion adicional de la relacion si fuera necesaria.
// RETORNA: true si crea la relacion o false si no la crea
function agregarRelacionPunto(tipo, raiz, punto, opciones) {
    var punto_en_mapa = getPuntoEnMapa(punto);

    // si el punto aun existe en el mapa
    if (punto_en_mapa) {
        // si no hay una relacion previa del punto con el tipo de objeto raiz hacemos init
        if (!(tipo in punto_en_mapa.options.relaciones)) {
            punto_en_mapa.options.relaciones[tipo] = [];
        }

        // creamos la relacion
        var relacion = {};
        relacion.raiz = raiz;
        relacion.punto = punto_en_mapa.options.id;
        relacion.opciones = opciones;

        // agregamos la relacion al punto
        punto_en_mapa.options.relaciones[tipo].push(relacion);

        // relacion creada
        return true;
    }

    return false;
}

/* /FUNCIONES PARA LOS PUNTOS */

/* ------------------------ */
/* FUNCIONES PARA LAS RUTAS */
/* ------------------------ */

// array de rutas dibujadas en el mapa
var mapa_rutas_array = [];

// recibe un id ruta y la remueve del mapa
function quitarRutaDelMapa(ruta_id) {
    var item_index = -1;
    var ruta_en_mapa;
    $.each(mapa_rutas_array, function (index) {
        if ($(this)["0"].ruta === ruta_id) {
            item_index = index;
            ruta_en_mapa = $(this)["0"];
            return;
        }
    });

    if (ruta_en_mapa.polyline) {
        // si tiene una polyline asociada la removemos del mapa
        modulo_mapa.removeLayer(ruta_en_mapa.polyline);
        modulo_mapa.removeLayer(ruta_en_mapa.arrows);
    }

    // debemos remover las referencias de la ruta en los puntos que tiene asociados
    $.each(ruta_en_mapa.puntos, function (i, item) {
        var punto_en_mapa = getPuntoEnMapa(item);
        if (punto_en_mapa) {
            // si el punto continua en el mapa removemos todas las referencias que tenga con esta ruta
            punto_en_mapa.options.relaciones.rutas = $.grep(punto_en_mapa.options.relaciones.rutas, function (relacion, f) {
                // si es una relacion con otra ruta la mantiene, si es una relacion con la ruta a eliminar la elimina.
                return relacion.raiz !== ruta_en_mapa.ruta;
            });

            // refrescamos el tooltip del punto
            actualizarPuntoOrdenRuta(punto_en_mapa.options.id);

            // si el punto se quedo sin relaciones lo removemos del mapa
            if (!checkPuntoRelaciones(punto_en_mapa)) {
                quitarPuntoDelMapa(punto_en_mapa.options.id);
            }
        }
    });

    // removemos el objeto de ruta del array de rutas en el mapa
    mapa_rutas_array.splice(item_index, 1);
}

// recibe un id ruta y retorna el objeto si lo encuentra en el mapa o false si no lo encuentra
function getRutaEnMapa(ruta_id) {
    var ruta_en_mapa = false;

    $.each(mapa_rutas_array, function () {
        if ($(this)["0"].ruta === ruta_id) {
            ruta_en_mapa = $(this)["0"];
            return;
        }
    });

    return ruta_en_mapa;
}

// recibe un id ruta y retorna un array con los puntos que conforman la ruta dibujada en el mapa.
// si no tiene puntos retorna false.
function getRutaPuntos(ruta) {
    var puntos = [];

    var ruta_en_mapa = getRutaEnMapa(ruta);
    if (ruta_en_mapa) {
        $.each(ruta_en_mapa.puntos, function (index, punto) {
            var punto_en_mapa = getPuntoEnMapa(punto);
            if (punto_en_mapa) {
                puntos.push(punto_en_mapa);
            }
        });
    }

    if (puntos.length === 0) {
        return false;
    }

    return puntos;
}

// actualiza el tooltip del punto con el numero de orden con el que pasa cara ruta por el mismo 
function actualizarPuntoOrdenRuta(punto) {
    var punto_en_mapa = getPuntoEnMapa(punto);

    // si el punto aun existe en el mapa
    if (punto_en_mapa) {
        var relaciones = punto_en_mapa.options.relaciones.rutas;

        // vamos agregando el html de cada numero de orden con su color de ruta correspondiente
        var tooltipContentHTML = ' ';
        $.each(relaciones, function () {
            var relacion = $(this)["0"];
            tooltipContentHTML += '<div class="labelOrden" style="background-color:' + relacion.opciones.color + ';">' + relacion.opciones.orden + '</div>';
        });

        punto_en_mapa.setTooltipContent(tooltipContentHTML);
    }
}

// agrega un objeto ruta al mapa
function agregarRutaAlMapa(controlador, ruta_id, flag_centrar, flag_guardar, onSuccessCallBack, onCompleteCallBack) {
    // buscamos los puntos de la ruta (precargados en el DOM para mayor velocidad)
    var liParent = $('ul[name="listado-de-items"] li[id="item_ruta_' + ruta_id + '"]');
    var puntos = $.parseJSON(liParent.attr("data-puntos"));
    var color = liParent.attr("data-color");
    var routing = liParent.attr("data-routing") == 1 ? true : false;
    var ruta_descripcion = liParent.attr("data-descripcion");

    // crear un nuevo objeto ruta
    // si la ruta tiene routing (representado por una polyline)
    // la asignacion "polyline -> ruta" deja de ser false y pasa a ser la polyline una vez que la agregamos al mapa.
    // Esto lo hacemos para que la ruta no quede con asignaciones inconsistentes en caso de errores ajax.
    var rutaObject = {
        "ruta": ruta_id,
        "polyline": false,
        "arrows": false,
        "puntos": []
    };

    // en este array guardamos los puntos que se agregan para esta ruta, luego los podemos usar localmente solo en esta funcion.
    // si queremos referir a uno de los puntos de la ruta fuera de esta funcion, usar los array de objetos que se dibujan en el mapa y son de acceso global.
    var array_local_puntos_ruta = [];

    // añadir los puntos de la ruta al mapa
    $.each(puntos, function (index, value) {
        var punto = $(value)[0];
        var orden = index + 1;

        // si el punto no esta dibujado en el mapa, lo dibujamos
        if (!getPuntoEnMapa(punto.id)) {
            var nuevo_punto = agregarPuntoAlMapa(punto);
            array_local_puntos_ruta.push(nuevo_punto);
        } else {
            // si el punto ya esta dibujado guardamos una referencia en nuestro array local
            var punto_en_mapa = getPuntoEnMapa(punto.id);
            if (punto_en_mapa) {
                array_local_puntos_ruta.push(punto_en_mapa);
            }
        }

        // relacionamos el punto con la ruta, adicionalmente le pasamos un color y un numero de orden a la relacion 
        // para cuando le dibujemos los tooltips al punto.
        // se crearan tantas relaciones "ruta-punto" como veces el punto aparezca en la ruta.
        if (agregarRelacionPunto("rutas", ruta_id, punto.id, {
            "color": color,
            "orden": orden
        })) {
            // si pudimos crear la relacion "ruta-punto" se lo indicamos al objeto ruta,
            // los puntos se van agregando en el orden que seran recorridos. 
            rutaObject.puntos.push(punto.id);

            // modificar el tooltip del punto para que indique el orden en que la ruta pasa por el mismo
            actualizarPuntoOrdenRuta(punto.id);
        }
    });

    // los puntos de la ruta ya estan cargados en el mapa, el objeto ruta se agrega al array de rutas en el mapa.
    // igualmente el checkbox seguira en disabled hasta completar el proceso, ya que aun puede faltar dibujar el routing.
    mapa_rutas_array.push(rutaObject);

    // al finalizar de agregar la ruta
    var onSuccess = function () {
        // centrar el mapa en la ruta agregada
        if (flag_centrar) {
            // generamos una animacion que centra el mapa en la nueva ruta y ademas guarda el dato en la base de datos
            if (rutaObject.polyline) {
                centrarMapaEn_LatitudLongitudArray(rutaObject.polyline.getLatLngs());
            } else {
                centrarMapaEn_MarkerArray(array_local_puntos_ruta);
            }
        }

        // guardar en la base de datos que el usuario agrego de forma correcta la ruta al mapa
        if (flag_guardar) {
            userMapaAgregarItem(modulo, controlador, ruta_id);
        }

        if (typeof onSuccessCallBack !== 'undefined') {
            if ($.isFunction(onSuccessCallBack)) {
                onSuccessCallBack();
            }
        }
    };

    // añadir routing de ruta al mapa (usamos una polyline)
    if (routing) {
        var routing_configuracion = liParent.attr("data-routing-configuracion") ? $.parseJSON(liParent.attr("data-routing-configuracion")) : {};

        // si tiene routing pedimos los datos de las coordenadas a nuestro provider de routing y dibujamos la ruta.
        // para ello primero obtenemos la configuracion de routing cargada (almacenada en el DOM para mayor velocidad). 
        // generamos los parametros para enviar al proveedor en base a la informacion leida.
        var parametros = {};
        parametros.app_id = "kDw247ifuRx8FSdbfLCR";
        parametros.app_code = "GA9UZVt8ou_tUlV4u5Q6jQ";
        parametros.jsonAttributes = "1";
        parametros.mode = routing_configuracion.modo + ";" + routing_configuracion.vehiculo + ";traffic:" + routing_configuracion.trafico + ";" + routing_configuracion.evitar.join();
        parametros.routeAttributes = "legs";
        parametros.legAttributes = "maneuvers";
        parametros.maneuverAttributes = "shape,action";
        parametros.language = "es-es";

        // agregamos los puntos que vamos a unir con el routing en el orden en que seran recorridos
        $.each(puntos, function (index, value) {
            var punto = $(value)[0];
            parametros["waypoint" + index] = "geo!" + punto.latitud + "," + punto.longitud;
        });

        // enviamos a nuestro proveedor la informacion para que nos devuelva el routing y luego lo agregamos al mapa.
        // finalmente creamos la relacion con el objeto ruta.
        $.ajax({
            url: "https://route.cit.api.here.com/routing/7.2/calculateroute.json",
            dataType: "JSON",
            type: "GET",
            data: parametros,
            success: function (respuesta) {
                // guardamos las coordenadas de cada punto para generar la polyline
                var camino_legs = respuesta.response.route["0"].leg;

                var camino_puntos = [];
                $.each(camino_legs, function (i, leg) {
                    var camino = leg.maneuver;
                    $.each(camino, function (f, item) {
                        $.each(item.shape, function (i, coordenadas) {
                            var coord = coordenadas.split(',');
                            camino_puntos.push({
                                lat: coord[0],
                                lng: coord[1]
                            });
                        });
                    });
                });

                // creamos la polyline con el routing para nuestra nueva ruta 
                var nuevaPolylineRouting = new L.Polyline(camino_puntos, {
                    // el routing mantiene el color de la ruta
                    color: color,
                    weight: routing_configuracion.grosor,
                    opacity: routing_configuracion.opacidad,
                    smoothFactor: 3
                });

                // le agregamos arrows a la polyline
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

                // agregar la polyline al mapa
                nuevaPolylineRouting.addTo(modulo_mapa);

                // relacionar la nueva polyline con el objeto ruta creado
                var nueva_ruta = getRutaEnMapa(ruta_id);
                if (nueva_ruta) {
                    // si luego del llamado ajax la ruta sigue dibujada en el mapa
                    nueva_ruta.polyline = nuevaPolylineRouting;
                    nueva_ruta.arrows = polylineArrows;

                    onSuccess();
                } else {
                    // si falla la asociacion removemos la polyline del mapa, para no dejar basura.
                    modulo_mapa.removeLayer(nuevaPolylineRouting);
                    modulo_mapa.removeLayer(polylineArrows);
                }
            },
            error: function () {
                mensaje('ALERTA: EL SERVIDOR NO ENCONTRO UN CAMINO POSIBLE PARA LA RUTA "' + ruta_descripcion + '", POR FAVOR REVISE LA CONFIGURACION DE ROUTING GUARDADA', 6000);
            }
        });
    } else {
        // si al ruta no tiene routing terminamos de agregarla al mapa
        onSuccess();
    }

    // terminamos de agregar la ruta (en caso de routing queda agregandose de forma asicronica)
    if (typeof onCompleteCallBack !== 'undefined') {
        if ($.isFunction(onCompleteCallBack)) {
            onCompleteCallBack();
        }
    }
}

/* /FUNCIONES PARA LAS RUTAS */

/* -------------------------------- */
/* FUNCIONES PARA LAS INSTRUCCIONES */
/* -------------------------------- */

// array de instrucciones dibujadas en el mapa
var mapa_instrucciones_array = [];

// recibe un id instruccion y la remueve un objeto instruccion del mapa
function quitarInstruccionDelMapa(instruccion_id) {
    var item_index = -1;
    var instruccion_en_mapa;
    $.each(mapa_instrucciones_array, function (index) {
        if ($(this)["0"].instruccion === instruccion_id) {
            item_index = index;
            instruccion_en_mapa = $(this)["0"];
            return;
        }
    });

    // removemos la traza asociada con la instruccion
    if (instruccion_en_mapa.polyline) {
        modulo_mapa.removeLayer(instruccion_en_mapa.polyline);
        modulo_mapa.removeLayer(instruccion_en_mapa.arrows);
    }

    // quitamos la relacion punto instruccion y si es necesario tambien quitamos el punto del mapa
    $.each(instruccion_en_mapa.puntos, function (i, item) {
        var punto_en_mapa = getPuntoEnMapa(item);
        if (punto_en_mapa) {
            // si el punto continua en el mapa removemos todas las referencias que tenga con esta ruta 
            punto_en_mapa.options.relaciones.instrucciones = $.grep(punto_en_mapa.options.relaciones.instrucciones, function (relacion, f) {
                // si es una relacion con otra ruta la mantiene, si es una relacion con la ruta a eliminar la elimina. 
                return relacion.raiz !== instruccion_en_mapa.instruccion;
            });

            // si el punto se quedo sin relaciones lo removemos del mapa
            if (!checkPuntoRelaciones(punto_en_mapa)) {
                quitarPuntoDelMapa(punto_en_mapa.options.id);
            }
        }
    });

    // removemos el objeto instruccion del array
    mapa_instrucciones_array.splice(item_index, 1);
}

// recibe un id instruccion y retorna un objeto instruccion o false si no lo encuentra en el mapa
function getInstruccionEnMapa(instruccion_id) {
    var instruccion_en_mapa = false;

    $.each(mapa_instrucciones_array, function (index, item) {
        if ($(this)["0"].instruccion === instruccion_id) {
            instruccion_en_mapa = $(this)["0"];
            return;
        }
    });

    return instruccion_en_mapa;
}

// recibe un array de coordenadas y pide al proveedor de routing las instrucciones para recorrerlos
function getInstruccionesRuta(ruta, puntos, opciones, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    var url_routing = "https://route.cit.api.here.com/routing/7.2/calculateroute.json";
    var parametros = {};
    //parametros.app_id = "kDw247ifuRx8FSdbfLCR";
    //parametros.app_code = "GA9UZVt8ou_tUlV4u5Q6jQ";
    //Error en credenciales de ruteo
    parametros.app_id = "s09rHdXJFlM2k0CbVQgh";
    parametros.app_code = "v3NSGBFUbs8M2NtrTNNB0Q";
    parametros.jsonAttributes = "1";
    parametros.routeAttributes = "legs";
    parametros.legAttributes = "maneuvers";
    parametros.maneuverAttributes = "shape,action";
    parametros.language = "es-es";
    parametros.mode = opciones;

    $.each(puntos, function (index, punto) {
        parametros["waypoint" + index] = "geo!" + punto.latitud + "," + (punto.longitud.trim()+'0000000000').slice(0,10)
    });

    $.ajax({
        url: url_routing,
        dataType: "JSON",
        type: "GET",
        data: parametros,
        success: function (respuesta) {
            var instrucciones = [];

            $.each(respuesta.response.route["0"].leg, function (i, leg) {
                var camino = leg.maneuver;
                var instruccion = {};

                // punto desde 
                instruccion.partida = {};
                instruccion.partida.orden = puntos[i].orden;
                instruccion.partida.descripcion = puntos[i].descripcion;
                instruccion.partida.ubicacion = leg.start.label;
                instruccion.partida.icono = puntos[i].icono;
                instruccion.partida.color = puntos[i].color;
                instruccion.partida.tipoDescripcion = puntos[i].tipoDescripcion;

                // punto hasta 
                instruccion.destino = {};
                destinoIntedex = parseInt(i) + 1;
                instruccion.destino.orden = puntos[destinoIntedex].orden;
                instruccion.destino.descripcion = puntos[destinoIntedex].descripcion;
                instruccion.destino.ubicacion = leg.end.label;
                instruccion.destino.icono = puntos[destinoIntedex].icono;
                instruccion.destino.color = puntos[destinoIntedex].color;
                instruccion.destino.tipoDescripcion = puntos[destinoIntedex].tipoDescripcion;

                // listado de instrucciones para llegar desde el punto de partida hasta el punto de destino 
                instruccion.indicaciones = [];
                $.each(camino, function (f, item) {
                    instruccion.indicaciones.push({
                        "accion": item.action,
                        "instruccion": item.instruction,
                        "coordenadas": {
                            "latitud": item.position.latitude,
                            "longitud": item.position.longitude
                        },
                        "camino": item.shape
                    });
                });

                instrucciones.push(instruccion);
            });

            onSuccessCallBack(ruta, instrucciones);
        },
        error: function () {
            // usamos esta estructura de error para que sea compatible con los onError que usamos en otras funciones, 
            // la diferencia es que este error viene desde el proveedor de routing y tiene su propia estructura.
            var respuesta = {};
            respuesta.mensaje = "ERROR: NO SE PUDO LEER LAS INSTRUCCIONES BUSCADAS";
            onErrorCallBack(respuesta);
        },
        complete: function () {
            onCompleteCallBack();
        }
    });
}

/* /FUNCIONES PARA LAS INSTRUCCIONES */

/* ----------------------------- */
/* FUNCIONES PARA LOS DISPOTIVOS */
/* ----------------------------- */

// array de dispositivos dibujados en el mapa
var mapa_dispositivos_array = [];

// retorna la ultima posicion de un dispositivo
function getDispositivoUbicacion(dispositivo, onSuccessCallBack, onErrorCallBack, onCompleteCallBack) {
    if (typeof dispositivo !== 'undefined' && dispositivo !== '') {
        $.ajax({
            url: "index.php?r=dispositivo/getPosicion",
            data: {
                dispositivo: dispositivo
            },
            dataType: "JSON",
            type: "POST",
            success: function (respuesta) {
                if (respuesta.estado === 1) {
                    if ($.isFunction(onSuccessCallBack)) {
                        onSuccessCallBack(respuesta.posicion);
                    }
                } else {
                    if ($.isFunction(onErrorCallBack)) {
                        onErrorCallBack(respuesta.mensaje);
                    }
                }
            },
            error: function () {
                if ($.isFunction(onErrorCallBack)) {
                    onErrorCallBack("ERROR: AL LEER POSICION");
                }
            },
            complete: function () {
                if ($.isFunction(onCompleteCallBack)) {
                    onCompleteCallBack();
                }
            }
        });
    } else {
        if ($.isFunction(onErrorCallBack) && $.isFunction(onCompleteCallBack)) {
            onErrorCallBack("ERROR: EL MOVIL QUE INTENTA AGREGAR NO TIENE UN DISPOSITIVO ASIGNADO");
            onCompleteCallBack();
        }
    }
}

// recibe un dispositivo y lo quita del mapa
function quitarDispositivoDelMapa(dispositivo_id) {
    var item_index = -1;
    var dispositivo_en_mapa;
    $.each(mapa_dispositivos_array, function (index) {
        if ($(this)["0"].options.dispositivo === dispositivo_id) {
            item_index = index;
            dispositivo_en_mapa = $(this)["0"];
            return;
        }
    });

    if (item_index !== -1) {
        modulo_mapa.removeLayer(dispositivo_en_mapa);
        mapa_dispositivos_array.splice(item_index, 1);
    }
}

// retorna el icono que corresponde segun el dispositivo y sus datos posicionales
function getDispositivoIcono(tipo, posicion) {
    var icono = false;

    switch (tipo) {
        case "movil":
            var iconoUrl = (posicion.Reporte_Ignicion === "SI") ? 'images/iconosMap/arrow5.png' : 'images/iconosMap/arrow6.png';
            icono = L.icon({
                iconUrl: iconoUrl,
                iconSize: [18, 24],
                iconAnchor: [9, 12]
            });
            break;
    }

    return icono;
}

// retorna el dispotivo dibujado en el mapa
function getDispositivoEnMapa(dispositivo_id) {
    var dispositivo_en_mapa = false;

    $.each(mapa_dispositivos_array, function () {
        if ($(this)["0"].options.dispositivo === dispositivo_id) {
            dispositivo_en_mapa = $(this)["0"];
            return;
        }
    });

    return dispositivo_en_mapa;
}

function agregarDispositivoAlMapa(controlador, dispositivo_id, flag_centrar, flag_guardar, onSuccessCallBack, onCompleteCallBack) {
    // en caso de error mostramos un mensaje al usuario
    var onError = function (descripcion) {
        mensaje(descripcion, 2000);
    };

    // una vez leida la ubicacion del dispositivo lo podemos agregar al mapa
    var onSuccess = function (posicion) {
        var marker_tooltip = $('ul[name="listado-de-items"] li[data-dispositivo="' + dispositivo_id + '"]').attr("data-mapa-tooltip");
        var dispositivo_icono = getDispositivoIcono(controlador, posicion);

        // crear el marker del dispositivo
        var dispositivoMarkerNuevo = L.marker([posicion.Reporte_Latitud, posicion.Reporte_Longitud], {
            dispositivo: dispositivo_id,
            icon: dispositivo_icono,
            rotationAngle: parseInt(posicion.Reporte_Rumbo),
            rotationOrigin: "center center"
        }).bindTooltip(marker_tooltip, {
            direction: getDirectionTooltip(),
            offset: getTooltipOffset(),
            permanent: true,
            interactive: true,
            opacity: 1
        }).addTo(modulo_mapa);

        // poner el dispositivo en el array
        mapa_dispositivos_array.push(dispositivoMarkerNuevo);

        // centrar el mapa en el dispositivo agregado
        if (flag_centrar) {
            modulo_mapa.panTo(dispositivoMarkerNuevo.getLatLng(), {
                animate: true,
                duration: 0.5
            });
        }

        // guardar en la base de datos que el dispositivo fue agregado al mapa
        if (flag_guardar) {
            userMapaAgregarItem(modulo, controlador, dispositivo_id);
        }

        // ejecutamos on success del llamado a agregar
        if (typeof onSuccessCallBack !== 'undefined') {
            if ($.isFunction(onSuccessCallBack)) {
                onSuccessCallBack();
            }
        }
    };

    // leer la ubicacion del dispositivo desde el servidor
    getDispositivoUbicacion(dispositivo_id, onSuccess, onError, onCompleteCallBack);
}


// para que los tooltip no se pisen unos con otros vamos rotando la posicion
var tooltipDirectionActual = 0;
var tooltipDirections = ["top", "right", "bottom", "left"];

function getDirectionTooltip() {
    if (tooltipDirectionActual > 3) {
        tooltipDirectionActual = 0;
    }

    return tooltipDirections[tooltipDirectionActual++];
}

// en base a la direccion del tooltip retorna el offset para que no pise el movil
function getTooltipOffset() {
    switch (tooltipDirections[tooltipDirectionActual - 1]) {
        case "top":
            return L.point(0, -7);
        case "right":
            return L.point(7, 0);
        case "bottom":
            return L.point(0, 7);
        case "left":
            return L.point(-7, 0);
    }
}
/* /FUNCIONES PARA LOS DISPOTIVOS */

/* -------------------------- */
/* FUNCIONES PARA LOS MOVILES */
/* -------------------------- */

// array de historicos de moviles dibujados en el mapa
var mapa_movil_historico_array = [];

// agrega un recorrido de un movil al mapa, con todas sus caracteristicas
// movil_id: movil al que pertenece el recorrido historico
// puntos: reportes que conforman el recorrido historico
// metros: si dos reportes consecutivos estan a una distancia inferior a "metros" se agrupan como un unico marker
// minutos: tiempo minimo que debe transcurrir entre un reporte y el siguiente
// flag_unir: true si hay que unir los reportes con una linea
// flag_nro_orden: true si hay que mostrar el numero de orden de los reportes
// flag_ignorar_posicion: true si los eventos de posicion deben ser ignorados
// polyline_color: color de la polyline
// filtro_evento: reportes que contengan el evento indicado
function agregarMovilRecorridoAlMapa(movil_id, puntos, metros, minutos, flag_unir, flag_nro_orden, flag_ignorar_posicion, polyline_color, filtro_evento) {
    if (filtro_evento && filtro_evento.length > 0) {
        filtro_evento = filtro_evento.toLowerCase();
    }

    var movilHistoricoObj = {
        id: movil_id,
        puntos: puntos,
        polyline: null,
        markers: []
    };

    // por cada punto
    var camino_puntos = [];
    var nro_de_reporte = 0; // contador de reportes que se muestran
    var index = 0; // index del reporte actual para uso interno
    var grupo_nro_primer_reporte; // numero de reporte del primer reporte de un grupo de reportes
    var grupo_nro_ultimo_reporte; // numero de reporte del ultimo reporte de un grupo de reportes
    // punto para controlar que el tiempo entre reportes sea superior al limite ingresado por el usuario
    var puntoAnterior = null;
    while (index < puntos.length) {
        // obtener el punto        
        var punto = puntos[index];
        index++;

        /* si el punto tiene coordenadas 
         * y supera el tiempo minimo entre reportes
         * y revisamos la logica de mostrar o no reportes de posicion
         */
        if (punto.latitud !== '' && // si tiene latitud
            punto.longitud !== '' && // si tiene longitud
            compararMinutosEntreReportes(puntoAnterior, punto, minutos) && // si supera el tiempo minimo entre reportes
            (flag_ignorar_posicion == false || (flag_ignorar_posicion && punto.evento != 'POSICION')) &&
            (!filtro_evento || (filtro_evento.length > 0 && punto.evento.toLowerCase().indexOf(filtro_evento) > -1))) { // si no hay que ignorar los de posicion o hay que ignorarlos pero no es de posicion

            // nuevo punto para tomar la fecha
            puntoAnterior = punto;

            // array de puntos que agrupamos en un unico marker
            var grupo = [punto];
            var grupo_coordenadas = [{
                lat: punto.latitud,
                lng: punto.longitud
            }];
            var puntoCentroGrupo = (new L.LatLngBounds(grupo_coordenadas)).getCenter();
            nro_de_reporte++;

            // mientras que la distancia del centro del grupo hasta el siguiente punto no supere los metros minimos
            // agrupamos los puntos como un unico punto centrado entre todos los agrupados.
            grupo_nro_primer_reporte = nro_de_reporte;
            while (index < puntos.length && parseFloat(getKilometrosEntreCoordenadas(puntoCentroGrupo.lat, puntoCentroGrupo.lng, puntos[index].latitud, puntos[index].longitud)) < parseFloat((parseFloat(metros) / 1000))) {
                // si el punto tiene coordenadas y supera el tiempo minimo entre reportes                
                if (punto.latitud !== '' &&
                    punto.longitud !== '' &&
                    compararMinutosEntreReportes(puntoAnterior, puntos[index], minutos) &&
                    (flag_ignorar_posicion == false || (flag_ignorar_posicion && puntos[index].evento != 'POSICION')) &&
                    (!filtro_evento || (filtro_evento.length > 0 && puntos[index].evento.toLowerCase().indexOf(filtro_evento) > -1))) {

                    // nuevo punto para tomar la fecha
                    puntoAnterior = puntos[index];

                    // incluimos el punto al grupo de puntos que entre ellos no superan la distancia en "metros"
                    grupo.push(puntos[index]);
                    grupo_coordenadas.push({
                        lat: puntos[index].latitud,
                        lng: puntos[index].longitud
                    });

                    // centro del grupo de puntos incluido el nuevo punto agrupado
                    puntoCentroGrupo = (new L.LatLngBounds(grupo_coordenadas)).getCenter();
                    nro_de_reporte++;
                    grupo_nro_ultimo_reporte = nro_de_reporte;
                }

                index++;
            }

            // html que representa un reporte en el mapa
            var iconoHTML = '';
            iconoHTML += '<div>';
            iconoHTML += '  <div name="marker-content" class="' + (grupo.length > 1 ? "grupo-" : "") + 'punto-marker ' + (!flag_nro_orden ? "activado" : "") + '">';
            iconoHTML += '  </div>';
            iconoHTML += '  <div class="' + (grupo.length > 1 ? "grupo-" : "") + 'punto-marker-orden ' + (flag_nro_orden ? "activado" : "") + '">';
            iconoHTML += '      <div class="reporte-numero-texto">';
            if (grupo.length > 1) { // para los grupos de reportes mostramos el numero de primer y ultimo reporte agrupado
                iconoHTML += '  ' + grupo_nro_primer_reporte + '-' + grupo_nro_ultimo_reporte;
            } else { // para los reportes unicos mostramos el numero de reporte
                iconoHTML += '  ' + nro_de_reporte;
            }
            iconoHTML += '      </div>';
            iconoHTML += '  </div>';
            iconoHTML += '</div>';

            // creamos el icono del marker
            var divIcono = L.divIcon({
                iconSize: [5, 5],
                className: 'movil-historico-punto',
                html: iconoHTML
            });

            // coordenadas del centro del grupo
            var latlng = {
                lat: puntoCentroGrupo.lat,
                lng: puntoCentroGrupo.lng
            };

            // html para el popup
            var popupHTML = '';
            popupHTML += '<div class="movil-historico-popup">';
            popupHTML += '  <div class="header mdc-elevation--z2">';
            popupHTML += '      <div class="header-texto">DATOS DE' + (grupo.length > 1 ? " " + grupo.length + " REPORTES" : "L REPORTE") + "</div>";
            popupHTML += '  </div>';
            popupHTML += '  <div class="body">';

            var flag_bg_color = true;
            $.each(grupo, function (f, item) {
                // formatear fecha
                var dia = item.fecha.substring(8, 10);
                var mes = item.fecha.substring(5, 7);
                var anio = item.fecha.substring(0, 4);
                var hora_minuto_segundo = item.fecha.substring(11, 19);
                var fecha = dia + "/" + mes + "/" + anio + " " + hora_minuto_segundo;
                var numero = (nro_de_reporte - (grupo.length - 1)) + f; // numero del reporte

                popupHTML += '<div class="fila">';
                popupHTML += '  <div class="numero-item-container">';
                // como en "nro_de_reporte" guardamos el numero de reporte del mas grande del grupo 
                // aplicamos calculo matematico para obtener cada nro_de_reporte de cada reporte del grupo
                popupHTML += '      <div onclick="seleccionarReporte(' + numero + ', \'' + item.fecha + '\', ' + latlng.lat + ', ' + latlng.lng + ');" class="numero-item">' + numero + '</div>';
                popupHTML += '  </div>';
                popupHTML += '  <div class="item ' + (flag_bg_color ? 'color_uno' : 'color_dos') + '">';
                popupHTML += '      <div class="fecha item-texto">';
                popupHTML += '          ' + fecha;
                popupHTML += '      </div>';
                popupHTML += '      <div class="evento item-texto">';
                popupHTML += '          ' + item.evento;
                popupHTML += '      </div>';
                popupHTML += '      <div class="geo item-texto">';
                popupHTML += '          ' + item.geo;
                popupHTML += '      </div>';
                popupHTML += '  </div>';
                popupHTML += '</div>';

                flag_bg_color = !flag_bg_color;
            });
            popupHTML += '  </div>'; // cierra body
            popupHTML += '  <div class="footer">';
            popupHTML += '      <button onclick="reporteCargarPunto(' + latlng.lat + ', ' + latlng.lng + ')" name="btn-crear-punto-en-reporte" class="mdc-button mdc-button--unelevated boton">CREAR PUNTO</button>';
            popupHTML += '  </div>';
            popupHTML += '</div>'; // cierra popup

            // popup para el marker
            var popup = L.popup().setContent(popupHTML);

            // creamos el marker que representa el reporte en el mapa
            var markerPunto = L.marker(latlng, {
                icon: divIcono
            }).bindPopup(popup);

            // agregar marker al mapa
            markerPunto.addTo(modulo_mapa);

            // tooltips del popup
            markerPunto.on('popupopen', function (e) {
                // inicializar ayudas del popup
                $(e.popup._contentNode).find('i.help-tooltip').tooltipster({
                    theme: 'tooltipster-punk',
                    maxWidth: 300,
                    delay: [150, 350]
                });
            });

            // agregar marker al array
            movilHistoricoObj.markers.push(markerPunto);

            // agregar punto al array
            camino_puntos.push(latlng);
        }
    }

    // polyline que representa el historico del movil
    movilHistoricoObj.polyline = new L.Polyline(camino_puntos, {
        color: polyline_color,
        weight: 2,
        opacity: 1
    });

    // unir puntos con la polyline
    if (flag_unir) {
        movilHistoricoObj.polyline.addTo(modulo_mapa);
    }

    // animacion de centrado
    $(movilHistoricoObj).on("mapa_centrar", function () {
        if (camino_puntos.length > 0) {
            centrarMapaEn_LatitudLongitudArray(camino_puntos);
            // animacion path
            $(movilHistoricoObj.polyline._path).addClass('path-animacion-centrado');
            setTimeout(function () {
                $(movilHistoricoObj.polyline._path).removeClass('path-animacion-centrado');
            }, 450);

            // animacion puntos
            $.each(movilHistoricoObj.markers, function (index, marker) {
                var divParentPuntoMarker = $(marker._icon).find('div.punto-marker');
                var divParentGrupoPuntoMarker = $(marker._icon).find('div.grupo-punto-marker');
                var divParentPuntoMarkerOrden = $(marker._icon).find('div.punto-marker-orden');
                var divParentGrupoPuntoMarkerOrden = $(marker._icon).find('div.grupo-punto-marker-orden');

                divParentPuntoMarker.addClass('marker-animacion-centrado');
                divParentGrupoPuntoMarker.addClass('marker-animacion-centrado');
                divParentPuntoMarkerOrden.addClass('marker-animacion-centrado');
                divParentGrupoPuntoMarkerOrden.addClass('marker-animacion-centrado');

                setTimeout(function () {
                    divParentPuntoMarker.removeClass('marker-animacion-centrado');
                    divParentGrupoPuntoMarker.removeClass('marker-animacion-centrado');
                    divParentPuntoMarkerOrden.removeClass('marker-animacion-centrado');
                    divParentGrupoPuntoMarkerOrden.removeClass('marker-animacion-centrado');
                }, 450);
            });
        }
    });

    // agregar historico al array de historicos de movil
    mapa_movil_historico_array.push(movilHistoricoObj);

    // retornamos el nuevo historico
    return movilHistoricoObj;
}

/* con esta funcion calculamos el tiempo transcurrido entre dos reportes de un movil
 * y lo mostramos en el panel historico del movil */
function seleccionarReporte(nro_reporte, fecha, latitud, longitud) {
    // si el layer esta cerrado lo abrimos
    if (tiempoEntreReportesCtrl.options.datas.estado == 'cerrado') {
        $(tiempoEntreReportesCtrl.options.events).trigger('abrir');
    }

    // guaradmos la fecha en los datos del reporte que debemos actualizar
    if (tiempoEntreReportesCtrl.options.datas.reporte_actual == 'uno') {
        tiempoEntreReportesCtrl.options.datas.reporte_uno.fecha = fecha;
        tiempoEntreReportesCtrl.options.datas.reporte_uno.latitud = latitud;
        tiempoEntreReportesCtrl.options.datas.reporte_uno.longitud = longitud;
        tiempoEntreReportesCtrl.options.datas.reporte_uno.numero = nro_reporte;

        tiempoEntreReportesCtrl.options.datas.reporte_actual = 'dos'; // el siguiente reporte sera el dos

        // texto para el usuario
        $(tiempoEntreReportesCtrl.options.events).trigger('otro_reporte');
    } else if (tiempoEntreReportesCtrl.options.datas.reporte_actual == 'dos') {
        tiempoEntreReportesCtrl.options.datas.reporte_dos.fecha = fecha;
        tiempoEntreReportesCtrl.options.datas.reporte_dos.latitud = latitud;
        tiempoEntreReportesCtrl.options.datas.reporte_dos.longitud = longitud;
        tiempoEntreReportesCtrl.options.datas.reporte_dos.numero = nro_reporte;

        tiempoEntreReportesCtrl.options.datas.reporte_actual = 'uno'; // el siguiente reporte vuelve a ser el uno

        // ya selecciono ambos reportes- calculamos la diferencia
        $(tiempoEntreReportesCtrl.options.events).trigger('calcular_diferencia');
    }
}

// abrir adminsitrador para cargar punto en la ubicacion del reporte
function reporteCargarPunto(latitud, longitud) {
    // cerar popups del mapa
    modulo_mapa.closePopup();
    // ir al panel de puntos
    $('#celda-izquierda-header > section.mdc-card__actions > button[data-controls="#panel-3"]').click();
    // al abrir el panel de carga 
    $(document).on('formulario_cargado', 'form[id="frm-cargar-punto"]', function () {
        // es un listener por unica vez
        $(document).off('formulario_cargado');
        // trigger mapa click en la ubicacion del reporte
        modulo_mapa.fireEvent('click', {
            latlng: {
                lat: latitud,
                lng: longitud
            }
        });
    });
    // abrir el panel de carga
    $('div#filtros-listado-puntos span.filtros-btn-crear').click();
}

// retorna true si la diferencia de tiempo entre los reportes es mayor o igual a los minutos limite.
function compararMinutosEntreReportes(reporte1, reporte2, minutos_limite) {
    // se considera tiempo superado si almenos uno de los reportes es nulo
    if (reporte1 === null || reporte2 === null) {
        return true;
    }

    // fechas de los reportes
    var fecha_punto_anterior = new Date(reporte1.fecha);
    var fecha_punto = new Date(reporte2.fecha);

    // diferencia de tiempo entre fechas
    var diffMs = Math.abs(fecha_punto - fecha_punto_anterior);
    var minutos_diferencia = Math.round((diffMs / 1000) / 60);

    // true si el tiempo de la diferencia es mayor al tiempo limite
    return (minutos_diferencia > minutos_limite);
}

// retorna la distancia que hay entre dos puntos definidos por sus coordenadas latitud y longitud
function getKilometrosEntreCoordenadas(lat1, lon1, lat2, lon2) {
    rad = function (x) {
        return x * Math.PI / 180;
    };

    var R = 6378.137; // radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    // retorna tres decimales
    return d.toFixed(3);
}

// retorna el recorrido de un movil
function getMovilRecorridoEnMapa(movil_id) {
    var recorrido_historico = false;

    $.each(mapa_movil_historico_array, function () {
        if ($(this)["0"].id === movil_id) {
            recorrido_historico = $(this)["0"];
            return;
        }
    });

    return recorrido_historico;
}

// recibe un id movil y quita su recorrido historico del mapa
function quitarMovilRecorridoDelMapa(movil_id) {
    var item_index = -1;
    var recorrido_historico_en_mapa;
    $.each(mapa_movil_historico_array, function (index) {
        if ($(this)["0"].id === movil_id) {
            item_index = index;
            recorrido_historico_en_mapa = $(this)["0"];
            return;
        }
    });

    if (item_index !== -1) {
        // remover polyline
        modulo_mapa.removeLayer(recorrido_historico_en_mapa.polyline);

        // remover markers
        $.each(recorrido_historico_en_mapa.markers, function (index, marker) {
            modulo_mapa.removeLayer(marker);
        });

        mapa_movil_historico_array.splice(item_index, 1);
    }
}

/* /FUNCIONES PARA LOS MOVILES */