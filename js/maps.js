function formatFunction(fn, codeDiv) {
    codeDiv.innerText = fn.toString()
        .replace(/^            \}$/gm, '')
        .replace(/                (\S)/gm, '$1')
        .replace(/^function \(\) \{$/gm, '')
        .replace(/^(.{75}).+$/gm, '$1 ...')
        .trim();
    hljs.highlightBlock(codeDiv);
}

L.Map.addInitHook(function() {
    var slides = document.querySelector('.slides'),
        zoom = Number(slides.style.zoom);

    if (!zoom) {
        zoom = Number(slides.style.transform.replace(/.*scale\(([0-9\.]+)\).*/, '$1'));
    }

    this._container.style.zoom = 1/zoom;
    this.invalidateSize();
});

window.workingMap = (function() {
    var map;

    return {
        start: function() {
            map = L.map('working-map');
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            map.setView([57.7, 11.96], 13);
        },
        stop: function() {
            map.remove();
        }
    };
})();

