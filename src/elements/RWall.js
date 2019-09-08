const Shape = require('./Shape');
const { TRANSFORM_TYPES: { MOVE, LINE }} = require('../const');

class RWall extends Shape {
  getTransforms() {
    return [
      { type: MOVE, x: x => x + this.getSize() * Math.sqrt(3), y: y => y + this.getSize() /2 },
      { type: LINE, x: x => x, y: y => y - this.getHeight() },
      { type: LINE, x: x => x - (Math.sqrt(3) * this.getSize() )/ 2, y: y => y + this.getSize() /2 },
      { type: LINE, x: x => x, y: y => y + this.getHeight() },
    ]
  }
}

module.exports = RWall;
