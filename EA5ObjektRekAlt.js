var rek = ( function() {

	function createVertexData() {
		var t = (1 + Math.sqrt(5.0)) / 2.0;
		var recursion = 0;

		this.vertices = new Float32Array([
			-1, t, 0,
			1, t, 0,
			-1, -1, 0,
			1, -1, 0,
			0, -1, t,
			0, 1, t,
			0, -1, -t,
			0, 1, -t,
			t, 0, -1,
			t, 0, 1,
			-t, 0, -1,
			-t, 0, 1]);
		this.vertices.length = 12 * (recursion + 1);
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(vertices.length);
		var normals = this.normals;
		// Index data.
		
		this.indicesTris = new Uint16Array([
			0, 11, 5,
			0, 5, 1,
			0, 1, 7,
			0, 7, 10,
			0, 10, 11,
			1, 5, 9,
			5, 11, 4,
			11, 10, 2,
			10, 7, 6,
			7, 1, 8,
			3, 9, 4,
			3, 4, 2,
			3, 2, 6,
			3, 6, 8,
			3, 8, 9,
			4, 9, 5,
			2, 4, 11,
			6, 2, 10,
			8, 6, 7,
			9, 8, 1]);

		this.indicesTris.length = 20 * Math.pow(4, recursion);
       
		
		var indicesTris = this.indicesTris;

		for (var i = 0; i <= recursion; i++) {
			for (var j = 0; j <= 20 * Math.pow(4, i); j++) {

				
            }
		}


		this.indicesLines = new Uint16Array(indicesTris.length * 2);
		var indicesLines = this.indicesLines;


		for (var i = 0; i <= indicesTris.length; i++) {

			if (i % 3 == 0) {
				indicesLines[i * 2] = indicesTris[i];
				indicesLines[i * 2 + 1] = indicesTris[i + 1];
				indicesLines[i * 2 + 2] = indicesTris[i + 1];
				indicesLines[i * 2 + 3] = indicesTris[i + 2];
				indicesLines[i * 2 + 4] = indicesTris[i + 2];
				indicesLines[i * 2 + 5] = indicesTris[i];
			}
		}

		for (var j = 0; j <= vertices.length; j++) {

			if (j % 3 == 0) {
				normals[j] = 0;
				normals[j + 1] = 1;
				normals[j + 2] = 1;
			}
		}
	}

	return {
		createVertexData : createVertexData
	}

}());
