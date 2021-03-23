<template>
    <div class="page-list">
        <div class="top-bar">
            <div class="pro-title">
                Vv Page List<span class="iconfont icon-yezhu"></span>
            </div>
        </div>
        <div class="table">
            <div class="th">
                <div class="tr tr1">名称</div>
                <div class="tr tr2">备注</div>
                <div class="tr tr3">最近修改时间</div>
                <div class="tr tr4">操作</div>
            </div>
            <div class="tl">
                <div class="tr tr1"></div>
                <div class="tr tr2"></div>
                <div class="tr tr3"></div>
                <div class="tr tr4">
                    <router-link :to="{ name: 'View' }">查看</router-link>
                    <span>复制地址</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageList',
        components: {
        },
        data () {
            return {
            }
        }
    }
</script>

<style lang="less">

.page-list {
    height: 100%;
    overflow: hidden;
    .top-bar {
        height: 100px;
        background: @main;
        box-sizing: border-box;
        .pro-title {
            line-height: 100px;
            font-size: 32px;
            font-weight: 700;
            color: @dep;
            margin-left: 30px;
            display: inline-block;
            .icon-yezhu {
                font-size: 45px;
                display: inline-block;
                padding-left: 14px;
                line-height: 100px;
                position: relative;
                top: 0px;
                left: 5px;
                transform: rotateY(180deg);
            }
        }
    }
    .table {
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
                width: 40%;
            }
            .tr3 {
                width: 20%;
            }
            .tr4 {
                width: 20%;
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
}
</style>
