<template>
    <div class="draw-board" @click="editContent">
        <pop ref="morePop" clazz="right-action-pop">
            <template>
                <div
                    class="sys-pop-action-btn"
                    v-for="item in popOptions"
                    :key="item.key"
                    @click="action(item.key)">
                    {{ item.label }}
                </div>
            </template>
        </pop>
        <cus-comp :comps="cusComp.comps" @editComponent="editComponent" @rightClick="handleRightClick" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import clone from 'clone';
    import pop from '../../../components/pop';
    import { addCss } from '../../../utils/common.js';
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
        data () {
            return {
                currentRightEl: null,
                popOptions: [{
                    label: '复制',
                    key: 'copy'
                }, {
                    label: '删除',
                    key: 'delete'
                }]
            }
        },
        computed: {
            _renderCusComp () {
                return clone(this.cusComp);
            }
        },
        created () {
            let that = this;
            var oldStyle = document.getElementById('compStyle');
            oldStyle && oldStyle.remove();
            let styleStr = '';
            this._renderCusComp.comps.forEach(comp => {
                comp.config.style && Object.keys(comp.config.style).forEach(key => {
                    let cssStr = '';
                    Object.keys(comp.config.style[key]).forEach(css => {
                        cssStr += `${css}: ${comp.config.style[key][css]};`;
                    })
                    styleStr += `${key} {${cssStr}}`
                });
            });
            addCss(styleStr, 'compStyle');
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
                        <div class="cus-comp" id={that.cusComp.config.hash}>
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
                                        class={['flag-sup-$-comp-box', 'comp-box', {'config-box': abs && !that.preview}, {'stc-box': !abs && !that.preview}]}
                                        key={comp.id + comp.x + comp.y + index}
                                        id={comp.config.hash + '-box'}
                                        style={abs ? {
                                            position: 'absolute',
                                            top: comp.y + 'px',
                                            left: comp.x + 'px'
                                        } : {
                                            display: 'inline-block'
                                        }}
                                        {...{ directives }}
                                        draggable={!that.preview}
                                        onContextmenu={ev => { if (ev.button === 2) { this.$emit('rightClick', comp) } }}
                                        onDrop={ev => { if (that.preview) { return; } if (!abs) { this.moveInline(ev); } ev.stopPropagation(); ev.preventDefault(); }}
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
                                                },
                                                style: {
                                                    display: 'inline-block'
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
                        if (comp.x === undefined && comp.y === undefined) {
                            ev.dataTransfer.setData('lineComp', JSON.stringify({
                                id: comp.id,
                                config: comp.config,
                                x: comp.x,
                                y: comp.y,
                                index: index
                            }));
                        } else {
                            ev.dataTransfer.setData('lineComp', JSON.stringify({
                                id: ''
                            }));
                        }
                        ev.dataTransfer.setData('DragComp', JSON.stringify({
                            id: comp.id,
                            config: comp.config,
                            x: comp.x,
                            y: comp.y,
                            index: index
                        }));
                    },
                    moveInline (ev) {
                        ev.preventDefault();
                        if (!ev.dataTransfer.getData('lineComp')) {
                            return;
                        }
                        var data = JSON.parse(ev.dataTransfer.getData('lineComp'));
                        if (data.id) {
                            let index = 0;
                            ev.path.forEach((item, i) => {
                                item.classList && item.classList.forEach((cla, c) => {
                                    cla === 'flag-sup-$-comp-box' && (index = i - 1)
                                });
                            });
                            console.log(data.config.hash + '放在' + ev.path[index].id + '前');
                        }
                    },
                    editComponent (ev, comp) {
                        if (that.preview) { return; }
                        this.$emit('editComponent', comp);
                    }
                }
            });
        },
        methods: {
            action (key) {

            },
            editComponent (comp) {
                this.$emit('editComponent', comp);
            },
            editContent (ev) {
                if (this.preview) { return; }
                this.$emit('editContent');
            },
            handleRightClick (e) {
                this.currentRightEl = e;
            }
        }
    }
</script>

<style lang="less">
    .right-action-pop {
        padding: 4px 0px!important;
        .sys-pop-action-btn {
            color: #333;
            font-size: 13px;
            width: 60px;
            text-align: center;
            padding: 4px;
            &:hover {
                background: #dadee7da;
            }
        }
    }
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
