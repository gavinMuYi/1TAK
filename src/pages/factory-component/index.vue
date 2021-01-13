<template>
    <div class="factory-component">
        <div class="top-bar">
            <div class="pro-title">
                Vv Page<span class="iconfont icon-zuzhuangqiang"></span>
            </div>
            <div class="actions">
                create component... <span class="iconfont icon-baocun_mian"></span>
            </div>
        </div>
        <div class="work-space">
            <left-bar />
            <div class="space-content">
                <div class="component-draw-space" ref="drawSpace" @drop="drop" @dragover="ev => {ev.preventDefault()}">
                    <draw-board :comps="comps" @editComponent="editComponent" @editContent="editContent" :cusComp="cusComp" :key="refresh" />
                </div>
            </div>
            <right-bar :nowEdit="nowEdit" />
        </div>
    </div>
</template>

<script>
    import LeftBar from './components/leftBar';
    import RightBar from './components/rightBar';
    import DrawBoard from './components/drawBoard';
    import { iconCompMap } from './config.js';
    import { createHash } from '../../utils/common.js';
    const requireComponent = require.context('../../unit-components', false, /\w+\.(vue|js)$/);
    var cmps = {};
    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    });

    export default {
        name: 'FactoryComponent',
        components: {
            LeftBar,
            RightBar,
            DrawBoard
        },
        data () {
            return {
                refresh: 0,
                iconCompMap: iconCompMap,
                nowEdit: {},
                comps: [],
                cusCompHash: createHash()
            }
        },
        computed: {
            cusComp () {
                return {
                    content: true, // 仅用于配置
                    type: 'combination',
                    config: {
                        hash: this.cusCompHash,
                        style: {
                            width: '100%',
                            height: '100%'
                        },
                        data: {
                            props: {},
                            data: {
                                ...this.getCompsProps(this.comps) // 获取子组件的props
                            },
                            eventHandlers: {},
                            emitEvents: []
                        }
                    },
                    comps: this.comps
                }
            }
        },
        mounted () {
            this.$set(this, 'nowEdit', this.cusComp);
        },
        methods: {
            getCompsProps (comps) {
                this.$nextTick(() => {
                    this.refresh++;
                });
                let props = {};
                comps.forEach(comp => {
                    this.$set(props, comp.name + '-' + comp.config.hash, {});
                    var prop = cmps[comp.name].props;
                    for (let key in prop) {
                        this.$set(props[comp.name + '-' + comp.config.hash], key, typeof prop[key].type() === 'object' ? prop[key].default() : prop[key].default);
                    }
                });
                return props;
            },
            drop (ev) {
                ev.preventDefault();
                var data = JSON.parse(ev.dataTransfer.getData('DragComp'));
                var dragCompData = {
                    ...data,
                    id: data.id,
                    x: ev.clientX - this.$refs.drawSpace.offsetLeft,
                    y: ev.clientY - this.$refs.drawSpace.offsetTop,
                    name: this.iconCompMap[data.id]
                };
                data.config !== undefined
                    ? (dragCompData.config = data.config)
                    : (dragCompData.config = { hash: createHash() });
                data.index !== undefined && this.comps.splice(data.index, 1);
                this.comps.push(dragCompData);
                this.editComponent(dragCompData);
            },
            editComponent (e) {
                this.$set(this, 'nowEdit', e);
            },
            editContent () {
                this.$set(this, 'nowEdit', this.cusComp);
            }
        }
    }
</script>

<style lang="less">
.factory-component {
    height: 100%;
    .top-bar {
        height: 100px;
        background: #333;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
        .pro-title {
            line-height: 100px;
            font-size: 32px;
            font-weight: 700;
            color: #ffb100;
            margin-left: 30px;
            display: inline-block;
            .icon-zuzhuangqiang {
                font-size: 40px;
                display: inline-block;
                padding-left: 10px;
                line-height: 100px;
                position: relative;
                top: 5px;
            }
        }
        .actions {
            float: right;
            color: #ffb100;
            font-weight: 700;
            .icon-baocun_mian {
                font-size: 24px;
                line-height: 100px;
                color: #ffb100;
                font-weight: 400;
                padding-left: 10px;
                margin-right: 30px;
                position: relative;
                top: 2px;
            }
        }
    }
    .work-space {
        height: ~'calc(100% - 100px)';
        font-size: 0px;
        .space-content {
            height: 100%;
            width: ~'calc(100% - 620px)';
            display: inline-block;
            vertical-align: top;
            background: #ededed;
        }
        .component-draw-space {
            display: inline-block;
            position: relative;
            height: 100%;
            background: #fff;
            width: 100%;
            vertical-align: top;
            font-size: 12px;
            overflow: auto;
        }
    }
    .title {
        width: 295px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 700;
        padding-left: 15px;
        background: #ffb100;
        color: #FFF;
    }
    .materials-list {
        width: 310px;
        font-size: 0;
        padding: 0;
        overflow: auto;
        .material {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            letter-spacing: normal;
            word-spacing: normal;
            line-height: inherit;
            width: 60px;
            padding-bottom: 10px;
            text-align: center;
            list-style: none !important;
            cursor: pointer;
            .list-icon {
                display: block;
                height: 70px;
                line-height: 70px;
                font-size: 24px;
                margin: 0 auto 5px;
                color: #191f1e;
                -webkit-transition: font-size 0.15s linear, width 0.15s linear;
                -moz-transition: font-size 0.15s linear, width 0.15s linear;
                transition: font-size 0.15s linear, width 0.15s linear;
                &:hover {
                    font-size: 56px;
                    color: #ffb100;
                }
            }
            .material-name {
                color: #666;
            }
        }
    }
}
</style>
