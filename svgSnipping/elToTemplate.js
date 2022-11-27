// 获取样式
var getStyle = function (dom, name) {
    // 获取结点的全部样式
    var allStyle = document.defaultView && document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(dom, null) :
        dom.currentStyle;

    // 如果没有指定属性名称，返回全部样式
    return typeof name === 'string' ?
        allStyle.getPropertyValue(name) :
        allStyle;
};

var elToTemplate = function (el) {
    var tagName = el.tagName.toLowerCase();

    var styleTemplate = "";
    var elStyles = getStyle(el);

    for (var index = 0; index < elStyles.length; index++) {
        var keyName = elStyles[index];
        styleTemplate += keyName + ":" + elStyles[keyName] + ";";
    }

    var template = "<" + tagName + " style='" + styleTemplate + "'>";

    for (var index = 0; index < el.childNodes.length; index++) {

        if (el.childNodes[index].nodeType == '3') {
            template += el.childNodes[index].textContent;
        } else if (el.childNodes[index].nodeType == '1') {
            template += elToTemplate(el.childNodes[index]);
        }

    }

    template += "</" + tagName + ">";

    return template;
};

window.elToTemplate = elToTemplate;