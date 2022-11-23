window.painterRender = function (drawPainter, regionPainter) {

    var regions = {},//区域映射表
        rgb = [0, 0, 0],//区域标识色彩,rgb(0,0,0)表示空白区域
        p = 'r';//色彩增值位置

    var instance = {

        // 配置画笔
        config: function (params) {
            for (var key in params) {
                drawPainter[key] = params[key];
            }
            return instance;
        },

        // 设置当前绘制区域名称
        setRegion: function (regionName) {
            if (regions[regionName] == undefined) regions[regionName] = {
                'r': function () {
                    rgb[0] += 1;
                    p = 'g';
                    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                },
                'g': function () {
                    rgb[1] += 1;
                    p = 'b';
                    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                },
                'b': function () {
                    rgb[2] += 1;
                    p = 'r';
                    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                }
            }[p]();

            regionPainter.fillStyle = regions[regionName];
            regionPainter.strokeStyle = regions[regionName];

            return instance;
        },

        // 获取当前事件触发的区域名称
        getRegion: function (event) {

            // 获取点击点的颜色
            var currentRGBA = regionPainter.getImageData(event.offsetX - 0.5, event.offsetY - 0.5, 1, 1).data;

            // 查找当前点击的区域
            for (var key in regions) {
                if ("rgb(" + currentRGBA[0] + "," + currentRGBA[1] + "," + currentRGBA[2] + ")" == regions[key]) {
                    return key;
                }
            }

            return "[[不在任何区域]]";
        },

        /**
         * 下面定义一些画笔方法
         */

        // 绘制填充矩形
        fillRect: function (x, y, width, height) {
            drawPainter.fillRect(x, y, width, height);
            regionPainter.fillRect(x, y, width, height);

            return instance;
        }

    };

    return instance;
};
