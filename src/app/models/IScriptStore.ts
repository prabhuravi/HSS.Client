interface IScripts {
    name: string;
    src: string;
}
export const ScriptStore: IScripts[] = [
    { name: 'leafletrotatemarker', src: 'node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js' },
    { name: 'leafletfullscreen', src: 'node_modules/leaflet.fullscreen/Control.FullScreen.js' }
];
