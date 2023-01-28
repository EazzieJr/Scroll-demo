import JellyEffect from './jelly'
import SmoothScrollbar from 'smooth-scrollbar';
import SoftScrollPlugin from './vendor/smooth-scrollbar/SoftScrollPlugin';
import "intersection-observer"; // if you want support IE11
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

SmoothScrollbar.use(SoftScrollPlugin);
gsap.registerPlugin(ScrollTrigger)

export default class Scroller {

	constructor(view) {
		this.view = document.querySelector(view);

		 this.scrollbar = SmoothScrollbar.init(this.view, {
			renderByPixels: false,
			damping: 0.075
		});


		this.scrollbar.setPosition(0, 0);
		this.scrollbar.track.xAxis.element.remove();

		// Init Jelly and provide smooth this.scrollbar offset
		const jelly = new JellyEffect({
			scrollPos: () => this.scrollbar.offset.y
		});

		// Optional demo: pause when scroll via this.scrollbar track
		this.scrollbar.track.yAxis.element.addEventListener('mousedown', () => {
			jelly.pause(true);
		});

		document.documentElement.addEventListener('mouseup', () => {
			jelly.pause(false);
		}, true);


		// Creating a scroller proxy
		// console.log(document.querySelector('body'));
		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				if (arguments.length) {
					this.scrollbar.scrollTop = value; // setter
					console.log(this.scrollbar.scrollTop)
				}
				return this.scrollbar.scrollTop;    // getter
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			}
		});

	}
}