
var todosLosMarcadores = [];
var todosLosMarcadoresDeZonas = []; //array en el que se iran guardando los puntos y lineas de las zonas, para luego poder ser borradas del mapa
var map;
var xhrObj;

function initMap() {

    var centro = new google.maps.LatLng(-38.4191625, -63.5989206);
    var mapOptions = {
        zoom: 5,
        center: centro,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'OSM', google.maps.MapTypeId.HYBRID],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        size: (100, 100, '%', '%'),
        streetViewControl: false,
        mapTypeControl: false
    };
    map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

    //Define OSM map type pointing at the OpenStreetMap tile server
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "Mapa 2",
        maxZoom: 18
    }));
}

google.maps.event.addDomListener(window, 'load', initMap);

/**
 * Grafica en el mapa todos los moviles que tiene asignado el usuario.
 */

function visualizaFlota(doReload) {
    var marcador;
    var vectorMarcadores = [];
    var direccion;
    var bounds = new google.maps.LatLngBounds();

    if (xhrObj) {
        xhrObj.abort();
    }

    if (!doReload) {
        $(".preload").fadeIn();
    }

    var activeCarSelection = $.map($("[name=vehicles]"), function (v, i) {
        if ($(v).is(":checked")) {
            return $(v).val();
        }
    });

    xhrObj = $.getJSON("index.php?r=flota/posicionesmobile", function (datos) {

        limpiarMapa();

        for (var i = 0; i < datos.length; i++) {

            if ($.inArray(datos[i].dominio, activeCarSelection) > -1) {

                var posicion = new google.maps.LatLng(datos[i].latitud, datos[i].longitud);

                //bounds.extend(datos[i].getPosition());

                bounds.extend(posicion);

                var icono = {
                    url: datos[i].icono,
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 16)
                };

                var marcador = new MarkerWithLabel({
                    position: posicion,
                    icon: icono,
                    map: map,
                    id: datos[i].disp,
                    title: datos[i].movil,
                    labelContent: "<span style='color:#15DAE2;'>" + datos[i].dominio + "</span>",
                    labelClass: "label-marker",
                    labelStyle: {padding: "5px"}
                });
                vectorMarcadores.push(marcador);
                todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
                //vectorMarcadores[i].infobox = new InfoBox(opcionesInfoBox);
                google.maps.event.addListener(marcador, 'click', (function (marcador, i) {
                    return function () {
                        var datosArr = datos[i];
                        $("#carData, #alertData").slideUp(function () {
                            $.each(datosArr, function (i, v) {
                                if ($("#" + i).length > 0) {
                                    $("#" + i).text(v);
                                }
                            });
                        });
                        $("#carData").slideDown();
                        //vectorMarcadores[i].infobox.open(map, this);
                    }
                })(marcador, i));
            }
        }
        if (!doReload) {
            if (activeCarSelection == "") {
                var posicion = new google.maps.LatLng(-38.4191625, -63.5989206);
                bounds.extend(posicion);
                map.fitBounds(bounds);
                map.setZoom(4);
            } else {
                map.fitBounds(bounds);
                if(map.getZoom() > 17){
                    map.setZoom(17);
                }
            }
            $(".preload").fadeOut();
        }
    });

}

/**
 * Recibe por parametro el ID del movil, busca su ultima posicion mediante ajax, y lo grafica en el mapa junto a sus datos.
 * @param movil
 */

