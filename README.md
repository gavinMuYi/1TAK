# 1TAK

可视化建站平台

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
        data... // 从data中选择
    },
    data: {
        INPUT-hash: {
            INPUT-hash.props
        }
    },
    eventHandler: {
        INPUT-hash.eventA: function(e) {}
    },
    children: [
        {
            kind: 'single',
            component: {
                type: 'unit',
                name: 'INPUT',
                id: 'INPUT-hash'
                ...
            }
        }
    ]
}
```

* 嵌套组件  

```javascript
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

* 页面  
