<template>
    <div class="draw-board" @click="editContent">
        <cus-comp :comps="cusComp.comps" @editComponent="editComponent" />
    </div>
</template>

<script>
    import Vue from 'vue';
    // 注册单位组件
    const requireComponent = require.context('../../../unit-components', false, /\w+\.(vue|js)$/);
    var cmps = {};
    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    });

    export default {
        name: 'DrawBoard',
        props: {
            cusComp: {
                type: Object,
                default: () => {
                    return {
                    };
                }
            },
            preview: {
                type: Boolean,
                default: false
            }
        },
        created () {
            let that = this;
            Vue.component('cus-comp', {
                render (h) {
                    this.eventhandlers = {};
                    var configEventHandlers = that.cusComp.config.data.eventHandlers;
                    that.cusComp.comps.forEach((comp, index) => {
                        Object.keys(configEventHandlers).forEach(funcKey => {
                            if (funcKey.indexOf(comp.config.hash) > -1) {
                                var funcStr = configEventHandlers[funcKey].handler;
                                /* eslint-disable */
                                var resFunc = new Function('return ' + funcStr).call(this);
                                /* eslint-enable */
                                this[configEventHandlers[funcKey].name + comp.config.hash] = resFunc.bind(this._self);
                            }
                        });
                    });
                    return (
                        <div class="cus-comp">
                        {
                            this.comps.map((comp, index) => {
                                var props = {};
                                Object.keys(that.cusComp.config.data.data[comp.name + '-' + comp.config.hash]).forEach(key => {
                                    props[key] = that.cusComp.config.data.data[comp.name + '-' + comp.config.hash][key]
                                });
                                var configEventHandlers = that.cusComp.config.data.eventHandlers;
                                var eventhandlers = {};
                                Object.keys(configEventHandlers).forEach(funcKey => {
                                    funcKey.indexOf(comp.config.hash) > -1 && (eventhandlers[configEventHandlers[funcKey].name] = this[configEventHandlers[funcKey].name + comp.config.hash]);
                                });
                                return (
                                    <div
                                        class={['comp-box', {'preview': that.preview}]}
                                        key={comp.id + comp.x + comp.y + index}
                                        id={comp.config.hash + '-box'}
                                        style={{
                                            position: 'absolute',
                                            top: comp.y + 'px',
                                            left: comp.x + 'px'
                                        }}
                                        draggable={!that.preview}
                                        onDrop={ev => { if (that.preview) { return; } ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragover={ev => { if (that.preview) { return; } ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragstart={ev => { if (that.preview) { return; } this.move(ev, comp, index); }}
                                        onClick={ev => { ev.stopPropagation(); this.editComponent(comp); }}>
                                        {
                                            h(comp.name, {
                                                attrs: {
                                                    id: comp.config.hash
                                                },
                                                props: props,
                                                on: {
                                                    ...eventhandlers
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        </div>
                    )
                },
                props: {
                    comps: {
                        type: Array,
                        default: () => {
                            return [];
                        }
                    }
                },
                data () {
                    return {
                        ...that.cusComp.config.data.data
                    }
                },
                components: {
                    ...cmps
                },
                methods: {
                    move (ev, comp, index) {
                        ev.dataTransfer.setData('DragComp', JSON.stringify({
                            id: comp.id,
                            config: comp.config,
                            index: index
                        }));
                    },
                    editComponent (comp) {
                        if (that.preview) { return; }
                        this.$emit('editComponent', comp);
                    }
                }
            });
        },
        methods: {
            editComponent (comp) {
                this.$emit('editComponent', comp);
            },
            editContent () {
                if (this.preview) { return; }
                this.$emit('editContent');
            }
        }
    }
</script>

<style lang="less">
    .draw-board {
        height: 100%;
        display: flex;
        .cus-comp {
            height: 100%;
            width: 100%;
            position: relative;
        }
        .comp-box {
            &:hover {
                &:before {
                    content: '';
                    position: absolute;
                    top: -7px;
                    left: -7px;
                    width: 100%;
                    height: 100%;
                    padding: 5px;
                    border: 2px solid #ffb100;
                }
            }
        }
        .preview {
            &:hover {
                &:before {
                    display: none;
                }
            }
        }
    }
</style>
