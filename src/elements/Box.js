const Plane = require('./Plane');
const LWall = require('./LWall');
const RWall = require('./RWall');


class Box {
  constructor(ctx, camera, x, y, size, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = size;
    this.height = height;
    this.color = color;
    this.camera = camera;
    this.elements = [];
    this.setElements();
  }

  setColor(color) {
    for(let element of this.elements) {
      element.color = color
    }
  }

  setElements() {
    const { x, y, size, height, color, camera } = this;
    this.elements.push(new Plane(this.ctx, camera, x, y, size, 0, color));
    this.elements.push(new LWall(this.ctx, camera, x, y, size, height, '#809c13'));
    this.elements.push(new RWall(this.ctx, camera, x, y, size, height, '#abc32f'));
    this.elements.push(new Plane(this.ctx, camera, x, y, size, height, '#b5e550'));

  }
  draw() {
    for(let element of this.elements) {
      element.drawIsometric();
    }
  }
}

module.exports = Box;
