//START EA2

function makeLines() {

    // ID und WebGL
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');

    // Hintergrundfarbe
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex Shader erstellen
    var vsSource = 'attribute vec2 pos;' +
        'void main(){ gl_Position = vec4(pos * 0.1 - 1.0 , 0, 1); }';;
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Fragment Shader erstellen
    fsSouce = 'void main() { gl_FragColor = vec4(1, 1, 1, 1); }';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Programm erstellen
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Untere Linien zeichnen
    var vertices = new Float32Array([
        20, 1,
        0, 1,
        2, 3,
        4, 1,
        6, 3,
        8, 1,
        10, 3,
        12, 1,
        14, 3,
        16, 1,
        18, 3,
        20, 1,
        20, 3,
        18, 1,
        16, 3,
        14, 1,
        12, 3,
        10, 1,
        8, 3,
        6, 1,
        4, 3,
        2, 1,
        0, 3,
        20, 3]);
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    gl.drawArrays(gl.LINE_STRIP, 0, 24);

    // Obere Linien
    var vertices = new Float32Array([
        20, 17,
        0, 17,
        2, 19,
        4, 17,
        6, 19,
        8, 17,
        10, 19,
        12, 17,
        14, 19,
        16, 17,
        18, 19,
        20, 17,
        20, 19,
        18, 17,
        16, 19,
        14, 17,
        12, 19,
        10, 17,
        8, 19,
        6, 17,
        4, 19,
        2, 17,
        0, 19,
        20, 19]);
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    gl.drawArrays(gl.LINE_STRIP, 0, 24);

    // Mittlere Linien
    var vertices = new Float32Array([
        0, 3,
        20, 17,
        0, 5,
        20, 15,
        0, 7,
        20, 13,
        0, 9,
        20, 11,
        0, 11,
        20, 9,
        0, 13,
        20, 7,
        0, 15,
        20, 5,
        0, 17,
        20, 3]);
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    //LINES statt LINE_STRIP
    gl.drawArrays(gl.LINES, 0, 16);
}

//END EA2