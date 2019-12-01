import * as THREE from './build/three.module.js';
//import {OrbitControls} from './examples/jsm/controls/OrbitControls.js';
import CameraControls from './camera-controls/camera-controls.js';

CameraControls.install( { THREE: THREE } );

class Highlight {

}

export class StructureScene {
    constructor(canvas) {
        this.render = this.render.bind(this);

        this.canvas = canvas;
        this.scene = new THREE.Scene();

        this._clock = new THREE.Clock();
        this._renderer = new THREE.WebGLRenderer({canvas, antialias: true});

        this._transitions = [];
        this._camera = this._buildCamera(-2.5, 2.25, 2);

        this._controls = new CameraControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.1;

        this._highlight = [];
        this._hover = [];

        this._buildScene();
    }

    _buildCamera(x, y, z) {

        const fov = 45;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 500;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;

        this._addCameraTransition(x, y, z);

        return camera;
    }

    _addCameraTransition(x, y, z, highlight=[]) {
        if (!Array.isArray(highlight)) highlight = [highlight]; // attempting to highlight a single object
        this._transitions.push({x, y, z, highlight});
    }

    _buildScene() {
        const lightColor = 0xFFFFFF;
        const intensity = 0.75;
        this._addLight(-1, 2, 4, lightColor, intensity);
        this._addLight(-1, 2, -4, lightColor, intensity);
        this._addLight(-4, 2, 0, lightColor, intensity);
        this._addLight(4, -2, 0, lightColor, intensity);

        const width = 1.5;
        const height = 2;
        const thickness = 0.025;
        const panelGeometry = new THREE.BoxGeometry(width, height, thickness);
        const junctionGeometry = new THREE.BoxGeometry(thickness, height, thickness);


        // panels
        const panelColor = 0x44aa88;
        const x = (width + thickness) / 2;
        const r = Math.PI / 2;
        const p1 = this._addPanel(panelGeometry, panelColor, -x, 0, 0, r);
        const p2 = this._addPanel(panelGeometry, panelColor,  0, 0, x, 0);
        const p3 = this._addPanel(panelGeometry, panelColor,  x, 0, 0, r);

        const p = 4;
        const c = this._camera.position;
        this._addCameraTransition(c.x, c.y, c.z, [p1, p2, p3]); // all panels
        this._addCameraTransition(-p, 0, 0, p1);
        this._addCameraTransition( 0, 0, p, p2);
        this._addCameraTransition( p, 0, 0, p3);

        // junctions
        const junctionColor = panelColor;
        const j1 = this._addJunction(junctionGeometry, junctionColor, -x, 0, -x, 0);
        const j2 = this._addJunction(junctionGeometry, junctionColor, -x, 0,  x, 0);
        const j3 = this._addJunction(junctionGeometry, junctionColor,  x, 0,  x, 0);
        const j4 = this._addJunction(junctionGeometry, junctionColor,  x, 0, -x, 0);
        const j = 3;
        this._addCameraTransition(c.x, c.y, c.z, [j1, j2, j3, j4]); // all junctions
        this._addCameraTransition(-j, 0, -j, j1);
        this._addCameraTransition(-j, 0,  j, j2);
        this._addCameraTransition( j, 0,  j, j3);
        this._addCameraTransition( j, 0, -j, j4);
    }

    _addLight(x, y, z, color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        this.scene.add(light);
        return light;
    }

    _addPanel(geometry, color, x, y, z, rot) {
        const material = new THREE.MeshPhongMaterial({color});
        const panel = new THREE.Mesh(geometry, material);
        this.scene.add(panel);

        panel.position.x = x;
        panel.position.y = y;
        panel.position.z = z;
        panel.rotation.y = rot;

        panel.sm_wasVisible = true;

        return panel;
    }

    _addJunction(geometry, color, x, y, z, rot) {
        const material = new THREE.MeshPhongMaterial({color});
        const junction = new THREE.Mesh(geometry, material);
        this.scene.add(junction);

        junction.position.x = x;
        junction.position.y = y;
        junction.position.z = z;
        junction.rotation.y = rot;

        junction.visible = false; // hidden until selected
        junction.sm_wasVisible = false;

        return junction;
    }

    _updateEmissive(mesh) {
        const e = mesh.sm_highlighted ? 0xaa8844 : (mesh.sm_hover ? 0x554422 : 0x0);
        mesh.visible = e > 0 ? true : mesh.sm_wasVisible;
        mesh.material.emissive.setHex(e);
    }

    _setHighlight(highlight) {
        for (let i=0; i<this._highlight.length; i++) {
            const h = this._highlight[i];
            h.sm_highlighted = false;
            this._updateEmissive(h);
        }

        this._highlight = highlight;

        for (let i=0; i<this._highlight.length; i++) {
            const h = this._highlight[i];
            h.sm_highlighted = true;
            this._updateEmissive(h);
        }
    }

    transition(index) {
        const {x, y, z, highlight} = this._transitions[index];
        this._controls.setLookAt(x, y, z, 0, 0, 0, true);
        this._setHighlight(highlight);
    }

    hover(index, enable) {
        const {x, y, z, highlight} = this._transitions[index];
        for (let i=0; i<highlight.length; i++) {
            const h = highlight[i];
            h.sm_hover = enable;
            this._updateEmissive(h);
        }
    }

    render() {
        const delta = this._clock.getDelta();

        if (this.resizeCanvas()) {
            this._camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this._camera.updateProjectionMatrix();
        }

        this._controls.update(delta);
        this._renderer.render(this.scene, this._camera);
        requestAnimationFrame(this.render);
    }

    resizeCanvas() {
        const canvas = this._renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            this._renderer.setSize(width, height, false);
        }
        return needResize;
    }
}
