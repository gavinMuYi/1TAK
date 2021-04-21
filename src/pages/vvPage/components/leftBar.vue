<template>
    <div class="left-bar" @click.capture="editContent">
        <span v-for="(menu, index) in componentsMenu" :key="menu.title">
            <div class="title">{{ menu.title }}</div>
            <ul class="materials-list" :style="{height: `calc(${100 * (index ? 2 : 3) / 5}% - 30px)`}">
                <li class="material" v-for="icon in menu.components" :key="icon.key">
                    <div v-if="menu.key === 'system'">
                        <span
                            :id="icon.key"
                            :class="['list-icon', 'iconfont', icon.key]"
                            draggable="true"
                            @dragstart="drag($event, index ? 'combination' : 'unit')">
                        </span>
                        <div class="material-name">
                            {{ icon.name }}
                        </div>
                    </div>
                    <div v-else class="customer-box-menu">
                        <div
                            class="customer-item"
                            :id="icon.key"
                            draggable="true"
                            @dragstart="drag($event, index ? 'combination' : 'unit')">
                            {{ icon.label }}
                        </div>
                    </div>
                </li>
            </ul>
        </span>
    </div>
</template>

<script>
    import { unitCompIcons, outCompIcons } from '../config.js';

    export default {
        name: 'LeftBar',
        props: {
            preview: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                unitCompIcons: unitCompIcons,
                outCompIcons: outCompIcons
            }
        },
        computed: {
            componentsMenu () {
                return [{
                    title: '系统 组件',
                    key: 'system',
                    components: this.unitCompIcons
                }, {
                    title: '自定义 组件',
                    key: 'custom',
                    components: this.outCompIcons
                }]
            }
        },
        methods: {
            drag (ev, type) {
                if (this.preview) { return; }
                this.$emit('editContent');
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: ev.target.id,
                    type: type
                }));
            },
            editContent (ev) {
                if (this.preview) { return; }
                this.$emit('editContent');
            }
        }
    }
</script>

<style lang="less">
    .left-bar {
        display: inline-block;
        height: 100%;
        border-right: 1px solid #ededed;
        .customer-item {
            width: 260px;
            border: 1px solid @main;
            font-size: 16px;
            margin: 5px auto;
            border-radius: 5px;
            &:hover {
                background: @sub;
                color: @dep;
            }
        }
        .customer-box-menu {
            width: 310px;
        }
    }
</style>
