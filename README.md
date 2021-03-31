# Vv Page

可视化建站平台

# 规划

(插槽组,v-for,v-if)作用域传参,指令,流程图->函数,组件增加

## 定义结构

* 单元组件  

```javascript
/*
    <div #id x,y>
        <unit />
    </div>
*/

{
    type: 'unit', // 单元组件
    name: 'INPUT',
    id: 'INPUT-hash' // 组件id
    layout: {
        position: {
            x: 0, // 相对上级dom绝对定位
            y: 0
        },
        style: {
            // dom树遍历
            #INPUT-hash: {
                border: none //组件外层div
            },
            #INPUT-hash.a.b#c: {
                color: #000000
            }
        }
    }
}
```

* 组合组件  

```javascript
/*
    <div #id x,y>
        <div #id-u x-u,y-u>
            <unit props @event/>
        </div>
        <div v-if>
            <div #id-u x-u,y-u>
                <unit props @event/>
            </div>
        <div>
        <div group v-for=",i">
            <div #id-u x-u,y-u>
                <unit-a i (props @event)/>
            </div>
            <div #id-u x-u,y-u>
                <unit-b i (props @event)/>
            </div>
        </div>
    </div>
*/

{
    type: 'combination', // 组合组件
    name: 'customer-combination',
    id: 'combination-hash' // 组件id
    layout: {
        position: {
            x: 0, // 相对上级dom绝对定位
            y: 0,
        },
        style: {
            #combination-hash: {
                border: none // 只设置组件外层div
            }
        }
    },
    props: {
        combination-hash-$local-C: {
            type: 'String',
            dafault: ''
        },
        combination-hash-data... // 从data中选择+前缀命名
    },
    data: {
        $local-C: '用户自定义变量',
        INPUT-hash: {
            // 初始化配置时从 vue组件对象获取，clone一遍props，若在scoped对象中可选择设置于method中，
            // 若依赖props设置 用户自定义变量
            INPUT-hash.props
        }
    },
    event: ['combination-customer-event'],
    eventHandler: {
        INPUT-hash.eventA: function(e) {
            this.INPUT2-hash.x = e
            this.$emit('combination-customer-event', this.INPUT2-hash.x)
        }
    },
    children: [ // 被嵌套获得参数loop-hash-item,loop-hash-id,dom从外向里
        {
            kind: 'unit',
            component: {
                type: 'unit',
                name: 'INPUT',
                id: 'INPUT-hash'
                ...
            }
        },
        {
            kind: 'combination',
            component: {
                type: 'combination',
                ...
            }
        },
        {
            kind: 'group',
            children: [{
                kind: kind: 'unit',
                component: {
                    type: 'unit',
                    ...
                }
            }, {
                kind: kind: 'unit',
                component: {
                    type: 'unit',
                    ...
                }
            }]
        },
        {
            kind: 'loop',
            flagData: 'loop-hash',
            flagDesign: function() { // 注入methods,被嵌套获得参数loop-hash-item,loop-hash-id dom从外向里
                res = this.x + this.$local-C + ...
                return res
            },
            scoped: { // 配置时获得 loop-hash-item, loop-hash-id
                kind: 'group',
                children: [{
                    kind: kind: 'unit',
                    component: {
                        type: 'unit',
                        ...
                    }
                }, {
                    kind: kind: 'unit',
                    component: {
                        type: 'unit',
                        ...
                    }
                }]
            }
        },
        {
            kind: 'if',
            flagData: 'if-hash',
            flagDesign: function() { // 注入methods
                res = this.y + this.$local-C + ...
                return Boolean(res)
            },
            scoped: {
                kind: 'unit',
                component: {
                    type: 'unit',
                    name: 'INPUT',
                    id: 'INPUT-hash'
                    ...
                }
            }
        }
    ]
}
```

* 嵌套组件  

```javascript
// 外层一定是一个有slot的单元组件
/*
    <div #id x,y>
        <unit-f>
            <div #id x,y slot scopedData>
                <unit-c />
            </div>
        </unit-f>
    </div>
*/
{
    type: 'nestification', // 嵌套组件
    name: 'customer-nestification',
    id: 'nestification-hash' // 组件id
    layout: {
        position: {
            x: 0, // 相对上级dom绝对定位
            y: 0,
        },
        style: {
            #nestification-hash: {
                border: none // 只设置组件外层div
            }
        }
    },
    component: {
        type: 'unit', // 单元组件
        name: 'INPUT',
        id: 'INPUT-hash' // 组件id
        layout: {
            position: {
                x: 0, // 相对上级dom绝对定位
                y: 0
            },
            style: {
                // dom树遍历
                #INPUT-hash: {
                    border: none //组件外层div
                },
                #INPUT-hash.a.b#c: {
                    color: #000000
                }
            }
        }
    },
    child: {
        slotA: {
            kind: 'group',
            children: [{
                kind: kind: 'unit',
                component: {
                    type: 'unit',
                    ...
                }
            }, {
                kind: kind: 'unit',
                component: {
                    type: 'unit',
                    ...
                }
            }]
        }
    },
    props: {
        combination-hash-$local-C: {
            type: 'String',
            dafault: ''
        },
        combination-hash-data... // 从data中选择+前缀命名
    },
    data: {
        $local-C: '用户自定义变量',
        INPUT-hash: {
            // 初始化配置时从 vue组件对象获取，clone一遍props，若在child对象中可选择设置于method中，
            // 若依赖props设置 用户自定义变量
            INPUT-hash.props
        }
    },
    event: ['combination-customer-event'],
    eventHandler: {
        INPUT-hash.eventA: function(e) {
            this.INPUT2-hash.x = e
            this.$emit('combination-customer-event', this.INPUT2-hash.x)
        }
    }
}
```

* 页面  
