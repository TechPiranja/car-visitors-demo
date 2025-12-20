export class CarVisitors {
  /**
   * Render the street and cars animation
   * @param {HTMLElement} container - The DOM element to render into
   * @param {Array<{carColor: string, wheelColor: string}>} [cars] - Array of car configs
   */
  static render(container, cars) {
    // Remove previous canvas if any
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100px';
    canvas.style.display = 'block';
    canvas.style.position = 'relative';
    canvas.width = container.offsetWidth;
    canvas.height = 100;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Generate random cars if not provided
    if (!Array.isArray(cars) || cars.length === 0) {
      cars = CarVisitors._generateRandomCars(4);
    }
    // Assign random directions and positions
    const carStates = cars.map((car, i) => ({
      ...car,
      x: Math.random() * canvas.width,
      y: 60 + Math.random() * 10,
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: 1 + Math.random() * 1.5
    }));

    function drawStreet() {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 70, canvas.width, 20);
      // dashed line
      ctx.strokeStyle = '#fff8';
      ctx.setLineDash([20, 20]);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 80);
      ctx.lineTo(canvas.width, 80);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawCar(car) {
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.scale(car.dir, 1);
      // body
      ctx.fillStyle = car.carColor;
      ctx.fillRect(-18, -10, 36, 18);
      ctx.fillRect(-10, -18, 20, 10);
      // wheels
      ctx.fillStyle = car.wheelColor;
      ctx.beginPath();
      ctx.ellipse(-12, 8, 6, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(12, 8, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStreet();
      for (const car of carStates) {
        drawCar(car);
        car.x += car.speed * car.dir;
        if (car.dir === 1 && car.x > canvas.width + 30) car.x = -30;
        if (car.dir === -1 && car.x < -30) car.x = canvas.width + 30;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  static _generateRandomCars(n) {
    const palette = [
      '#ff5a5f', '#4caf50', '#2196f3', '#ffd600', '#e040fb', '#ff7043', '#00bcd4'
    ];
    return Array.from({ length: n }, () => ({
      carColor: palette[Math.floor(Math.random() * palette.length)],
      wheelColor: '#222'
    }));
  }
}
