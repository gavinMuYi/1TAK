<template>
    <div class="style-bar">
        <div v-if="domName">
            <pop ref="cssInfo" clazz="cssInfo-pop">
                <div v-html="styleCompConfig[0].tip"></div>
            </pop>
            <div class="style-item">
                <span class="style-item-left">DOM: </span>
                <span>{{ domName }}</span>
            </div>
            {{ domStyle }}
            <span v-pop:cssInfo.hover.delay>sss</span>
        </div>
        <div v-else>从左侧选择一个节点</div>
    </div>
</template>

<script>
    import pop from '../pop';
    import { styleCompConfig } from './styleEditor.config.js';

    export default {
        name: 'StyleBar',
        components: {
            pop
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
        data () {
            return {
                styleCompConfig
            }
        }
    }
</script>

<style lang="less">
    .cssInfo-pop {
        width: 570px;
        height: 500px;
        overflow: auto;
        margin-left: -250px;
        padding: 10px 20px;
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
        .style-item {
            margin-bottom: 10px;
            .style-item-left {
                display: inline-block;
                margin-right: 5px;
                color: #191f1e;
                font-weight: 700;
            }
        }
    }
</style>
