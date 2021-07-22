var todosLosMarcadores = [];
var map;
var xhrObj;
var timer;
var flota = false;
$(document).ready(function () {
  init();
  $("#carDataClose").click(function () {
    $("#carData").slideUp();
  });

  $("#errorDataClose").click(function () {
    $("#errorData").slideUp();
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

  $("#alertClose").click(function () {
    visualizaFlota();
    $("#alertData").slideUp();
    $(this).hide();
  });

  /*timer = setInterval(function () {
   visualizaFlota(1);
   console.log(new Date());
   }, 60000);*/
});

function init() {
  map = L.map('map').
          setView([-35.229578, -62.383723],
                  5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
  }).addTo(map);

  L.control.scale().addTo(map);

  /*new L.Control.GeoSearch({
   provider: new L.GeoSearch.Provider.Esri(),
   position: 'topcenter',
   showMarker: false,
   retainZoomLevel: false,
   }).addTo(map);*/
}
function visualizaFlota(doReload) {
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

    if (!flota) {
      timer = setInterval(function () {
        visualizaFlota(1);
        console.log(new Date());
      }, 60000);
      flota = true;
    }

    for (var i = 0; i < datos.length; i++) {

      if ($.inArray(datos[i].dominio, activeCarSelection) > -1) {
        if (datos[i].latitud !== null && datos[i].latitud !== '' && datos[i].longitud !== null && datos[i].longitud !== '') {
          var myIcon = L.icon({
            iconUrl: datos[i].icono,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
                    //labelAnchor: [6, 0] // as I want the label to appear 2px past the icon (10 + 2 - 6)
          });
          var marker = L.marker([datos[i].latitud, datos[i].longitud], {icon: myIcon, iconAngle: parseInt(datos[i].rumbo)})
                  .bindLabel(datos[i].movil + '<br/><span style="font-weight:normal;">' + datos[i].dominio + '</span>', {noHide: true, direction: 'left'});
          marker.id = datos[i].disp;
          todosLosMarcadores.push(marker);
          marker.on('click', onMarker);
        }
      }

    }
    if (activeCarSelection === "") {
      map.setView([-35.229578, -62.383723], 5);
    } else {
      var group = L.featureGroup(todosLosMarcadores).addTo(map);
      map.fitBounds(group.getBounds());
    }
    if (!doReload) {
      $(".preload").fadeOut();
    }
  });
}

function limpiarMapa() {
  for (var i = 0; i < todosLosMarcadores.length; i++) {
    map.removeLayer(todosLosMarcadores[i]);
  }

  todosLosMarcadores = [];
}

function verRecorrido(movil) {
  var hoy = new Date();
  hoy.setHours(hoy.getHours() - 12);
  var fechaHasta = dateFormat(new Date(), "yyyy-mm-dd HH:MM");
  var fechaDesde = dateFormat(hoy, "yyyy-mm-dd HH:MM");

  datos = {"movil": movil, "desde": fechaDesde, "hasta": fechaHasta};

  $.ajax({
    url: "index.php?r=informes/recorrido",
    type: 'POST',
    data: datos,
    context: document.body,
    success: function (datos) {

      if (datos.length == 0) {
        $("#errorData").slideUp();
        $("#errorDiv").html("No hay registros en las últimas 12 horas.");
        $("#errorData").slideDown();
        return;
      }
      if (datos.length > 500) {
        ("#errorData").slideUp();
        $("#errorDiv").html("Se encontraron más de 500 registros en las últimas 12 horas.");
        $("#errorData").slideDown();
        return;
      }

      limpiarMapa();

      if (flota) {
        clearInterval(timer);
        flota = false;
      }

      var inicialPos = new L.latLng(datos[0].Reporte_Latitud, datos[0].Reporte_Longitud);

      map.setView(inicialPos, 12);

      var marcador;
      var vectorMarcadores = [];
      var polilinea = [];

      for (var i = 0; i < datos.length; i++) {

        var posicion = new L.latLng(datos[i].Reporte_Latitud, datos[i].Reporte_Longitud);
        polilinea[i] = posicion;

        var divDetallesInfowindow = "<div id='menuDetallesMovilInfowindow'>" +
                "<div id='DetalleMapaTit'>Recorrido de " + datos[i].Movil_Dominio + "</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Velocidad</b> " + datos[i].Reporte_Velocidad +
                " km/h</div>" +
                "<div class='DetalleMapa'>" +
                "<img src='images/check.png' height='10px' style='vertical-align:middle'> " +
                "<b>Fecha</b> " + datos[i].Reporte_FechaGPS +
                "</div>" +
                "</div>";

        /*if (datos[i].Reporte_Velocidad < 5)
         var colorMarcador = 'red';
         else
         var colorMarcador = '#0066FF';*/

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

        marcador.id = datos[0].Reporte_IdDisp;
        todosLosMarcadores.push(marcador);
        vectorMarcadores.push(marcador);
        vectorMarcadores[i].bindPopup(opcionesInfoBox);
      }

      var bounds = new L.featureGroup(vectorMarcadores).addTo(map);
      map.fitBounds(bounds.getBounds());
      var lineas = new L.Polyline(polilinea, {
        color: '#009933',
        weight: 6,
        opacity: 0.7
      });
      lineas.id = datos[0].Reporte_IdDisp;
      lineas.addTo(map);

      todosLosMarcadores.push(lineas);
      abrirRecorrido();
    }
  }).error(function (e) {
    console.log("Se produjo un error.\n");
  });
}

