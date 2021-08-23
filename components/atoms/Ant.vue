<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 270 140"
        version="1.1"
        id="svg5"
        inkscape:version="1.1 (c4e8f9ed74, 2021-05-24)"
        sodipodi:docname="ant.svg"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:svg="http://www.w3.org/2000/svg"
    >
        <!-- Right members -->
        <path
            style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 88,88 84,74 58,94"
            ref="r-paw-1" 
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 98,91 V 68 l 23,45"
            ref="r-paw-2"
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 113,90 1,-18 40,47"
            ref="r-paw-3"    
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:0.8;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 55,90 C 45,70 58,31 0,57"
            class="r-antenna"
            ref="r-antenna"
        />
        <!-- / Right members -->

        <!-- Body -->
        <ellipse
            style="fill:#020000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.3"
            class="head"
            ref="head"
            cx="45"
            cy="100"
            rx="31"
            ry="16" />
        <ellipse
            style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.3"
            ref="thorax"
            cx="101"
            cy="100"
            rx="28"
            ry="14" />
        <ellipse
            style="fill:#020000;fill-opacity:1;fill-rule:evenodd;stroke-width:0.3"
            ref="abdomen"
            cx="194"
            cy="100"
            rx="70"
            ry="17" />
        <!-- / Body -->

        <!-- Left members -->
        <path
            style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 89,110 73,77 35,130"
            ref="l-paw-1"
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 98,110 4,-41 13,90"
            ref="l-paw-2"
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 113,110 15,-38 41,55"
            ref="l-paw-3"
        />
        <path
            style="fill:none;stroke:#000000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="M 54,90 C 81,33 79,7 10,32"
            class="l-antenna"
            ref="l-antenna"
        />
        <!-- / Left members -->
    </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        /**
         * Ant height.
         */
        height: {
            type: [Number, String],
            default: null,
        },
        /**
         * Ant width.
         */
        width: {
            type: [Number, String],
            default: null,
        },
    },
    methods: {
        /**
         * Makes ant up head.
         * 
         * @param deg Degree the ant move its head.
         * @param spd Speed the ant move its head.
         */
        headUp(deg = 25, spd = 2000) {
            const head = this.$refs.head;
            const rAntenna = this.$refs['r-antenna'];
            const lAntenna = this.$refs['l-antenna'];

            head.style.transition = `all ${spd}ms`;
            rAntenna.style.transition = ` all ${spd}ms`;
            lAntenna.style.transition = ` all ${spd}ms`;

            head.style.transform = `rotate(${deg}deg)`;
            rAntenna.style.transform = `rotate(${deg}deg)`;
            lAntenna.style.transform = `rotate(${deg}deg)`;
        },

        /**
         * Makes ant shake head.
         * 
         * @param deg Degree the ant move its head.
         * @param spd Speed the ant move its head.
         * @param wait The time the ant wait to down its head.
         */
        headShake(deg = 25, spd = 2000, wait = 3000) {
            this.headUp(deg, spd / 2);

            setTimeout(() => {
                this.headUp(0, spd / 2);
            }, spd / 2 - spd / 10 + wait);
        }
    },
});
</script>

<style scoped>
.head, .r-antenna, .l-antenna {
    transform-origin: 78px 98px;
}
</style>