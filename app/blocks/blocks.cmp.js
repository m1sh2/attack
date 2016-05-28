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
var Blocks = (function () {
    function Blocks() {
        var b = this;
        b.blocks = [];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var block = {
                    stop: false,
                    active: false,
                    x: j,
                    y: i
                };
                b.blocks.push(block);
            }
        }
        b.step = 125;
        b.score = 0;
        b.scores = [];
        b.play = false;
        b.activeXDefault = 4;
        b.activeX = b.activeXDefault;
    }
    Blocks.prototype.ngOnInit = function () {
        var b = this;
        // b.Start(true);
    };
    Blocks.prototype.Start = function (n) {
        var b = this;
        var next = false;
        var nextX = 0;
        var nextY = 0;
        var newBlock = false;
        b.playStatus = n;
        var _loop_1 = function(i) {
            var block = b.blocks[i];
            if (n && block.x === b.activeX && block.y === 0) {
                if (block.stop) {
                    b.Finish();
                }
                else {
                    block.active = true;
                    block.stop = false;
                }
            }
            else if (block.active) {
                if (block.y + 1 === 10 || b.blocks.filter(function (_block) { return _block.stop && _block.y === block.y + 1 && _block.x === b.activeX; }).length > 0) {
                    block.stop = true;
                    block.active = false;
                    newBlock = true;
                    b.activeX = b.activeXDefault;
                    ++b.score;
                }
                else {
                    block.active = false;
                    next = true;
                    nextX = b.activeX;
                    nextY = block.y + 1;
                }
            }
            if (next && block.x === nextX && block.y === nextY) {
                block.active = true;
                next = false;
            }
        };
        for (var i = 0; i < b.blocks.length; i++) {
            _loop_1(i);
        }
        b.timeout = setTimeout(function () {
            b.Start(newBlock);
        }, b.step);
    };
    Blocks.prototype.Pause = function () {
        var b = this;
        clearTimeout(b.timeout);
    };
    Blocks.prototype.Finish = function () {
        var b = this;
        b.Pause();
        b.play = false;
        for (var i = 0; i < b.blocks.length; i++) {
            var block = b.blocks[i];
            block.active = false;
            block.stop = false;
        }
        var _scores = JSON.parse(localStorage.getItem('scores'));
        if (_scores === null) {
            _scores = [];
        }
        else {
            for (var i = 0; i < _scores.length; i++) {
                _scores[i].active = false;
            }
        }
        _scores.push({
            score: b.score,
            active: true
        });
        b.scores = _scores.sort(function (a, b) {
            if (a.score > b.score) {
                return -1;
            }
            else if (a.score < b.score) {
                return 1;
            }
            else {
                return 0;
            }
        });
        localStorage.setItem('scores', JSON.stringify(b.scores));
        b.score = 0;
    };
    Blocks.prototype.Control = function (act) {
        var b = this;
        var block;
        switch (act) {
            case 'play':
                b.play = true;
                var playStatus = true;
                if (b.blocks.filter(function (block) { return block.active; }).length > 0) {
                    playStatus = false;
                }
                // console.info(playStatus);
                b.Start(playStatus);
                break;
            case 'pause':
                b.play = false;
                b.Pause();
                break;
            case 'left':
                block = b.blocks.filter(function (block) { return block.active; });
                if (b.activeX > 0) {
                    --b.activeX;
                }
                break;
            case 'right':
                block = b.blocks.filter(function (block) { return block.active; });
                if (b.activeX < 9) {
                    ++b.activeX;
                }
                break;
        }
    };
    Blocks = __decorate([
        core_1.Component({
            selector: 'blocks',
            templateUrl: './app/blocks/blocks.cmp.html'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Blocks);
    return Blocks;
}());
exports.Blocks = Blocks;
//# sourceMappingURL=blocks.cmp.js.map