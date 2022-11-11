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
        'gl_Position = vec4(0.15 * pos, 1);' +
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
    //Daten für Vertices, Farben, Indices
    var vertices, colors, indicesLines, indicesTris;
    createBohemianDome();
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

    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;


    //Dreiecke zeichnen
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    //Linien zeichnen
    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);


 
    function createBohemianDome() {
        var n = 30;
        var m = 7;

        vertices = new Float32Array(3 * (n + 1) * (m + 1));
        colors = new Float32Array(4 * (n + 1) * (m + 1));

        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris = new Uint16Array(3 * 2 * n * m);

        var du = 2 * Math.PI / n;
        var dv = 2 * Math.PI / m;
        var a = 4;
        var b = 1;
        var c = 1;

        var iLines = 0;
        var iTris = 0;

        //Loop 1
        for (var i = 0, u = 0; i <= n; i++, u += du) {

            //Loop 2
            for (var j = 0, v = 0; j <= m; j++, v += dv) {

                var iVertex = i * (m + 1) + j;
                var x = a * Math.cos(u); 
                var y = b * Math.cos(v) + a * Math.sin(u);
                var z = c * Math.sin(v); 

                //Vertices
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                //Farben
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


                //Indices
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }


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
    //EA4 END


    //Zweite Flaeche

    var canvas = document.getElementById('canvas2');
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
        'gl_Position = vec4(0.3 * pos, 1);' +
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

    var vertices, colors, indicesLines, indicesTris;
    createShoeSurface();

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


    var iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
    iboLines.numberOfElements = indicesLines.length;

    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;


    //Dreiecke zeichnen
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    //Linien zeichnen
    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);


    //EA4 START
    function createShoeSurface() {
        var n = 32;
        var m = 32;

        vertices = new Float32Array(3 * (n + 1) * (m + 1));
        colors = new Float32Array(4 * (n + 1) * (m + 1));

        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris = new Uint16Array(3 * 2 * n * m);

        var du = 4 / n;
        var dv = 4 / m;

        var iLines = 0;
        var iTris = 0;

        // Loop 1
        for (var i = 0, u = -2; i <= n; i++, u += du) {

            // Loop 2
            for (var j = 0, v = -2; j <= m; j++, v += dv) {
                var iVertex = i * (m + 1) + j;
                var x = u;
                var z = v;
                var y = Math.pow(u, 3) / 3 - Math.pow(v, 2) / 2;
                //var y = Math.pow(u, 3) - 3 * u * Math.pow(v, 2); Wenn y auf dies gesetzt wird, entsteht statt der Shoe Surface der Monkey Saddle

                //Vertices
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                //Farben
                if (j % 6 == 0) {
                    colors[iVertex * 4 + 0] = 1;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (j % 6 == 1) {
                    colors[iVertex * 4 + 0] = 1;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (j % 6 == 2) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (j % 6 == 3) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (j % 6 == 4) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 0.75;
                }

                if (j % 6 == 5) {
                    colors[iVertex * 4 + 0] = 1;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }


                //Indices
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }


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


    //Eigene Flaeche

    var canvas = document.getElementById('canvas3');
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
        'gl_Position = vec4(0.05 * pos, 1);' +
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

    var vertices, colors, indicesLines, indicesTris;
    createOwn();

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


    var iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
    iboLines.numberOfElements = indicesLines.length;

    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;


    //Dreiecke zeichnen
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES, iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    //Linien zeichnen
    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES, iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);


    //EA4 START
    function createOwn() {
        var n = 16;
        var m = 16;

        vertices = new Float32Array(3 * (n + 1) * (m + 1));
        colors = new Float32Array(4 * (n + 1) * (m + 1));

        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris = new Uint16Array(3 * 2 * n * m);

        var du = 4.5 / n;
        var dv = 4 / m;

        var iLines = 0;
        var iTris = 0;

        // Loop 1
        for (var i = 0, u = -0.5; i <= n; i++, u += du) {

            // Loop 2
            for (var j = 0, v = 0; j <= m; j++, v += dv) {
                var iVertex = i * (m + 1) + j;
                var x = Math.pow(u, 3) / 3 - Math.pow(v, 2) / 2;
                var y = u * Math.cos(v);
                var z = Math.cos(u);
                

                //Vertices
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                //Farben
                if (i % 9 == 0) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 0.75;
                }

                if (i % 9 == 1) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 0.5;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 2) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 3) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0.5;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 4) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 5) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 0.5;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 6) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 1;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 7) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 0.5;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 1;
                }

                if (i % 9 == 8) {
                    colors[iVertex * 4 + 0] = 0;
                    colors[iVertex * 4 + 1] = 0;
                    colors[iVertex * 4 + 2] = 1;
                    colors[iVertex * 4 + 3] = 0.75;
                }


                //Indices
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }


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
}

//EA4 END