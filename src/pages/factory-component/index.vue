<template>
    <div class="factory-component">
        <!-- <div id="ballId">drag</div> -->
        <div class="top-bar">
            <div class="pro-title">
                Vv Page<span class="iconfont icon-yezhu"></span>
            </div>
            <div class="actions">
                <span @click="mode = !mode">
                    <span class="iconfont icon-xunhuan"></span>
                    {{ mode ? '拖动布局' : '积木布局' }}
                </span>
                <span @click="preview = !preview">
                    <span class="iconfont icon-xunhuan"></span>
                    {{ preview ? '预览' : '配置' }}态
                </span>
                <span class="iconfont icon-baocun_mian" @click="save"></span>
            </div>
        </div>
        <div :class="['work-space', {'preview': preview}]">
            <left-bar />
            <div class="space-content">
                <div class="component-draw-space" ref="drawSpace" @drop="drop" @dragover="ev => {ev.preventDefault()}">
                    <draw-board :comps="comps" @editComponent="editComponent" @editContent="editContent" :cusComp="cusComp" :key="refresh" :preview="preview" />
                </div>
            </div>
            <right-bar :nowEdit="nowEdit" @updateParams="updateParams"/>
        </div>
    </div>
</template>

<script>
    import LeftBar from './components/leftBar';
    import RightBar from './components/rightBar';
    import DrawBoard from './components/drawBoard';
    import { iconCompMap } from './config.js';
    import { createHash } from '../../utils/common.js';
    import { suspensionBall } from '../../utils/drag-ball.js';
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
                mode: true,
                preview: false,
                refresh: 0,
                iconCompMap: iconCompMap,
                nowEdit: {},
                comps: [],
                cusCompHash: createHash(4),
                config_data_data_bak: {},
                config_data_eventHandlers_bak: {}
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
                                ...this.getCompsProps(this.comps),
                                ...this.config_data_data_bak
                            },
                            eventHandlers: {
                                ...this.getCompsEvents(this.comps),
                                ...this.config_data_eventHandlers_bak
                            },
                            emitEvents: []
                        }
                    },
                    comps: this.comps
                }
            }
        },
        mounted () {
            this.$set(this, 'nowEdit', this.cusComp);
            suspensionBall('ballId', 'https://www.baidu.com');
        },
        methods: {
            save () {
                console.log(this.cusComp);
            },
            updateParams (comps) {
                if (comps.content) {
                    this.config_data_data_bak = comps.config.data.data;
                    this.config_data_eventHandlers_bak = comps.config.data.eventHandlers;
                }
            },
            getCompsEvents (comps) {
                this.$nextTick(() => {
                    this.refresh++;
                });
                let events = {};
                comps.forEach(comp => {
                    cmps[comp.name].event && cmps[comp.name].event.forEach(func => {
                        this.$set(events, comp.config.hash + '-' + func.name, {
                            name: func.name,
                            label: func.label,
                            params: func.params,
                            handler: `function ${func.name + comp.config.hash}() {}`
                        });
                    });
                });
                return events;
            },
            getCompsProps (comps) {
                this.$nextTick(() => {
                    this.refresh++;
                });
                let props = {};
                comps.forEach(comp => {
                    this.$set(props, comp.config.hash, {});
                    var prop = cmps[comp.name].props;
                    for (let key in prop) {
                        this.$set(props[comp.config.hash], key, typeof prop[key].type() === 'object' ? prop[key].default() : prop[key].default);
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
                    : (dragCompData.config = { hash: createHash(4) });
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
    #ballId {
        background: #333;
        color: white;
        width: 50px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        box-shadow: 5px 5px 40px rgba(0, 0, 0, 0.5);
        z-index: 10000;
        /* 过渡效果在IE下展示效果不友好 */
        transition: all 0.08s;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
    .top-bar {
        height: 100px;
        background: #f7f8fa;
        border-bottom: 1px solid #ededed;
        box-sizing: border-box;
        .pro-title {
            line-height: 100px;
            font-size: 32px;
            font-weight: 700;
            color: #333;
            margin-left: 30px;
            display: inline-block;
            .icon-yezhu {
                font-size: 37px;
                display: inline-block;
                padding-left: 14px;
                line-height: 100px;
                position: relative;
                top: 3px;
            }
        }
        .actions {
            float: right;
            color: #333;
            font-weight: 700;
            .icon-baocun_mian {
                font-size: 24px;
                line-height: 100px;
                color: #333;
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
            padding: 10px;
            box-sizing: border-box;
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
            box-shadow: 5px 4px 1px #88888830;
        }
    }
    .preview {
        .left-bar,
        .right-bar {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                background: #ededed40;
                width: 100%;
                height: 100%;
                &:hover {
                    cursor: not-allowed;
                }
            }
            &:hover {
                cursor: not-allowed;
            }
        }
        .right-bar {
            &:before {
                width: 310px;
            }
        }
    }
    .title {
        width: 295px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 700;
        padding-left: 15px;
        background: #333;
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
                    color: #333;
                }
            }
            .material-name {
                color: #666;
            }
        }
    }
}
</style>
