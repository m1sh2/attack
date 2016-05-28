import { Component, OnInit } from '@angular/core';
import { Blocks } from './blocks/blocks.cmp';

@Component({
	selector: 'app',
	template: '<img src="./assets/images/logo.svg" height="50"><h1>ABlocks</h1><blocks></blocks>',
	directives: [Blocks]
})
export class Router implements OnInit {
	
	constructor() {
		let r = this;
	}
	
	ngOnInit() {
		let r = this;
	}
}