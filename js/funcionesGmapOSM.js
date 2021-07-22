/* global L */

var todosLosMarcadores = [];
var todosSeguimientos = [];
var todosRecorridos = [];
var todosMoviles = [];
var seguimientoElementos = [];
var recorridoElementos = [];
var todosLosMarcadoresDeZonas = [];
var circuloUltimaPocision; // Agregado 2017-05-22: para los celulares, agrega un circulo sobre la ultima posicion (radio = precision)
var circuloPocisionRecorrido = []; // Agregado 2017-05-22: para los celulares, agrega un circulo sobre una marca del recorrido (radio = precision)
var map;
var defaul;
var seguimiento = false;
var tick;
var geo;

$(document).ready(function () {
    init();
});

function init() {
    $('#botonDefault').css('background-color', '#FFF');
    map = L.map('map-canvas').
        setView([-35.229578, -62.383723],
            5);

    defaul = new L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        subdomains: 'abc',
        maxZoom: 18,
        minZoom: 2,
    }).addTo(map);

    L.control.scale().addTo(map);

    geo = new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.Esri(),
        position: 'topcenter',
        showMarker: true,
        retainZoomLevel: false,
    }).addTo(map);
}

function visualizaVehiculo(movil) {
    var flag_es_celular = esCelular(movil);
    map.invalidateSize();
    limpiarMapa();
    limpiarDivVentana();
    todosMoviles = [];
    if ($("#divDatosPosicion").is(":visible")) {
        $("#divDatosPosicion").hide('slow');
    }

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }

    $("#movilPosicion").text("");
    $("#dominioPosicion").text("");
    $("#conductorPosicion").text("");
    $("#velocidadPosicion").text("");
    $("#fechaPosicion").text("");
    $("#rumboPosicion").text("");
    $("#marcaPosicion").text("");
    $("#modeloPosicion").text("");
    $("#anioPosicion").text("");
    $("#direccionPosicion").text("");
    $("#idDispPosicion").val(movil);

    if (movil === '') {
        alert("el movil no puede ser nulo");
        return;
    }
    var url = 'index.php?r=flota/posiciones&movil=' + movil;
    var pos = $.getJSON(url, function (datos) {
        if (datos.latitud === null || datos.longitud === null) {
            alert("MOVIL SIN POSICION");
            return false;
        } else {
            var aliasDominio = datos.movil !== null && datos.movil !== undefined && datos.movil !== "" ? datos.movil : datos.dominio;

            var myIcon = L.icon({
                iconUrl: datos.icono,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // si es celular y la ubicación está apagada: indicar al usuario
            var mensaje_ubicacion_off = "";
            if (flag_es_celular && datos.Reporte_Evento && datos.Reporte_Evento === '04') {
                // mostrar la fecha del último reporte de posicion osea, el reporte con evento 01 más actual.
                mensaje_ubicacion_off = " - <span style='color:red;'>Ubicación apagada</span><br /><span style='font-size:11px;'>Último reporte:&nbsp;" + datos.Reporte_FechaUltimaPosicion + "</span>";
            }

            var marker = L.marker([datos.latitud, datos.longitud], {
                icon: myIcon,
                iconAngle: parseInt(datos.rumbo)
            }).bindLabel(aliasDominio + mensaje_ubicacion_off, {
                noHide: true,
                direction: 'left'
            }).addTo(map);

            marker.id = datos.disp;
            map.setView([datos.latitud, datos.longitud], 15);
            todosLosMarcadores.push(marker);
            marker.on('click', onMarker2);
            todosMoviles.push(datos.disp);
            agregarMovilesDiv(datos.disp, aliasDominio);

            if (flag_es_celular) { // si es celular: agregar una zona con la precision
                $.ajax({
                    url: "index.php?r=flota/getPrecisionCelular&movil=" + movil,
                    type: 'GET',
                    dataType: 'JSON',
                    success: function (respuesta) {
                        var precision = respuesta.precisionReporte;
                        if (parseInt(precision) > 20) {
                            agregarZonaCircularEnPosicion(datos.latitud, datos.longitud, precision);
                        }
                    }
                });
            }
        }

    }).done(function () {
        //console.log( "Datos cargados correctamente!" );
    }).fail(function (error) {
        console.log("Se ha producido un error. Intentelo nuevamente, recargando la pagina.");
    });
}

// true si es un celular
function esCelular(movil) {
    return (movil.substring(0, 2) === "99" && movil.length === 8) ? true : false;
}

// agrega una zona circular en la ultima posicion, cuyo radio es en metros.
function agregarZonaCircularEnPosicion(latitud, longitud, radio) {
    var radioSeguro = radio + 10; // agregamos 10 metros para hacer una zona mas grande.
    circuloUltimaPocision = new L.circle([latitud, longitud], radioSeguro).addTo(map);
}

// agrega una zona circular sobre una posicion del recorrido, cuyo radio es en metros.
function agregarZonaCircularEnPosicionDelRecorrido(movil, latitud, longitud, radio) {
    var radioSeguro = radio + 10; // agregamos 10 metros para hacer una zona mas grande.
    circuloPocisionRecorrido.push([movil, new L.circle([latitud, longitud], radioSeguro).addTo(map)]);
}

function visualizaFlota() {
    limpiarMapa();
    limpiarDivVentana();
    if ($("#divDatosPosicion").is(":visible")) {
        $("#divDatosPosicion").hide('slow');
    }

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }

    var url = 'index.php?r=flota/posiciones';
    var pos = $.getJSON(url, function (datos) {
        if (seguimientoElementos.length !== 0) {
            limpiarSeguimientos();
        }
        if (recorridoElementos.length !== 0) {
            limpiarRecorridos();
        }
        for (var i = 0; i < datos.length; i++) {
            if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
                var aliasDominio = datos[i].movil !== null && datos[i].movil !== undefined && datos[i].movil !== "" ? datos[i].movil : datos[i].dominio;
                var myIcon = L.icon({
                    iconUrl: datos[i].icono,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                    //labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
                });
                var marker = L.marker([datos[i].latitud, datos[i].longitud], {
                    icon: myIcon,
                    iconAngle: parseInt(datos[i].rumbo)
                }).bindLabel(aliasDominio, {
                    noHide: true,
                    direction: 'left'
                });
                marker.id = datos[i].disp;
                todosLosMarcadores.push(marker);
                todosMoviles.push(datos[i].disp);
                marker.on('click', onMarker2);
                agregarMovilesDiv(datos[i].disp, aliasDominio);

            }
        }
        var group = L.featureGroup(todosLosMarcadores).addTo(map);
        map.fitBounds(group.getBounds());
    }).done(function () {
        //console.log( "Datos cargados correctamente!" );
    }).fail(function (error) {
        console.log("Se ha producido un error. Intentelo nuevamente, recargando la pagina.");
    });
}

function limpiarMapa() {
    for (var i = 0; i < todosLosMarcadores.length; i++) {
        map.removeLayer(todosLosMarcadores[i]);
    }
    for (var i = 0; i < seguimientoElementos.length; i++) {
        map.removeLayer(seguimientoElementos[i]);
    }
    for (var i = 0; i < recorridoElementos.length; i++) {
        map.removeLayer(recorridoElementos[i]);
    }

    if (typeof geo._positionMarker !== 'undefined' && geo._positionMarker !== null)
        map.removeLayer(geo._positionMarker);

    todosLosMarcadores = [];
    seguimientoElementos = [];
    todosSeguimientos = [];
    todosRecorridos = [];
    limpiarDivVentana();
    limpiarDivZona();
    limpiarCirculoUltimaPocision(); // Agregado 2017-05-22: para los celulares, limpia el circulo en el marker
    limpiarCirculosRecorrido(0); // Agregado 2017-05-22: para los celulares, limpia el circulo sobre todos los marker

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }
}

function limpiarAutos() {
    for (var i = 0; i < todosLosMarcadores.length; i++) {
        map.removeLayer(todosLosMarcadores[i]);
    }
    todosLosMarcadores = [];
    limpiarDivVentana();
}

