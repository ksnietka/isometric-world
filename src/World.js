const Box = require('./Box');

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
        this.worldMap[i][j] = (new Box(ctx, this.camera, i, j, this.boxSize, heightMap[i][j], 'green'));
      }
    }
  }

  cleanFrame() {
    this.ctx.clearRect(0,0,this.canv.width,this.canv.height);
  }

  render() {
    this.cleanFrame();
    const [visibilityX, visibilityY] = this.camera.getRangeVisibility();
    for(let [rowI, row] of this.worldMap.entries()) {
      for(let [boxI, box] of row.entries()) {
        if(visibilityX[0] < boxI && visibilityX[1] > boxI && visibilityY[0] < rowI && visibilityY[1] > rowI)
          box.draw();
      }
    }
  }
}

module.exports = World;
