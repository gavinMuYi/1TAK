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
        <pop ref="namePop">ID: {{ nameHashTip }}</pop>
        <cus-comp :comps="cusComp.comps" @editComponent="editComponent" @rightClick="handleRightClick" @changeInline="changeInline" @nameHover="nameHover" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import clone from 'clone';
    import pop from '../../../components/pop';
    import { addCss } from '../../../utils/common.js';
    // 注册单位组件
    import gtml from '../../../G-HTML';
    var cmps = gtml;
    cmps = {
        ...cmps,
        ...window.$Manager('get', 'customerCamps')
    };
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
            },
            topDataLevel: {
                type: Boolean,
                default: true
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
                }],
                nameHashTip: ''
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
            var parseStyleStr = function (arr) {
                arr.forEach(comp => {
                    comp.config.slot && comp.config.slot.forEach(slotComp => {
                        slotComp.children && parseStyleStr(slotComp.children);
                    });
                    comp.config.style && Object.keys(comp.config.style).forEach(key => {
                        let cssStr = '';
                        Object.keys(comp.config.style[key]).forEach(css => {
                            cssStr += `${css}: ${comp.config.style[key][css]};`;
                        })
                        styleStr += `${key} {${cssStr}}`
                    });
                });
            }
            parseStyleStr(this._renderCusComp.comps);
            addCss(styleStr, 'compStyle');
            var renderFunction = function (arrComps, top, slotProps) {
                // slotProps && console.log('out', slotProps);
                return function () {
                    if (!top && typeof slotProps === 'object') {
                        this.$slotArgs = slotProps;
                        window.$slotArgs = this.$slotArgs || {};
                    }
                    if (top && !this.$slotArgs) {
                        this.$slotArgs = window.$slotArgs;
                    }
                    const h = this.$createElement;
                    var directives = [];
                    var configEventHandlers = that._renderCusComp.config.data.eventHandlers;
                    // 函数
                    arrComps.forEach((comp, index) => {
                        Object.keys(configEventHandlers).forEach(funcKey => {
                            var funcStr = configEventHandlers[funcKey].handler;
                            var funcName = funcKey.split('-');
                            funcName = funcName[1] + funcName[0];
                            if (!that.topDataLevel) {
                                // slot
                                var flagkey = funcStr.indexOf('{');
                                var headStr = funcStr.substr(0, flagkey);
                                var bodyStr = funcStr.substr(flagkey);
                                bodyStr = bodyStr.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                funcStr = headStr + bodyStr;
                            }
                            try {
                                /* eslint-disable */
                                var resFunc = new Function('return ' + funcStr).call(this);
                                /* eslint-enable */
                                this[funcName] = e => { resFunc.call(this._self, e, slotProps) };
                            } catch (e) {
                                this[funcName] = () => {};
                            }
                        });
                    });
                    !that.preview && directives.push({
                        name: 'pop',
                        arg: 'morePop',
                        modifiers: { rightClick: true }
                    });
                    !that.preview && directives.push({
                        name: 'pop',
                        arg: 'namePop',
                        modifiers: { hover: true }
                    });
                    return (
                        <div class={top ? 'cus-comp' : 'slot-template'} id={that.cusComp.config.hash}>
                        {
                            arrComps.map((comp, index) => {
                                var configEventHandlers = that._renderCusComp.config.data.eventHandlers;
                                var eventhandlers = {};
                                Object.keys(configEventHandlers).forEach(funcKey => {
                                    funcKey.indexOf(comp.config.hash) > -1 && (eventhandlers[configEventHandlers[funcKey].name] = this[configEventHandlers[funcKey].name + comp.config.hash]);
                                });
                                var abs = !(String(comp.y + comp.x) === 'NaN');
                                var localProps = {};
                                let tar = arrComps.filter(item => { return item.config.hash === comp.config.hash })[0];
                                let propsFunc = tar ? tar.config.props : {};
                                this[comp.config.hash] && Object.keys(cmps[comp.name].props).forEach(item => {
                                    localProps[item] = null;
                                    if (!(cmps[comp.name].props[item].type instanceof Array) && cmps[comp.name].props[item].type) {
                                        switch (typeof cmps[comp.name].props[item].type()) {
                                        case 'object':
                                            try {
                                                localProps[item] = JSON.parse(this[comp.config.hash][item]);
                                            } catch (e) {
                                                localProps[item] = null
                                            }
                                            break;
                                        case 'function':
                                            try {
                                                /* eslint-disable */
                                                var resFunc = new Function('return ' + this[comp.config.hash][item]).call(this);
                                                /* eslint-enable */
                                                localProps[item] = resFunc.bind(this._self);
                                            } catch (e) {
                                                localProps[item] = () => {};
                                            }
                                            break;
                                        case 'number':
                                            localProps[item] = Number(this[comp.config.hash][item]);
                                            break;
                                        case 'boolean':
                                            try {
                                                localProps[item] = JSON.parse(this[comp.config.hash][item]);
                                            } catch (e) {
                                                localProps[item] = null
                                            }
                                            break;
                                        default:
                                            localProps[item] = this[comp.config.hash][item];
                                            break;
                                        }
                                    }
                                    if (propsFunc[item]) {
                                        let flag = true;
                                        var funcStr = propsFunc[item];
                                        if (!that.topDataLevel) {
                                            // slot
                                            var flagkey = funcStr.indexOf('{');
                                            var headStr = funcStr.substr(0, flagkey);
                                            var bodyStr = funcStr.substr(flagkey);
                                            bodyStr = bodyStr.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                            funcStr = headStr + bodyStr;
                                        }
                                        try {
                                            /* eslint-disable */
                                            var resFunc = new Function('return ' + funcStr).call(this);
                                            /* eslint-enable */
                                            this['propsFunc' + '_' + comp.config.hash + '_' + item] = resFunc;
                                        } catch (e) {
                                            flag = false;
                                        }
                                        if (flag) {
                                            localProps[item] = this['propsFunc' + '_' + comp.config.hash + '_' + item].call(this._self, slotProps);
                                        }
                                    }
                                });
                                var vifFunc;
                                if (comp.config.vif) {
                                    var funcStrvif = comp.config.vif;
                                    if (!that.topDataLevel) {
                                        // slot
                                        var flagkeyvif = funcStrvif.indexOf('{');
                                        var headStrvif = funcStrvif.substr(0, flagkeyvif);
                                        var bodyStrvif = funcStrvif.substr(flagkeyvif);
                                        bodyStrvif = bodyStrvif.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                        funcStrvif = headStrvif + bodyStrvif;
                                    }
                                    try {
                                        /* eslint-disable */
                                        var resFunc = new Function('return ' + funcStrvif).call(this);
                                        /* eslint-enable */
                                        vifFunc = resFunc;
                                    } catch (e) {
                                        vifFunc = undefined;
                                    }
                                }
                                var vforFunc;
                                if (comp.config.vfor) {
                                    var funcStrvfor = comp.config.vfor;
                                    if (!that.topDataLevel) {
                                        // slot
                                        var flagkeyvfor = funcStrvfor.indexOf('{');
                                        var headStrvfor = funcStrvfor.substr(0, flagkeyvfor);
                                        var bodyStrvfor = funcStrvfor.substr(flagkeyvfor);
                                        bodyStrvfor = bodyStrvfor.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                        funcStrvfor = headStrvfor + bodyStrvfor;
                                    }
                                    try {
                                        /* eslint-disable */
                                        var resFunc = new Function('return ' + funcStrvfor).call(this);
                                        /* eslint-enable */
                                        vforFunc = resFunc;
                                    } catch (e) {
                                        vforFunc = undefined;
                                    }
                                }
                                var domComp
                                if (vforFunc && vforFunc.call(this, slotProps)) {
                                    var list = vforFunc.call(this, slotProps);
                                    domComp = list.map((dataitem, index) => {
                                        var scopedSlots = {};
                                        comp.config.slot.forEach(slot => {
                                            slot.children.length && (scopedSlots[slot.name] = props => {
                                                let proArgs = {};
                                                proArgs[comp.config.hash + slot.name] = props;
                                                proArgs[comp.config.hash + slot.name + '_loopProps'] = {
                                                    item: dataitem,
                                                    index: index
                                                };
                                                return renderFunction(slot.children, false, {
                                                    ...proArgs,
                                                    ...slotProps
                                                }).call(this);
                                            });
                                        });
                                        var loopProps = {
                                            item: dataitem,
                                            index: index
                                        };
                                        // 复写localProps传loopProps
                                        this[comp.config.hash] && Object.keys(cmps[comp.name].props).forEach(item => {
                                            localProps[item] = null;
                                            if (!(cmps[comp.name].props[item].type instanceof Array) && cmps[comp.name].props[item].type) {
                                                switch (typeof cmps[comp.name].props[item].type()) {
                                                case 'object':
                                                    try {
                                                        localProps[item] = JSON.parse(this[comp.config.hash][item]);
                                                    } catch (e) {
                                                        localProps[item] = null
                                                    }
                                                    break;
                                                case 'function':
                                                    try {
                                                        /* eslint-disable */
                                                        var resFunc = new Function('return ' + this[comp.config.hash][item]).call(this);
                                                        /* eslint-enable */
                                                        localProps[item] = resFunc.bind(this._self);
                                                    } catch (e) {
                                                        localProps[item] = () => {};
                                                    }
                                                    break;
                                                case 'number':
                                                    localProps[item] = Number(this[comp.config.hash][item]);
                                                    break;
                                                case 'boolean':
                                                    try {
                                                        localProps[item] = JSON.parse(this[comp.config.hash][item]);
                                                    } catch (e) {
                                                        localProps[item] = null
                                                    }
                                                    break;
                                                default:
                                                    localProps[item] = this[comp.config.hash][item];
                                                    break;
                                                }
                                            }
                                            if (propsFunc[item]) {
                                                let flag = true;
                                                var funcStr = propsFunc[item];
                                                if (!that.topDataLevel) {
                                                    // slot
                                                    var flagkey = funcStr.indexOf('{');
                                                    var headStr = funcStr.substr(0, flagkey);
                                                    var bodyStr = funcStr.substr(flagkey);
                                                    bodyStr = bodyStr.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                                    funcStr = headStr + bodyStr;
                                                }
                                                try {
                                                    /* eslint-disable */
                                                    var resFunc = new Function('return ' + funcStr).call(this);
                                                    /* eslint-enable */
                                                    this['propsFunc' + '_' + comp.config.hash + '_' + item] = resFunc;
                                                } catch (e) {
                                                    flag = false;
                                                }
                                                if (flag) {
                                                    localProps[item] = this['propsFunc' + '_' + comp.config.hash + '_' + item].call(
                                                        this._self,
                                                        slotProps,
                                                        loopProps
                                                    );
                                                }
                                            }
                                        });
                                        // 复写eventhandlers传loopProps
                                        var funcGroup = {};
                                        Object.keys(configEventHandlers).forEach(funcKey => {
                                            var funcStr = configEventHandlers[funcKey].handler;
                                            var funcName = funcKey.split('-');
                                            funcName = funcName[1] + funcName[0];
                                            if (!that.topDataLevel) {
                                                // slot
                                                var flagkey = funcStr.indexOf('{');
                                                var headStr = funcStr.substr(0, flagkey);
                                                var bodyStr = funcStr.substr(flagkey);
                                                bodyStr = bodyStr.replace(new RegExp('slotProps', 'gm'), 'window.$slotArgs');
                                                funcStr = headStr + bodyStr;
                                            }
                                            try {
                                                /* eslint-disable */
                                                var resFunc = new Function('return ' + funcStr).call(this);
                                                /* eslint-enable */
                                                funcGroup[funcName] = e => { resFunc.call(this._self, e, slotProps, loopProps) };
                                            } catch (e) {
                                                funcGroup[funcName] = () => {};
                                            }
                                        });
                                        var loopEventhandlers = {};
                                        Object.keys(configEventHandlers).forEach(funcKey => {
                                            funcKey.indexOf(comp.config.hash) > -1 && (loopEventhandlers[configEventHandlers[funcKey].name] = funcGroup[configEventHandlers[funcKey].name + comp.config.hash]);
                                        });
                                        /* eslint-disable */
                                        var directivesResFunc = new Function('return ' + comp.config.directives).call(this);
                                        /* eslint-enable */
                                        var directivesRes = directivesResFunc.call(this);
                                        var nodeDom = h(comp.name, {
                                            attrs: {
                                                id: comp.config.hash
                                            },
                                            props: localProps,
                                            on: {
                                                ...loopEventhandlers
                                            },
                                            directives: directivesRes,
                                            scopedSlots: scopedSlots
                                        });
                                        this.$nextTick(() => {
                                            if (!this.$refs[comp.config.hash] || !this.$refs[comp.config.hash][0]) {
                                                this.$refs[comp.config.hash] = [];
                                            } else {
                                                this.$refs[comp.config.hash] && this.$refs[comp.config.hash].push(nodeDom.componentInstance);
                                            }
                                        });
                                        return nodeDom;
                                    });
                                } else {
                                    var scopedSlots = {};
                                    comp.config.slot.forEach(slot => {
                                        slot.children.length && (scopedSlots[slot.name] = props => {
                                            let proArgs = {};
                                            proArgs[comp.config.hash + slot.name] = props;
                                            return renderFunction(slot.children, false, {
                                                ...proArgs,
                                                ...slotProps
                                            }).call(this);
                                        });
                                    });
                                    /* eslint-disable */
                                    var directivesResFunc = new Function('return ' + comp.config.directives).call(this);
                                    /* eslint-enable */
                                    var directivesRes = directivesResFunc.call(this);
                                    domComp = h(comp.name, {
                                        attrs: {
                                            id: comp.config.hash
                                        },
                                        props: localProps,
                                        on: {
                                            ...eventhandlers
                                        },
                                        directives: directivesRes,
                                        scopedSlots: scopedSlots
                                    });
                                    this.$nextTick(() => {
                                        this.$refs[comp.config.hash] = domComp.componentInstance;
                                    });
                                }
                                if ((vifFunc && vifFunc.call(this, slotProps)) || !vifFunc) {
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
                                            onMouseover={ev => { if (that.preview) { return; } this.$emit('nameHover', comp.config.hash); }}
                                            onContextmenu={ev => { if (that.preview) { return; } if (ev.button === 2) { this.$emit('rightClick', comp) } }}
                                            onDrop={ev => { if (that.preview) { return; } if (!abs) { this.moveInline(ev); } ev.stopPropagation(); ev.preventDefault(); }}
                                            onDragover={ev => { if (that.preview) { return; } ev.stopPropagation(); ev.preventDefault(); }}
                                            onDragstart={ev => { if (that.preview) { return; } this.move(ev, comp, index); }}
                                            onClick={ev => { if (!top) { return; } ev.stopPropagation(); this.editComponent(ev, comp); }}>
                                            {
                                                domComp
                                            }
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })
                        }
                        </div>
                    )
                };
            };
            var componentConfig = {
                render: renderFunction(this.cusComp.comps, true),
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
                            this.$emit('changeInline', data.config.hash, ev.path[index].id);
                        }
                    },
                    editComponent (ev, comp) {
                        if (that.preview) { return; }
                        this.$emit('editComponent', comp);
                    }
                }
            };
            Object.keys(this._renderCusComp.config.lifeCycle).forEach(key => {
                /* eslint-disable */
                var resFunc = new Function('return ' + this._renderCusComp.config.lifeCycle[key]).call(this);
                /* eslint-enable */
                componentConfig[key] = resFunc;
            });
            Vue.component('cus-comp', componentConfig);
        },
        methods: {
            action (action) {
                this.$emit('action', action, this.currentRightEl.config.hash);
            },
            nameHover (hash) {
                this.nameHashTip = hash;
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
            },
            changeInline (prehash, hash) {
                this.$emit('changeInline', prehash, hash);
            }
        }
    }
</script>

<style lang="less">
    .right-action-pop {
        padding: 4px 0px!important;
        .sys-pop-action-btn {
            color: @sub;
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
                    border: 1px solid @sub;
                    border-radius: 3px;
                    z-index: 10;
                }
            }
        }
        .stc-box {
            &:hover {
                box-sizing: border-box;
                padding: 5px;
                border: 1px solid @sub;
                border-radius: 3px;
                z-index: 10;
            }
        }
    }
</style>
