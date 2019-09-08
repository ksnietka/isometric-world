const NoiseGenerator = require('./helpers/NoiseGenerator');
const Camera = require('./Camera');
const World = require('./World');
const initHandlers = require('./handlers');

const canvas = document.getElementById('canv');
ctx = canvas.getContext('2d');

const BOX_SIZE = 30;
const camera = new Camera(BOX_SIZE,  40);
const generator = new NoiseGenerator(200);
const world = new World(canvas, ctx, camera, generator, 500, 500, BOX_SIZE);

world.initializeMap();

const animate =() => {
  world.render();
  requestAnimationFrame(animate)
};
animate();

initHandlers(canvas, camera);
