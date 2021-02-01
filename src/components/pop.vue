<template>
    <div class="pop" v-show="show" ref="selfPop">
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
        }
    });
    export default {
        name: 'pop',
        data () {
            return {
                show: false
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
        position: fixed;
        background: #FFF;
        border: 1px solid #ededed;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    }
</style>
