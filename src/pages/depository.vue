<template>
    <div class="depository">
        <div class="top-bar">
            <div class="pro-title">
                1TAK<span class="iconfont icon-zuzhuangqiang"></span>
            </div>
            <div class="actions">
                <span class="iconfont icon-baocun_mian"></span>
            </div>
        </div>
        <div class="work-space">
            <div class="left-bar">
                <div class="title">元 组件</div>
                <ul class="materials-list" :style="{height: `calc(${100 * 2 / 3}% - 30px)`}">
                    <li class="material" v-for="icon in sysCompIcons" :key="icon.key">
                        <span
                            :id="icon.key"
                            :class="['list-icon', 'iconfont', icon.key]"
                            draggable="true"
                            @dragstart="drag">
                        </span>
                        <div class="material-name">
                            {{ icon.name }}
                        </div>
                    </li>
                </ul>
                <div class="title">复合 组件</div>
                <ul class="materials-list" :style="{height: `calc(${100 * 1 / 3}% - 30px)`}">
                    <li class="material" v-for="icon in sysCompIcons" :key="icon.key">
                        <span :class="['list-icon', 'iconfont', icon.key]"></span>
                        <div class="material-name">
                            {{ icon.name }}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="draw-space" @drop="drop" @dragover="allowDrop">
                <div
                    class="comp-box"
                    v-for="(comp, index) in comps"
                    :key="comp.id + comp.x + comp.y  + index"
                    :style="{
                        position: 'absolute',
                        top: comp.y + 'px',
                        left:  comp.x + 'px'
                    }"
                    @drop.stop="dropin"
                    @dragover.stop="allowDropin"
                    draggable="true"
                    @dragstart="move($event, comp, index)">
                    {{ comp.name }}
                    <component :is="comp.name" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sysCompIcons } from './depository-config/static-config.js'
    import { iconCompMap } from './depository-config/icon-component-map.js'
    const requireComponent = require.context('../meta-components', false, /\w+\.(vue|js)$/)
    var cmps = {}

    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    })

    export default {
        name: 'Depository',
        components: cmps,
        data () {
            return {
                sysCompIcons: sysCompIcons,
                iconCompMap: iconCompMap,
                comps: []
            }
        },
        methods: {
            move (ev, comp, index) {
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: comp.id,
                    index: index
                }))
            },
            drag (ev) {
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: ev.target.id
                }))
            },
            allowDrop (ev) {
                ev.preventDefault()
            },
            drop (ev) {
                ev.preventDefault()
                var data = JSON.parse(ev.dataTransfer.getData('DragComp'))
                var dragCompData = {
                    id: data.id,
                    x: ev.screenX - 310,
                    y: ev.screenY - 130,
                    name: this.iconCompMap[data.id]
                }
                data.index !== undefined && this.comps.splice(data.index, 1)
                this.comps.push(dragCompData)
            },
            allowDropin (ev) {
                ev.preventDefault()
            },
            dropin (ev) {
                ev.preventDefault()
                console.log('21312', ev.target)
            }
        }
    }
</script>

<style lang="less">
.depository {
    height: 100%;
    .top-bar {
        height: 50px;
        background: #333;
        .pro-title {
            line-height: 50px;
            font-size: 32px;
            color: #FFF;
            margin-left: 10px;
            display: inline-block;
            .icon-zuzhuangqiang {
                font-size: 32px;
                display: inline-block;
                padding-left: 8px;
                line-height: 50px;
                position: relative;
                top: 4px;
            }
        }
        .actions {
            float: right;
            .icon-baocun_mian {
                font-size: 24px;
                line-height: 50px;
                color: #FFF;
                margin-right: 10px;
            }
        }
    }
    .work-space {
        height: ~'calc(100% - 50px)';
        font-size: 0px;
        .left-bar {
            display: inline-block;
            height: 100%;
        }
        .draw-space {
            display: inline-block;
            position: relative;
            height: 100%;
            width: ~'calc(100% - 310px)';
            vertical-align: top;
            font-size: 12px;
            overflow: auto;
            .comp-box {
                &:hover {
                    background: #d9edff;
                }
            }
        }
    }
    .title {
        width: 295px;
        line-height: 30px;
        font-size: 14px;
        font-weight: 700;
        padding-left: 15px;
        background: #191f1e;
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
                font-size: 30px;
                margin: 0 auto 5px;
                color: #333;
                -webkit-transition: font-size 0.25s linear, width 0.25s linear;
                -moz-transition: font-size 0.25s linear, width 0.25s linear;
                transition: font-size 0.25s linear, width 0.25s linear;
                &:hover {
                    font-size: 60px;
                }
            }
            .material-name {
                color: #666;
            }
        }
    }
}
</style>
