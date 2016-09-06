/// <reference path="../typings/index.d.ts" />


"use strict";
import {euglena_template} from "euglena.template";
import {euglena} from "euglena";
import Particle = euglena.being.Particle;
import Exception = euglena.sys.type.Exception;

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter,RouterConfig } from '@angular/router';

const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

let this_: Organelle = null;
export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
    private viewModule:any = null;
    constructor() {
        super(OrganelleName);
        this_ = this;
        this.viewModule = require('component/app.js');
    }
    protected bindActions(addAction: (particleName: string, action: (particle: Particle) => void) => void): void {
        addAction(euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
        addAction(euglena_template.being.alive.constants.impacts.SaveParticle,(particle)=>{
            this.viewModule.Scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template.being.alive.constants.impacts.ReadParticle,(particle)=>{
            let data = this.viewModule.Scope.cytoplasm.readParticle(particle.data);
            this_.send(data);
        });
        addAction(euglena_template.being.alive.constants.impacts.RemoveParticle,(particle)=>{
            this.viewModule.Scope.cytoplasm.removeParticle(particle.data);
        });
    }
    private getAlive(): void {
        
        enableProdMode();
        bootstrap(this.viewModule.AppComponent, [provideRouter(this.viewModule.ROUTES),this.viewModule.Scope]);
    }
}