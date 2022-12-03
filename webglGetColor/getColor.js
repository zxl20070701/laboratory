export default function (gl) {

    var pixels = new Uint8Array(
        4 * gl.drawingBufferWidth * gl.drawingBufferHeight
    );
    gl.readPixels(
        0,
        0,
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels
    );

    return function (x, y) {
        y = gl.drawingBufferHeight - y;

        var pixelR = pixels[4 * (y * gl.drawingBufferWidth + x)];
        var pixelG = pixels[4 * (y * gl.drawingBufferWidth + x) + 1];
        var pixelB = pixels[4 * (y * gl.drawingBufferWidth + x) + 2];
        var pixelA = pixels[4 * (y * gl.drawingBufferWidth + x) + 3];

        return "rgba(" + pixelR + "," + pixelG + "," + pixelB + "," + pixelA + ")";
    };
};