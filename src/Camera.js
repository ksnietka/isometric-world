class Camera {
  constructor(boxSize, range) {
    this.range = range;
    this.boxSize = boxSize;
    this.positionX = 0;
    this.positionY = 0;
    this.zoom = 1;
  }
  setX(x) {
    this.positionX = x;
  }
  setY(y) {
    this.positionY = y;
  }
  setZoom(zoom) {
    this.zoom = zoom;
  }
  getZoom() {
    return this.zoom;
  }
  getX() {
    return this.positionX;
  }
  getY() {
    return this.positionY;
  }
  getFocus () {
    //TODO: Determining focus still not work well. I have to find more sophisticated way to calculating that.
    return {
      x: -( 2 * (this.positionX/ this.boxSize) / Math.sqrt(3) + ((this.positionY/this.boxSize) - (this.positionX/ this.boxSize)/Math.sqrt(3))/4),
      y: -(((this.positionY/this.boxSize) - (this.positionX/this.boxSize)/ Math.sqrt(3))/2)
    }
  }
  getRangeVisibility() {
    const focus = this.getFocus();
    return [
      [focus.x - this.range, focus.x + this.range],
      [focus.y - this.range, focus.y + this.range]
    ]
  }
}

module.exports = Camera;
