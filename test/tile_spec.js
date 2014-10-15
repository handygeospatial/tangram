import chai from 'chai';
let assert = chai.assert;

import Tile from '../src/tile';
import Scene from '../src/scene';

import mockScene from './fixtures/sample-scene';

describe('Tile', () => {
    describe('.constructor(spec)', () => {

        it('returns a new instance', () => {
            let subject = new Tile();
            assert.instanceOf(subject, Tile);
            assert.property(subject, 'max');
            assert.property(subject, 'min');
            assert.property(subject, 'debug');
            assert.property(subject, 'bounds');
            assert.property(subject, 'loading');
            assert.property(subject, 'loaded');
            assert.property(subject, 'key');
        });
    });

    describe('Tile.create(spec)', () => {});

    describe('.load(scene, coords, div, cb)', () => {
        let subject,
            scene,
            coords = {x: 1, y: 1, z: 1},
            div    = document.createElement('div');

        beforeEach((done) => {
            scene = Scene.create(mockScene);
            scene.init(() => {
                subject = new Tile();
                done();
            });
        });

        afterEach(() => {
            scene   = undefined;
            subject = undefined;
        });

        describe('when the tile was not already loaded', () => {

            it('calls back with the div', (done) => {
                subject.load(scene, coords, div, (element) => {
                    assert.instanceOf(element, HTMLElement);
                    done();
                });
            });

            it('builds the tile');
            it('updates the html element');
            it('updates the visiblility');
            it('updates the key property');
            it('calculates the min');
            it('calculates the max');
            it('marks the tile a loading');
        });

        describe('when the tile was already loaded', () => {
            it('calls back with the div');
            it('does not build the tile');
            it('does not update the html element');
            it('does not update the visiblility');
        });

    });

    describe('.isInZoom(scene, zoom)', () => {});
    describe('.updateVisibility(scene)', () => {});

});
