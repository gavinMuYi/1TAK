exports.iconCompMap = {
    'icon-yuanliao': 'G_TEST',
    'icon-shurukuang': 'G_INPUT',
    'icon-wenzi': 'G_TEXT',
    'icon-tupian': 'G_IMAGE',
    'icon-anniu': 'G_BUTTON',
    'icon-fuzhi': 'G_TABLE',
    'icon-tishi3': 'G_POP',
    'icon-tubiaozhexiantu': 'G_LINE',
    'icon-quyutu': 'G_AREA',
    'icon-huanzhuangtu': 'G_CYCLE',
    'icon-bingtu': 'G_PIE',
    'icon-tubiaozhuzhuangtu': 'G_COLUMN'
};

exports.unitCompIcons = [{
    key: 'icon-yuanliao',
    name: '测试组件'
}, {
    key: 'icon-wenzi',
    name: '文本'
}, {
    key: 'icon-tupian',
    name: '图片'
}, {
    key: 'icon-shurukuang',
    name: '输入框'
}, {
    key: 'icon-anniu',
    name: '按钮'
}, {
    key: 'icon-fuzhi',
    name: '列表'
}, {
    key: 'icon-tishi3',
    name: '提示'
}, {
    key: 'icon-tubiaozhexiantu',
    name: '折线图'
}, {
    key: 'icon-quyutu',
    name: '区域图'
}, {
    key: 'icon-huanzhuangtu',
    name: '环状图'
}, {
    key: 'icon-bingtu',
    name: '饼图'
}, {
    key: 'icon-tubiaozhuzhuangtu',
    name: '柱状图'
}];

var outCompMap = {};
window.$Manager('get', 'customerCampsConfig').forEach(item => {
    outCompMap[item.key] = item.name;
});

exports.outCompMap = outCompMap;

exports.outCompIcons = window.$Manager('get', 'customerCampsConfig');
