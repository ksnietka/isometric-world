const Shape = require('./Shape');
const { TRANSFORM_TYPES: { MOVE, LINE }} = require('../const');

class Plane extends Shape {
  getTransforms() {
    return [
      { type: MOVE, x: x => x + (this.getSize() * Math.sqrt(3) / 2), y: y => y - this.getHeight() },
      { type: LINE, x: x => x + (this.getSize() * Math.sqrt(3) / 2), y: y => y + this.getSize() / 2 },
      { type: LINE, x: x => x - (this.getSize() * Math.sqrt(3) / 2), y: y => y + this.getSize() / 2 },
      { type: LINE, x: x => x - (this.getSize() * Math.sqrt(3) / 2), y: y => y - this.getSize() / 2 },
    ]
  }
}

module.exports = Plane;