function limpiarSeguimientos() {
    for (var i = 0; i < seguimientoElementos.length; i++) {
        map.removeLayer(seguimientoElementos[i]);
    }
    seguimientoElementos = [];
    todosSeguimientos = [];
    limpiarDivVentana();

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }
}

function limpiarRecorridos() {
    for (var i = 0; i < recorridoElementos.length; i++) {
        map.removeLayer(recorridoElementos[i]);
    }
    recorridoElementos = [];
    todosRecorridos = [];
    limpiarDivVentana();
}

function limpiarMapaDeZonas() {
    //alert(todosLosMarcadoresDeZonas.length);
    for (var i = 0; i < todosLosMarcadoresDeZonas.length; i++) {
        map.removeLayer(todosLosMarcadoresDeZonas[i]);
    }
    todosLosMarcadoresDeZonas = [];
}

function recargarZonas() {
    limpiarMapaDeZonas();
    cargarZonas();
}

function verMarkers() {
    for (var i = 0; i < todosLosMarcadores.length; i++) {
        //map.removeLayer(todosLosMarcadores[i]);
        alert(todosLosMarcadores[i].id);
    }
}

function eliminarMarker(id) {
    var l = todosLosMarcadores.length;
    var i = 0;
    while (i < l) {
        if (todosLosMarcadores[i] !== undefined && todosLosMarcadores[i].id === id) {
            map.removeLayer(todosLosMarcadores[i]);
            todosLosMarcadores.splice(i, 1);
            l--;
        } else {
            i++;
        }
    }
}

function eliminarMarkerRecorrido(id) {
    var l = recorridoElementos.length;
    var i = 0;
    while (i < l) {
        if (recorridoElementos[i] !== undefined && recorridoElementos[i].id === id) {
            map.removeLayer(recorridoElementos[i]);
            recorridoElementos.splice(i, 1);
            l--;
        } else {
            i++;
        }
    }
}

function cargarZonas() {
    var marcadores = new Array();
    $.ajax({
        url: "index.php?r=zonas/zonasdeusuario&completa=true",
        type: 'POST',
        context: document.body,
        success: function (data) {
            if (data !== "" && data !== null) {
                var len = Object.keys(data).length;
                var icono = L.icon({
                    iconUrl: "images/iconosMap/marker-zona.png",
                    iconSize: [30, 34],
                    iconAnchor: [15, 34]
                });

                for (var i = 0; i < len; i++) {
                    if (data[i].tipo === "CIRCULAR") {
                        var posicion = L.latLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);

                        var opciones = {
                            color: data[i].color
                        };

                        var dibujoCercaCircular = new L.circle(posicion, data[i].diametro / 2, opciones);
                        marcadores.push(dibujoCercaCircular);

                        var marcador = new L.marker(posicion, {
                            icon: icono,
                            title: 'Zona ' + data[i].nombre
                        });
                        marcadores.push(marcador);

                    } else if (data[i].tipo === "IRREGULAR") {
                        var extremosPoligono = [];

                        for (var j = 0; j < Object.keys(data[i].puntos).length; j++) {
                            extremosPoligono[j] = new L.latLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);
                        }

                        var poligonoDeZona = new L.Polygon(extremosPoligono, {
                            color: data[i].color
                        });
                        marcadores.push(poligonoDeZona);

                        var marker = new L.Marker(extremosPoligono[0], {
                            icon: icono,
                            title: 'Zona ' + data[i].nombre
                        });
                        marcadores.push(marker);

                    } else if (data[i].tipo === "RUTA") {
                        var posicion = new L.latLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);
                        var puntosRuta = [];

                        for (var j = 0; j < data[i].puntos.length; j++) {
                            var pos = new L.latLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);
                            puntosRuta.push(pos);
                        }

                        var polyOptions = {
                            color: data[i].color
                        };
                        var polylinea = new L.Polyline(puntosRuta, polyOptions);
                        marcadores.push(polylinea);

                        var marker = new L.Marker(posicion, {
                            icon: icono,
                            title: 'Ruta ' + data[i].nombre
                        });
                        marcadores.push(marker);
                    }
                }
            }
            todosLosMarcadoresDeZonas = marcadores;
            var group = new L.featureGroup(marcadores).addTo(map);
            map.fitBounds(group.getBounds());
        }
    });
}

function contarMovilesZonaCircular(radius, circleCenterPoint) {


    var contadorMoviles = 0;
    var url = 'index.php?r=flota/posiciones';
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function (datos) {
            for (var i = 0; i < datos.length; i++) {
                if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
                    var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo([datos[i].latitud, datos[i].longitud])) <= radius;
                    if (isInCircleRadius == true) {
                        contadorMoviles++;
                    }
                }
            }
        }
    });
    return contadorMoviles;
}

function detallarMovilesZonaCircular(radius, circleCenterPoint) {
    //console.log(circleCenterPoint);
    var detalleMoviles = [];
    var url = 'index.php?r=flota/posiciones';
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function (datos) {
            for (var i = 0; i < datos.length; i++) {
                if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
                    var isInCircleRadius = Math.abs(circleCenterPoint.distanceTo([datos[i].latitud, datos[i].longitud])) <= radius;
                    if (isInCircleRadius == true) {
                        detalleMoviles[i] = datos[i].dominio;
                    }
                }
            }
        }
    });
    return detalleMoviles;
}
function detallarMovilesZonaIrregular(poligono) {

    var detalleMoviles = [];
    var url = 'index.php?r=flota/posiciones';
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function (datos) {
            for (var i = 0; i < datos.length; i++) {
                if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
                    var marker = L.latLng([datos[i].latitud, datos[i].longitud])
                    if (poligono.getBounds().contains(marker)) {
                        detalleMoviles[i] = datos[i].dominio;
                    }
                    //console.log(contadorMoviles);                                          
                }
            }
        }
    });
    return detalleMoviles;
}

function contarMovilesZonaIrregular(poligono) {
    var contadorMoviles = 0;
    var url = 'index.php?r=flota/posiciones';
    $.ajax({
        url: url,
        dataType: 'json',
        async: false,
        success: function (datos) {
            for (var i = 0; i < datos.length; i++) {
                if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
                    var marker = L.latLng([datos[i].latitud, datos[i].longitud])
                    if (poligono.getBounds().contains(marker)) {
                        contadorMoviles++;
                    }
                    //console.log(contadorMoviles);                                          
                }
            }
        }
    });
    return contadorMoviles;
}

