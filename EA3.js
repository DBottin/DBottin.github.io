function makeColor() {

    // ID und WebGL
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');

    // Hintergrundfarbe
    gl.clearColor(0, 0, 0, 0.5);
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
    //Mittlere Figur
    var vertices = new Float32Array([
        10, 10, 0,
        5, 8, 0,
        5, 12, 0,
        8, 15, 0,
        12, 15, 0,
        15, 12, 0,
        15, 8, 0,
        12, 5, 0,
        8, 5, 0]);

    //Farben rgba
    var colors = new Float32Array([
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        0, 1, 0, 1,
        0, 0, 1, 1]);

    //Eckdaten der Dreiecke
    var indices = new Uint16Array([
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 6,
        0, 6, 7,
        0, 7, 8,
        0, 8, 1]);
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

    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    ibo.numerOfEmements = indices.length;

    gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements, gl.UNSIGNED_SHORT, 0);

    //Rahmen
    var vertices = new Float32Array([
        1, 1, 0,
        3, 4, 0,
        1, 7, 0,
        3, 10, 0,
        1, 13, 0,
        3, 16, 0,
        1, 19, 0,
        4, 17, 0,
        7, 19, 0,
        10, 17, 0,
        13, 19, 0,
        16, 17, 0,
        19, 19, 0,
        17, 16, 0,
        19, 13, 0,
        17, 10, 0,
        19, 7, 0,
        17, 4, 0,
        19, 1, 0,
        16, 3, 0,
        13, 1, 0,
        10, 3, 0,
        7, 1, 0,
        4, 3, 0]);

    var colors = new Float32Array([
        1, 0, 0, 1,
        1, 0, 1, 1,
        0, 0, 1, 1,
        0, 1, 1, 1,
        0, 1, 0, 1,
        1, 1, 0, 1,
        1, 0, 0, 1,
        1, 1, 0, 1,
        0, 1, 0, 1,
        0, 1, 1, 1,
        0, 0, 1, 1,
        1, 0, 1, 1,       
        1, 0, 0, 1,
        1, 0, 1, 1,
        0, 0, 1, 1,
        0, 1, 1, 1,
        0, 1, 0, 1,
        1, 1, 0, 1,
        1, 0, 0, 1,
        1, 1, 0, 1,
        0, 1, 0, 1,
        0, 1, 1, 1,
        0, 0, 1, 1,
        1, 0, 1, 1]);
  
    var indices = new Uint16Array([
        0, 1, 2,
        1, 2, 3,
        2, 3, 4,
        3, 4, 5,
        4, 5, 6,
        5, 6, 7,
        6, 7, 8,
        7, 8, 9,
        8, 9, 10,
        9, 10, 11,
        10, 11, 12,
        11, 12, 13,
        12, 13, 14,
        13, 14, 15,
        14, 15, 16,
        15, 16, 17,
        16, 17, 18,
        17, 18, 19,
        18, 19, 20,
        19, 20, 21,
        20, 21, 22,
        21, 22, 23,
        22, 23, 0,
        23, 0, 1]);
  
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(posAttrib);


    var vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    ibo.numerOfEmements = indices.length;

    gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements, gl.UNSIGNED_SHORT, 0);
    //EA3 END
}