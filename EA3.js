function makeColor() {

    // ID und WebGL
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');

    // Hintergrundfarbe
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Vertex Shader erstellen
    //EA3 START
    var vsSource = '' +        
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' +
           'color = col;' +
           'gl_Position = vec4(pos * 0.1 - 1.0 , 1);' +
        '}';
    //EA3 END
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Fragment Shader erstellen
    //EA3 START
    fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
           'gl_FragColor = color;' +
        '}';
    //EA3 END
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Programm erstellen
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    //EA3 START
    var vertices = new Float32Array([
        20, 1, 0,
        0, 1, 0,
        10, 15, 0]);

    // Colors as rgba.
    var colors = new Float32Array([1, 0, 0, 1,  0, 1, 0, 1,  0, 0, 1, 1,  0, 0, 0, 1]);

    // Index data.
    var indices = new Uint16Array([0, 1, 2]);
    //EA3 END


    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0); //EA3 (Attribut von 2 auf 3)
    gl.enableVertexAttribArray(posAttrib);


    //EA3 START
    var vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);


    // Setup index buffer object.
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices,
        gl.STATIC_DRAW);
    ibo.numerOfEmements = indices.length;

    gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements,
        gl.UNSIGNED_SHORT, 0);

    //EA3 END
}