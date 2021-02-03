[{
    key: 'background',
    label: '背景属性',
    group: [{
        key: 'background-color',
        components: 'color',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
            <td><i>color_name</i></td>
            <td>规定颜色值为颜色名称的背景颜色（比如 red）。</td>
        </tr>
        
        <tr>
            <td><i>hex_number</i></td>
            <td>规定颜色值为十六进制值的背景颜色（比如 #ff0000）。</td>
        </tr>
        
        <tr>
            <td><i>rgb_number</i></td>
            <td>规定颜色值为 rgb 代码的背景颜色（比如 rgb(255,0,0)）。</td>
        </tr>
        
        <tr>
            <td>transparent</td>
            <td>默认。背景颜色为透明。</td>
        </tr>
        
        <tr>
            <td>inherit</td>
            <td>规定应该从父元素继承 background-color 属性的设置。</td>
        </tr>
        </tbody></table>`,
        label: '背景颜色'
    }, {
        key: 'background-position',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>
        <ul>
        <li>top left</li>
        <li>top center</li>
        <li>top right</li>
        <li>center left</li>
        <li>center center</li>
        <li>center right</li>
        <li>bottom left</li>
        <li>bottom center</li>
        <li>bottom right</li>
        </ul>
        </td>
        <td>
        <p>如果您仅规定了一个关键词，那么第二个值将是"center"。</p>
        <p>默认值：0% 0%。</p>
        </td>
        </tr>
        
        <tr>
        <td>x% y%</td>
        <td>
        <p>第一个值是水平位置，第二个值是垂直位置。</p>
        <p>左上角是 0% 0%。右下角是 100% 100%。</p>
        <p>如果您仅规定了一个值，另一个值将是 50%。</p>
        </td>
        </tr>
        
        <tr>
        <td>xpos ypos</td>
        <td>
        <p>第一个值是水平位置，第二个值是垂直位置。</p>
        <p>左上角是 0 0。单位是像素 (0px 0px) 或任何其他的 CSS 单位。</p>
        <p>如果您仅规定了一个值，另一个值将是50%。</p>
        <p>您可以混合使用 % 和 position 值。</p>
        </td>
        </tr>
        </tbody></table>`,
        label: '背景图像位置'
    }, {
        key: 'background-size',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th style="width:25%;">值</th>
        <th>描述</th>
        <th style="width:8%;">测试</th>
        </tr>
        
        <tr>
        <td><i>length</i></td>
        <td>
            <p>设置背景图像的高度和宽度。</p>
            <p>第一个值设置宽度，第二个值设置高度。</p>
            <p>如果只设置一个值，则第二个值会被设置为 "auto"。</p>
        </td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-size">测试</a></td>
        </tr>
        
        <tr>
        <td><i>percentage</i></td>
        <td>
            <p>以父元素的百分比来设置背景图像的宽度和高度。</p>
            <p>第一个值设置宽度，第二个值设置高度。</p>
            <p>如果只设置一个值，则第二个值会被设置为 "auto"。</p>
        </td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-size&amp;p=5">测试</a></td>
        </tr>
        
        <tr>
        <td>cover</td>
        <td>
            <p>把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。</p>
            <p>背景图像的某些部分也许无法显示在背景定位区域中。</p>
        </td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-size&amp;p=7">测试</a></td>
        </tr>
        
        <tr>
        <td>contain</td>
        <td>把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-size&amp;p=8">测试</a></td>
        </tr>
        </tbody></table>`,
        label: '背景图片尺寸'
    }, {
        key: 'background-repeat',
        component: 'select',
        options: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>repeat</td>
        <td>默认。背景图像将在垂直方向和水平方向重复。</td>
        </tr>
        
        <tr>
        <td>repeat-x</td>
        <td>背景图像将在水平方向重复。</td>
        </tr>
        
        <tr>
        <td>repeat-y</td>
        <td>背景图像将在垂直方向重复。</td>
        </tr>
        
        <tr>
        <td>no-repeat</td>
        <td>背景图像将仅显示一次。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 background-repeat 属性的设置。</td>
        </tr>
        </tbody></table>`,
        label: '重复背景图像'
    }, {
        key: 'background-origin',
        component: 'select',
        options: ['padding-box', 'border-box', 'content-box'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th style="width:25%;">值</th>
        <th>描述</th>
        <th style="width:8%;">测试</th>
        </tr>
        
        <tr>
        <td>padding-box</td>
        <td>背景图像相对于内边距框来定位。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-origin">测试</a></td>
        </tr>
        
        <tr>
        <td>border-box</td>
        <td>背景图像相对于边框盒来定位。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-origin&amp;p=2">测试</a></td>
        </tr>
        
        <tr>
        <td>content-box</td>
        <td>背景图像相对于内容框来定位。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-origin&amp;p=3">测试</a></td>
        </tr>
        </tbody></table>`,
        label: '背景图片定位区域'
    }, {
        key: 'background-clip',
        component: 'select',
        options: ['border-box', 'padding-box', 'content-box'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th style="width:25%;">值</th>
        <th>描述</th>
        <th style="width:8%;">测试</th>
        </tr>
        
        <tr>
        <td>border-box</td>
        <td>背景被裁剪到边框盒。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-clip">测试</a></td>
        </tr>
        
        <tr>
        <td>padding-box</td>
        <td>背景被裁剪到内边距框。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-clip&amp;p=2">测试</a></td>
        </tr>
        
        <tr>
        <td>content-box</td>
        <td>背景被裁剪到内容框。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_background-clip&amp;p=3">测试</a></td>
        </tr>
        </tbody></table>`,
        label: '背景绘制区域'
    }, {
        key: 'background-attachment',
        component: 'select',
        options: ['scroll', 'fixed', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>scroll</td>
        <td>默认值。背景图像会随着页面其余部分的滚动而移动。</td>
        </tr>
        
        <tr>
        <td>fixed</td>
        <td>当页面的其余部分滚动时，背景图像不会移动。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 background-attachment 属性的设置。</td>
        </tr>
        </tbody></table>`,
        label: '背景图像滚动'
    }, {
        key: 'background-image',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>url('<i>URL</i>')</td>
        <td>指向图像的路径。</td>
        </tr>
        
        <tr>
        <td>none</td>
        <td>默认值。不显示背景图像。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 background-image 属性的设置。</td>
        </tr>
        </tbody></table>`,
        label: '背景图像'
    }]
}, {
    key: 'text',
    label: '文本属性',
    group: [{
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }, {
        key: '',
        component: '',
        options: [],
        tip: ``,
        label: ''
    }]
}]
