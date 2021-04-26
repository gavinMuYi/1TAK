<template>
    <div :class="['pre-script-editor', { 'pre-script-editor-open': open }]">
        <span class="iconfont icon-zuzhuangguanli" @click="update"></span>
        <span class="iconfont icon-shangyibu top-icon" @click="closePannel"></span>
        <div class="pre-script-title">
            前置脚本
            <span
                @click="preScript.useScript = !preScript.useScript"
                :class="['iconfont', {'icon--qiyong': !preScript.useScript}, {'icon-qiyong': preScript.useScript}]">
            </span>
        </div>
        <div class="list" v-show="preScript.useScript">
            <span class="title">scriptList：</span>
            <span v-for="(item, index) in preScript.scriptList" :key="item" class="item">
                {{ item }}<span class="iconfont icon-shangyibu" @click="del('scriptList', index)" />
            </span>
            <span class="iconfont icon-gengduo1" @click="scriptList = true" v-if="!scriptList"></span>
            <span v-else>
                <div class="input-box">
                    <input v-model="newScript" @change="add('scriptList', 'newScript')" />
                </div>
                <span class="iconfont icon-shangyibu" @click="newScript = '';scriptList = false"/>
            </span>
        </div>
        <div class="list" v-show="preScript.useScript">
            <span class="title">styleList：</span>
            <span v-for="(item, index) in preScript.styleList" :key="item" class="item">
                {{ item }}<span class="iconfont icon-shangyibu" @click="del('styleList', index)" />
            </span>
            <span class="iconfont icon-gengduo1" @click="styleList = true" v-if="!styleList"></span>
            <span v-else>
                <div class="input-box">
                    <input v-model="newStyle" @change="add('styleList', 'newStyle')" />
                </div>
                <span class="iconfont icon-shangyibu" @click="newStyle = '';styleList = false"/>
            </span>
        </div>
        <div class="script-text" v-show="preScript.useScript" :key="'interface-preScript' + Math.random()">
            <span class="title">脚本：</span>
            <ide-textarea :code="preScript.script" ref="scriptIDE" />
        </div>
    </div>
</template>

<script>
    import IdeTextarea from './ideTextarea';
    import qs from 'qs';
    import clone from 'clone';
    export default {
        name: 'preScriptEditor',
        components: {
            IdeTextarea
        },
        data () {
            return {
                open: false,
                scriptList: false,
                styleList: false,
                newScript: '',
                newStyle: '',
                preScript: clone(window.preScript)
            }
        },
        methods: {
            openPannel () {
                this.open = true;
            },
            closePannel () {
                this.preScript = clone(window.preScript);
                this.open = false;
            },
            update () {
                var params = {
                    ...this.preScript,
                    script: this.$refs.scriptIDE.getValue()
                };
                this.$ajax.post('/updatePreScript',
                                qs.stringify({
                                    preScript: JSON.stringify(params)
                                })
                ).then(e => {
                    if (e.code === 0) {
                        alert('保存成功~');
                        window.location.reload();
                    }
                });
            },
            add (str, url) {
                this.preScript[str].push(this[url]);
                this[url] = '';
                this[str] = false;
            },
            del (str, index) {
                this.preScript[str].splice(index, 1);
            }
        }
    }
</script>

<style lang="less">
    .pre-script-editor {
        position: fixed;
        z-index: 10000000;
        top: 0px;
        left: 0px;
        background: #034a43e8;
        width: 100%;
        height: 100%;
        overflow: auto;
        border-right: 1px solid #034a43;
        display: none;
        background: #034a43e8;
        .icon-qiyong,
        .icon--qiyong {
            font-size: 26px;
            margin-right: 20px;
            z-index: 10;
        }
        .icon--qiyong {
            color: #7e7e7e!important;
        }
        .script-text {
            padding-left: 40px;
            margin-bottom: 50px;
            height: 700px;
            .title {
                color: @dep;
            }
            .CodeMirror {
                width: ~'calc(100% - 40px)';
                margin-top: 20px;
                margin-bottom: 20px;
                height: 700px;
            }
        }
        .list {
            padding-left: 40px;
            margin-bottom: 10px;
            .title {
                color: @dep;
            }
            .item {
                display: inline-block;
                padding: 5px 20px;
                background: @sub;
                color: @dep;
                border-radius: 15px;
                margin-left: 20px;
                margin-bottom: 10px;
                .icon-shangyibu {
                    margin-left: 10px;
                    display: inline-block;
                }
            }
            .icon-gengduo1 {
                color: @dep;
                display: inline-block;
                margin-left: 20px;
            }
            .icon-shangyibu {
                color: @dep;
            }
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
        }
    }
    .pre-script-editor-open {
        display: block;
        .icon-zuzhuangguanli {
            position: fixed;
            right: 60px;
            top: 20px;
            font-size: 26px;
            color: #fff;
            &:hover {
                color: @dep;
                cursor: pointer;
            }
        }
        .top-icon {
            position: fixed;
            right: 20px;
            top: 20px;
            font-size: 26px;
            color: #fff;
            &:hover {
                color: @dep;
                cursor: pointer;
            }
        }
        .pre-script-title {
            color: @dep;
            margin: 30px;
            font-size: 24px;
            font-weight: 700;
        }
    }
</style>
