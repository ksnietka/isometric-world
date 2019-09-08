const initEventHandlers = (canvas, camera) => {
  canvas.addEventListener('mousedown', e => {
    let lastPosition = { x: e.clientX, y: e.clientY };
    const moveHandler = moveEvent =>  {
      const currentPosition = { x: moveEvent.clientX, y: moveEvent.clientY }

      camera.setX(camera.getX() - (lastPosition.x - moveEvent.x));
      camera.setY(camera.getY() - (lastPosition.y - moveEvent.y));

      lastPosition = currentPosition;
    };
    canvas.addEventListener('mousemove', moveHandler);
    canvas.addEventListener('mouseup', () => canvas.removeEventListener('mousemove', moveHandler))
  });

  document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.key === 'ArrowUp') camera.setZoom(camera.getZoom() + 0.01);
    if (e.key === 'ArrowDown') camera.setZoom(camera.getZoom() - 0.01);
  });
};

module.exports = initEventHandlers;
