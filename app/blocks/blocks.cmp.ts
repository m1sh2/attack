import { Component, OnInit, Injectable } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
	selector: 'blocks',
	templateUrl: './app/blocks/blocks.cmp.html'
})
@Injectable()
export class Blocks implements OnInit {
	blocks: any;
	timeout: any;
	step: number;
	playStatus: boolean;
	score: number;
	scores: Array<number>;
	play: boolean;
	activeX: number;
	activeXDefault: number;
	
	constructor() {
		let b = this;
		b.blocks = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let block = {
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
	
	ngOnInit() {
		let b = this;
		// b.Start(true);
	}
	
	Start(n) {
		let b = this;
		let next = false;
		let nextX = 0;
		let nextY = 0;
		let newBlock = false;
		b.playStatus = n;
		
		for (let i = 0; i < b.blocks.length; i++) {
			let block = b.blocks[i];
			
			if (n && block.x === b.activeX && block.y === 0) {
				if (block.stop) {
					b.Finish();
				} else {
					block.active = true;
					block.stop = false;
				}
			} else if (block.active) {
				if (block.y + 1 === 10 || b.blocks.filter((_block) => {return _block.stop && _block.y === block.y + 1 && _block.x === b.activeX}).length > 0) {
					block.stop = true;
					block.active = false;
					newBlock = true;
					b.activeX = b.activeXDefault;
					++b.score;
				} else {
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
		}
		
		b.timeout = setTimeout(() => {
			b.Start(newBlock);
		}, b.step);
	}
	
	Pause() {
		let b = this;
		clearTimeout(b.timeout);
	}
	
	Finish() {
		let b = this;
		b.Pause();
		b.play = false;
		for (let i = 0; i < b.blocks.length; i++) {
			let block = b.blocks[i];
			block.active = false;
			block.stop = false;
		}
		
		let _scores = JSON.parse(localStorage.getItem('scores'));
		if (_scores === null) {
			_scores = [];
		} else {
			for (let i = 0; i < _scores.length; i++) {
				_scores[i].active = false;
			}
		}
		
		_scores.push({
			score: b.score,
			active: true
		});
		b.scores = _scores.sort((a, b) => {
			if (a.score > b.score) {
				return -1
			} else if (a.score < b.score) {
				return 1
			} else {
				return 0
			}
		});
		localStorage.setItem('scores', JSON.stringify(b.scores));
		b.score = 0;
	}
	
	Control(act) {
		let b = this;
		let block;
		
		switch(act) {
			case 'play':
				b.play = true;
				let playStatus = true;
				if (b.blocks.filter((block) => {return block.active}).length > 0) {
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
				block = b.blocks.filter((block) => {return block.active});
				if (b.activeX > 0) {
					--b.activeX;
				}
				break;
			
			case 'right':
				block = b.blocks.filter((block) => {return block.active});
				if (b.activeX < 9) {
					++b.activeX;
				}
				break;
		}
	}
}