function cargarZonasConFlota() {
    limpiarMapaDeZonas();
    limpiarMapa();
    limpiarDivZona();
    visualizaFlota();

    var marcadores = new Array();
    $.ajax({
        url: "index.php?r=zonas/zonasdeusuario&completa=true",
        type: 'POST',
        context: document.body,
        success: function (data) {
            if (data !== "" && data !== null) {
                var len = Object.keys(data).length;
                var icono = L.icon({
                    iconUrl: "images/iconosMap/marker-zona.png",
                    iconSize: [30, 34],
                    iconAnchor: [15, 34]
                });
                var iconoAlerta = L.icon({
                    iconUrl: "images/icono-alerta.png",
                    iconSize: [30, 34],
                    iconAnchor: [15, 34]
                });

                for (var i = 0; i < len; i++) {
                    if (data[i].tipo === "CIRCULAR") {
                        var posicion = L.latLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);
                        var opciones = {
                            color: data[i].color
                        };
                        var dibujoCercaCircular = new L.circle(posicion, data[i].diametro / 2, opciones);
                        marcadores.push(dibujoCercaCircular);
                        var cantidadMaximaDeMoviles = data[i].maximo !== null ? data[i].maximo : 999999;// coloco 999999 ya que si pongo en 0 o null si hay un movil lo tomara como exceso de movil en zona
                        var detalleMaximo = cantidadMaximaDeMoviles !== 999999 ? cantidadMaximaDeMoviles : '-';
                        //console.log(data[i].nombre);
                        var radius = dibujoCercaCircular.getRadius(); //in meters
                        var circleCenterPoint = dibujoCercaCircular.getLatLng(); //gets the circle's center latlng
                        var cantidadMoviles = contarMovilesZonaCircular(radius, circleCenterPoint);
                        var detalleMovilesEnZona = detallarMovilesZonaCircular(radius, circleCenterPoint);
                        //console.log(detalleMovilesEnZona);
                        if (cantidadMoviles > cantidadMaximaDeMoviles) {
                            var marcador = new L.marker(posicion, {
                                icon: iconoAlerta,
                            });
                        } else {
                            var marcador = new L.marker(posicion, {
                            });
                        }
                        marcador.bindPopup("<b>Nombre de Zona: </b>" + data[i].nombre + "<br><b>Cantidad de Máx Moviles: </b>" + detalleMaximo + "<br><b>Cantidad de Moviles: </b>" + cantidadMoviles);
                        marcadores.push(marcador);
                        contarZonas(data[i].nombre, cantidadMoviles, detalleMaximo, detalleMovilesEnZona,data[i].puntos[0].latitud, data[i].puntos[0].longitud);
                    } else if (data[i].tipo === "IRREGULAR") {
                        var extremosPoligono = [];
                        for (var j = 0; j < Object.keys(data[i].puntos).length; j++) {
                            extremosPoligono[j] = new L.latLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);
                        }
                        var poligonoDeZona = new L.Polygon(extremosPoligono, {
                            color: data[i].color
                        });
                        var cantidadMoviles = contarMovilesZonaIrregular(poligonoDeZona);
                        var detalleMovilesEnZona = detallarMovilesZonaIrregular(poligonoDeZona);
                        marcadores.push(poligonoDeZona);
                        var cantidadMaximaDeMoviles = data[i].maximo !== null ? data[i].maximo : 999999;// coloco 999999 ya que si pongo en 0 o null si hay un movil lo tomara como exceso de movil en zona
                        var detalleMaximo = cantidadMaximaDeMoviles !== 999999 ? cantidadMaximaDeMoviles : '-';
                        if (cantidadMoviles > cantidadMaximaDeMoviles) {
                            var marker = new L.Marker(extremosPoligono[0], {
                                icon: iconoAlerta,
                            });
                        } else {
                            var marker = new L.Marker(extremosPoligono[0], {
                            });
                        }
                        marker.bindPopup("<b>Nombre de Zona: </b>" + data[i].nombre + "<br><b>Cantidad de Máx Moviles: </b>" + detalleMaximo + "<br><b>Cantidad de Moviles: </b>" + cantidadMoviles);
                        marcadores.push(marker);
                        contarZonas(data[i].nombre, cantidadMoviles, detalleMaximo, detalleMovilesEnZona,data[i].puntos[0].latitud, data[i].puntos[0].longitud);

                    } else if (data[i].tipo === "RUTA") {
                        var posicion = new L.latLng(data[i].puntos[0].latitud, data[i].puntos[0].longitud);
                        var puntosRuta = [];

                        for (var j = 0; j < data[i].puntos.length; j++) {
                            var pos = new L.latLng(data[i].puntos[j].latitud, data[i].puntos[j].longitud);
                            puntosRuta.push(pos);
                        }

                        var polyOptions = {
                            color: data[i].color
                        };
                        var polylinea = new L.Polyline(puntosRuta, polyOptions);
                        marcadores.push(polylinea);

                        var marker = new L.Marker(posicion, {
                            icon: icono,
                            title: 'Ruta ' + data[i].nombre
                        });
                        marcadores.push(marker);
                    }
                }
            }



            todosLosMarcadoresDeZonas = marcadores;
            var group = new L.featureGroup(marcadores).addTo(map);
            map.fitBounds(group.getBounds());

        }
    });
}

function recargarPosiciones() {
    if (seguimientoElementos.length > 0) {
        for (var i = 0; i < seguimientoElementos.length; i++) {
            map.removeLayer(seguimientoElementos[i]);
        }
        seguimientoElementos = [];

        for (var i = 0; i < todosSeguimientos.length; i++) {
            verSeguimiento(todosSeguimientos[i], false);
        }
    }

    if (todosLosMarcadores.length > 0) {
        var marcadores = [];
        var p = 0;
        for (var i = 0; i < todosLosMarcadores.length; i++) {
            if (todosLosMarcadores[i].id !== '' && todosLosMarcadores[i].id !== undefined) {
                marcadores[p] = todosLosMarcadores[i];
                p++;
            }
        }

        if (marcadores.length > 0) {
            var ids = "";
            for (var l = 0; l < marcadores.length; l++) {
                if (l === 0) {
                    ids += marcadores[l].id;
                } else {
                    ids += "," + marcadores[l].id;
                }
            }

            var url = 'index.php?r=flota/recargarposiciones&moviles=' + ids;
            var pos = $.getJSON(url, function (datos) {
                for (var i = 0; i < datos.length; i++) {
                    for (var j = 0; j < marcadores.length; j++) {
                        if (datos[i].disp.trim() === marcadores[j].id.trim()) {
                            var myIcon = L.icon({
                                iconUrl: datos[i].icono,
                                iconSize: [30, 30],
                                iconAnchor: [15, 15]
                            });
                            marcadores[j].setIcon(myIcon);
                            marcadores[j].setLatLng(new L.latLng(datos[i].latitud, datos[i].longitud));
                            marcadores[j].setIconAngle(parseInt(datos[i].rumbo));
                            marcadores[j].update();
                            if (marcadores.length === 1) {
                                map.panTo(marcadores[j].getLatLng());
                            }
                        }
                    }
                }

            });

            if ($("#divDatosPosicion").is(":visible")) {
                $("#cargandoDatosPosicion").show();
                var movil = $("#idDispPosicion").val();
                if (movil !== '' && movil !== undefined) {
                    var url = 'index.php?r=flota/detalleposicion&movil=' + movil;
                    var pos = $.getJSON(url, function (datos) {
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
                        $("#movilPosicion").text(datos.movil);
                        $("#dominioPosicion").text(datos.dominio);
                        $("#conductorPosicion").text(datos.conductor);
                        $("#velocidadPosicion").text(datos.velocidad);
                        $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
                        $("#rumboPosicion").text(rumbo);
                        if(datos.mileage == 5 ){
                            $("#verMileage").show();
                            $("#mileage").text(datos.mileage + " KM");
                          }
                        $("#marcaPosicion").text(datos.marca);
                        $("#modeloPosicion").text(datos.modelo);
                        $("#anioPosicion").text(datos.anio);
                        $("#direccionPosicion").text(datos.direccion);
                        $("#idDispPosicion").val(datos.disp);
                        $("#eventoPosicion").text(datos.tipoEvento);
                        if (datos.bateria !== '' && datos.bateria !== null) {
                            if (datos.bateria < 10) {
                                $("#bateria1").show();
                                $("#bateria2").hide();
                                $("#bateria3").hide();
                                $("#bateria4").hide();
                                $("#bateria5").hide();
                                $("#bateria6").hide();
                            } else if (datos.bateria > 9 && datos.bateria < 30) {
                                $("#bateria1").hide();
                                $("#bateria2").show();
                                $("#bateria3").hide();
                                $("#bateria4").hide();
                                $("#bateria5").hide();
                                $("#bateria6").hide();
                            } else if (datos.bateria > 29 && datos.bateria < 50) {
                                $("#bateria1").hide();
                                $("#bateria2").hide();
                                $("#bateria3").show();
                                $("#bateria4").hide();
                                $("#bateria5").hide();
                                $("#bateria6").hide();
                            } else if (datos.bateria > 49 && datos.bateria < 70) {
                                $("#bateria1").hide();
                                $("#bateria2").hide();
                                $("#bateria3").hide();
                                $("#bateria4").show();
                                $("#bateria5").hide();
                                $("#bateria6").hide();
                            } else if (datos.bateria > 69 && datos.bateria < 90) {
                                $("#bateria1").hide();
                                $("#bateria2").hide();
                                $("#bateria3").hide();
                                $("#bateria4").hide();
                                $("#bateria5").show();
                                $("#bateria6").hide();
                            } else if (datos.bateria > 89) {
                                $("#bateria1").hide();
                                $("#bateria2").hide();
                                $("#bateria3").hide();
                                $("#bateria4").hide();
                                $("#bateria5").hide();
                                $("#bateria6").show();
                            }
                            $("#datoBateria").show();
                            $("#bateriaPosicion").text(datos.bateria + "%");
                        } else {
                            $("#datoBateria").hide();
                        }
                    }).done(function () {
                        $("#cargandoDatosPosicion").hide();
                    });
                }
            }
        }

    }
}

