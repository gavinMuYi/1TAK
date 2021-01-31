<template>
    <div class="pop" v-show="show" ref="selfPop">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default {
        name: 'pop',
        data () {
            return {
                show: false
            }
        },
        created () {
            let name = this.$vnode.data.ref;
            if (!window.pops) {
                window['pops'] = {}
            }
            name && (window.pops[name] = this);
            Vue.directive('pop', {
                bind: function (el, binding) {
                    let target = window.pops[binding.arg];
                    if (!target) {
                        return;
                    }
                    binding.modifiers.rightClick && el.addEventListener('contextmenu', window.pops[binding.arg].rightClick);
                }
            });
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
    }
</style>
