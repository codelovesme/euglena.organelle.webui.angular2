/// <reference path="../typings/index.d.ts" />
import { euglena_template } from "euglena.template";
import { euglena } from "euglena";
import Particle = euglena.being.Particle;
export declare class Organelle extends euglena_template.being.alive.organelle.WebUIOrganelle {
    private sapContent;
    private viewModule;
    constructor();
    protected bindActions(addAction: (particleName: string, action: (particle: Particle) => void) => void): void;
    private getAlive();
}
