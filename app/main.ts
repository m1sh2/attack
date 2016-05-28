import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { Blocks } from './blocks/blocks.cmp';

@Component({
	selector: 'app',
	template: `<img src="./assets/images/logo.svg" height="50">
		<h1>ABlocks</h1>
		<blocks></blocks>`,
	directives: [Blocks]
})
class Main implements OnInit {

	constructor() {
		let m = this;
	}
	
	ngOnInit() {
		let m = this;
	}
}

bootstrap(Main);