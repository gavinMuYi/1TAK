<template>
    <div class="draw-board">
        <div
            class="comp-box"
            v-for="(comp, index) in comps"
            :key="comp.id + comp.x + comp.y  + index"
            :id="comp.config.hash + '-box'"
            :style="{
                position: 'absolute',
                top: comp.y + 'px',
                left:  comp.x + 'px'
            }"
            draggable="true"
            @drop.stop="ev => {ev.preventDefault()}"
            @dragover.stop="ev => {ev.preventDefault()}"
            @dragstart="move($event, comp, index)"
            @click="editComponent(comp)">
            <component :is="comp.name" :id="comp.config.hash" />
        </div>
    </div>
</template>

<script>
    // 注册单位组件
    const requireComponent = require.context('../../../unit-components', false, /\w+\.(vue|js)$/);
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
            move (ev, comp, index) {
                ev.dataTransfer.setData('DragComp', JSON.stringify({
                    id: comp.id,
                    config: comp.config,
                    index: index
                }));
            },
            editComponent (comp) {
                this.$emit('editComponent', comp);
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
