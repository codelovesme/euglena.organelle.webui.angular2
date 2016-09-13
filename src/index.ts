/// <reference path="../typings/index.d.ts" />


"use strict";
import {euglena_template} from "euglena.template";
import {euglena} from "euglena";
import Particle = euglena.being.Particle;
import Exception = euglena.sys.type.Exception;

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';
import constants = euglena_template.being.alive.constants;

const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

let this_: Organelle = null;
export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
    private viewModule: any = null;
    private viewService: any = {
        saveParticle: (particle: Particle) => {
            this_.send(new Particle({ name: constants.impacts.SaveParticle }, particle), this_.name);
        },
        readParticle: (particle: Particle) => {
            this_.send(new Particle({ name: constants.impacts.ReadParticle }, particle), this_.name);
        },
        removeParticle: (particle: Particle) => {
            this_.send(new Particle({ name: constants.impacts.RemoveParticle }, particle), this_.name);
        }
    };
    constructor() {
        super(OrganelleName);
        this_ = this;
        
    }
    protected bindActions(addAction: (particleName: string, action: (particle: Particle) => void) => void): void {
        this.viewModule = require('component/root.js');
        addAction(euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
        addAction(euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            this.viewModule.$scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template.being.alive.constants.impacts.ReadParticle, (particle) => {
            let data = this.viewModule.$scope.cytoplasm.readParticle(particle.data);
            this_.send(data, this_.name);
        });
        addAction(euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            this.viewModule.$scope.cytoplasm.removeParticle(particle.data);
        });
        this.viewModule.$scope.cytoplasm.setService(this_.viewService);
    }
    private getAlive(): void {
        enableProdMode();
        bootstrap(this.viewModule.RootComponent, [provideRouter(this.viewModule.ROUTES), this.viewModule.$scope]);
    }
}