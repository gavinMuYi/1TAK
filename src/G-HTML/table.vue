<template>
    <div class="G_table">
        <div class="th">
            <div
                class="tr"
                :style="`width: ${100/columns.length}%`"
                v-for="(column, cindex) in columns"
                :key="'label' + column.key + cindex">
                {{ column.label }}
            </div>
        </div>
        <div class="tl" v-for="(line, lindex) in list" :key="'line' + lindex">
            <div
                class="tr"
                :style="`width: ${100/columns.length}%`"
                v-for="(column, cindex) in columns"
                :key="'val' + column.key + cindex">
                <slot name="tableColumn" :props="{
                    lineData: line,
                    columnData: column
                }">
                    {{ line[column.key] }}
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'G_TABLE',
        slot: [{
            name: 'tableColumn',
            params: 'lineData, columnData'
        }],
        props: {
            columns: {
                type: Array,
                default: () => {
                    return [{
                        key: 'pageName',
                        label: '名称'
                    }, {
                        key: 'metaID',
                        label: 'ID'
                    }, {
                        key: 'remark',
                        label: '备注'
                    }, {
                        key: 'lastModifiy',
                        label: '最近修改时间'
                    }];
                }
            },
            dataSrc: {
                type: String,
                default: '/getList'
            }
        },
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.$ajax.get(this.dataSrc).then(e => {
                this.$set(this, 'list', e.data.records);
            });
        }
    }
</script>

<style lang="less">
    .G_table {
        width: 100%;
        min-width: 1000px;
        .th,.tl {
            .tr {
                display: inline-block;
                box-sizing: border-box;
                padding-left: 20px;
            }
            .tr1 {
                width: 25%;
            }
            .tr2 {
                width: 25%;
            }
            .tr3 {
                width: 25%;
            }
            .tr4 {
                width: 25%;
            }
        }
        .th {
            background: @main;
            color: @dep;
            height: 50px;
            line-height: 50px;
            font-size: 0px;
            font-weight: 500;
            .tr {
                font-size: 16px;
            }
        }
        .tl {
            border-bottom: 1px solid @sub;
            height: 50px;
            line-height: 50px;
            font-size: 0px;
            .tr {
                font-size: 14px;
            }
        }
    }
</style>