function visualizaVehiculo(movil, evento) {
    if (movil == '') {
        alert("el movil no puede ser nulo");
        return;
    }

    var url = 'index.php?r=flota/posicionesmobile&movil=' + movil;
    var pos = $.getJSON(url, function (datos) {
        if (datos.latitud == null || datos.longitud == null) {
            alert("MOVIL SIN POSICION");
            return false;
        }
        $("#menuDetallesMovil").remove();

        if (evento == true)
            var tipoEvento = "<div class='DetalleMapa'>" +
                    "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                    "<b>Evento</b> " + datos.tipoEvento +
                    "</div>";
        else
            var tipoEvento = "";
        var rumbo;
        switch (true) {
            case (datos.rumbo > 0 && datos.rumbo < 20):
                rumbo = "Norte";
                break;
            case (datos.rumbo > 21 && datos.rumbo < 70):
                rumbo = "Noreste";
                break;
            case (datos.rumbo > 71 && datos.rumbo < 115):
                rumbo = "Este";
                break;
            case (datos.rumbo > 116 && datos.rumbo < 155):
                rumbo = "Sureste";
                break;
            case (datos.rumbo > 156 && datos.rumbo < 200):
                rumbo = "Sur";
                break;
            case (datos.rumbo > 201 && datos.rumbo < 250):
                rumbo = "Suroeste";
                break;
            case (datos.rumbo > 251 && datos.rumbo < 290):
                rumbo = "Oeste";
                break;
            case (datos.rumbo > 291 && datos.rumbo < 330):
                rumbo = "Noroeste";
                break;
            case (datos.rumbo > 331 && datos.rumbo < 360):
                rumbo = "Norte";
                break;
        }
        var divDetalles = "<div id='menuDetallesMovil'>" +
                "<div id='DetalleMapaTit'>Detalle del Vehiculo <img src='images/close.gif' onclick=\"$('#menuDetallesMovil').hide('');\" style='float: right;' /></div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Movil</b> " + datos.movil +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Dominio</b> " + datos.dominio +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Marca</b> " + datos.marca +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Modelo</b> " + datos.modelo +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Año</b> " + datos.anio +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Velocidad</b> " + datos.velocidad +
                " km/h</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Fecha</b> " + datos.fecha +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Hora</b> " + datos.hora +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Ubicacion</b>" + datos.direccion +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>FechaEvento</b> " + datos.fecha_servidor +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Rumbo</b> " + rumbo +
                "</div>" +
                tipoEvento +
                "</div>";
        $("#map-canvas").append(divDetalles);

        var divDetallesInfowindow = "<div id='menuDetallesMovilInfowindow' style='width:160px;'>" +
                "<div id='DetalleMapaTit'>Detalle del Vehiculo</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Movil</b> " + datos.movil +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Dominio</b> " + datos.dominio +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Marca</b> " + datos.marca +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Modelo</b> " + datos.modelo +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Año</b> " + datos.anio +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Velocidad</b> " + datos.velocidad +
                " km/h</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Fecha</b> " + datos.fecha +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Hora</b> " + datos.hora +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Ubicacion</b>" + datos.direccion +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>FechaEvento</b> " + datos.fecha_servidor +
                "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Rumbo</b> " + rumbo +
                "</div>" +
                tipoEvento +
                "</div>";
        var opcionesInfoBox = {
            content: divDetallesInfowindow,
            disableAutoPan: true,
            maxWidth: 0,
            zIndex: null,
            boxStyle: {
                background: "url(http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.1.9/examples/tipbox.gif) no-repeat",
                opacity: 0.95
            },
            closeBoxMargin: "-13px -10px 0px 0px;",
            closeBoxURL: "images/close.gif",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: true
        };

        var posicion = new google.maps.LatLng(datos.latitud, datos.longitud);
        var icono = {
            url: datos.icono,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 16)
        };

        setAllMap(null); //Oculta cualquier otra posicion que este cerca
        setAllMap(null); //Oculta cualquier otra posicion que este cerca

        var marcador = new MarkerWithLabel({
            position: posicion,
            icon: icono,
            map: map,
            title: datos.movil,
            id: datos.disp,
            labelContent: "<span style='color:#15DAE2;'>" + datos.dominio + "</span>",
            labelClass: "label-marker",
            labelStyle: {padding: "2px"}
        });
        todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado
        var infobox = new InfoBox(opcionesInfoBox);
        google.maps.event.addListener(marcador, 'click', (function (marcador) {
            return function () {
                infobox.open(map, this);
            }
        })(marcador));
        map.setZoom(16);
        map.setCenter(posicion);
        //console.log( todosLosMarcadores);
    }).done(function () {
        //console.log( "Datos cargados correctamente!" );
    })
            .fail(function (error) {
                console.log("Se ha producido un error. Intentelo nuevamente, recargando la pagina.");
            });
}


/**
 * Recibe por parametro el dominio del movil, latitud, longitud, fecha y tipo de alerta, para ser graficada en el mapa.
 * Esta funcion es usada en las grillas de alerta generadas en el menu de operador.
 *
 * @var datos : es un array asociativo con dominio,lat,long,fecha y tipo de alerta
 */

