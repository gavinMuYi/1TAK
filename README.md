# 1TAK

可视化建站平台

## 定义结构

* 单元组件  

dom结构  
|    div #id
|        unit  

```javascript
{
    type: 'unit', // 单元组件
    name: 'INPUT',
    id: 'INPUT-hash' // 组件id
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

* 组合组件  

```javascript
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
