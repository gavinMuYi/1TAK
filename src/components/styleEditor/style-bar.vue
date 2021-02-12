<template>
    <div class="style-bar">
        <div v-show="domName">
            <pop ref="cssInfo" clazz="cssInfo-pop">
                <div v-html="cssConfigJSON[infoIndex].tip"></div>
            </pop>
            <div class="style-item style-title">
                <span class="style-item-left">DOM: </span>
                <span>{{ domName }}</span>
                <span class="btn style-item-btn" @click="update">更新</span>
            </div>
            <div class="rule-items-br"></div>
            <div class="style-item"
                v-for="(rule, index) in cssConfigJSON"
                :key="rule.key + Math.random()">
                <span class="style-item-left rule-left">
                    <div>{{ rule.label }}<span v-pop:cssInfo.hover.delay class="iconfont icon-switch" @mouseover="infoIndex = index"></span></div>
                    <div class="key-info">{{ rule.key }}</div>
                </span>
                <span class="style-rule-component">
                    <component :is="rule.component" :options="rule.options" v-model="currentStyle[rule.key]" :key="rule.key + Math.random()"></component>
                </span>
            </div>
        </div>
        <div v-show="!domName">从左侧选择一个节点</div>
    </div>
</template>

<script>
    import pop from '../pop';
    import SingleSelect from './components/single-select';
    import Input from './components/input';
    import Color from './components/color';
    import cssConfigJSON from './cssConfig.json';
    import clone from 'clone';

    export default {
        name: 'StyleBar',
        components: {
            pop,
            Input,
            Color,
            SingleSelect
        },
        props: {
            domName: {
                type: String,
                default: ''
            },
            domStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        watch: {
            domStyle: {
                handler (val) {
                    this.currentStyle = clone(val);
                },
                deep: true
            },
            currentStyle: {
                handler (val) {
                    this.$emit('change', val);
                },
                deep: true
            }
        },
        data () {
            return {
                currentStyle: clone(this.domStyle),
                infoIndex: 0
            }
        },
        computed: {
            cssConfigJSON () {
                if (this.domName.length === 9) {
                    return cssConfigJSON.css.filter(rule => {
                        return ['position', 'left', 'top', 'right', 'bottom'].indexOf(rule.key) < 0;
                    });
                }
                return cssConfigJSON.css;
            }
        },
        methods: {
            change () {
                this.$emit('diffChangeStyle', this.currentStyle);
            },
            update () {
                this.$emit('update');
            }
        }
    }
</script>

<style lang="less">
    .cssInfo-pop {
        width: 610px;
        height: 520px;
        overflow: auto;
        padding: 10px 20px;
        box-sizing: border-box;
        .article-body h2 {
            margin: 10px 0;
            font-size: 20px;
        }
        p {
            margin: 4px;
        }
        div.code {
            width: 98%;
            border: 1px solid #d4d4d4;
            background-color: #f6f4f0;
            color: #444;
            padding: 5px;
            margin: 0;
        }
        table.reference, table.tecspec {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 4px;
            margin-top: 4px;
        }
        table.reference tr:nth-child(odd) {
            background-color: #f6f4f0;
        }
        table.reference tr:nth-child(even) {
            background-color: #fff;
        }
        table.browserref {
            border-collapse: collapse;
            width: 100%;
        }
        table.browserref tr:nth-child(odd) {
            background-color: #fff;
        }
        table.browserref th {
            height: 32px;
            background-repeat: no-repeat;
            background-position: center center;
            border: 1px solid #d4d4d4;
            background-color: #fff;
            font-weight: normal;
            color: #555;
            padding: 5px;
            vertical-align: middle;
        }
        h1 {
            margin-block-end: 0em;
        }
        .reference {
            th:nth-child(3) {
                display: none;
            }
            td:nth-child(3) {
                display: none;
            }
        }
        table.browserref .bsChrome {
            background-image: url(./images/compatible_chrome.gif);
        }
        table.browserref .bsEdge {
            background-image: url(./images/compatible_edge.gif);
        }
        table.browserref .bsFirefox {
            background-image: url(./images/compatible_firefox.gif);
        }
        table.browserref .bsSafari {
            background-image: url(./images/compatible_safari.gif);
        }
        table.browserref .bsOpera {
            background-image: url(./images/compatible_opera.gif);
        }
        hr, .example {
            display: none;
        }
        a {
            display: none;
        }
        table.browserref td {
            border: 1px solid #d4d4d4;
            text-align: center;
            padding: 5px;
            padding-top: 7px;
            padding-bottom: 7px;
            vertical-align: top;
        }
        table.browserref tr:nth-child(even) {
            background-color: #f6f4f0;
        }
        table.tecspec td, table.tecspec th {
            border: 1px solid #d4d4d4;
            padding: 5px;
            padding-top: 7px;
            padding-bottom: 7px;
            vertical-align: top;
            text-align: left;
        }
        table.reference th {
            color: #fff;
            background-color: #555;
            border: 1px solid #555;
            font-size: 12px;
            padding: 3px;
            vertical-align: top;
            text-align: left;
        }
        table.reference td {
            line-height: 2em;
            min-width: 24px;
            border: 1px solid #d4d4d4;
            padding: 5px;
            padding-top: 7px;
            padding-bottom: 7px;
            vertical-align: top;
        }
    }
    .style-bar {
        .rule-items-br {
            margin-top: 70px;
        }
        .style-title {
            padding-bottom: 20px;
            margin-bottom: 20px;
            position: absolute;
            width: 355px;
            padding-top: 20px;
            top: 31px;
            z-index: 10000;
            background: #FFF;
            border-bottom: 1px solid #ededed;
            &:before{
                content:"";
                position:absolute;
                box-sizing:border-box;
                border-bottom: 1px solid #ededed;
                transform-origin: bottom center;
                transform:rotateZ(90deg) scale(1);
                left: 235px;
                top: 10px;
                width: 47px;
                height: 19px;
            }
        }
        .style-item {
            margin-bottom: 15px;
            .style-item-left {
                display: inline-block;
                margin-right: 5px;
                color: #191f1e;
                font-weight: 700;
                vertical-align: middle;
                .key-info {
                    font-size: 12px;
                    color: #a4a9af;
                    font-weight: 400;
                }
            }
            .style-rule-component {
                float: right;
            }
            .style-item-btn {
                float: right;
                width: 50px;
                display: inline-block;
                text-align: center;
            }
            .rule-left {
                position: relative;
                margin-right: 20px;
                &:after {
                    content: ':';
                    position: absolute;
                    right: -12px;
                    top: 2px;
                    font-size: 20px;
                    font-weight: 500;
                }
            }
        }
    }
</style>
