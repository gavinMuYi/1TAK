<template>
    <div class="left-bar" @click.capture="editContent">
        <span v-for="(menu, index) in componentsMenu" :key="menu.title">
            <div class="title">{{ menu.title }}</div>
            <ul class="materials-list" :style="{height: `calc(${100 * (index ? 2 : 3) / 5}% - 30px)`}">
                <li class="material" v-for="icon in menu.components" :key="icon.key">
                    <span
                        :id="icon.key"
                        :class="['list-icon', 'iconfont', icon.key]"
                        draggable="true"
                        @dragstart="drag($event, index ? 'combination' : 'unit')">
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
                    title: '单位 组件',
                    components: this.unitCompIcons
                }, {
                    title: '复合 组件',
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
        border-right: 1px solid #ededed;;
    }
</style>
