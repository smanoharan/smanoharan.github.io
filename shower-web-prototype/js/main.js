import * as THREE from './build/three.module.js';
import CameraControls from './camera-controls/camera-controls.js';

CameraControls.install( { THREE: THREE } );

class Mouse {
    constructor(target, controls) {
        this.pos = new THREE.Vector2();
        this.hasMouse = false;
        this._target = target;
        this._controls = controls;
        this._enabled = true;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onControlStart = this.onControlStart.bind(this);
        this.onControlEnd = this.onControlEnd.bind(this);

        target.addEventListener('mousemove', this.onMouseMove, false);
        target.addEventListener('mouseout', this.onMouseOut, false);
        controls.addEventListener('controlstart', this.onControlStart);
        controls.addEventListener('controlend', this.onControlEnd);
    }

    onMouseMove(e) {
        if (this._enabled && this._target === e.target) {
            const rect = e.target.getBoundingClientRect();
            this.pos.x = ((e.clientX - rect.left) / this._target.clientWidth) * 2 - 1;
            this.pos.y = - ((e.clientY - rect.top) / this._target.clientHeight) * 2 + 1;
            this.hasMouse = true;
        } else {
            this.hasMouse = false;
        }
    }

    onMouseOut() {
        this.hasMouse = false;
    }

    onControlStart() {
        this._enabled = false;
    }

    onControlEnd() {
        this._enabled = true;
    }
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

        this._raycaster = new THREE.Raycaster();
        this._mouse = new Mouse(canvas, this._controls);
        this._mouseHover = null;

        this._highlight = [];

        this._panels = [];
        this._junctions = [];
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

        this._addCameraTransition(x, y, z, [], true, true);

        return camera;
    }

    _addCameraTransition(x, y, z, highlight=[], allowPanelHover=false, allowJunctionHover=false) {
        if (!Array.isArray(highlight)) highlight = [highlight]; // attempting to highlight a single object
        this._transitions.push({x, y, z, highlight, allowPanelHover, allowJunctionHover});

        if (highlight.length === 1) {
            highlight[0].sm_bestTransitionIndex = this._transitions.length - 1;
        }
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
        this._panels = [p1, p2, p3];

        const p = 4;
        const c = this._camera.position;
        this._addCameraTransition(c.x, c.y, c.z, [], true, false); // all panels
        this._addCameraTransition(-p, 0, 0, p1, true, false);
        this._addCameraTransition( 0, 0, p, p2, true, false);
        this._addCameraTransition( p, 0, 0, p3, true, false);

        // junctions
        const junctionColor = panelColor;
        const j1 = this._addJunction(junctionGeometry, junctionColor, -x, 0, -x, 0);
        const j2 = this._addJunction(junctionGeometry, junctionColor, -x, 0,  x, 0);
        const j3 = this._addJunction(junctionGeometry, junctionColor,  x, 0,  x, 0);
        const j4 = this._addJunction(junctionGeometry, junctionColor,  x, 0, -x, 0);
        this._junctions = [j1, j2, j3, j4];
        const j = 3;
        this._addCameraTransition(c.x, c.y, c.z, this._junctions, false, true); // all junctions
        this._addCameraTransition(-j, 0, -j, j1, false, true);
        this._addCameraTransition(-j, 0,  j, j2, false, true);
        this._addCameraTransition( j, 0,  j, j3, false, true);
        this._addCameraTransition( j, 0, -j, j4, false, true);
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
        panel.sm_allowHover = true;

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

        junction.material.visible = false; // hidden until selected
        junction.sm_wasVisible = false;
        junction.sm_allowHover = true;

        return junction;
    }

    _updateEmissive(mesh) {
        const hover = mesh.sm_hover || mesh === this._mouseHover;
        const e = mesh.sm_highlighted ? 0xaa8844 : (hover ? 0x554422 : 0x0);
        mesh.material.visible = e > 0 ? true : mesh.sm_wasVisible;
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
        const {x, y, z, highlight, allowPanelHover, allowJunctionHover} = this._transitions[index];
        this._controls.setLookAt(x, y, z, 0, 0, 0, true);
        this._setHighlight(highlight);

        for (let i=0; i<this._panels.length; i++) {
            this._panels[i].sm_allowHover = allowPanelHover;
        }
        for (let i=0; i<this._junctions.length; i++) {
            this._junctions[i].sm_allowHover = allowJunctionHover;
        }
    }

    hover(index, enable) {
        const {highlight} = this._transitions[index];
        for (let i=0; i<highlight.length; i++) {
            const h = highlight[i];
            h.sm_hover = enable;
            this._updateEmissive(h);
        }
    }

    _setMouseHover(mesh) {
        if (mesh !== this._mouseHover) {
            const old = this._mouseHover;
            this._mouseHover = mesh;
            if (old) this._updateEmissive(old);
            if (mesh) this._updateEmissive(mesh);
        }
    }

    _hoverObject() {
        if (this._mouse.hasMouse) {
            this._raycaster.setFromCamera(this._mouse.pos, this._camera);
            const intersects = this._raycaster.intersectObjects(this.scene.children);
            for (let i=0; i<intersects.length; i++) {
                const i = intersects[0].object;
                if (i.sm_allowHover) {
                    return i;
                }
            }
        }
        return null;
    }

    render() {
        const delta = this._clock.getDelta();

        if (this.resizeCanvas()) {
            this._camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this._camera.updateProjectionMatrix();
        }
        this._controls.update(delta);

        this._setMouseHover(this._hoverObject());
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

    bestTransition() {
        if (this._mouseHover) {
            const t = this._mouseHover.sm_bestTransitionIndex;
            if (t) {
                this.transition(t);
                return t;
            }

        }
        return null;
    }
}
