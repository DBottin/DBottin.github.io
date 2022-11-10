function makeShapes() {

    //Canvas 1

    // Get the WebGL context.
    var canvas = document.getElementById('canvas1');
    var gl = canvas.getContext('experimental-webgl');


    gl.clearColor(.95, .95, .95, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Compile vertex shader. 
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' + 'color = col;' +
        'gl_Position = vec4(0.1 * pos, 1);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Vertex data.
    // Positions, index data.
    var vertices, indices;
    // Fill the data arrays.
    createVertexDataDini();
    //createVertexDataHeli();
    //createVertexDataHyper();

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup constant color.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);

    // Setup index buffer object.
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        indices, gl.STATIC_DRAW);
    ibo.numberOfElements = indices.length;

    // Clear framebuffer and render primitives.
    
    gl.drawElements(gl.LINES, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);


    //Canvas 2

    // Get the WebGL context.
    var canvas = document.getElementById('canvas2');
    var gl = canvas.getContext('experimental-webgl');


    gl.clearColor(.95, .95, .95, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Compile vertex shader. 
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' + 'color = col;' +
        'gl_Position = vec4(0.5 * pos, 1);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Vertex data.
    // Positions, index data.
    var vertices, indices;
    // Fill the data arrays.
    //createVertexDataDini();
    createVertexDataHeli();
    //createVertexDataHyper();

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup constant color.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);

    // Setup index buffer object.
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        indices, gl.STATIC_DRAW);
    ibo.numberOfElements = indices.length;

    // Clear framebuffer and render primitives.

    gl.drawElements(gl.LINES, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);



    //Canvas 3

    // Get the WebGL context.
    var canvas = document.getElementById('canvas3');
    var gl = canvas.getContext('experimental-webgl');


    gl.clearColor(.95, .95, .95, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // Compile vertex shader. 
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' + 'color = col;' +
        'gl_Position = vec4(0.1 * pos, 1);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Vertex data.
    // Positions, index data.
    var vertices, indices;
    // Fill the data arrays.
    //createVertexDataDini();
    //createVertexDataHeli();
    createVertexDataHyper();

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup constant color.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttrib4f(colAttrib, 0, 0, 1, 1);

    // Setup index buffer object.
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        indices, gl.STATIC_DRAW);
    ibo.numberOfElements = indices.length;

    // Clear framebuffer and render primitives.

    gl.drawElements(gl.LINES, ibo.numberOfElements, gl.UNSIGNED_SHORT, 0);



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

        // Counter for entries in index array.
        var iIndex = 0;
        // Loop 1
        for (var i = 0, u = 0, v = 0.01; i <= n; i++, u += du, v += dv) {

            // Loop 2 
            for (var j = 0, a = 0, b = 0; j <= m; j++, a += da, b += db) {
                var iVertex = i * (m + 1) + j;
                var x = a * Math.cos(u) * Math.sin(v);
                var z = a * Math.sin(u) * Math.sin(v);
                var y = a * (Math.cos(v) + Math.log(Math.tan(v / 2))) + b * u;

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;
                // Set index.
                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - 1;
                    indices[iIndex++] = iVertex;
                }

                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - (m + 1);
                    indices[iIndex++] = iVertex;
                }
            }
        }
    }

    function createVertexDataHeli() {
        var n = 40;
        var m = 1;
        // Positions.
        vertices = new Float32Array(3 * (n + 1) * (m + 1));

        // Index data for Linestrip.
        indices = new Uint16Array(2 * 2 * n * m);

        var du = 8 / n;
        var dv = 8 / n;
        var da = 3 / m;

        // Counter for entries in index array.
        var iIndex = 0;
        // Loop 1
        for (var i = 0, u = -4, v = -4; i <= n; i++, u += du, v += dv) {

            // Loop 2
            for (var j = 0, a = 0; j <= m; j++, a += da) {
                var iVertex = i * (m + 1) + j;
                var x = Math.sinh(v) * Math.cos(a * u) / (1 + Math.cosh(u) * Math.cosh(v));
                var z = Math.sinh(v) * Math.sin(a * u) / (1 + Math.cosh(u) * Math.cosh(v));
                var y = Math.cosh(v) * Math.sinh(u) / (1 + Math.cosh(u) * Math.cosh(v));

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                // Set index.
        
                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - 1;
                    indices[iIndex++] = iVertex;
                }

   
                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - (m + 1);
                    indices[iIndex++] = iVertex;
                }
            }
        }
    }

    function createVertexDataHyper() {
        var n = 40;
        var m = 1;
        // Positions.
        vertices = new Float32Array(3 * (n + 1) * (m + 1));

        // Index data for Linestrip.
        indices = new Uint16Array(2 * 2 * n * m);

        var du = 2 * Math.PI / n;
        var dv = 4 / n;
        var da = 3 / m;
        var db = 3 / m;

        // Counter for entries in index array.
        var iIndex = 0;
        // Loop 1
        for (var i = 0, u = -Math.PI, v = -2; i <= n; i++, u += du, v += dv) {

            // Loop 2
            for (var j = 0, a = 0, b = 0; j <= m; j++, a += da, b += db) {
                var iVertex = i * (m + 1) + j;
                var x = a * Math.cosh(v) * Math.cos(u);
                var z = a * Math.cosh(v) * Math.sin(u);
                var y = b * Math.sinh(v);

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;

                // Set index.

                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - 1;
                    indices[iIndex++] = iVertex;
                }


                if (j > 0 && i > 0) {
                    indices[iIndex++] = iVertex - (m + 1);
                    indices[iIndex++] = iVertex;
                }
            }
        }
    }
}