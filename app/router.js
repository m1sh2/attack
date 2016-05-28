"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var blocks_cmp_1 = require('./blocks/blocks.cmp');
var Router = (function () {
    function Router() {
        var r = this;
    }
    Router.prototype.ngOnInit = function () {
        var r = this;
    };
    Router = __decorate([
        core_1.Component({
            selector: 'app',
            template: '<img src="./assets/images/logo.svg" height="50"><h1>ABlocks</h1><blocks></blocks>',
            directives: [blocks_cmp_1.Blocks]
        }), 
        __metadata('design:paramtypes', [])
    ], Router);
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map