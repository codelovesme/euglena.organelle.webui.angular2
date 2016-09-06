/// <reference path="../typings/index.d.ts" />
"use strict";
const euglena_template_1 = require("euglena.template");
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const OrganelleName = euglena_template_1.euglena_template.being.alive.constants.organelles.WebUIOrganelle;
let this_ = null;
class Organelle extends euglena_template_1.euglena_template.being.alive.organelle.WebUIOrganelle {
    constructor() {
        super(OrganelleName);
        this.viewModule = null;
        this_ = this;
        this.viewModule = require('component/app.js');
    }
    bindActions(addAction) {
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.SaveParticle, (particle) => {
            this.viewModule.Scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.ReadParticle, (particle) => {
            let data = this.viewModule.Scope.cytoplasm.readParticle(particle.data);
            this_.send(data);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.impacts.RemoveParticle, (particle) => {
            this.viewModule.Scope.cytoplasm.removeParticle(particle.data);
        });
    }
    getAlive() {
        core_1.enableProdMode();
        platform_browser_dynamic_1.bootstrap(this.viewModule.AppComponent, [router_1.provideRouter(this.viewModule.ROUTES), this.viewModule.Scope]);
    }
}
exports.Organelle = Organelle;
//# sourceMappingURL=index.js.map