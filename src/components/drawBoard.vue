<template>
    <div class="draw-board">
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
</template>

<script>
    // 注册单位组件
    const requireComponent = require.context('../unit-components', false, /\w+\.(vue|js)$/);
    var cmps = {};
    requireComponent.keys().map(fileName => {
        let cmp = requireComponent(fileName).default
        cmps[cmp.name] = cmp
    });

    export default {
        name: 'DrawBoard',
        props: {
            comps: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        components: {
            ...cmps
        },
        methods: {
            allowDropin (ev) {
                ev.preventDefault();
            },
            dropin (ev) {
                ev.preventDefault();
            },
            move (ev, comp, index) {
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: comp.id,
                    index: index
                }));
            }
        }
    }
</script>

<style lang="less">
    .draw-board {
        .comp-box {
            &:hover {
                background: #d9edff;
            }
        }
    }
</style>
