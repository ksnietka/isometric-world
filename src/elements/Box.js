const Plane = require('./Plane');
const LWall = require('./LWall');
const RWall = require('./RWall');
const Color = require('./../helpers/Color');


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
    for(let element of this.elements)
      element.color = color;
  }

  setStroke(color) {
    for(let element of this.elements)
      element.stroke = color;
  }

  setHeight(height) {
    for(let element of this.elements)
      element.height = height;
  }

  createSea(seaLevel) {
    this.setColor('blue');
    this.setStroke('blue');
    this.setHeight(seaLevel);
  }

  setElements() {
    const { x, y, size, height, color, camera } = this;
    this.elements.push(new Plane(this.ctx, camera, x, y, size, 0, color));
    this.elements.push(new LWall(this.ctx, camera, x, y, size, height, Color.brightness(color, -20)));
    this.elements.push(new RWall(this.ctx, camera, x, y, size, height,  Color.brightness(color, -10)));
    this.elements.push(new Plane(this.ctx, camera, x, y, size, height, color));

  }
  isVisible() {
    const [visibilityX, visibilityY] = this.camera.getRangeVisibility();
    return visibilityX[0] < this.x && visibilityX[1] > this.x
      && visibilityY[0] < this.y && visibilityY[1] > this.y;
  }
  draw() {
    for(let element of this.elements) {
      element.draw();
    }
  }
}

module.exports = Box;
