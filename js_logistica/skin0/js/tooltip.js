function inicializar_tooltip(selector, ancho, delay_abrir, delay_cerrar) {
    $(selector).tooltipster({
        theme: 'tooltipster-punk',
        maxWidth: ancho,
        delay: [delay_abrir, delay_cerrar]
    });
}