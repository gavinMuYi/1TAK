exports.styleCompConfig = [{
    key: 'align-content',
    label: '垂直对齐',
    component: 'select',
    options: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit'],
    tip: `<div class="article-body">
    <div class="article-intro" id="content">
    
    <h1>CSS <span class="color_h1">align-content</span> 属性</h1>
<p><a href="css-reference.html"><img class="navup" src="/images/up.gif" alt="CSS 参考手册"> CSS 参考手册</a></p>

<br>

<div class="example">


<h2 class="example">实例</h2>
<p>对齐弹性盒的 &lt;div&gt; 元素的各项：</p>
<div class="example_code">
<div class="hl-main"><span class="hl-identifier">div</span><span class="hl-code">
</span><span class="hl-brackets">{</span><span class="hl-code">
</span><span class="hl-reserved">display:</span><span class="hl-code"> </span><span class="hl-code">flex</span><span class="hl-reserved"></span><span class="hl-code">;
</span><span class="hl-reserved">flex-flow:</span><span class="hl-code"> </span><span class="hl-code">row</span><span class="hl-code"> </span><span class="hl-code">wrap</span><span class="hl-reserved"></span><span class="hl-code">;
</span><span class="hl-reserved">align-content:</span><span class="hl-code">space-around</span><span class="hl-reserved"></span><span class="hl-code">;
</span><span class="hl-brackets">}</span></div>
</div>
<br>
<a target="_blank" class="tryitbtn" href="/try/try.php?filename=trycss3_align-content">尝试一下 »</a>


</div>
<hr>
<h2>浏览器支持</h2>
<p>表格中的数字表示支持该属性的第一个浏览器的版本号。</p>
<p>紧跟在 -webkit-, -ms- 或 -moz- 后的数字为支持该前缀属性的第一个版本。</p>
<table class="browserref">
<tbody><tr>
<th style="width:25%;font-size:16px;text-align:left">属性</th>
<th style="width:15%" class="bsChrome" title="Chrome"></th>
<th style="width:15%" class="bsEdge" title="Internet Explorer / Edge"></th>
<th style="width:15%" class="bsFirefox" title="Firefox"></th>
<th style="width:15%" class="bsSafari" title="Safari"></th>
<th style="width:15%" class="bsOpera" title="Opera"></th>                
</tr>
<tr>
<td style="text-align:left">align-content</td>
<td>21.0</td>
<td>11.0</td>    
<td>28.0</td>
<td>9.0<br>7.0&nbsp;-webkit-</td>
<td>12.1</td>
</tr>
</tbody></table>
<hr>

<h2>定义和用法</h2>

<p>align-content 属性在弹性容器内的各项没有占用交叉轴上所有可用的空间时对齐容器内的各项（垂直）。</p>

<p><strong>提示：</strong>使用 justify-content 属性对齐主轴上的各项（水平）。</p>

<p><strong>注意：</strong>容器内必须有多行的项目，该属性才能渲染出效果。</p>
<table class="tecspec">
<tbody><tr>
<th style="width:25%">默认值：</th>
<td width="75%">stretch</td>
</tr>
<tr>
<th>继承：</th>
<td>否</td>
</tr>
<tr>
<th>可动画化：</th>
<td>否。请参阅 <a href="css-animatable.html"><em>可动画化（animatable）</em></a>。
</td>
</tr>
<tr>
<th>版本：</th>
<td>CSS3</td>
</tr>
<tr>
<th>JavaScript 语法：</th>
<td><i>object</i>.style.alignContent="center"
<a target="_blank" class="playitbtn tryitbtnsyntax" href="/try/try.php?filename=trycss3_js_align-content">尝试一下</a>
</td>
</tr>
</tbody></table>
<br>

<hr>

<h2>CSS 语法</h2>
<div class="code notranslate"><div>
align-content: stretch|center|flex-start|flex-end|space-between|space-around|initial|inherit;</div></div>

<h2>默认值</h2>
<table class="reference notranslate">
<tbody><tr>
<th style="width:22%">值</th>
<th style="width:68%">描述</th>
<th style="width:10%">测试</th>
</tr>
<tr>
<td>stretch</td>
<td><p>默认值。元素被拉伸以适应容器。</p>
<p>各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸。</p></td>  
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=stretch">测试 »</a></td>       
</tr>
<tr>
<td>center</td>
<td><p>元素位于容器的中心。</p>

<p>各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐，保持弹性盒容器的侧轴起始内容边界和第一行之间的距离与该容器的侧轴结束内容边界与第最后一行之间的距离相等。（如果剩下的空间是负数，则各行会向两个方向溢出的相等距离。）</p></td>      
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=center">测试 »</a></td>          
</tr>
<tr>
<td>flex-start</td>
<td><p>元素位于容器的开头。</p>
各<p>行向弹性盒容器的起始位置堆叠。弹性盒容器中第一行的侧轴起始边界紧靠住该弹性盒容器的侧轴起始边界，之后的每一行都紧靠住前面一行。</p></td>         
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=flex-start">测试 »</a></td>          
</tr>
<tr>
<td>flex-end</td>
<td><p>元素位于容器的结尾。</p>
<p>各行向弹性盒容器的结束位置堆叠。弹性盒容器中最后一行的侧轴起结束界紧靠住该弹性盒容器的侧轴结束边界，之后的每一行都紧靠住前面一行。</p></td>      
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=flex-end">测试 »</a></td>          
</tr>
<tr>
<td>space-between</td>
<td><p>元素位于各行之间留有空白的容器内。</p>
<p>各行在弹性盒容器中平均分布。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'flex-start'。在其它情况下，第一行的侧轴起始边界紧靠住弹性盒容器的侧轴起始内容边界，最后一行的侧轴结束边界紧靠住弹性盒容器的侧轴结束内容边界，剩余的行则按一定方式在弹性盒窗口中排列，以保持两两之间的空间相等。</p></td>       
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=space-between">测试 »</a></td>          
</tr>
<tr>
<td>space-around</td>
<td><p>元素位于各行之前、之间、之后都留有空白的容器内。</p>
<p>各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半。如果剩余的空间是负数或弹性盒容器中只有一行，该值等效于'center'。在其它情况下，各行会按一定方式在弹性盒容器中排列，以保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半。</p></td>      
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=space-around">测试 »</a></td>          
</tr>
<tr>
<td>initial</td>
<td>设置该属性为它的默认值。请参阅 <a href="/cssref/css-initial.html"><em>initial</em></a>。</td>
<td><a target="_blank" class="playitbtn" href="/try/playit.php?f=playcss_align-content&amp;preval=initial">测试 »</a></td>          
</tr>
<tr>
<td>inherit</td>
<td>从父元素继承该属性。请参阅 <a href="/cssref/css-inherit.html"><em>inherit</em></a>。</td>
<td></td>
</tr>
</tbody></table>
<br>
<hr>

<p><a href="css-reference.html"><img class="navup" src="/images/up.gif" alt="CSS 参考手册"> CSS 参考手册</a></p><!-- 其他扩展 -->
                
    </div>
    
</div>`
}, {
    key: '',
    component: '',
    options: [],
    tip: ``,
    label: ''
}]