function abrirRecorrido() {
  $("#carData").slideUp();
  $("#recorridoData").slideUp();
  $("#recorridoData").slideDown();
}

function cerrarRecorrido() {
  visualizaFlota();
  $("#recorridoData").slideUp();
}

function onMarker(e) {

  $("#carData").slideUp();
  //alert(this.id);
  var id = this.id;
  var url = 'index.php?r=flota/detalleposicion&movil=' + id;
  var pos = $.getJSON(url, function (datos) {
    $("#carData, #alertData").slideUp(function () {
      $("#movil").text(datos.movil);
      $("#dominio").text(datos.dominio);
      $("#velocidad").text(datos.velocidad);
      $("#fecha").text(datos.fecha);
      $("#hora").text(datos.hora);
      $("#marca").text(datos.marca);
      $("#modelo").text(datos.modelo);
      $("#anio").text(datos.anio);
      $("#direccion").text(datos.direccion);
      $("#recorridoDiv").html('<a href="javascript:void(0)" id="' + datos.disp + '" onClick="verRecorrido(this.id);" href="">Histórico</a>');
    });
    $("#carData").slideDown();
  }).done(function () {
    //$("#carData").slideDown();
  });

}
function verPosiciondDeAlerta(dominio, latitud, longitud, tipoAlerta, fecha, velocidad, descripcion) {
  limpiarMapa();
  var url = 'index.php?r=operador/obtenerdireccion&latitud=' + latitud + '&longitud=' + longitud;
  var pos = $.getJSON(url, function (datos) {
    ubicacion = datos.ubicacion;
  }).done(function () {
    //var marker = L.marker([latitud, longitud]).bindLabel('Alerta:'+tipoAlerta+'<br />Dominio:'+dominio+'<br />Fecha:'+fecha+'<br />Velocidad:'+velocidad+'<br />Descripcion:'+descripcion+'<br />Direccion:'+ubicacion, {noHide: true, direction: 'right'}).addTo(map);
    var marker = L.marker([latitud, longitud]).addTo(map);
    map.setView([latitud, longitud], 15);
    todosLosMarcadores.push(marker);
    $("#carData, #alertData").slideUp(function () {
      $("#alertData .dominio").text(dominio);
      $("#alertData .tipo").text(tipoAlerta);
      $("#alertData .fecha").text(fecha);
      $("#alertData .velocidad").text(velocidad);
      $("#alertData .descripcion").text(descripcion);
      $("#alertData .direccion").text(ubicacion);
    });
    $("#alertData").slideDown();
  });
}

var dateFormat = function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
          timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
          timezoneClip = /[^-+\dA-Z]/g,
          pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len)
              val = "0" + val;
            return val;
          };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date))
      throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
              d: d,
              dd: pad(d),
              ddd: dF.i18n.dayNames[D],
              dddd: dF.i18n.dayNames[D + 7],
              m: m + 1,
              mm: pad(m + 1),
              mmm: dF.i18n.monthNames[m],
              mmmm: dF.i18n.monthNames[m + 12],
              yy: String(y).slice(2),
              yyyy: y,
              h: H % 12 || 12,
              hh: pad(H % 12 || 12),
              H: H,
              HH: pad(H),
              M: M,
              MM: pad(M),
              s: s,
              ss: pad(s),
              l: pad(L, 3),
              L: pad(L > 99 ? Math.round(L / 10) : L),
              t: H < 12 ? "a" : "p",
              tt: H < 12 ? "am" : "pm",
              T: H < 12 ? "A" : "P",
              TT: H < 12 ? "AM" : "PM",
              Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
              o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
              S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

// Some common format strings
dateFormat.masks = {
  "default": "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};


