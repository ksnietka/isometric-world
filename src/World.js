const Box = require('./elements/Box');

class World {
  constructor(canv, ctx, camera, noiseGenerator, xSize, ySize, boxSize) {
    this.canv = canv;
    this.generator = noiseGenerator;
    this.ctx = ctx;
    this.camera = camera;
    this.sizeX = xSize;
    this.sizeY = ySize;
    this.boxSize = boxSize;
    this.worldMap = Array.from({ length: this.sizeX }, () => Array.from({ length: this.sizeY}));
  }

  initializeMap() {
    const heightMap = this.generator.generate(5, this.sizeX, this.sizeY);

    for (let i = 0; i < this.sizeX; i++) {
      for(let j = 0; j < this.sizeY; j++) {
        this.worldMap[i][j] = new Box(this.ctx, this.camera, j, i, this.boxSize, heightMap[i][j], 'green');
      }
    }
  }

  cleanFrame() {
    this.ctx.clearRect(0,0,this.canv.width,this.canv.height);
  }

  render() {
    this.cleanFrame();
    for(let row of this.worldMap) {
      for(let box of row) {
        if(box.isVisible())
          box.draw();
      }
    }
  }
}

module.exports = World;
