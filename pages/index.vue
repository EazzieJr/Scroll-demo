<template>
  <div class="h-screen bg-red-500 w-full" id="view">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">

    <div class=" w-40 min-h-screen bg-blue-500"></div>

    <div class="test w-40 min-h-screen bg-blue-500 ml-20"></div>

    <div class="test w-40 min-h-screen bg-blue-500 ml-40"></div>

    <div class="test w-40 min-h-screen bg-blue-500 ml-60"></div>

  </div>
</template>

<script>
import SmoothScrollbar from 'smooth-scrollbar';
import SoftScrollPlugin from '../js/vendor/smooth-scrollbar/SoftScrollPlugin';
import "intersection-observer"; // if you want support IE11
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

SmoothScrollbar.use(SoftScrollPlugin);
gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'IndexPage',

  methods: {
    initScroller() {
      const view = document.querySelector('#view');

      const scrollbar = SmoothScrollbar.init(view, {
        renderByPixels: true,
        damping: 0.075
      });

      scrollbar.setPosition(0, 0);
      scrollbar.track.xAxis.element.remove();

      // Creating a scroller proxy
      // console.log(document.querySelector('body'));
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            scrollbar.scrollTop = value; // setter
            // console.log(scrollbar.scrollTop)
          }
          return scrollbar.scrollTop;    // getter
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
      });
    }
  },

  mounted() {
    this.initScroller();

    const test = document.querySelectorAll('.test')

    test.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 50%',
          scrub: true
        },

        x: '50vw'
      })
    })
  },
}
</script>
