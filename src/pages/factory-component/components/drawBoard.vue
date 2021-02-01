<template>
    <div class="draw-board" @click="editContent">
        <pop ref="morePop">dddd</pop>
        <cus-comp :comps="cusComp.comps" @editComponent="editComponent" @styleEl="styleEl" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import clone from 'clone';
    import pop from '../../../components/pop';
    // 注册单位组件
    const requireComponent = require.context('../../../unit-components', false, /\w+\.(vue|js)$/);
    var cmps = {};
    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    });

    export default {
        name: 'DrawBoard',
        components: {
            pop
        },
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
        computed: {
            _renderCusComp () {
                return clone(this.cusComp);
            }
        },
        created () {
            let that = this;
            Vue.component('cus-comp', {
                render (h) {
                    this.eventhandlers = {};
                    var configEventHandlers = that._renderCusComp.config.data.eventHandlers;
                    that._renderCusComp.comps.forEach((comp, index) => {
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
                    var directives = [];
                    !that.preview && directives.push({
                        name: 'pop',
                        arg: 'morePop',
                        modifiers: { rightClick: true }
                    });
                    return (
                        <div class="cus-comp">
                        {
                            this.comps.map((comp, index) => {
                                var configEventHandlers = that._renderCusComp.config.data.eventHandlers;
                                var eventhandlers = {};
                                Object.keys(configEventHandlers).forEach(funcKey => {
                                    funcKey.indexOf(comp.config.hash) > -1 && (eventhandlers[configEventHandlers[funcKey].name] = this[configEventHandlers[funcKey].name + comp.config.hash]);
                                });
                                var abs = !(String(comp.y + comp.x) === 'NaN');
                                return (
                                    <div
                                        class={['comp-box', {'config-box': abs && !that.preview}, {'stc-box': !abs && !that.preview}]}
                                        key={comp.id + comp.x + comp.y + index}
                                        id={comp.config.hash + '-box'}
                                        style={abs ? {
                                            position: 'absolute',
                                            top: comp.y + 'px',
                                            left: comp.x + 'px'
                                        } : {
                                            display: 'inline-block',
                                            width: '100%'
                                        }}
                                        {...{ directives }}
                                        draggable={abs && !that.preview}
                                        onDrop={ev => { if (that.preview) { return; } ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragover={ev => { if (that.preview) { return; } ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragstart={ev => { if (that.preview) { return; } this.move(ev, comp, index); }}
                                        onClick={ev => { ev.stopPropagation(); this.editComponent(ev, comp); }}>
                                        {
                                            h(comp.name, {
                                                attrs: {
                                                    id: comp.config.hash
                                                },
                                                props: this[comp.config.hash],
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
                        ...that._renderCusComp.config.data.data
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
                            x: comp.x,
                            y: comp.y,
                            index: index
                        }));
                    },
                    editComponent (ev, comp) {
                        if (that.preview) { return; }
                        this.styleEl(ev);
                        this.$emit('editComponent', comp);
                    },
                    styleEl (ev) {
                        this.$emit('styleEl', ev.target);
                    }
                }
            });
        },
        methods: {
            editComponent (comp) {
                this.$emit('editComponent', comp);
            },
            styleEl (el) {
                this.$emit('styleEl', el);
            },
            editContent (ev) {
                if (this.preview) { return; }
                this.$emit('styleEl', ev.target);
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
        .config-box {
            &:hover {
                &:before {
                    content: '';
                    position: absolute;
                    top: -7px;
                    left: -7px;
                    width: 100%;
                    height: 100%;
                    padding: 5px;
                    border: 2px solid #333;
                    border-radius: 3px;
                    z-index: 10;
                }
            }
        }
        .stc-box {
            &:hover {
                box-sizing: border-box;
                padding: 5px;
                border: 2px solid #333;
                border-radius: 3px;
                z-index: 10;
            }
        }
    }
</style>
