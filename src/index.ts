
/// <reference path="../typings/node/node.d.ts" />

"use strict";
import {euglena_template} from "euglena.template";
import {euglena} from "euglena";
import Particle = euglena.being.Particle;
import Exception = euglena.sys.type.Exception;

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';


const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

let this_: Organelle = null;
export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
    constructor() {
        super(OrganelleName);
        this_ = this;
    }
    protected bindActions(addAction: (particleName: string, action: (particle: Particle) => void) => void): void {
        addAction(euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
    }
    private getAlive(): void {
        let app = require('main');
        bootstrap(app.AppComponent);
    }
}