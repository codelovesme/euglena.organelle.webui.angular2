


"use strict";

declare var System: any;
declare var require: any;
declare var $scope: any;

import { euglena_template } from "euglena.template";
import { euglena } from "euglena";
import Particle = euglena.being.Particle;
import ParticleV2 = euglena.being.ParticleV2;
import MetaV2 = euglena.being.MetaV2;
import Exception = euglena.sys.type.Exception;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import constants = euglena_template.being.alive.constants;
let lib = require("app.module");
let AppModule = lib.AppModule;

const OrganelleName = euglena_template.being.alive.constants.organelles.WebUIOrganelle;

export class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent: euglena_template.being.alive.particle.WebUIOrganelleSapContent;
    private viewService = {
        saveParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
            this.send(new ParticleV2<Particle>(new MetaV2(constants.particles.SaveParticle, this.sapContent.euglenaName), particle), this.name, callback);
        },
        readParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
            this.send(new ParticleV2<Particle>(new MetaV2(constants.particles.ReadParticle, this.sapContent.euglenaName), particle), this.name, callback);
        },
        removeParticle: (particle: Particle, callback?: (particle: Particle) => void) => {
            this.send(new ParticleV2<Particle>(new MetaV2(constants.particles.RemoveParticle, this.sapContent.euglenaName), particle), this.name, callback);
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
        addAction(euglena_template.being.alive.constants.particles.SaveParticle, (particle) => {
            $scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template.being.alive.constants.particles.ReadParticle, (particle, callback) => {
            let data = $scope.cytoplasm.readParticle(particle.data);
            if (callback) {
                callback(data);
            } else {
                this_.send(data, this_.name);
            }
        });
        addAction(euglena_template.being.alive.constants.particles.RemoveParticle, (particle) => {
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