function sumarVehiculo(movil) {
    if ($("#divDatosPosicion").is(":visible")) {
        $("#divDatosPosicion").hide('slow');
    }
    if (movil === '') {
        alert("el movil no puede ser nulo");
        return;
    }

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }

    var url = 'index.php?r=flota/posiciones&movil=' + movil;
    var pos = $.getJSON(url, function (datos) {
        if (datos.latitud === null || datos.longitud === null) {
            alert("MOVIL SIN POSICION");
            return false;
        }

        if (seguimientoElementos.length !== 0) {
            limpiarAutos();

        }
        if (recorridoElementos.length !== 0) {
            limpiarRecorridos();
        }
        var aliasDominio = datos.movil !== null && datos.movil !== undefined && datos.movil !== "" ? datos.movil : datos.dominio;
        var posicion = new L.latLng(datos.latitud, datos.longitud);
        var icono = new L.icon({
            iconUrl: datos.icono,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        var marcador = L.marker(posicion, {
            icon: icono,
            iconAngle: parseInt(datos.rumbo)
        }).bindLabel(aliasDominio, {
            noHide: true,
            direction: 'left'
        }).addTo(map);
        marcador.id = datos.disp;

        todosLosMarcadores.push(marcador);
        //map.setView(posicion, 15);
        var group = L.featureGroup(todosLosMarcadores).addTo(map);
        map.fitBounds(group.getBounds());
        marcador.on('click', onMarker2);

        if (todosMoviles.indexOf(datos.disp) === -1) {
            todosMoviles.push(datos.disp);
        }

        agregarMovilesDiv(datos.disp, aliasDominio);
    }).done(function () {

    }).fail(function () {
        console.log("Se ha producido un error. Intentelo nuevamente recargando la pagina.");
    });
}

function visualizaRecorrido(datos) {
    map.invalidateSize();
    if (todosLosMarcadores.length !== 0) {
        limpiarAutos();
    }
    if (seguimientoElementos.length !== 0) {
        limpiarSeguimientos();
    }
    if (typeof informeRecorrido !== 'undefined' && informeRecorrido === true) {
        limpiarMapa();
    }
    var inicialPos = new L.latLng(datos[0].Reporte_Latitud, datos[0].Reporte_Longitud);

    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }

    // quitar recorridos viejos
    quitarRecorridosDiv(datos[0].Reporte_IdDisp);
    limpiarCirculoUltimaPocision();

    map.setView(inicialPos, 12);

    var marcador;
    var vectorMarcadores = [];
    var polilinea = [];
    var flag_es_celular = esCelular(datos[0].Reporte_IdDisp);

    for (var i = 0; i < datos.length; i++) {

        var posicion = new L.latLng(datos[i].Reporte_Latitud, datos[i].Reporte_Longitud);
        polilinea[i] = posicion;
        var aliasDominio = datos[i].Movil_Nombre !== null && datos[i].Movil_Nombre !== undefined && datos[i].Movil_Nombre !== "" ? datos[i].Movil_Nombre : datos[i].Movil_Dominio;

        var divDetallesInfowindow = "" +
            "<div id='menuDetallesMovilInfowindow' style='width:160px'>" +
            " <div id='DetalleMapaTit'>Detalle de " + aliasDominio + "</div>";

        if (flag_es_celular) { // si es celular mostramos la precision, si no la velocidad
            divDetallesInfowindow += " <div class='DetalleMapa'>" +
                "   <img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "   <b>Precisión</b>&nbsp;" + datos[i].Reporte_Val2 + "&nbsp;mts" +
                " </div>";
        } else {
            divDetallesInfowindow += " <div class='DetalleMapa'>" +
                "   <img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "   <b>Velocidad</b>&nbsp;" + datos[i].Reporte_Velocidad + "&nbsp;km/h" +
                "</div>";
        }

        divDetallesInfowindow += " <div class='DetalleMapa'>" +
            "   <img src='images/check.png' height='10px' style='vertical-align:middle'> " +
            "   <b>Fecha</b>&nbsp;" + datos[i].Reporte_FechaGPS +
            " </div>" +
            "</div>"; // cierra menuDetallesMovilInfowindow

        var icono = new L.icon({
            iconUrl: "images/iconosMap/arrow.png",
            iconSize: [18, 25],
            iconAnchor: [8.3, 12.5]
        });
        var icono2 = new L.icon({
            iconUrl: "images/iconosMap/arrow2.png",
            iconSize: [18, 25],
            iconAnchor: [8.3, 12.5]
        });
        if (datos[i].Reporte_Ignicion === 'NO') {
            marcador = new L.marker(posicion, {
                icon: icono2,
                iconAngle: parseInt(datos[i].Reporte_Rumbo),
                title: 'Posicion numero ' + i
            }).bindLabel("<span style='display:block; text-align:center; color:#15DAE2; line-height:10px; min-height:10px; max-height:10px; height:10px; min-width:10px;'>" + i + "<span/>", {
                className: "label-marker",
                noHide: true
            });
        } else {
            marcador = new L.marker(posicion, {
                icon: icono,
                iconAngle: parseInt(datos[i].Reporte_Rumbo),
                title: 'Posicion numero ' + i
            }).bindLabel("<span style='display:block; text-align:center; color:#15DAE2; line-height:10px; min-height:10px; max-height:10px; height:10px; min-width:10px;'>" + i + "<span/>", {
                className: "label-marker",
                noHide: true
            });
        }

        var opcionesInfoBox = new L.popup().setContent(divDetallesInfowindow);

        // por ahora lado cliente, con click derecho se abre la herramienta para crear PI.
        // la variable "flag_cliente" se setea en el view flota/index.php
        if (typeof flag_cliente !== 'undefined') {
            if (flag_cliente) {
                marcador.on("contextmenu", function (event) {
                    var clickedMarker = event.target; // marker al que le dieron click derecho.

                    // Si la herramienta esta cerrada: abrir un modal para elegir la categoria.
                    crearPuntoDeInteres();
                    //console.log(event, clickedMarker);
                });
            }
        }

        marcador.id = datos[0].Reporte_IdDisp;
        this.recorridoElementos.push(marcador);
        vectorMarcadores.push(marcador);
        vectorMarcadores[i].bindPopup(opcionesInfoBox);

        if (esCelular(datos[0].Reporte_IdDisp)) { // agregar un circulo sobre la marca con la precision
            agregarZonaCircularEnPosicionDelRecorrido(datos[0].Reporte_IdDisp, datos[i].Reporte_Latitud, datos[i].Reporte_Longitud, datos[i].Reporte_Val2);
        }
    }

    var bounds = new L.featureGroup(vectorMarcadores).addTo(map);

    var colorR = 140; // varia entre 140 y 40
    var colorG = 240; // varia entre 240 y 140 // verde
    var colorB = 140; // varia entre 140 y 40
    var flag_sentido_color_descendete = true; // sentido del tono del color
    var variacion = -10; // variacion del tono del color

    var datos_IdDisp = datos[0].Reporte_IdDisp;
    for (var i = 0; i < polilinea.length - 1; i++) {
        // color de las lineas
        var colorR_tono = colorR + variacion;
        var colorG_tono = colorG + variacion;
        var colorB_tono = colorB + variacion;
        var color_linea = 'rgb(' + Math.round(colorR_tono) + ',' + Math.round(colorG_tono) + ',' + Math.round(colorB_tono) + ')';
        // /color de las lineas

        var puntosLinea = new Array(polilinea[i], polilinea[i + 1]);
        var lineas = new L.Polyline(puntosLinea, {
            color: color_linea,
            weight: 5,
            opacity: 1
        });
        lineas.id = datos_IdDisp;
        lineas.addTo(map);
        recorridoElementos.push(lineas);

        // se maneja el color de las lineas
        if (flag_sentido_color_descendete) {
            variacion -= 10;
            if (variacion === -100) {
                flag_sentido_color_descendete = false;
            }
        } else {
            variacion += 10;
            if (variacion === 0) {
                flag_sentido_color_descendete = true;
            }
        } // /se maneja el color de las lineas
    }

    if (todosRecorridos.indexOf(datos[0].Reporte_IdDisp) === -1) {
        todosRecorridos.push(datos[0].Reporte_IdDisp);
    }
    var bounds2 = new L.featureGroup(recorridoElementos);
    map.fitBounds(bounds2.getBounds());

    var aliasDominio = datos[0].Movil_Nombre !== null && datos[0].Movil_Nombre !== undefined && datos[0].Movil_Nombre !== "" ? datos[0].Movil_Nombre : datos[0].Movil_Dominio;
    agregarRecorridosDiv(datos[0].Reporte_IdDisp, aliasDominio);
}

