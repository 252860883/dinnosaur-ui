

// 生成 canvas 然后渲染
export default function __canvasWM({
    // 使用 ES6 的函数默认值方式设置参数的默认取值
    // 具体参见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
    container = document.body,
    width = '130px',
    height = '130px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = "12px microsoft yahei",
    fillStyle = 'rgba(184, 184, 184, 0.6)',
    content = '请勿外传',
    rotate = '20',
    zIndex = 1000
} = {}) {
    var args = arguments;
    var canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);

    var base64Url = canvas.toDataURL();
    const __wm = document.querySelector('.__wm');
    const watermarkDiv = __wm || document.createElement("div");
    const styleStr = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');
    if (!__wm) {
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    }
    // 给图片添加 MutationObserver，防止被改动
    // 创建并返回一个新的 MutationObserver 它会在指定的DOM发生变化时被调用
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        let mo = new MutationObserver(function () {
            const __wm = document.querySelector('.__vm')
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                mo.disconnect();
                mo = null;
                __canvasWM(JSON.parse(JSON.stringify(args)))
            }
        })
        mo.observe(container, {
            attributes: true, // 设为true以观察受监视元素的属性值变更
            subtree: true, // 设为true以扩展监视范围到目标节点下的整个子树的所有节点
            childList: true // 设为true以监视目标节点（如果subtree为true，则包含子孙节点）添加或删除新的子节点
        })
    }
};