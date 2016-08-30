/// <reference path="../typings/node/node.d.ts" />
"use strict";
const euglena_template_1 = require("euglena.template");
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const core_1 = require('@angular/core');
const OrganelleName = euglena_template_1.euglena_template.being.alive.constants.organelles.WebUIOrganelle;
let this_ = null;
class Organelle extends euglena_template_1.euglena_template.being.alive.organelle.WebUIOrganelle {
    constructor() {
        super(OrganelleName);
        this_ = this;
    }
    bindActions(addAction) {
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.WebUIOrganelleSap, (particle) => {
            this_.sapContent = particle.data;
            this_.getAlive();
        });
    }
    getAlive() {
        let app = require('app.js');
        core_1.enableProdMode();
        platform_browser_dynamic_1.bootstrap(app.AppComponent);
    }
}
exports.Organelle = Organelle;
//# sourceMappingURL=index.js.map