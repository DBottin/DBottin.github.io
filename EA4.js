function makeShapes() {

    // ID und WebGL
    var canvas = document.getElementById('canvas1');
    var gl = canvas.getContext('experimental-webgl');

    // Hintergrundfarbe
    gl.clearColor(0, 0, 0, 0.5);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Vertex Shader erstellen
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' +
        'color = col;' +
        'gl_Position = vec4(0.4 * pos, 1);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Fragment Shader erstellen
    fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Programm erstellen
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    //EA4 START
    var vertices, colors, indicesLines, indicesTris;
    createVertexData();
    //EA4 END

    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);


    //EA4 START
    var vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    var iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
    iboLines.numberOfElements = indicesLines.length;
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);


    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);




    function createVertexData() {
        var n = 32;
        var m = 32;
        // Positions.
        vertices = new Float32Array(3 * (n + 1) * (m + 1));
        colors = new Float32Array(4 * (n + 1) * (m + 1));
        // Index data.
        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris = new Uint16Array(3 * 2 * n * m);

        var du = 4 / n;
        var dv = 2 * Math.PI / n;
        var da = 4 / m;
        var db = 1 / m;
        var dc = 1 / m;
        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;

        // Loop angle t.
        for (var i = 0, u = -2, v = 0.01; i <= n; i++, u += du, v += dv) {

            // Loop radius r.
            for (var j = 0, a = -2, b = 0, c = 0; j <= m; j++, a += da, b += db, c += dc) {
                var iVertex = i * (m + 1) + j;
                var x = u;
                var z = a;
                //var y = Math.pow(u, 3) - 3 * u * Math.pow(a, 2);
                var y = Math.pow(u, 3) / 3 - Math.pow(a, 2) / 2;

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                if (iVertex % 2 == 0) {
                    colors[iVertex * 4] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                    colors[iVertex * 4 + 4] = 1;
                    colors[iVertex * 4 + 5] = 0;
                    colors[iVertex * 4 + 6] = 0;
                    colors[iVertex * 4 + 7] = 1;
                }
                

                // Set index.
                // Line on beam.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                // Line on ring.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }

                // Set index.
                // Two Triangles.
                if (j > 0 && i > 0) {
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                    //        
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1) - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                }
            }
        }
    }

    function createVertexDataDini() {
        var n = 40;
        var m = 6;
        // Positions.
        vertices = new Float32Array(3 * (n + 1) * (m + 1));

        // Index data for Linestrip.
        indices = new Uint16Array(2 * 2 * n * m);

        var du = 4 * Math.PI / n;
        var dv = 2 / n - 0.01 / n;
        var da = 6 / m;
        var db = 0.7 / m;
        var dc = 1 / m;

        // Counter for entries in index array.
        var iIndex = 0;
        // Loop angle t.
        for (var i = 0, u = 0, v = 0.01; i <= n; i++, u += du, v += dv) {

            // Loop radius r.
            for (var j = 0, a = 0, b = 0, c = 0; j <= m; j++, a += da, b += db, c += dc) {
                var iVertex = i * (m + 1) + j;
                var x = a * Math.cos(u) * Math.sin(v);
                var z = a * Math.sin(u) * Math.sin(v);
                var y = a * (Math.cos(v) + Math.log(Math.tan(v / 2))) + b * u;

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;
                // Set index.
                // Line on beam.
                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - 1;
                    indices[iIndex++] = iVertex;
                }

                // Line on ring.
                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - (m + 1);
                    indices[iIndex++] = iVertex;
                }
            }
        }
    }
}