function verPosiciondDeAlerta(dominio, latitud, longitud, tipoAlerta, fecha, velocidad, descripcion) {

    var geocoder = new google.maps.Geocoder();
    var posicion = new google.maps.LatLng(latitud, longitud);
    var direccion = "";

    var icono = {
        url: "images/alerta-rojo.gif"
    };

    geocoder.geocode({latLng: posicion}, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            direccion = results[0].formatted_address;
        } else {
            direccion = "Direccion no disponible";
        }

        var marcador = new MarkerWithLabel({
            position: posicion,
            map: map
        });

        todosLosMarcadores.push(marcador); //Guarda cada marcador que se agrega para poder ser borrado

    });

    //var datosArr = datos[i];
    $("#carData, #alertData").slideUp(function () {
        $("#alertData .dominio").text(dominio);
        $("#alertData .tipo").text(tipoAlerta);
        $("#alertData .fecha").text(fecha);
        $("#alertData .velocidad").text(velocidad);
        $("#alertData .descripcion").text(descripcion);
        $("#alertData .direccion").text(direccion);
    });
    $("#alertData").slideDown();

    setAllMap(null); //Oculta cualquier otra posicion que este cerca

    map.setZoom(14);
    map.setCenter(posicion);

}


/**
 * Recibe el texto capturado desde un input, lo busca con google, y en caso de encontrar direcciones, abre un modal con el listado de resultados.
 * En el listado del modal, al hacer click sobre una direccion la grafica en el mapa.
 */

function buscarDireccion(direccion) {

    if (direccion != '') {

        geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': direccion}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                $("#resultadosEncontrados").empty();
                $("#cantidadResutados").html("Se encontraron " + results.length + " resultados");

                for (var i = 0; i < results.length; i++) {

                    var direccion = results[i].formatted_address;
                    var latitud = results[i].geometry.location.lat();
                    var longitud = results[i].geometry.location.lng();
                    $("#resultadosEncontrados").append("<li><a href='javascript:void(0)' onclick='graficarDireccion(\"" + latitud + "\",\"" + longitud + "\",\"" + direccion + "\")'>" + direccion + "</a></li>");
                }

                $("#modalDireccionesEncontradas").modal("show");



            } else {
                switch (status) {
                    case "ZERO_RESULTS":
                        alert("No se ha encontrado la direccion especificada");
                        break;
                    default:
                        alert("Se produjo un error. Codigo:" + status)
                        break;
                }
            }
        });
    }
}

function graficarDireccion(latitud, longitud, direccion) {

    $("#modalDireccionesEncontradas").modal("hide");

    var posicion = new google.maps.LatLng(latitud, longitud);
    var contentString = '' + direccion + '';

    map.setCenter(posicion);
    map.setZoom(15);

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marcador = new google.maps.Marker({
        map: map,
        position: posicion,
        draggable: false
    });

    google.maps.event.addListener(marcador, 'click', function () {
        infowindow.open(map, marcador);
    });
    todosLosMarcadores.push(marcador);

}


// Setea los marcadores en el array para ser borradoss
function setAllMapZonas(map) {
    for (var i = 0; i < todosLosMarcadoresDeZonas.length; i++) {
        todosLosMarcadoresDeZonas[i].setMap(map); //verificar por qué mierda no funciona! esta linea tira como undefined.
    }
}

function clearMarkers() {
    setAllMap(null);
    poly.setMap(null);
}


function limpiarMapaDeZonas() {

    setAllMapZonas(null); //Oculta cualquier otra posicion que este cerca
    setAllMapZonas(null); //Oculta cualquier otra posicion que este cerca
    var todosLosMarcadoresDeZonas = [];
}

// Setea los marcadores en el array para ser borradoss
function setAllMap(map) {
    for (var i = 0; i < todosLosMarcadores.length; i++) {
        todosLosMarcadores[i].setMap(map);
    }
}

function limpiarMapa() {
    setAllMap(null); //Oculta cualquier otra posicion que este cerca
    setAllMap(null); //Oculta cualquier otra posicion que este cerca
    todosLosMarcadores = [];
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

    // Cierra los detalles del vehiculo
    $("#carDataClose").click(function () {
        $("#carData").slideUp();
    });

    $("#alertDataClose").click(function () {
        $("#alertData").slideUp();
    });

    $(document).on('change', 'input[type=checkbox]', function () {
        if ($(this).attr("name") == 'vehicles') {
            limpiarMapa();
            visualizaFlota();
        }
    });

    $("li[name=alerts]").click(function () {
        var dominio = $(this).attr("dominio");
        var fecha = $(this).attr("fecha");
        var tipo = $(this).attr("tipo");
        var lat = $(this).attr("lat");
        var lon = $(this).attr("lon");
        var vel = $(this).attr("vel");
        var desc = $(this).find("font").text();
        verPosiciondDeAlerta(dominio, lat, lon, tipo, fecha, vel, desc);
        $("#alertClose").show();
    });

    $("#alertClose").click(function(){
        visualizaFlota();
        $("#alertData").slideUp();
        $(this).hide();
    });

    setInterval(function () {
        visualizaFlota(1);
        console.log(new Date());
    }, 60000);

});