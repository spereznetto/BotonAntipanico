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

function cambiarestado(idalerta, estado) {
    datos = {
      "idalerta": idalerta,
      "estado": estado
    };
  
    $.ajax({
      url: "index.php?r=alerta/cambiarestado",
      type: 'POST',
      data: datos,
      context: document.body,
      success: function (data) {
  
        if (data.length == 0) {
          alert("No se encontraron registros en el rango de fechas seleccionado");
          if (todosSeguimientos.indexOf(movil) !== -1) {
            todosSeguimientos.splice(todosSeguimientos.indexOf(movil), 1);
          }
          return;
        }
        if (data.length === 1 && data[0] === null) {
          alert("No existen reportes en la última hora.");
          if (todosSeguimientos.indexOf(movil) !== -1) {
            todosSeguimientos.splice(todosSeguimientos.indexOf(movil), 1);
          }
          return;
        }
  
        visualizaSeguimiento(data, manual); //llama a la funcion que visualiza el recorrido, que se encuentra en funcionesGmap.js
      }
    }).error(function (e) {
      console.log("Se produjo un error.\n");
    });
  }
function verseguimiento(lat,lon) {
    map.invalidateSize();
    limpiarMapa();
    
    var marker = L.marker([lat, lon]).addTo(map);

            map.setView([lat, lon], 25);
       
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
 
    if (seguimiento) {
        clearInterval(tick);
        seguimiento = false;
    }
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


function limpiarDivVentana() {
    $("#divVentana").html("");
    $("#marcoDivVentana").hide();

}