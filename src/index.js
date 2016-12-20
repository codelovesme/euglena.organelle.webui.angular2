/// <reference path="../typings/index.d.ts" />
"use strict";
const euglena_template_1 = require("euglena.template");
const euglena_1 = require("euglena");
var Particle = euglena_1.euglena.being.Particle;
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
var constants = euglena_template_1.euglena_template.being.alive.constants;
let viewModule = require("component/root.bundle");
const OrganelleName = euglena_template_1.euglena_template.being.alive.constants.organelles.WebUIOrganelle;
class Organelle extends euglena_template_1.euglena_template.being.alive.organelle.WebUIOrganelle {
    constructor() {
        super(OrganelleName);
        this.viewService = {
            saveParticle: (particle, callback) => {
                this.send(new Particle({ name: constants.impacts.SaveParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            },
            readParticle: (particle, callback) => {
                this.send(new Particle({ name: constants.impacts.ReadParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            },
            removeParticle: (particle, callback) => {
                this.send(new Particle({ name: constants.impacts.RemoveParticle, of: this.sapContent.euglenaName }, particle), this.name, callback);
            }
        };
        viewModule.$scope.cytoplasm.setService(this.viewService);
        this.getAlive();
    }
    bindActions(addAction) {
        let this_ = this;
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.ReadParticle, (particle, callback) => {
            let data = this_.viewModule.$scope.cytoplasm.readParticle(particle.data);
            if (callback) {
                callback(data);
            }
            else {
                this_.send(data, this_.name);
            }
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.removeParticle(particle.data);
        });
    }
    getAlive() {
        core_1.enableProdMode();
        platform_browser_dynamic_1.bootstrap(this.viewModule.RootComponent, [router_1.provideRouter(this.viewModule.ROUTES), this.viewModule.$scope]);
        this.send(new euglena_template_1.euglena_template.being.alive.particle.OrganelleHasComeToLife(this.name, this.sapContent.euglenaName), this.name);
    }
}
exports.Organelle = Organelle;
//# sourceMappingURL=index.js.map