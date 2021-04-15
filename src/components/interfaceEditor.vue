<template>
    <div class="interface-editor" v-if="showPanel">
        <div class="top">
            <span class="title">接口：</span>
            <div class="input-box" v-if="create"><input placeholder="接口名称" v-model="currentRule.pathname" /></div>
            <single-select v-else v-model="currentRule.pathname" :options="mockUrls" @input="handleSelect" />
            <span class="iconfont icon-baocun_mian" @click="save"></span>
            <span class="iconfont icon-gengduo1" @click="doCreate" v-if="!create"></span>
            <span class="iconfont icon-zhongzuo" @click="cancelCreate" v-else></span>
        </div>
        <div class="type">
            <span class="title">接口类型：</span>
            <single-select v-model="currentRule.type" :options="types" />
        </div>
        <div class="request" :key="'interface-req-' + currentRule.pathname">
            <span class="title">请求参数：</span>
            <ide-textarea :code="JSON.stringify(currentRule.requestparams)" ref="reqIDE" />
        </div>
        <div class="response" :key="'interface-res-' + currentRule.pathname">
            <span class="title">返回结果：</span>
            <ide-textarea :code="JSON.stringify(currentRule.responsebody)" ref="resIDE" />
        </div>
    </div>
</template>

<script>
    import SingleSelect from './styleEditor/components/single-select';
    import IdeTextarea from './ideTextarea';
    import qs from 'qs';
    import clone from 'clone';
    export default {
        name: 'InterfaceEditor',
        components: {
            SingleSelect,
            IdeTextarea
        },
        data () {
            return {
                create: false,
                showPanel: false,
                currentRule: {
                    pathname: '',
                    requestparams: {},
                    responsebody: {},
                    type: 'get'
                },
                mockUrls: [],
                types: ['get', 'post', 'put', 'delete'],
                ruleList: []
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            visibleChange () {
                this.showPanel = !this.showPanel;
            },
            save () {
                var params = {
                    ...this.currentRule,
                    requestparams: JSON.parse(this.$refs.reqIDE.getValue()),
                    responsebody: JSON.parse(this.$refs.resIDE.getValue())
                }
                if (!params.pathname) {
                    alert('接口名称必填');
                    return;
                }
                if (this.create) {
                    this.$ajax.post('https://mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab/saveMock',
                                    qs.stringify({ mockData: JSON.stringify(params) })
                    ).then(e => {
                        if (e.data.code === 0) {
                            alert('保存成功~');
                            this.create = false;
                            this.init(params.pathname);
                        }
                    });
                } else {
                    this.$ajax.post('https://mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab/updateMock',
                                    qs.stringify({
                                        mockData: JSON.stringify(params)
                                    })
                    ).then(e => {
                        if (e.data.code === 0) {
                            alert('保存成功~');
                            this.create = false;
                            this.init(params.pathname);
                        }
                    });
                }
            },
            init (pn) {
                this.$ajax.get('https://mini-lab-cloudbase-4dxr8e7b614a4-1259082755.ap-shanghai.app.tcloudbase.com/container-gahoulab/getListMock').then(e => {
                    var list = e.data.data.records.map(item => { return item.pathname });
                    this.ruleList = e.data.data.records;
                    this.$set(this, 'currentRule', clone(this.ruleList).filter(e => {
                        return (pn || list[0]) === e.pathname;
                    })[0]);
                    this.$set(this, 'mockUrls', list);
                });
            },
            doCreate () {
                this.create = true;
                this.currentRule = {
                    pathname: '',
                    requestparams: {},
                    responsebody: {},
                    type: 'get'
                };
            },
            cancelCreate () {
                this.create = false;
                this.$set(this, 'currentRule', clone(this.ruleList).filter(e => {
                    return this.mockUrls[0] === e.pathname;
                })[0]);
            },
            handleSelect (val) {
                this.$set(this, 'currentRule', clone(this.ruleList).filter(e => {
                    return val === e.pathname;
                })[0]);
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
            margin-bottom: 10px;
            .title {
                color: @dep;
            }
            .single-select {
                background: #fff;
                margin: 20px 40px;
                border-radius: 3px;
            }
        }
        .response,
        .request {
            padding-left: 40px;
            margin-bottom: 10px;
            .title {
                color: @dep;
            }
            .CodeMirror {
                width: 720px;
                margin-top: 20px;
                margin-bottom: 20px;
                height: 320px;
            }
        }
    }
</style>
