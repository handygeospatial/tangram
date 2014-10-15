/*global Tile */
import {Geo} from './geo';

var BUILD_TILE_TYPE = 'buildTile';

export default class Tile {

    constructor(spec = {}) {
        Object.assign(this, {
            key: null,
            max: {
                x: null,
                y: null
            },
            min: {},
            debug: {},
            bounds: {
                sw: {
                    x: null,
                    y: null
                },
                ne: {
                    x: null,
                    y: null,
                }
            },
            loading: false,
            loaded: false
        }, spec);
    }
    static create(spec) { return new Tile(spec); }

    destory() {}

    build(scene, key) {
        scene.workerPostMessage(JSON.stringify(this), {
            type: BUILD_TILE_TYPE,
            tile: {
                key: this.key,
                coords: this.coords,
                min: this.min,
                max: this.max,
                debug: this.debug
            },
            tile_source: scene.tile_source,
            styles: scene.styles_serialized
        });
    }

    rebuild() {}

    showDebug(div) {
        var debug_overlay = document.createElement('div');
        debug_overlay.style = {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            color: 'white',
            fontSize: '16px;',
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: '1px'
        };
        div.appendChild(debug_overlay);
        return debug_overlay;
    }

    updateElement(div) {

        div.setAttribute('data-tile-key', this.key);
        div.style = {
            width: '256px',
            height: '256px'
        };

        if (this.debug) {
            this.showDebug(div);
        }
    }

    updateVisibility(scene) {}

    load(scene, coords, div, cb) {
        var key,
            tile,
            zgap = coords.z - this.max_zoom;

        coords.x = ~~(coords.x / Math.pow(2, zgap));
        coords.y = ~~(coords.y / Math.pow(2, zgap));
        coords.display_z = coords.z;
        coords.z -= zgap;

//        scene.trackTileSetLoad();

        key = [coords.x, coords.y, coords.z].join('/');

        if (scene.tiles.hasOwnProperty(key)) {
            if (cb) {
                cb(null, div);
            }
            return;
        }

        tile = scene.tiles[key] = {};
        Object.assing(this, {
            key: key,
            coords: coords,
            min: Geo.metersForTile(this.coords),
            max: Geo.metersForTile({x: this.coords.x + 1, y: this.coords.y + 1, z: this.coords.z }),
            span: { x: (tile.max.x - tile.min.x), y: (tile.max.y - tile.min.y) },
            loading: true
        });
        this.build();
        this.updateElement(div);
        this.updateVisibility();

        if (cb) { cb(null, div); }

    }

    isInZoom(scene, zoom) {}

}
