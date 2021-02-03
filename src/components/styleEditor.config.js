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
        key: 'color',
        component: 'color',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
            <td><i>color_name</i></td>
            <td>规定颜色值为颜色名称的颜色（比如 red）。</td>
        </tr>
        
        <tr>
            <td><i>hex_number</i></td>
            <td>规定颜色值为十六进制值的颜色（比如 #ff0000）。</td>
        </tr>
        
        <tr>
            <td><i>rgb_number</i></td>
            <td>规定颜色值为 rgb 代码的颜色（比如 rgb(255,0,0)）。</td>
        </tr>
        
        <tr>
            <td>inherit</td>
            <td>规定应该从父元素继承颜色。</td>
        </tr>
        </tbody></table>`,
        label: '文本颜色'
    }, {
        key: 'direction',
        component: 'select',
        options: ['ltr', 'rtl', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>ltr</td>
        <td>默认。文本方向从左到右。</td>
        </tr>
        
        <tr>
        <td>rtl</td>
        <td>文本方向从右到左。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 direction 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '文本方向'
    }, {
        key: 'line-height',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>normal</td>
        <td>默认。设置合理的行间距。</td>
        </tr>
        
        <tr>
        <td><i>number</i></td>
        <td>设置数字，此数字会与当前的字体尺寸相乘来设置行间距。</td>
        </tr>
        
        <tr>
        <td><i>length</i></td>
        <td>设置固定的行间距。</td>
        </tr>
        
        <tr>
        <td><i>%</i></td>
        <td>基于当前字体尺寸的百分比行间距。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 line-height 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '行高'
    }, {
        key: 'letter-spacing',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>normal</td>
        <td>默认。规定字符间没有额外的空间。</td>
        </tr>
        
        <tr>
        <td><i>length</i></td>
        <td>定义字符间的固定空间（允许使用负值）。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 letter-spacing 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '字符间距'
    }, {
        key: 'text-align',
        component: 'select',
        options: ['left', 'right', 'center', 'justify', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>left</td>
        <td>把文本排列到左边。默认值：由浏览器决定。</td>
        </tr>
        
        <tr>
        <td>right</td>
        <td>把文本排列到右边。</td>
        </tr>
        
        <tr>
        <td>center</td>
        <td>把文本排列到中间。</td>
        </tr>
        
        <tr>
        <td>justify</td>
        <td>实现两端对齐文本效果。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 text-align 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '对齐方式'
    }, {
        key: 'text-decoration',
        component: 'select',
        options: ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>none</td>
        <td>默认。定义标准的文本。</td>
        </tr>
        
        <tr>
        <td>underline</td>
        <td>定义文本下的一条线。</td>
        </tr>
        
        <tr>
        <td>overline</td>
        <td>定义文本上的一条线。</td>
        </tr>
        
        <tr>
        <td>line-through</td>
        <td>定义穿过文本下的一条线。</td>
        </tr>
        
        <tr>
        <td>blink</td>
        <td>定义闪烁的文本。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 text-decoration 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '文本修饰'
    }, {
        key: 'text-indent',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td><i>length</i></td>
        <td>定义固定的缩进。默认值：0。</td>
        </tr>
        
        <tr>
        <td><i>%</i></td>
        <td>定义基于父元素宽度的百分比的缩进。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 text-indent 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '缩进'
    }, {
        key: 'text-shadow',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th style="width:25%;">值</th>
        <th>描述</th>
        <th style="width:8%;">测试</th>
        </tr>
        
        <tr>
        <td><i>h-shadow</i></td>
        <td>必需。水平阴影的位置。允许负值。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_text-shadow">测试</a></td>
        </tr>
        
        <tr>
        <td><i>v-shadow</i></td>
        <td>必需。垂直阴影的位置。允许负值。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_text-shadow">测试</a></td>
        </tr>
        
        <tr>
        <td><i>blur</i></td>
        <td>可选。模糊的距离。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_text-shadow&amp;p=11">测试</a></td>
        </tr>
        
        <tr>
        <td><i>color</i></td>
        <td>可选。阴影的颜色。参阅 <a href="/cssref/css_colors_legal.asp" title="CSS 合法颜色值">CSS 颜色值</a>。</td>
        <td><a target="_blank" href="/tiy/c.asp?f=css_text-shadow&amp;p=13">测试</a></td>
        </tr>
        </tbody></table>`,
        label: '文本阴影'
    }, {
        key: 'text-transform',
        component: 'select',
        options: ['none', 'capitalize', 'uppercase', 'lowercase', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>none</td>
        <td>默认。定义带有小写字母和大写字母的标准的文本。</td>
        </tr>
        
        <tr>
        <td>capitalize</td>
        <td>文本中的每个单词以大写字母开头。</td>
        </tr>
        
        <tr>
        <td>uppercase</td>
        <td>定义仅有大写字母。</td>
        </tr>
        
        <tr>
        <td>lowercase</td>
        <td>定义无大写字母，仅有小写字母。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 text-transform 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '控制字母'
    }, {
        key: 'unicode-bidi',
        component: 'select',
        options: ['normal', 'embed', 'bidi-override'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>normal</td>
        <td>元素不会对双向算法打开附加的一层嵌套。对于行内元素，顺序的隐式重排会跨元素边界进行。</td>
        </tr>
        
        <tr>
        <td>embed</td>
        <td>如果是一个行内元素，这个值对于双向算法会打开附件的一层嵌套。这个嵌套层的方向由 direction 属性指定。会在元素内部隐式地完成顺序重排。这对应于在元素开始处增加一个 LRE（对于 direction:ltr ：U+202A）或 RLE（对于 direction:rtl ：U+202B），并在元素的最后增加一个 PDF（U+202C）。</td>
        </tr>
        
        <tr>
        <td>bidi-override</td>
        <td>这会为行内元素创建一个覆盖。对于块级元素，将为不在另一块中的行内后代创建一个覆盖。这说明，顺序重排在元素内部严格按照 direction 属性进行；忽略了双向算法的隐式部分。这对应于在元素开始处增加一个 LRO（对于 direction:ltr ：U+202D）或 RLO（对于 direction:rtl ：U+202E），并在元素最后增加一个 PDF（U+202C）。</td>
        </tr>
        </tbody></table>`,
        label: '文本方向'
    }, {
        key: 'white-space',
        component: 'select',
        options: ['normal', 'pre', 'nowrap', 'pre-wrap', 'pre-line', 'inherit'],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>normal</td>
        <td>默认。空白会被浏览器忽略。</td>
        </tr>
        
        <tr>
        <td>pre</td>
        <td>空白会被浏览器保留。其行为方式类似 HTML 中的 &lt;pre&gt; 标签。</td>
        </tr>
        
        <tr>
        <td>nowrap</td>
        <td>文本不会换行，文本会在在同一行上继续，直到遇到 &lt;br&gt; 标签为止。</td>
        </tr>
        
        <tr>
        <td>pre-wrap</td>
        <td>保留空白符序列，但是正常地进行换行。</td>
        </tr>
        
        <tr>
        <td>pre-line</td>
        <td>合并空白符序列，但是保留换行符。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 white-space 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '元素空白'
    }, {
        key: 'word-spacing',
        component: 'input',
        options: [],
        tip: `<table class="dataintable">
        <tbody><tr>
        <th>值</th>
        <th>描述</th>
        </tr>
        
        <tr>
        <td>normal</td>
        <td>默认。定义单词间的标准空间。</td>
        </tr>
        
        <tr>
        <td><i>length</i></td>
        <td>定义单词间的固定空间。</td>
        </tr>
        
        <tr>
        <td>inherit</td>
        <td>规定应该从父元素继承 word-spacing 属性的值。</td>
        </tr>
        </tbody></table>`,
        label: '字间距'
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
    }]
}]
