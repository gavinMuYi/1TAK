<template>
    <div v-if="data" class="style-dom-tree">
        <div class="tag" @click="show = !show">
            <span v-if="data[0].children && data[0].children.length" class="arrow">~</span>
            &lt;{{data[0].tagName}}
            <span class="attr" v-if="data[0].id">&nbsp;id="<span class="value">{{data[0].id}}</span>"</span>
            <span class="attr" v-if="data[0].class">&nbsp;class="<span class="value">{{data[0].class}}</span>"</span>&gt;
        </div>
        <div v-show="show">
            <div v-if="data[0].children && data[0].children.length" class="tree-level">
                <dom-tree v-for="item in data[0].children" :key="item.tagName + Math.random()" :data="[item]" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DomTree',
        props: {
            data: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data () {
            return {
                show: false
            }
        }
    }
</script>

<style lang="less">
    .style-dom-tree {
        .tag {
            color: #ff77e1;
            .arrow {
                color: #FFFFFF;
            }
            .attr {
                color: #ffba7e;
                .value {
                    color: #b2bfff;
                }
            }
            &:hover {
                background: #6377dc;
            }
        }
        .tree-level {
            margin-left: 20px;
        }
    }
</style>
