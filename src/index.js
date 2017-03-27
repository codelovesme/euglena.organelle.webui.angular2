"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var euglena_template_1 = require("euglena.template");
var euglena_1 = require("euglena");
var ParticleV2 = euglena_1.euglena.being.ParticleV2;
var MetaV2 = euglena_1.euglena.being.MetaV2;
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var core_1 = require("@angular/core");
var constants = euglena_template_1.euglena_template.being.alive.constants;
var lib = require("app.module");
var AppModule = lib.AppModule;
var OrganelleName = euglena_template_1.euglena_template.being.alive.constants.organelles.WebUIOrganelle;
var Organelle = (function (_super) {
    __extends(Organelle, _super);
    function Organelle() {
        var _this = _super.call(this, OrganelleName) || this;
        _this.viewService = {
            saveParticle: function (particle, callback) {
                _this.send(new ParticleV2(new MetaV2(constants.particles.SaveParticle, _this.sapContent.euglenaName), particle), _this.name, callback);
            },
            readParticle: function (particle, callback) {
                _this.send(new ParticleV2(new MetaV2(constants.particles.ReadParticle, _this.sapContent.euglenaName), particle), _this.name, callback);
            },
            removeParticle: function (particle, callback) {
                _this.send(new ParticleV2(new MetaV2(constants.particles.RemoveParticle, _this.sapContent.euglenaName), particle), _this.name, callback);
            }
        };
        return _this;
    }
    Organelle.prototype.bindActions = function (addAction) {
        var _this = this;
        var this_ = this;
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.WebUIOrganelleSap, function (particle) {
            this_.sapContent = particle.data;
            $scope.cytoplasm.setService(_this.viewService);
            _this.getAlive();
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.SaveParticle, function (particle) {
            $scope.cytoplasm.saveParticle(particle.data);
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.ReadParticle, function (particle, callback) {
            var data = $scope.cytoplasm.readParticle(particle.data);
            if (callback) {
                callback(data);
            }
            else {
                this_.send(data, this_.name);
            }
        });
        addAction(euglena_template_1.euglena_template.being.alive.constants.particles.RemoveParticle, function (particle) {
            $scope.cytoplasm.removeParticle(particle.data);
        });
    };
    Organelle.prototype.getAlive = function () {
        core_1.enableProdMode();
        platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        //bootstrap(rootComponent.RootComponent, [provideRouter(rootComponent.ROUTES), rootComponent.$scope]);
        this.send(new euglena_template_1.euglena_template.being.alive.particle.OrganelleHasComeToLife(this.name, this.sapContent.euglenaName), this.name);
    };
    return Organelle;
}(euglena_template_1.euglena_template.being.alive.organelle.WebUIOrganelle));
exports.Organelle = Organelle;
//# sourceMappingURL=index.js.map