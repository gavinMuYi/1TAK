<template>
    <div :class="['pop', clazz]" v-show="show" ref="selfPop" @mouseenter="hover = true" @mouseleave="hover = false">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    Vue.directive('pop', {
        bind: function (el, binding, vnode) {
            // 就近取pop
            let target = vnode.context.$parent.$refs[binding.arg] || window.pops[binding.arg];
            if (!target) {
                return;
            }
            binding.modifiers.rightClick && el.addEventListener('contextmenu', target.rightClick);
            if (binding.modifiers.hover) {
                el.addEventListener('mouseover', function (e) { target.handleHover(e, true, binding.modifiers.delay) });
                el.addEventListener('mouseout', function (e) { target.handleHover(e, false, binding.modifiers.delay) });
            }
        }
    });
    export default {
        name: 'pop',
        props: {
            clazz: {
                type: String,
                default: ''
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
            }
        },
        created () {
            // window上存一份用来跨级取pop
            let name = this.$vnode.data.ref;
            if (!window.pops) {
                window['pops'] = {}
            }
            name && (window.pops[name] = this);
        },
        mounted () {
            let that = this;
            window.onclick = function () {
                that.closePop();
            };
            this.$nextTick(() => {
                const body = document.querySelector('body');
                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }
            });
        },
        methods: {
            rightClick (ev) {
                if (ev.button === 2) {
                    // let box = ev.target.getBoundingClientRect();
                    // this.$refs.selfPop.style.top = `${box.y + box.height}px`;
                    // this.$refs.selfPop.style.left = `${box.x + box.width}px`;
                    this.$refs.selfPop.style.top = `${ev.clientY}px`;
                    this.$refs.selfPop.style.left = `${ev.clientX}px`;
                    this.show = true;
                }
                ev.preventDefault();
                return false;
            },
            handleHover (ev, mos, delay) {
                if (mos) {
                    this.$refs.selfPop.style.top = `${ev.clientY}px`;
                    this.$refs.selfPop.style.left = `${ev.clientX}px`;
                    this.show = true;
                } else {
                    if (delay) {
                        setTimeout(() => {
                            if (this.hover) {
                                this.waitToClose = true;
                            } else {
                                this.closePop();
                            }
                        }, 1000);
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
    .pop {
        z-index: 100000;
        position: fixed;
        background: #FFF;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    }
</style>
