<template>
    <div class="interface-editor" v-if="showPanel">
        <div class="top">
            <span class="title">接口：</span>
            <div class="input-box" v-if="create"><input placeholder="接口名称" v-model="currentMock" /></div>
            <single-select v-else v-model="currentMock" :options="mockUrls" />
            <span class="iconfont icon-baocun_mian"></span>
            <span class="iconfont icon-gengduo1" @click="doCreate" v-if="!create"></span>
            <span class="iconfont icon-zhongzuo" @click="cancelCreate" v-else></span>
        </div>
        <div class="type">
            <span class="title">接口类型：</span>
            <single-select v-model="type" :options="types" />
        </div>
    </div>
</template>

<script>
    import SingleSelect from './styleEditor/components/single-select';
    export default {
        name: 'InterfaceEditor',
        components: {
            SingleSelect
        },
        data () {
            return {
                create: false,
                showPanel: false,
                currentMock: '',
                mockUrls: [],
                type: 'get',
                types: ['get', 'post', 'put', 'delete']
            }
        },
        mounted () {
            this.$ajax.get('https://mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab/getListMock').then(e => {
                var list = e.data.data.records.map(item => { return item.pathname });
                this.currentMock = list[0];
                this.$set(this, 'mockUrls', list);
            });
        },
        methods: {
            visibleChange () {
                this.showPanel = !this.showPanel;
            },
            doCreate () {
                this.currentMock = '';
                this.create = true;
            },
            cancelCreate () {
                this.currentMock = this.mockUrls[0];
                this.create = false;
            }
        }
    }
</script>

<style lang="less">
    .interface-editor {
        position: fixed;
        z-index: 10000000;
        top: 0px;
        left: 0px;
        background: @mainop;
        width: 800px;
        height: 100%;
        overflow: auto;
        border-right: 1px solid @main;
        .top {
            padding-left: 40px;
            .input-box {
                background: #fff;
                display: inline-block;
                height: 31px;
                margin: 20px 40px 10px;
                width: 510px;
                box-sizing: border-box;
                padding: 2px 8px;
                border: 1px solid #dadee7;
                border-radius: 3px;
                transition: border-color .25s;
                input {
                    position: relative;
                    display: block;
                    width: 100%;
                    line-height: inherit;
                    height: 26px;
                    padding: 7px 0;
                    color: #1e2330;
                    outline: none;
                    border: 0 none;
                    background: none;
                    box-sizing: border-box;
                    width: 100%;
                }
            }
            .single-select {
                background: #fff;
                margin: 20px 40px 10px;
                border-radius: 3px;
                .select-pop,
                .box-trigger {
                    width: 510px;
                }
            }
            .icon-zhongzuo,
            .icon-gengduo1,
            .icon-baocun_mian {
                color: @dep;
                font-size: 20px;
                margin: 25px 5px 5px;
                display: inline-block;
                vertical-align: top;
            }
        }
        .type {
            padding-left: 40px;
            .title {
                color: @dep;
            }
            .single-select {
                background: #fff;
                margin: 20px 40px;
                border-radius: 3px;
            }
        }
    }
</style>
