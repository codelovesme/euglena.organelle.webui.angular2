/// <reference path="../typings/index.d.ts" />
"use strict";
const euglena_template_1 = require("euglena.template");
const euglena_1 = require("euglena");
var Particle = euglena_1.euglena.being.Particle;
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
var constants = euglena_template_1.euglena_template.being.alive.constants;
const OrganelleName = euglena_template_1.euglena_template.being.alive.constants.organelles.WebUIOrganelle;
class Organelle extends euglena_template_1.euglena_template.being.alive.organelle.WebUIOrganelle {
    constructor() {
        super(OrganelleName);
    }
    bindActions(addAction) {
        let this_ = this;
        this_.viewService = {
            saveParticle: (particle) => {
                this_.send(new Particle({ name: constants.impacts.SaveParticle }, particle), this_.name);
            },
            readParticle: (particle) => {
                this_.send(new Particle({ name: constants.impacts.ReadParticle }, particle), this_.name);
            },
            removeParticle: (particle) => {
                this_.send(new Particle({ name: constants.impacts.RemoveParticle }, particle), this_.name);
            }
        };
        this_.viewModule = require('component/root.js');
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.ReadParticle, (particle) => {
            let data = this_.viewModule.$scope.cytoplasm.readParticle(particle.data);
            this_.send(data, this_.name);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            this_.viewModule.$scope.cytoplasm.removeParticle(particle.data);
        });
        this_.viewModule.$scope.cytoplasm.setService(this_.viewService);
    }
    getAlive() {
        core_1.enableProdMode();
        platform_browser_dynamic_1.bootstrap(this.viewModule.RootComponent, [router_1.provideRouter(this.viewModule.ROUTES), this.viewModule.$scope]);
    }
}
exports.Organelle = Organelle;
//# sourceMappingURL=index.js.map