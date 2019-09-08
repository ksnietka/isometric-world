const { SEED } = require('../const');

class NoiseMapGenerator {
  constructor(maxHeight) {
    this.seed = this.generateSeed2d(SEED.SIZE, maxHeight);
  }

  generate(freq, sizeX, sizeY) {
    let map = [];
    for(let x = 0; x < sizeX; x++) {
      let row = [];
      for(let y = 0; y < sizeY; y++) {
        row.push(this.perlin2d(this.seed, freq, x, y));
      }
      map.push(row);
    }
    return map;
  }
  generateSeed (length, amplitude) {
    return Array.from({ length }, () => Math.random() * amplitude)
  }
  generateSeed2d(length, amplitude) {
    return Array.from({ length }, () => this.generateSeed(length, amplitude))
  }

  fade(t) { return t*t*t*(t*(t*6-15)+10); }
  lerp(a, b, t) { return (1-t)*a + t*b; }

  perlin2d(seed, freq, x, y) {
    const { fade, lerp } = this;
    const normX = x / freq;
    const normY = y / freq;
    const x0 = Math.floor(normX);
    const x1 = x0 + 1;
    const y0 = Math.floor(normY);
    const y1 = y0 + 1;
    const dx = normX - x0;
    const dy = normY - y0;
    const v00 = seed[y0][x0];
    const v01 = seed[y0][x1];
    const v10 = seed[y1][x0];
    const v11 = seed[y1][x1];
    const fadeX = fade(dx)
    const fadeY = fade(dy)
    return this.lerp(
      lerp(v00, v01, fadeX),
      lerp(v10, v11, fadeX),
      fadeY
    )
  }
}

module.exports = NoiseMapGenerator;
