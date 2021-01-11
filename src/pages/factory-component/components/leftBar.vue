<template>
    <div class="left-bar">
        <span v-for="(menu, index) in componentsMenu" :key="menu.title">
            <div class="title">{{ menu.title }}</div>
            <ul class="materials-list" :style="{height: `calc(${100 * (index ? 1 : 2) / 3}% - 30px)`}">
                <li class="material" v-for="icon in menu.components" :key="icon.key">
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
        </span>
    </div>
</template>

<script>
    import { unitCompIcons } from '../config.js';

    export default {
        name: 'LeftBar',
        data () {
            return {
                unitCompIcons: unitCompIcons
            }
        },
        computed: {
            componentsMenu () {
                return [{
                    title: '单位 组件',
                    components: this.unitCompIcons
                }, {
                    title: '复合 组件',
                    components: this.unitCompIcons
                }]
            }
        },
        methods: {
            drag (ev) {
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: ev.target.id
                }));
            }
        }
    }
</script>

<style lang="less">
    .left-bar {
        display: inline-block;
        height: 100%;
        border-right: 1px solid #ededed;;
    }
</style>
