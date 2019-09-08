const { TRANSFORM_TYPES: { MOVE, LINE }} = require('../const');


class Shape {
  constructor(ctx, camera, x, y, size, height, color) {
    this.ctx = ctx;
    this.size = size;
    this.height = height;
    this.color = color;
    this.camera = camera;
    this.startX = x;
    this.startY = y;
    this.setStartPosition();
  }

  getSize() {
    return this.size * this.camera.getZoom();
  }

  getHeight() {
    return this.height * this.camera.getZoom();
  }

  getTransforms() {
    throw new Error('Method is abstract and should be overridden in Derivative class');
  }
  perform(type) {
    if(type === MOVE) this.ctx.moveTo(this.x, this.y);
    if(type === LINE) this.ctx.lineTo(this.x, this.y)
  }

  setStartPosition() {
    //Calculating cartesian cords to isometric map;
    this.x =  this.startX * (this.getSize() * Math.sqrt(3) / 2)
      - this.startY * (this.getSize() * Math.sqrt(3) / 2) + this.camera.getX();
    this.y = (this.startX * this.getSize() / 2)
      + this.startY * (this.getSize()/2) + this.camera.getY();
  }

  draw() {
    this.setStartPosition();
    this.ctx.beginPath();
    for(let transform of this.getTransforms()) {
      this.x = transform.x(this.x);
      this.y = transform.y(this.y);
      this.perform(transform.type)
    }
    this.ctx.strokeStyle = 'grey';
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.stroke()
  }
}

module.exports = Shape;
