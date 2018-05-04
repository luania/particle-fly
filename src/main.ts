import { PVector } from "./script/PVector";
import { ParticleSystem } from "./ParticleSystem";
import { Config } from "./Config";
import { settings } from "./Config";
import * as PIXI from "pixi.js";

export let config = settings;

let atomApi: any = (<any>window).atom;
let body = document.body;

let particleSystem: ParticleSystem;
let conf = new Config();

let app: PIXI.Application;

let loadding = false;

let refreshConfig = () => {
    conf.setData(atomApi.config);
    let whatToDraw = conf.whatToDraw;
    if(app){
        app.stage.alpha = whatToDraw.opacity;
        let filters = [];
        if(conf.whatToDraw.blur != 0){
            let filter = new PIXI.filters.BlurFilter();
            filter.blurX = whatToDraw.blur;
            filter.blurY = whatToDraw.blur;
            filters.push(filter);
        }
        app.stage.filters = filters;
    }
    if (whatToDraw.texture == "- custImage -") {
        loadding = true;
        if (!whatToDraw.image) {
            return;
        }
        let urls = whatToDraw.getImageArr();
        let countToLoad = 0;
        for (let url of urls) {
            if (PIXI.loader.resources[url]) continue;
            PIXI.loader.add(url);
            countToLoad++;
        }
        PIXI.loader.load(() => loadding = false);
        if (countToLoad == 0) {
            loadding = false;
        }
    } else {
        loadding = false;
    }
}

function listenEditor(){
    try{
        let editor = atomApi.workspace.getActiveTextEditor();
        let editorElement = editor.getElement();
        let scrollView = editorElement.querySelector(".scroll-view");
        editor.getBuffer().onDidChangeText((ev:any) => {
            for(let e of ev.changes){
                let position = e.newRange[e.newText?"end":"start"];
                let aPos = editorElement.pixelPositionForScreenPosition(
                    editor.screenPositionForBufferPosition(position)
                );
                let rect = scrollView.getBoundingClientRect();
                let left = aPos.left
                    + rect.left
                    - editorElement.getScrollLeft();
                let top = aPos.top
                    + rect.top
                    - editorElement.getScrollTop()
                    + editor.getLineHeightInPixels();
                particleSystem.originPosition.x = left;
                particleSystem.originPosition.y = top;
                if(conf.alwaysEmit){
                    return;
                }
                if (!loadding) {
                    particleSystem.emit(false);
                }
            }
        });
    }catch(e){
        console.log(e);
    }
}

export function activate(state: any) {
    app = new PIXI.Application({
        width: body.clientWidth,
        height: body.clientHeight,
        antialias: true,
        transparent: true,
        resolution: 1
    });
    app.view.classList.add('pixi-view');
    body.appendChild(app.view);

    body.onmousemove = (ev: MouseEvent) => {
        particleSystem.originPosition.x = ev.clientX;
        particleSystem.originPosition.y = ev.clientY;
        if(conf.alwaysEmit){
            return;
        }
        if (!loadding) {
            particleSystem.emit(false);
        }
    };
    body.onmousewheel = body.onmousemove;
    body.onmousedown = (ev: MouseEvent) => {
        if (!loadding) {
            particleSystem.emit(true);
        }
    };;
    body.onmouseup = body.onmousedown;

    refreshConfig();
    atomApi.config.observe('particle-fly', (newValue: any, previous: any) => refreshConfig());
    listenEditor();
    atomApi.workspace.onDidStopChangingActivePaneItem((textEditor:any) => {
        listenEditor();
    });

    particleSystem = new ParticleSystem(app.stage, new PVector(0, 0), conf);
    app.ticker.add(run);
}

export function run() {
    if(conf.alwaysEmit){
        if (!loadding) {
            particleSystem.emit(true);
        }
    }
    app.renderer.resize(body.clientWidth, body.clientHeight);
    particleSystem.applyForce(conf.wind);
    particleSystem.run();
}

export function deactivate() {
    app.destroy();
}

export function serialize() {
    return {};
}