function visualizaSeguimiento(datos, manual) {
    map.invalidateSize();
    if (todosLosMarcadores.length !== 0) {
        limpiarAutos();
    }
    if (recorridoElementos.length !== 0) {
        limpiarRecorridos();
    }
    var marcador;
    var vectorMarcadores = [];
    var polilinea = [];
    datos.reverse();

    if (seguimiento === false) {
        tick = setInterval(function () {
            recargarPosiciones();
        }, 60000);
        seguimiento = true;
    }

    for (var i = 0; i < datos.length; i++) {

        var posicion = new L.latLng(datos[i].Reporte_Latitud, datos[i].Reporte_Longitud);
        polilinea[i] = posicion;
        var aliasDominio = datos[i].Movil_Nombre !== null && datos[i].Movil_Nombre !== undefined && datos[i].Movil_Nombre !== "" ? datos[i].Movil_Nombre : datos[i].Movil_Dominio;

        var divDetallesInfowindow = "<div id='menuDetallesMovilInfowindow'>" +
            "<div id='DetalleMapaTit'>Detalle de " + aliasDominio + "</div>" +
            "<div class='DetalleMapa'>" +
            "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
            "<b>Velocidad</b> " + datos[i].Reporte_Velocidad +
            " km/h</div>" +
            "<div class='DetalleMapa'>" +
            "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
            "<b>Fecha</b> " + datos[i].Reporte_FechaGPS +
            "</div>" +
            "</div>";

        var icono = new L.icon({
            iconUrl: "images/iconosMap/arrow.png",
            iconSize: [28, 35],
            iconAnchor: [13.3, 17.5]
        });
        var icono2 = new L.icon({
            iconUrl: "images/iconosMap/arrow2.png",
            iconSize: [28, 35],
            iconAnchor: [13.3, 17.5]
        });
        if (datos[i].Reporte_Ignicion == 'NO') {
            var marcador = new L.marker(posicion, {
                icon: icono2,
                iconAngle: parseInt(datos[i].Reporte_Rumbo),
                title: 'Posicion numero ' + i
            }).bindLabel("<span style='color:#15DAE2;'>" + i + "<span/>", {
                className: "label-marker",
                noHide: true
            });
        } else {
            var marcador = new L.marker(posicion, {
                icon: icono,
                iconAngle: parseInt(datos[i].Reporte_Rumbo),
                title: 'Posicion numero ' + i
            }).bindLabel("<span style='color:#15DAE2;'>" + i + "<span/>", {
                className: "label-marker",
                noHide: true
            });
        }

        var opcionesInfoBox = new L.popup().setContent(divDetallesInfowindow);

        var opacidad = 1.0;
        switch (i) {
            case 3:
                opacidad = 1.0;
                break;
            case 2:
                opacidad = 0.8;
                break;
            case 1:
                opacidad = 0.6;
                break;
            case 0:
                opacidad = 0.4;
                break;
            default:
                opacidad = 0.4;
                break;
        }
        marcador.setOpacity(opacidad);

        seguimientoElementos.push(marcador);
        vectorMarcadores.push(marcador);
        vectorMarcadores[i].bindPopup(opcionesInfoBox);
    }
    var lineas = new L.Polyline(polilinea, {
        color: '#0080FF',
        weight: 6,
        opacity: 0.7
    }).addTo(map);

    seguimientoElementos.push(lineas);

    if (todosSeguimientos.indexOf(datos[0].Reporte_IdDisp) === -1) {
        todosSeguimientos.push(datos[0].Reporte_IdDisp);
    }

    var bounds = new L.featureGroup(vectorMarcadores).addTo(map);

    if (manual) {
        var bounds2 = new L.featureGroup(seguimientoElementos);
        map.fitBounds(bounds2.getBounds());
    } else {
        if (todosSeguimientos.length === 1) {
            map.setView(new L.latLng(datos[datos.length - 1].Reporte_Latitud, datos[datos.length - 1].Reporte_Longitud));
        }
    }

    var aliasDominio = datos[0].Movil_Nombre !== null && datos[0].Movil_Nombre !== undefined && datos[0].Movil_Nombre !== "" ? datos[0].Movil_Nombre : datos[0].Movil_Dominio;
    agregarSeguimientosDiv(datos[0].Reporte_IdDisp, aliasDominio);
}

