# 1TAK

可视化建站平台

## 定义结构

* 单元组件

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

* 嵌套组件  

* 页面  
