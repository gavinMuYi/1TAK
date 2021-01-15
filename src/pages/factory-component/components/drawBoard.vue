<template>
    <div class="draw-board" @click="editContent">
        <cus-comp :comps="cusComp.comps" @editComponent="editComponent" />
    </div>
</template>

<script>
    import Vue from 'vue';
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
            cusComp: {
                type: Object,
                default: () => {
                    return {
                    };
                }
            }
        },
        created () {
            let that = this;
            Vue.component('cus-comp', {
                render (h) {
                    return (
                        <div class="cus-comp">
                        {
                            this.comps.map((comp, index) => {
                                var props = {};
                                Object.keys(that.cusComp.config.data.data[comp.name + '-' + comp.config.hash]).forEach(key => {
                                    props[key] = that.cusComp.config.data.data[comp.name + '-' + comp.config.hash][key]
                                })
                                return (
                                    <div
                                        class="comp-box"
                                        key={comp.id + comp.x + comp.y + index}
                                        id={comp.config.hash + '-box'}
                                        style={{
                                            position: 'absolute',
                                            top: comp.y + 'px',
                                            left: comp.x + 'px'
                                        }}
                                        draggable={true}
                                        onDrop={ev => { ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragover={ev => { ev.stopPropagation(); ev.preventDefault(); }}
                                        onDragstart={ev => { this.move(ev, comp, index); }}
                                        onClick={ev => { ev.stopPropagation(); this.editComponent(comp); }}>
                                        {
                                            h(comp.name, {
                                                attrs: {
                                                    id: comp.config.hash
                                                },
                                                props: props
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        </div>
                    )
                },
                props: {
                    comps: {
                        type: Array,
                        default: () => {
                            return [];
                        }
                    }
                },
                data () {
                    return {
                        ...that.cusComp.config.data.data
                    }
                },
                mounted () {
                    console.log(this);
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
            });
        },
        methods: {
            editComponent (comp) {
                this.$emit('editComponent', comp);
            },
            editContent () {
                this.$emit('editContent');
            }
        }
    }
</script>

<style lang="less">
    .draw-board {
        height: 100%;
        display: flex;
        .cus-comp {
            height: 100%;
            width: 100%;
            position: relative;
        }
        .comp-box {
            &:hover {
                background: #d9edff;
            }
        }
    }
</style>