function onMarker2(e) {
    if (this.id.trim().length == 10) {
        $("#cargandoDatosPosicionCandado").show();
        $('#dialogDetallePosicionCandado').modal('show');
        var url = 'index.php?r=flota/detalleposicioncandado&movil=' + this.id;
        var pos = $.getJSON(url, function (datos) {

            $("#movilPosicion2").text(datos.movil);
            $("#fechaPosicion2").text(datos.fecha);
            $("#estadoPosicion2").text(datos.estado);
            $("#tipoPosicion2").text(datos.evento);
            $("#bateriaPosicion2").text(datos.bateria + "%");
            $("#tagPosicion2").text(datos.tag);
            $("#velocidadPosicion2").text(datos.velocidad + "Km/h");
            var rumbo;
            switch (true) {
                case (datos.rumbo = 0):
                    rumbo = "-";
                    break;
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
            $("#rumboPosicion2").text(rumbo);
        }).done(function () {
            $("#cargandoDatosPosicionCandado").hide();
        });
        return false;
    }
    $("#datoBateria").hide();
    $("#datoCombustible").hide();
    $("#datoTemperatura").hide();
    $("#datoEquipoFrio").hide();
    $("#verMileage").hide();
    $("#liReporteTipo").hide(); // celulares
    $("#datoSensorHumedad").hide();

    $('#dialogDetallePosicion').modal('show');
    //$('#modalDetallePosicion').modal('show');
    $("#cargandoDatosPosicion").show();
    $(".imagenesMovil").html('');
    $("#boxTiempoDetenidoIg").hide();
    $("#tiempo_detenido").html('');
    $("#detenido_ignicion").html('');

    var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
    var pos = $.getJSON(url, function (datos) {
        if (datos.observaciones && datos.observaciones.length > 0) {
            var html = '';
            $.each(datos.observaciones, function (index, value) {
                var path = value.observacion.Observacion_Path;
                html += '<div class="container_observacion">';
                html += '    <div style="padding-left: 10px;" class="header_observacion">';
                html += '        <h6 style="color: #0068c8;font-weight: 600;font-size: 14px;">' + value.usuario_alta_nombre + '</h6>';
                html += '        <h6>' + value.observacion.Observacion_FechaAlta + '</h6>';
                html += '    </div>';
                html += '    <h4 class="detalle_observacion">' + value.observacion.Observacion_Detalle + '</h4>';
                if (path != null) {
                    html += '<a class="link_archivo" target="_blank" style="margin-right: 5px;" href="https://' + value.observacion.Observacion_Path + '">' + value.observacion.Observacion_NombreArchivo + '</a>';
                } else {
                    html += '<a class="link_archivo" target="_blank" style="margin-right: 5px;" href="#"></a>';
                }
                html += '</div>';
            });
            $('#datoObservaciones .observaciones').html('');
            $('#datoObservaciones .observaciones').append(html);
            $('#datoObservaciones').show();
        }

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

        switch (datos.ibutton) {
            case '0':
                $("#divIbutton").hide();
                break;
            case '51':
                $("#ibuttonOn").show();
                $("#ibuttonOff").hide();
                $("#ibuttonDisable").hide();
                break;
            case '52':
                $("#ibuttonOn").hide();
                $("#ibuttonOff").show();
                $("#ibuttonDisable").hide();
                break;
            case '50':
            default:
                $("#ibuttonOn").hide();
                $("#ibuttonOff").hide();
                $("#ibuttonDisable").show();
        }
        $("#movilPosicion").text(datos.movil);
        $("#dominioPosicion").text(datos.dominio);
        if (datos.conductor.trim() != "" && datos.conductor.trim() != undefined) {
            $("#conductorPosicionNombre").text("NOMBRE: " + datos.conductor);
            $("#conductorPosicionDni").text("DNI: " + datos.conductordni);
            $("#conductorPosicionTelefono").text("TELEFONO: " + datos.conductortelefono);
        } else {
            $("#conductorPosicionNombre").html("<i>El movil no posee<br />conductor asignado</i>");
            $("#conductorPosicionDni").text("");
            $("#conductorPosicionTelefono").text("");
        }
        if (datos.fotosConductor != null && datos.fotosConductor.length > 0) {
            $(".fotoConductor").css("backgroundImage", 'url(https:/' + datos.fotosConductor[0] + ')');
            var arrayFotos = '';
            for (i = 0; i < datos.fotosConductor.length; i++) {
                arrayFotos += 'https:/' + datos.fotosConductor[i] + "?";
            }
            $('.fotoConductor').attr('data-fotos', arrayFotos);
        } else {
            $(".fotoConductor").css("backgroundImage", 'url(images/fondoConductor.jpg)');
        }
        if (datos.fotosMovil != null && datos.fotosMovil.length > 0) {

            var arrayFotos = '';
            for (i = 0; i < datos.fotosMovil.length; i++) {
                arrayFotos += 'https:/' + datos.fotosMovil[i] + "?";
            }
            for (j = 0; j < datos.fotosMovil.length; j++) {
                if (j < 4) {
                    $(".imagenesMovil").append('<div class="imagenesMovilImg" data-fotos="' + arrayFotos + '" style="background-image: url(https:/' + datos.fotosMovil[j] + ')"><div class="sombraImgMovil">Ver<br />Imagenes</div></div>');
                }
            }

            //$('.imagenesMovilImg').attr('data-fotos', arrayFotos);
        } else {
            $(".imagenesMovil").html('<div class="nodisponible">No hay imagenes disponibles</div>');
        }
        if (datos.tiempo_detenido != null && datos.tiempo_detenido != undefined && datos.tiempo_detenido != '') {
            $("#tiempo_detenido").html('Tiempo Detenido: ' + datos.tiempo_detenido);
        } else {
            $("#tiempo_detenido").html('');
        }
        if (datos.detenido_ignicion != null && datos.detenido_ignicion != undefined && datos.detenido_ignicion != '') {
            $("#detenido_ignicion").html(datos.detenido_ignicion);
            $("#boxTiempoDetenidoIg").show();
        } else {
            $("#detenido_ignicion").html('');
            $("#boxTiempoDetenidoIg").hide();
        }
        //$("#imagenConductor").attr("src", datos.fotoConductor);
        $("#velocidadPosicion").text(datos.velocidad);

        // si es un celular y la ubicacion esta apagada, la fecha es la del ultimo reporte con posicion conocida
        if (datos.Reporte_FechaUltimaPosicion && datos.Reporte_FechaUltimaPosicion !== '') {
            $("#fechaPosicion").text(datos.Reporte_FechaUltimaPosicion + " - (último reporte con ubicación prendida)"); // fecha de la ultima posicion conocida
        } else {
            $("#fechaPosicion").text(datos.fecha + " " + datos.hora); // fecha de la ultima posicion
        }

        $("#rumboPosicion").text(rumbo);
        $("#marcaPosicion").text(datos.marca);
        $("#modeloPosicion").text(datos.modelo);
        $("#anioPosicion").text(datos.anio);
        if(datos.mileage > 0 ){
            $("#verMileage").show();
            $("#mileage").text(datos.mileage + " KM");
          }
        $("#direccionPosicion").text(datos.direccion);
        $("#idDispPosicion").val(datos.disp);

        if (datos.Reporte_SinPosicion) { // reporta pero no tiene posicion activada
            $("#eventoPosicion").empty();
            $("#eventoPosicion").append("<span style='color:red;'>UBICACIÓN APAGADA</span>");
        } else {
            $("#eventoPosicion").text(datos.tipoEvento);
        }

        if (datos.combustible !== '' && datos.combustible !== null) {
            $("#datoCombustible").show();
        }
        if (datos.bateria !== '' && datos.bateria !== null) {
            $("#datoBateria").show();
        }
        if (datos.equipoFrio !== '' && datos.equipoFrio !== null) {
            $("#datoEquipoFrio").show();
        }
        if (datos.sensorTemp !== '' && datos.sensorTemp !== null) {
            $("#datoSensorTemperatura").show();
        }
        if (datos.sensorHumedad !== '' && datos.sensorHumedad !== null) {
            $("#datoSensorHumedad").show();
        }

        if (datos.driverReporte !== '' && datos.driverReporte !== null) { // celulares
            $("#reporteTipo").empty();
            $("#reporteTipo").append(datos.driverReporte + " - (precisión: " + datos.precisionReporte + " metros)");
            $("#liReporteTipo").show();
        }

        if (typeof (datos.kmMovilTotal) !== 'undefined') {
            $("#kmPosicion").html(datos.kmMovilTotal + " Km");
                $("#datoKilometraje").show();
        }

        if (typeof (datos.hsMovilTotal) !== 'undefined') {
            $("#hsPosicion").html(datos.hsMovilTotal + " Hs");
            $("#datoCronometraje").show();
        }
        
        if (typeof (datos.reporte_rpmCAN) !== 'undefined') {
            $("#datoRPM").html(datos.reporte_rpmCAN);
                $("#datoRPMVista").show();
                 $("#datoRPM").show();
        }else{
            $("#datoRPM").hide();
        }
            
        
        if (typeof (datos.reporte_fechagpsCAN) !== 'undefined') {
            $("#datoFechaCAN").html(datos.reporte_fechagpsCAN);
                $("#datoFechaCANVista").show();
                 $("#datoFechaCAN").show();
        }else{
            $("#datoRPM").hide();
        }
        
        if (typeof (datos.reporte_temperaturamotorCAN) !== 'undefined') {
            $("#datoTemperaturaMotor").html(datos.reporte_temperaturamotorCAN);
                $("#datoTemperaturaMotorVista").show();
                 $("#datoTemperaturaMotor").show();
        }else{
            $("#datoRPM").hide();
        }
               
        if (typeof (datos.reporte_consumopromfuelCAN) !== 'undefined') {
            $("#datoConsumoPromedioCombustible").html(datos.reporte_consumopromfuelCAN);
                $("#datoConsumoPromedioCombustibleVista").show();
                 $("#datoConsumoPromedioCombustible").show();
        }else{
            $("#datoRPM").hide();
        }
        
        if (typeof (datos.reporte_fuelnivelCAN) !== 'undefined') {
            $("#datoNivelCombustible").html(datos.reporte_fuelnivelCAN);
                $("#datoNivelCombustibleVista").show();
                 $("#datoNivelCombustible").show();
        }else{
            $("#datoRPM").hide();
        }
        
        drawChart(datos.velocidad, datos.bateria, datos.combustible, 0, datos.equipoFrio, datos.sensorTemp, datos.sensorHumedad);
    }).done(function () {
        $("#cargandoDatosPosicion").hide();

    });
}


//google.charts.setOnLoadCallback(drawChart);
var chart;
var chart2;
var chart3;
var chart4;
var chart5;
var chart6;
var chart7; // AGREGADO MATI
var data;
var data2;
var data3;
var data4;
var data5;
var data6;
var data7; // AGREGADO MATI
var velocidad = 0;
var bateria = 0;
var combustible = 0;
var temperatura = 0;
var equipofrio = 0;
var sensortemp = 0; 
var humedad = 0; // AGREGADO MATI

google.charts.load('current', {
    'packages': ['gauge']
});
google.charts.setOnLoadCallback(function () {
    drawChart(velocidad, bateria, combustible, temperatura, equipofrio, sensortemp, humedad);
});

function drawChart(velocidad, bateria, combustible, temperatura, equipofrio, sensortemp, humedad) {
    var vel = parseInt(velocidad);
    var bateria2 = parseInt(bateria);
    var combustible2 = parseInt(combustible);
    var temperatura2 = parseInt(temperatura);
    var equipofrio2 = parseInt(equipofrio);
    var sensortemp2 = parseInt(sensortemp);
    var humedad2 = parseInt(humedad); // AGREGADO MATI
    /* console.log(temperatura);
     console.log(temperatura2);
        console.log(sensortemp);
            console.log(sensortemp2);
      */
    data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Velocidad', vel],
    ]);
    data2 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Bateria', bateria2],
    ]);
    data3 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Combustible', combustible2],
    ]);
    data4 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Temp Motor', temperatura2],
    ]);
    data5 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Equipo Frio', equipofrio2],
    ]);
    data6 = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Sensor Temp', sensortemp2],
    ]);
    data7 = google.visualization.arrayToDataTable([ //AGREGADO MATI AGREGADO MATI AGREGADO MATI
        ['Label', 'Value'],
        ['Humedad', humedad2]
    ]);

    var options = {
        width: 300,
        height: 100,
        redFrom: 120,
        redTo: 150,
        yellowFrom: 100,
        yellowTo: 120,
        minorTicks: 5,
        max: 150
    };
    var options2 = {
        width: 300,
        height: 100,
        redFrom: 0,
        redTo: 25,
        yellowFrom: 25,
        yellowTo: 50,
        minorTicks: 5,
        max: 100
    };
    var options3 = {
        width: 300,
        height: 100,
        redFrom: 0,
        redTo: 25,
        yellowFrom: 25,
        yellowTo: 50,
        minorTicks: 5,
        max: 100
    };
    var options4 = {
        width: 300,
        height: 100,
        redFrom: 90,
        redTo: 120,
        yellowFrom: 70,
        yellowTo: 90,
        minorTicks: 5,
        max: 120
    };
    var options5 = {
        width: 300,
        height: 100,
        redFrom: 0,
        redTo: 15,
        yellowFrom: -10,
        yellowTo: 0,
        minorTicks: 5,
        max: 15,
        min: -20
    };
    var options6 = {
        width: 300,
        height: 100,
        redFrom: 90,
        redTo: 120,
        yellowFrom: 70,
        yellowTo: 90,
        minorTicks: 5,
        max: 120
    };
    var options7 = { // AGREGADO MATI AGREGADO MATI AGREGADO MATI AGREGADO MATIS
         width: 300,
        height: 100,
        redFrom: 90,
        redTo: 120,
        yellowFrom: 70,
        yellowTo: 90,
        minorTicks: 5,
        max: 120
    }

    chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart2 = new google.visualization.Gauge(document.getElementById('chart_div2'));
    chart3 = new google.visualization.Gauge(document.getElementById('chart_div3'));
    chart4 = new google.visualization.Gauge(document.getElementById('chart_div4'));
    chart5 = new google.visualization.Gauge(document.getElementById('chart_div5'));
    chart6 = new google.visualization.Gauge(document.getElementById('chart_div6'));
    chart7 = new google.visualization.Gauge(document.getElementById('chart_div7'));

    data.setValue(0, 1, vel);
    data2.setValue(0, 1, bateria2);
    data3.setValue(0, 1, combustible2);
    data4.setValue(0, 1, temperatura2);
    data5.setValue(0, 1, equipofrio2);
    data6.setValue(0, 1, sensortemp2);
    data7.setValue(0, 1, humedad2); // AGREGADO MATI AGREGADO MATI AGREGADO MATI AGREGADO MATIS
    

    chart.draw(data, options);
    chart2.draw(data2, options2);
    chart3.draw(data3, options3);
    chart4.draw(data4, options4);
    chart5.draw(data5, options5);
    chart6.draw(data6, options6);
    chart7.draw(data7, options7);

}

