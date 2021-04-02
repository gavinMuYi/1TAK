<template>
    <textarea ref="mycode" v-model="localVal" class="ide-textarea" />
</template>

<script>
    import beautify from 'js-beautify';
    import 'codemirror/theme/ambiance.css';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/addon/hint/show-hint.css';
    import 'codemirror/addon/fold/foldgutter.css';
    import 'codemirror/addon/fold/foldcode';
    import 'codemirror/addon/fold/foldgutter';
    import 'codemirror/addon/fold/brace-fold';
    import 'codemirror/addon/fold/comment-fold';
    let CodeMirror = require('codemirror/lib/codemirror');
    require('codemirror/addon/edit/matchbrackets');
    require('codemirror/addon/selection/active-line');
    require('codemirror/addon/hint/show-hint');
    require('codemirror/addon/hint/sql-hint');
    require('codemirror/mode/javascript/javascript.js');
    require('codemirror/mode/vue/vue.js');
    require('codemirror/mode/css/css.js');

    export default {
        name: 'IdeTextarea',
        props: {
            code: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'javascript'
            }
        },
        data () {
            return {
                IDE: null,
                localVal: this.format()
            }
        },
        mounted () {
            let mime = this.type;
            let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                mode: {name: mime, json: true},
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                matchBrackets: true
            });
            this.IDE = editor;
            editor.on('cursorActivity', function () {
                editor.showHint()
            });
        },
        methods: {
            getValue () {
                return this.IDE.getValue();
            },
            format () {
                let res = this.code
                switch (this.type) {
                case 'application/json':
                    res = JSON.stringify(JSON.parse(this.code), null, 2);
                    break;
                case 'javascript':
                    res = beautify(this.code, { indent_size: 2, space_in_empty_paren: true });
                    break;
                default:
                    break;
                }
                return res;
            }
        }
    }
</script>

<style lang="less">
    .ide-textarea {
        width: 260px;
        height: 150px;
    }
      .cm-s-default .cm-string {
        color: #11aa56!important;
      }
      .CodeMirror-gutters {
        background: @sub!important;
      }
      .CodeMirror-gutter-elt {
        color: @dep!important;
        text-align: center!important;
      }
</style>
