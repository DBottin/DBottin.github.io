var rek = ( function() {

	function changeRec() {
		window.location.reload(false);
		
	}

	function createVertexData() {

		recursion = prompt("Gib die Rekursionstiefe an. (Empfohlen: Ganze Zahl zwischen 0 und 4)");

		
		
		this.vertices = new Float32Array(18 * Math.pow(5, recursion));

		this.vertices[0] = -1;	this.vertices[1] = 0;		                this.vertices[2] = -1;
		this.vertices[3] = -1;	this.vertices[4] = 0;		                this.vertices[5] = 1;		
		this.vertices[6] = 1;	this.vertices[7] = 0;		                this.vertices[8] = -1;
		this.vertices[9] = 1;   this.vertices[10] = 0;                      this.vertices[11] = 1;
		this.vertices[12] = 0;  this.vertices[13] = 2 / Math.sqrt(2);       this.vertices[14] = 0;
		this.vertices[15] = 0;  this.vertices[16] = -(2 / Math.sqrt(2));	this.vertices[17] = 0;

		
		// Normals.
		this.normals = new Float32Array(this.vertices.length);
		var normals = this.normals;
		// Index data.
		
		this.indicesTris = new Uint16Array(24 * Math.pow(5, recursion));

		this.indicesTris[0] = 0;		this.indicesTris[1] = 1;		this.indicesTris[2] = 4;
		this.indicesTris[3] = 1;		this.indicesTris[4] = 0;		this.indicesTris[5] = 5;
		this.indicesTris[6] = 2;		this.indicesTris[7] = 0;		this.indicesTris[8] = 4;
		this.indicesTris[9] = 0;		this.indicesTris[10] = 2;		this.indicesTris[11] = 5;
		this.indicesTris[12] = 1;		this.indicesTris[13] = 3;		this.indicesTris[14] = 4;
		this.indicesTris[15] = 3;		this.indicesTris[16] = 1;		this.indicesTris[17] = 5;
		this.indicesTris[18] = 3;		this.indicesTris[19] = 2;		this.indicesTris[20] = 4;
		this.indicesTris[21] = 2;		this.indicesTris[22] = 3;		this.indicesTris[23] = 5;
			

		
		

	


		for (var loop = 0; loop <= recursion; loop++) {
			for (var j = 0; j <= 24 * Math.pow(5, loop); j++) {

				if (j % 3 == 0) {
					this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)] = (this.vertices[this.indicesTris[j + 0] * 3 + 0] + this.vertices[this.indicesTris[j + 1] * 3 + 0]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)] = (this.vertices[this.indicesTris[j + 0] * 3 + 1] + this.vertices[this.indicesTris[j + 1] * 3 + 1]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)] = (this.vertices[this.indicesTris[j + 0] * 3 + 2] + this.vertices[this.indicesTris[j + 1] * 3 + 2]) / 2;

					this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)] = (this.vertices[this.indicesTris[j + 1] * 3 + 0] + this.vertices[this.indicesTris[j + 2] * 3 + 0]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)] = (this.vertices[this.indicesTris[j + 1] * 3 + 1] + this.vertices[this.indicesTris[j + 2] * 3 + 1]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)] = (this.vertices[this.indicesTris[j + 1] * 3 + 2] + this.vertices[this.indicesTris[j + 2] * 3 + 2]) / 2;

					this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)] = (this.vertices[this.indicesTris[j + 2] * 3 + 0] + this.vertices[this.indicesTris[j + 0] * 3 + 0]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)] = (this.vertices[this.indicesTris[j + 2] * 3 + 1] + this.vertices[this.indicesTris[j + 0] * 3 + 1]) / 2;
					this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)] = (this.vertices[this.indicesTris[j + 2] * 3 + 2] + this.vertices[this.indicesTris[j + 0] * 3 + 2]) / 2;

					var prev1 = this.indicesTris[j + 0];
					var prev2 = this.indicesTris[j + 1];
					var prev3 = this.indicesTris[j + 2];

					if (loop >= 0) {
						this.indicesTris[24 * Math.pow(5, loop) + 0 + (j * 4)] = prev1;
						this.indicesTris[24 * Math.pow(5, loop) + 1 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;
						this.indicesTris[24 * Math.pow(5, loop) + 2 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;

						this.indicesTris[24 * Math.pow(5, loop) + 3 + (j * 4)] = prev2;
						this.indicesTris[24 * Math.pow(5, loop) + 4 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;
						this.indicesTris[24 * Math.pow(5, loop) + 5 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;

						this.indicesTris[24 * Math.pow(5, loop) + 6 + (j * 4)] = prev3;
						this.indicesTris[24 * Math.pow(5, loop) + 7 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;
						this.indicesTris[24 * Math.pow(5, loop) + 8 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;

						this.indicesTris[24 * Math.pow(5, loop) + 9 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;
						this.indicesTris[24 * Math.pow(5, loop) + 10 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;
						this.indicesTris[24 * Math.pow(5, loop) + 11 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;
					} else {
						this.indicesTris[0 + (j * 4)] = prev1;
						this.indicesTris[1 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;
						this.indicesTris[2 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;

						this.indicesTris[3 + (j * 4)] = prev2;
						this.indicesTris[4 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;
						this.indicesTris[5 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;

						this.indicesTris[6 + (j * 4)] = prev3;
						this.indicesTris[7 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;
						this.indicesTris[8 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;

						this.indicesTris[9 + (j * 4)] = (18 * Math.pow(5, loop) + 0 + (j * 3)) / 3;
						this.indicesTris[10 + (j * 4)] = (18 * Math.pow(5, loop) + 3 + (j * 3)) / 3;
						this.indicesTris[11 + (j * 4)] = (18 * Math.pow(5, loop) + 6 + (j * 3)) / 3;
                    }
					



					this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 0 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 1 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 2 + (j * 3)]));

					this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 3 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 4 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 5 + (j * 3)]));

					this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)]));
					this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)] = this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)]
						/ (Math.sqrt(this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 6 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 7 + (j * 3)]
							+ this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)] * this.vertices[18 * Math.pow(5, loop) + 8 + (j * 3)]));

				
					
                }



			}

			for (var c = 0; c <= 23; c++) {
				if (c % 3 == 0) {
					this.vertices[c] = this.vertices[c] / (Math.sqrt(this.vertices[c] * this.vertices[c] + this.vertices[c + 1] * this.vertices[c + 1] + this.vertices[c + 2] * this.vertices[c + 2]));
					this.vertices[c + 1] = this.vertices[c + 1] / (Math.sqrt(this.vertices[c] * this.vertices[c] + this.vertices[c + 1] * this.vertices[c + 1] + this.vertices[c + 2] * this.vertices[c + 2]));
					this.vertices[c + 2] = this.vertices[c + 2] / (Math.sqrt(this.vertices[c] * this.vertices[c] + this.vertices[c + 1] * this.vertices[c + 1] + this.vertices[c + 2] * this.vertices[c + 2]));
				}
			}
		}

		
		
		

		

		var indicesTris = this.indicesTris;
		var vertices = this.vertices;

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
		createVertexData: createVertexData,
		changeRec: changeRec
	}

}());