function onMarker(e) {
    //$('#modalDetallePosicion').modal('show');
    if (!$("#divDatosPosicion").is(":visible")) {
        $("#divDatosPosicion").show('slow');
    }
    $("#cargandoDatosPosicion").show();

    var url = 'index.php?r=flota/detalleposicion&movil=' + this.id;
    var pos = $.getJSON(url, function (datos) {
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
        $("#movilPosicion").text(datos.movil);
        $("#dominioPosicion").text(datos.dominio);
        $("#conductorPosicion").text(datos.conductor);
        $("#velocidadPosicion").text(datos.velocidad);
        $("#fechaPosicion").text(datos.fecha + " " + datos.hora);
        $("#rumboPosicion").text(rumbo);
        if(datos.mileage == 5 ){
            $("#verMileage").show();
            $("#mileage").text(datos.mileage + " KM");
          }
        $("#marcaPosicion").text(datos.marca);
        $("#modeloPosicion").text(datos.modelo);
        $("#anioPosicion").text(datos.anio);
        $("#direccionPosicion").text(datos.direccion);
        $("#idDispPosicion").val(datos.disp);
        $("#eventoPosicion").text(datos.tipoEvento);
        if (datos.combustible !== '' && datos.combustible !== null) {
            $("#datoCombustible").show();
            $("#eventoCombustible").text(datos.combustible + "%");
        } else {
            $("#datoCombustible").hide();
        }
        if (datos.bateria !== '' && datos.bateria !== null) {
            if (datos.bateria < 10) {
                $("#bateria1").show();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
            } else if (datos.bateria > 9 && datos.bateria < 30) {
                $("#bateria1").hide();
                $("#bateria2").show();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
            } else if (datos.bateria > 29 && datos.bateria < 50) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").show();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").hide();
            } else if (datos.bateria > 49 && datos.bateria < 70) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").show();
                $("#bateria5").hide();
                $("#bateria6").hide();
            } else if (datos.bateria > 69 && datos.bateria < 90) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").show();
                $("#bateria6").hide();
            } else if (datos.bateria > 89) {
                $("#bateria1").hide();
                $("#bateria2").hide();
                $("#bateria3").hide();
                $("#bateria4").hide();
                $("#bateria5").hide();
                $("#bateria6").show();
            }
            $("#datoBateria").show();
            $("#bateriaPosicion").text(datos.bateria + "%");
        } else {
            $("#datoBateria").hide();
        }
    }).done(function () {
        $("#cargandoDatosPosicion").hide();
    });
}

function verPosiciondDeAlerta(dominio, latitud, longitud, tipoAlerta) {
    limpiarMapa();
    var url = 'index.php?r=operador/obtenerdireccion&latitud=' + latitud + '&longitud=' + longitud;
    var pos = $.getJSON(url, function (datos) {
        ubicacion = datos.ubicacion;
    }).done(function () {
        var marker = L.marker([latitud, longitud]).bindLabel('Alerta:' + tipoAlerta + '<br />Dominio:' + dominio + '<br />Direccion:' + ubicacion, {
            noHide: true,
            direction: 'right'
        }).addTo(map);
        map.setView([latitud, longitud], 15);
        todosLosMarcadores.push(marker);
    });

}

