<template>
    <div :class="['G_pop', {'default-pop-show': !previewMode.preview}]" v-show="!previewMode.preview || show" ref="selfPop" @mouseenter.stop="hover = true" @mouseleave.stop="hover = false">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    Vue.directive('gPop', {
        bind: function (el, binding, vnode) {
            // 就近取pop
            let target = window.pops[binding.arg];
            if (!target) {
                return;
            }
            binding.modifiers.rightClick && el.addEventListener('contextmenu', target.rightClick);
            if (binding.modifiers.hover) {
                el.addEventListener('mouseenter', function (e) { target.handleHover(e, true, binding.modifiers.delay) });
                el.addEventListener('mouseleave', function (e) { target.handleHover(e, false, binding.modifiers.delay) });
            }
        }
    });
    export default {
        name: 'G_POP',
        inject: ['previewMode'],
        slot: [{
            name: 'default',
            params: ''
        }],
        cusDirectives: [{
            name: 'gPop'
        }],
        props: {
            clazz: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: 'pop'
            }
        },
        data () {
            return {
                show: false,
                hover: false,
                waitToClose: false
            }
        },
        watch: {
            hover: {
                handler (val) {
                    if (this.waitToClose && !val) {
                        this.waitToClose = false;
                        this.closePop();
                    }
                }
            },
            name: {
                handler (nval, oval) {
                    let name = nval;
                    if (!window.pops) {
                        window['pops'] = {}
                    }
                    name && (window.pops[name] = this);
                    oval && (window.pops[oval] = null);
                }
            }
        },
        created () {
            // window上存一份用来跨级取pop
            let name = this.name;
            if (!window.pops) {
                window['pops'] = {}
            }
            name && (window.pops[name] = this);
        },
        mounted () {
            let that = this;
            document.addEventListener('click', (e) => {
                if (!that.$el.contains(e.target)) that.closePop();
            });
            // this.$nextTick(() => {
            //     const body = document.querySelector('body');
            //     if (body.append) {
            //         body.append(this.$el);
            //     } else {
            //         body.appendChild(this.$el);
            //     }
            // });
        },
        methods: {
            rightClick (ev) {
                if (ev.button === 2) {
                    this.show = false;
                    this.$nextTick(() => {
                        this.$refs.selfPop.style.left = 'auto';
                        this.$refs.selfPop.style.right = 'auto';
                        this.$refs.selfPop.style.top = 'auto';
                        this.$refs.selfPop.style.bottom = 'auto';
                        const popWidth = Number(getComputedStyle(this.$refs.selfPop).width.replace('px', ''));
                        const popHeight = Number(getComputedStyle(this.$refs.selfPop).height.replace('px', ''));
                        const startLeft = ev.clientX;
                        const startTop = ev.clientY;
                        const windowWidth = document.documentElement.clientWidth;
                        const windowHeight = document.documentElement.clientHeight;
                        const rightOver = popWidth + startLeft > windowWidth;
                        const bottomOver = popHeight + startTop > windowHeight;
                        if (rightOver) {
                            this.$refs.selfPop.style.right = '0px';
                        } else {
                            this.$refs.selfPop.style.left = `${ev.clientX}px`;
                        }
                        if (bottomOver) {
                            this.$refs.selfPop.style.bottom = '0px';
                        } else {
                            this.$refs.selfPop.style.top = `${ev.clientY}px`;
                        }
                        this.show = true;
                    });
                }
                ev.preventDefault();
                return false;
            },
            handleHover (ev, mos, delay) {
                if (mos) {
                    this.show = false;
                    this.$nextTick(() => {
                        var el = this.$refs.selfPop;
                        el.style.left = 'auto';
                        el.style.right = 'auto';
                        el.style.top = 'auto';
                        el.style.bottom = 'auto';
                        const box = ev.target.getBoundingClientRect();
                        const popWidth = Number(getComputedStyle(el).width.replace('px', ''));
                        const popHeight = Number(getComputedStyle(el).height.replace('px', ''));
                        const startLeft = box.x + box.width / 2;
                        const startTop = box.y + box.height;
                        const windowWidth = document.documentElement.clientWidth;
                        const windowHeight = document.documentElement.clientHeight;
                        const rightOver = popWidth + startLeft > windowWidth;
                        const bottomOver = popHeight + startTop > windowHeight;
                        if (startLeft + startTop === 0) {
                            return;
                        }
                        if (rightOver) {
                            el.style.right = '0px';
                        } else {
                            el.style.left = `${startLeft}px`;
                        }
                        if (bottomOver) {
                            el.style.bottom = '0px';
                        } else {
                            el.style.top = `${startTop}px`;
                        }
                        this.show = true;
                    });
                } else {
                    if (delay) {
                        setTimeout(() => {
                            if (this.hover) {
                                this.waitToClose = true;
                            } else {
                                this.closePop();
                            }
                        }, 200);
                    } else {
                        this.closePop();
                    }
                }
            },
            closePop () {
                this.show = false;
            }
        },
        beforeDestroy () {
            this.$el.remove();
        }
    }
</script>

<style lang="less">
    .G_pop {
        z-index: 100000;
        position: fixed;
        background: #FFF;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    }
    .default-pop-show {
        position: static;
    }
</style>
