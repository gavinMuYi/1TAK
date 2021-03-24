<template>
    <div class="Vv_Page-index" :style="`background: linear-gradient(125deg, #ffffff 0, #e8f1ff ${range - 30}%, rgb(17 124 114) ${range + 25}%, #034a43 100%)`">
        <div class="index-title">
            <span class="title">GaHou LAB</span>
            <span class="iconfont icon-yezhu icon"></span>
        </div>
        <div class="router-box">
            <router-link :to="{ name: 'GHtml' }"><span>G HTML</span></router-link>
            <router-link :to="{ name: 'VvPage' }"><span>Vv Page</span></router-link>
            <router-link :to="{ name: 'pageList' }"><span>Page List</span></router-link>
        </div>
        <!-- <img src="../assets/img/cover.png"> -->
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                range: 35,
                down: true
            }
        },
        mounted () {
            // setInterval(() => {
            //     if (this.down) {
            //         this.range--;
            //         if (this.range === 10) {
            //             this.down = false;
            //         }
            //     } else {
            //         this.range++;
            //         if (this.range === 35) {
            //             this.down = true;
            //         }
            //     }
            // }, 130);
        }
    }
</script>

<style lang="less">
.Vv_Page-index {
    user-select: none;
    width: 100%;
    overflow: hidden;
    height: 100%;
    position: relative;
    // background: linear-gradient(143deg, #ffffff 0, #e8f1ff 30%, #2cf1c0 50%, #0ab68b 80%, #034a43 100%);
    // clip-path: ellipse(90% 90% at 20% 20%);
    .index-title {
        position: absolute;
        color: @main;
        font-weight: 700;
        font-size: 70px;
        top: 250px;
        left: 220px;
        .title {
            z-index: 100;
            display: inline-block;
            position: relative;
        }
        .icon {
            display: inline-block;
            font-size: 147px;
            position: absolute;
            top: -85px;
            left: 370px;
            color: @dep;
            transform: rotateY(180deg);
        }
    }
    .router-box {
        position: absolute;
        top: 500px;
        left: 230px;
        width: 470px;
        a {
            display: block;
            border: 1px solid @sub;
            background: @sub;
            color: @dep;
            font-weight: 700;
            width: 160px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 5px;
            margin: 20px 0 20px auto;
            &:hover {
                width: 470px;
                border: 1px solid @main;
                background: @main;
            }
            span {
                float: right;
                padding-right: 50px;
                text-decoration: underline;
            }
        }
    }
    img {
        z-index: 10;
        position: absolute;
        height: 100%;
        max-width: ~'calc(100% - 900px)';
        right: 0;
    }
}
</style>
