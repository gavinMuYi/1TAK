<template>
    <div class="ghtml">
        <div class="top-bar">
            <div class="pro-title">
                G HTML<span class="iconfont icon-yezhu"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GHtml',
        components: {
        },
        data () {
            return {
            }
        }
    }
</script>

<style lang="less">

.ghtml {
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
                font-size: 37px;
                display: inline-block;
                padding-left: 14px;
                line-height: 100px;
                position: relative;
                top: 3px;
            }
        }
    }
}
</style>
