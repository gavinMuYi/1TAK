<template>
    <div v-if="data" class="style-dom-tree">
        <div class="tag" @mouseover="select(true)" @mouseout="select(false)">
            <span v-if="data[0].children && data[0].children.length" class="arrow" @click="show = !show">~</span>
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
                show: false,
                tempBackground: ''
            }
        },
        methods: {
            select (select) {
                if (select) {
                    this.tempBackground = this.data[0].dom.style.background;
                    this.data[0].dom.style.background = '#6377dcad';
                } else {
                    this.data[0].dom.style.background = this.tempBackground;
                }
            }
        }
    }
</script>

<style lang="less">
    .style-dom-tree {
        .tag {
            color: #ff77e1;
            white-space: nowrap;
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
