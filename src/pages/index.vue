<template>
    <div class="Vv_Page-index" :style="`background: linear-gradient(143deg, #ffffff 0, #e8f1ff ${range}%, #2cf1c0 ${range + 20}%, #0ab68b ${range + 50}%, #034a43 100%)`">
        <div class="index-title">
            <span class="title">GaHou LAB</span>
            <!-- <span class="iconfont icon-yezhu icon"></span> -->
        </div>
        <div class="router-box">
            <router-link :to="{ name: 'Factory' }">G HTML</router-link>
            <router-link :to="{ name: 'Factory' }">Vv Page</router-link>
            <router-link :to="{ name: 'pageList' }">Page List</router-link>
        </div>
        <!-- <img src="../assets/img/cover.png"> -->
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data () {
            return {
                range: 30,
                down: true
            }
        },
        mounted () {
            setInterval(() => {
                if (this.down) {
                    this.range--;
                    if (this.range === 10) {
                        this.down = false;
                    }
                } else {
                    this.range++;
                    if (this.range === 40) {
                        this.down = true;
                    }
                }
            }, 150);
        }
    }
</script>

<style lang="less">
.Vv_Page-index {
    user-select: none;
    width: 100%;
    overflow: hidden;
    height: 100%;
    min-width: 2240px;
    position: relative;
    // background: linear-gradient(143deg, #ffffff 0, #e8f1ff 30%, #2cf1c0 50%, #0ab68b 80%, #034a43 100%);
    // clip-path: ellipse(90% 90% at 20% 20%);
    .index-title {
        position: absolute;
        color: @main;
        font-weight: 700;
        font-size: 70px;
        top: 400px;
        left: 220px;
        .title {
            z-index: 100;
            display: inline-block;
            position: relative;
        }
        .icon {
            display: inline-block;
            font-size: 1300px;
            position: absolute;
            top: -400px;
            left: 100px;
            color: @dep;
            transform: rotateY(180deg);
        }
    }
    .router-box {
        position: absolute;
        top: 700px;
        left: 350px;
        width: 300px;
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
            margin: 20px auto;
            &:hover {
                width: 300px;
                border: 1px solid @main;
                background: @main;
            }
        }
    }
    img {
        z-index: 10;
        position: absolute;
        height: 100%;
        right: 0;
    }
}
</style>
