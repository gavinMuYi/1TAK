<template>
    <div v-if="data" class="style-dom-tree">
        <div class="tag" @mouseover="hover(true)" @mouseout="hover(false)" @click="editStyle('', '', '', '', level)">
            <span v-if="data[0].children && data[0].children.length" class="arrow" @click.stop="show = !show">~</span>
            &lt;{{data[0].tagName}}
            <span class="attr" v-if="data[0].id">&nbsp;id="<span class="value">{{data[0].id}}</span>"</span>
            <span class="attr" v-if="data[0].class">&nbsp;class="<span class="value">{{data[0].class}}</span>"</span><span>&gt;</span>
        </div>
        <div v-show="show">
            <div v-if="data[0].children && data[0].children.length" class="tree-level">
                <dom-tree v-for="item in data[0].children" :key="item.tagName + Math.random()" :level="level + 1" :data="[item]" @editStyle="editStyle" />
            </div>
        </div>
    </div>
</template>

<script>
    import cssConfigJSON from './cssConfig.json';
    export default {
        name: 'DomTree',
        props: {
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            level: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                show: false,
                tempBackground: '',
                comstyle: null,
                domStyle: {}
            }
        },
        methods: {
            hover (select) {
                if (select) {
                    this.comstyle = getComputedStyle(this.data[0].dom);
                    this.domStyle = {};
                    let dom = this.data[0];
                    cssConfigJSON.css.forEach(rule => {
                        this.$set(this.domStyle, rule.key, dom.dom.style[rule.key] || this.comstyle[rule.key]);
                    });

                    // editStyle (dom, name, comstyle) {
                    //     this.domStyle = {};
                    //     cssConfigJSON.css.forEach(rule => {
                    //         this.$set(this.domStyle, rule.key, dom.dom.style[rule.key] || comstyle[rule.key]);
                    //     });
                    // }

                    this.tempBackground = this.data[0].dom.style.background;
                    this.data[0].dom.style.background = '#0ab68bad';
                } else {
                    this.data[0].dom.style.background = this.tempBackground;
                }
            },
            editStyle (e, name, domStyle, comstyle, level) {
                var tag = this.data[0].tagName
                var id = this.data[0].id ? ('#' + this.data[0].id) : '';
                var regEx = /\s+/g;
                var className = this.data[0].class ? ('.' + this.data[0].class.replace(regEx, '.')) : '';
                let dom = e || this.data[0];
                let localcomstyle = !this.level ? getComputedStyle(dom.dom) : this.comstyle;
                let localname = (id || className || tag) + (name ? ' ' : '') + name;
                this.$emit('editStyle', dom, localname, level > this.level ? domStyle : this.domStyle, level > this.level ? comstyle : localcomstyle, this.level);
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
                * {
                    background: #0ab68b;
                }
                background: #0ab68b;
            }
        }
        .tree-level {
            margin-left: 20px;
        }
    }
</style>
