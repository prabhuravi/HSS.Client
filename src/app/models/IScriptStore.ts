/*
 * KONGSBERG PROPRIETARY. This document and its accompanying elements, contain KONGSBERG information which is proprietary and confidential.
Any disclosure, copying, distribution or use is prohibited if not otherwise explicitly agreed with KONGSBERG in writing.
Any authorized reproduction, in whole or in part, must include this legend. © [year of creation] KONGSBERG – All rights reserved.
 */
interface IScripts {
    name: string;
    src: string;
}
export const ScriptStore: IScripts[] = [
    { name: 'leafletrotatemarker', src: 'node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js' },
    { name: 'leafletfullscreen', src: 'node_modules/leaflet.fullscreen/Control.FullScreen.js' }
];
