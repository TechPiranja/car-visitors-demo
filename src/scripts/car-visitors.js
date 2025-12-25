export class CarVisitors {

  /**
   * Render the street and cars animation
   * @param {HTMLElement} container - The DOM element to render into
   * @param {Array<{carColor: string, wheelColor: string, name?: string|number}>|number} carsOrCount - Array of car configs, or a number for how many cars
   */
  static render(container, carsOrCount) {
    // Remove previous canvas if any
    container.innerHTML = '';

    // Create and configure canvas
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.width = container.offsetWidth; // take parent width
    canvas.height = 100;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Support passing a number (count) or array of car configs
    let cars;
    if (typeof carsOrCount === 'number') {
      cars = CarVisitors._generateRandomCars(carsOrCount).map((car, i) => ({ ...car, label: i + 1 }));
    } else if (Array.isArray(carsOrCount) && carsOrCount.length > 0) {
      cars = carsOrCount.map((car, i) => ({ ...car, name: car.name ?? i + 1 }));
    } else {
      cars = CarVisitors._generateRandomCars(4).map((car, i) => ({ ...car, name: i + 1 }));
    }

    // Assign random directions, positions, and speeds to each car
    const carStates = cars.map((car, i) => ({
      ...car,
      x: Math.random() * canvas.width,
      y: 80,
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: 1 + Math.random() * 1.5
    }));

    // Draw the street at the very bottom of the canvas
    function drawStreet() {
      const streetY = 80; // Start 20px from the bottom
      ctx.fillStyle = '#222';
      ctx.fillRect(0, streetY, canvas.width, 20); // Street touches bottom
      // Draw dashed center line
      ctx.strokeStyle = '#fff8';
      ctx.setLineDash([20, 20]);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, streetY + 10); // Center of street
      ctx.lineTo(canvas.width, streetY + 10);
      ctx.stroke(); // draws the lines
      ctx.setLineDash([]); // makes sure only street lines are dashed
    }

    // Draw a single car at its current position
    function drawCar(car) {
      ctx.save();
      ctx.translate(car.x, car.y);
      // Car body
      ctx.fillStyle = car.carColor;
      ctx.fillRect(0, -10, 36, 20); // main car body
      ctx.fillRect(8, -18, 20, 10); // car roof
      // Wheels
      ctx.fillStyle = car.wheelColor;
      ctx.beginPath();
      ctx.ellipse(6, 8, 6, 6, 0, 0, Math.PI * 2); // wheel 1
      ctx.ellipse(30, 8, 6, 6, 0, 0, Math.PI * 2); // wheel 2
      ctx.fill();
      // Draw name/number above the car
      if (car.name !== undefined) {
        ctx.font = 'bold 14px sans-serif';
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';
        ctx.fillText(car.name, 18, -18); // centered above car
      }
      ctx.restore();
    }

    // Animation loop: clear, draw street, draw cars, update positions
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStreet();
      for (const car of carStates) {
        drawCar(car);
        car.x += car.speed * car.dir;
        // Wrap cars around when they leave the screen
        if (car.dir === 1 && car.x > canvas.width + 30) car.x = -30;
        if (car.dir === -1 && car.x < -30) car.x = canvas.width + 30;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Generate n random car configs with aesthetic colors
  static _generateRandomCars(n) {
    const palette = [
      '#ff5a5f', '#4caf50', '#2196f3', '#ffd600', '#e040fb', '#ff7043', '#00bcd4'
    ];
    return Array.from({ length: n }, () => ({
      carColor: palette[Math.floor(Math.random() * palette.length)],
      wheelColor: '#525252ff'
    }));
  }
}
