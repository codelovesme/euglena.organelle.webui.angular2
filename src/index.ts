


"use strict";

declare var System: any;
declare var require: any;
declare var $scope: any;

import { euglena_template } from "euglena.template";
import { euglena } from "euglena";
import Particle = euglena.being.Particle;
import Exception = euglena.sys.type.Exception;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import constants = euglena_template.being.alive.constants;
let lib = require("app.module");
let AppModule = lib.AppModule;

const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    public sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
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
    }
    protected bindActions(addAction: (particleName: string, action: (particle: Particle, callback: (particle: Particle) => void) => void) => void): void {
        let this_ = this;

        addAction(euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            $scope.cytoplasm.setService(this.viewService);
            this.getAlive();
        });
        addAction(euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            $scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template.being.alive.constants.impacts.ReadParticle, (particle, callback) => {
            let data = $scope.cytoplasm.readParticle(particle.data);
            if (callback) {
                callback(data);
            } else {
                this_.send(data, this_.name);
            }
        });
        addAction(euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            $scope.cytoplasm.removeParticle(particle.data);
        });
    }
    private getAlive(): void {
        enableProdMode();
        platformBrowserDynamic().bootstrapModule(AppModule);
        //bootstrap(rootComponent.RootComponent, [provideRouter(rootComponent.ROUTES), rootComponent.$scope]);
        this.send(new euglena_template.being.alive.particle.OrganelleHasComeToLife(this.name, this.sapContent.euglenaName), this.name);
    }
}