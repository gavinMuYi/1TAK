<template>
    <div class="G_table">
        <div class="th">
            <div class="tr tr1">名称</div>
            <div class="tr tr2">ID</div>
            <div class="tr tr3">备注</div>
            <div class="tr tr4">最近修改时间</div>
            <div class="tr tr5">操作</div>
        </div>
        <div class="tl" v-for="line in list" :key="line._id">
            <div class="tr tr1">{{ line.pageName }}</div>
            <div class="tr tr2">{{ line.metaID }}</div>
            <div class="tr tr3">{{ line.remark }}</div>
            <div class="tr tr4">{{ new Date(line.lastModifiy).Format("yyyy-MM-dd hh:mm:ss") }}</div>
            <div class="tr tr5">
                <router-link :to="{ name: 'View', query: { metaID: line.metaID } }">查看</router-link>
                <span>删除</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'G_TABLE',
        props: {},
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.$ajax.get('/getList').then(e => {
                this.$set(this, 'list', e.data.records);
            });
        }
    }
</script>

<style lang="less">
    .G_table {
        width: 1240px;
        margin: 100px auto;
        .th,.tl {
            .tr {
                display: inline-block;
                box-sizing: border-box;
                padding-left: 20px;
            }
            .tr1 {
                width: 20%;
            }
            .tr2 {
                width: 20%;
            }
            .tr3 {
                width: 25%;
            }
            .tr4 {
                width: 20%;
            }
            .tr5 {
                width: 15%;
                a {
                    color: @main;
                    text-decoration: none;
                    &:hover {
                        color: @sub;
                    }
                }
                span {
                    display: inline-block;
                    margin-left: 10px;
                    &:hover {
                        color: @sub;
                        cursor: pointer;
                    }
                }
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
