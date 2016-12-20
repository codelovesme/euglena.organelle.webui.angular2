/// <reference path="../typings/index.d.ts" />


"use strict";

declare var System: any;

import { euglena_template } from "euglena.template";
import { euglena } from "euglena";
import Particle = euglena.being.Particle;
import Exception = euglena.sys.type.Exception;

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';
import constants = euglena_template.being.alive.constants;
let viewModule = require("component/root.bundle");



const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
    private viewModule: any;
    private viewService = {
            saveParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
                this.send(new Particle({ name: constants.impacts.SaveParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            },
            readParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
                this.send(new Particle({ name: constants.impacts.ReadParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            },
            removeParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
                this.send(new Particle({ name: constants.impacts.RemoveParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            }
        };

    constructor() {
        super(OrganelleName);
        viewModule.$scope.cytoplasm.setService(this.viewService);
        this.getAlive();
    }
    protected bindActions(addAction: (particleName: string, action: (particle: Particle, callback: (particle: Particle) => void) => void) => void): void {
        let this_ = this;
        
        addAction(euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
        });
        addAction(euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template.being.alive.constants.impacts.ReadParticle, (particle, callback) => {
            let data = this_.viewModule.$scope.cytoplasm.readParticle(particle.data);
            if (callback) {
                callback(data);
            } else {
                this_.send(data, this_.name);
            }
        });
        addAction(euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.removeParticle(particle.data);
        });
    }
    private getAlive(): void {
        enableProdMode();
        bootstrap(this.viewModule.RootComponent, [provideRouter(this.viewModule.ROUTES), this.viewModule.$scope]);
        this.send(new euglena_template.being.alive.particle.OrganelleHasComeToLife(this.name, this.sapContent.euglenaName), this.name);
    }
}