function cambiarLayer() {
    var accessToken = 'pk.eyJ1IjoibGVvZ2FicmllbG1hcnRpbmV6IiwiYSI6ImNpajM5cDNlaTAwNHF0dGtuMjg0Nnd3MDEifQ.lGyOsEezLEKFYzMM4pUa_w';
  //  var satelite = new L.tileLayer('//api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=' + accessToken, {
      var satelite = new L.tileLayer('//api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
        attribution: '',
        maxZoom: 17,
        minZoom: 2
    });
    /*
     * Para HERE MAPA se saco una  ApiKEY =hx-78T0kbZdeSUty6Y623Sgyi7CUi6latKexV4VSif4
     * 
     */
    var appID = 'kDw247ifuRx8FSdbfLCR';
    var appCODE = 'GA9UZVt8ou_tUlV4u5Q6jQ';
    var traffic = new L.tileLayer('//{s}.traffic.maps.cit.api.here.com/maptile/2.1/traffictile/newest/hybrid.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2016 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 18,
        minZoom: 2,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });
    var normal2 = new L.tileLayer('//{s}.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2016 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 18,
        minZoom: 2,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });
    var satelite2 = new L.tileLayer('//{s}.aerial.maps.api.here.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?app_id=' + appID + '&app_code=' + appCODE, {
        attribution: 'Map &copy; 1987-2016 <a href="http://developer.here.com">HERE</a>',
        maxZoom: 17,
        minZoom: 2,
        subdomains: '1234',
        useHTTPS: true,
        useCIT: true
    });

    //var googleTraffic = new L.Google('ROADMAP');

    var baseLayers = {
        "Base": defaul,
        "Base 2": normal2,
        "Satelital": satelite,
        "Satelital 2": satelite2,
        "Tráfico": traffic
    };

    L.control.layers(baseLayers, null).addTo(map);
}

function agregarSeguimientosDiv(movil, dominio) {
    $("#marcoDivVentana").show();

    var div = "<div class='movilEnMapa' id=\"divSeguimiento" + movil + "\"> <span>" + dominio + "</span> &nbsp;&nbsp; <a id=\"" + movil + "\" href=\"javascript:void(0)\" onclick=\"quitarSeguimientosDiv(this.id);\"><span class='glyphicon glyphicon-trash' style='float:right; margin-right:2px'></span></a>";

    if (!$("#divSeguimiento" + movil).length) {
        $("#divVentana").append(div);
    }
}

function quitarSeguimientosDiv(movil) {
    $("#divSeguimiento" + movil).remove();
    if (todosSeguimientos.indexOf(movil) !== -1) {
        todosSeguimientos.splice(todosSeguimientos.indexOf(movil), 1);
    }

    if (todosSeguimientos.length === 0) {
        $("#marcoDivVentana").hide();
    }

    recargarPosiciones();
}

function agregarMovilesDiv(movil, dominio) {

    $("#marcoDivVentana").show();

    var div = "<div class='movilEnMapa' id=\"divMovil" + movil + "\"> <span>" + dominio + "</span> &nbsp;&nbsp; <a id=\"" + movil + "\" href=\"javascript:void(0)\" onclick=\"quitarMovilesDiv(this.id);\"><span class='glyphicon glyphicon-trash' style='float:right; margin-right:2px'></span></a>";


    if (!$("#divMovil" + movil).length) {
        $("#divVentana").append(div);
    }
}

function contarZonas(zona, cantidad, maximo, dominiosEnZona,latitud,longitud) {
    $("#marcoDivVentana").hide();
    $("#marcoDivVentanaZona").show();
    if (cantidad > maximo) {
        estilo = "style='color:red'";
    } else {
        estilo = "style='color:green'";
    }
    nombreZona = zona.toUpperCase().replace(/\s/g, "_");;
    var divMovilEnZona = "<div class='movilEnMapa' id=divZonas>";
    divMovilEnZona += "<div id='descripcionZonaMoviles' class='row' " + estilo + " onclick=\"detallarMovilesEnZona('" + zona + "','" + cleanArray(dominiosEnZona) + "','" + latitud + "','" + longitud + "'); \"> ";
    divMovilEnZona += "<div id='nombreZona' style='cursor:pointer' class='col-md-4'>" + nombreZona.substr(0, 8) + "</div>";
    divMovilEnZona += "<div class='col-md-4' style='padding-left:30px;'>" + cantidad + "</div>";
    divMovilEnZona += "<div class='col-md-4'>" + maximo + "</div>";
    divMovilEnZona += "</div>";




    if (!$("#divZona" + zona).length) {
        $("#divZona").append(divMovilEnZona);
    }
}

function detallarMovilesEnZona(zona, datos,latitud,longitud) {
    $("#divDetalleZona").html("");
    //console.log(posicion);
    var res = datos.split(",");
    $("#marcoDivVentana").hide();
    $("#marcoDivDetalleZona").show();
    map.setView([latitud,longitud], 15);
    nombreZona = zona.toUpperCase().replace(/\s/g, "_");;
    var divDetalleZona = "<div class='DetalleMapa' id=divDetalleZona>";
    divDetalleZona += "<div id='descripcionZonaMoviles' class='row'>";
    divDetalleZona += "<div class='col-md-3'></div>";
    divDetalleZona += "<div class='col-md-3' style='text-aling:center;'>" + nombreZona.substr(0, 8) + "</div>";
    divDetalleZona += "<div class='col-md-3'></div>";
    divDetalleZona += "<div class='col-md-3' onclick='limpiarDetalleZona()' style='text-aling:right;cursor:pointer;'>(X)</div></br>";
    for (i = 0; i < res.length; i++) {
        divDetalleZona += "<div class='col-md-6'>" + res[i] + "</div>";
    }
    divDetalleZona += "</div>";

    if (!$("#divDetalleZona" + zona).length) {
        $("#divDetalleZona").append(divDetalleZona);
    }
}

function limpiarDetalleZona(){
    $("#marcoDivDetalleZona").hide();
}

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0, j = actual.length; i < j; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
function quitarMovilesDiv(movil) {
    $("#divMovil" + movil).remove();
    if (todosMoviles.indexOf(movil) !== -1) {
        todosMoviles.splice(todosMoviles.indexOf(movil), 1);
    }

    eliminarMarker(movil);
    //alert(todosMoviles.length);
    if (todosMoviles.length === 0) {
        $("#marcoDivVentana").hide();
    }

    limpiarCirculoUltimaPocision();
}

function agregarRecorridosDiv(movil, dominio) {
    $("#marcoDivVentana").show();

    var div = "<div class='movilEnMapa' id=\"divRecorrido" + movil + "\"> <span>" + dominio + "</span> &nbsp;&nbsp; <a id=\"" + movil + "\" href=\"javascript:void(0)\" onclick=\"quitarRecorridosDiv(this.id);\"><span class='glyphicon glyphicon-trash' style='float:right; margin-right:2px'></span></a>";

    if (!$("#divRecorrido" + movil).length) {
        $("#divVentana").append(div);
    }
}

function quitarRecorridosDiv(movil) {
    $("#divRecorrido" + movil).remove();
    if (todosRecorridos.indexOf(movil) !== -1) {
        todosRecorridos.splice(todosRecorridos.indexOf(movil), 1);
    }

    eliminarMarkerRecorrido(movil);
    limpiarCirculosRecorrido(movil);

    if (todosRecorridos.length === 0) {
        $("#marcoDivVentana").hide();
    }
}

function limpiarDivVentana() {
    $("#divVentana").html("");
    $("#marcoDivVentana").hide();

}
function limpiarDivZona() {
    $("#divZona").html("");
    $("#marcoDivVentanaZona").hide();
    $("#marcoDivDetalleZona").hide();

}

function limpiarCirculoUltimaPocision() {
    if (circuloUltimaPocision && circuloUltimaPocision !== 'undefined' && circuloUltimaPocision !== null) {
        map.removeLayer(circuloUltimaPocision);
    }
}

function limpiarCirculosRecorrido(movil) {
    if (movil !== 0) { // limpiar el recorrido del movil
        var nuevoCirculoPocisionRecorrido = []; // array de circulos sin los eliminados
        var itemsCount = 0;

        $.each(circuloPocisionRecorrido, function (index, value) {
            var movilItem = value[0];
            var circulo = value[1];
            if (movilItem === movil) { // si coincide el movil, eliminar el circulo
                map.removeLayer(circulo);
            } else { // guardamos los items de otros moviles
                nuevoCirculoPocisionRecorrido.push([movilItem, circulo]);
                itemsCount++;
            }
        });

        circuloPocisionRecorrido = nuevoCirculoPocisionRecorrido;

    } else { // limpiar el recorrido de todos los moviles
        $.each(circuloPocisionRecorrido, function (index, value) {
            var circulo = value[1];
            map.removeLayer(circulo);
        });

        circuloPocisionRecorrido = [];
    }

}