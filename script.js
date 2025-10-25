const container = document.querySelector('.animation-container');
    let rotateX = 0;
    let rotateY = 0;
    let scale = 1;

    // Vị trí container khi kéo
    let posX = 0;
    let posY = 0;

    let isDragging = false;
    let startX, startY;

    // Kiểm tra kéo để xoay hay để di chuyển
    // Nếu giữ Ctrl khi kéo thì xoay, không thì kéo
    let isRotateMode = false;

    const messages = [
      'Thank u for coming',
      'I love u so much',
      `From the moment I first saw you,\nI knew my heart would no longer listen to reason.`,
    ];

    const colors = ['#FF0000', '#FF1493', '#EE30A7', '#00FF00', '#1E90FF'];

    const images = [
      'images/1.jpg',
      'images/2.jpg',
      'images/3.jpg',
      'images/4.jpg',
      'images/5.jpg'
    ];

    function getRandomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function createFloatingElement() {
      const element = document.createElement('div');
      const rand = Math.random();

      if (rand > 0.95 && images.length > 0) {
        element.className = 'floating-image';
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.style.width = `${Math.random() * 110 + 50}px`;  // 50 - 160 px
        // img.style.height = `${Math.random() * 100 + 40}px`; // 40 - 140 px
        element.appendChild(img);
      } else if (rand > 0.6) {
        element.className = 'heart';
        element.textContent = '💗';
        element.style.fontSize = `${Math.random() * 20 + 20}px`;
      } else {
        element.className = 'text';
        element.textContent = messages[Math.floor(Math.random() * messages.length)];
        element.style.fontSize = `${Math.random() * 20 + 10}px`;
        element.style.color = getRandomColor();
      }

      element.style.left = `${Math.random() * 100}vw`;
      element.style.animationDuration = `${Math.random() * 3 + 2}s`;
      container.appendChild(element);

      setTimeout(() => {
        if (container.contains(element)) container.removeChild(element);
      }, 5000);


      // if (element.classList.contains('text')) {
      //   const colorInterval = setInterval(() => {
      //     element.style.color = getRandomColor();
      //   }, 500);

      //   setTimeout(() => {
      //     clearInterval(colorInterval);
      //     if (container.contains(element)) container.removeChild(element);
      //   }, 5000);
      // } else {
      //   setTimeout(() => {
      //     if (container.contains(element)) container.removeChild(element);
      //   }, 5000);
      // }
    }

    setInterval(createFloatingElement, 40);

    document.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      // Nếu giữ Ctrl thì xoay, không thì kéo
      isRotateMode = e.ctrlKey;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      if (isRotateMode) {
        // Xoay container
        rotateX -= deltaY * 0.1;
        rotateY += deltaX * 0.1;
      } else {
        // Kéo container
        posX += deltaX;
        posY += deltaY;
      }

      updateTransform();

      startX = e.clientX;
      startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    document.addEventListener('wheel', (e) => {
      scale += e.deltaY * -0.001;
      scale = Math.min(Math.max(0.5, scale), 2);
      updateTransform();
    });

    function updateTransform() {
      container.style.transform =
        `translate(${posX}px, ${posY}px) ` +
        `rotateX(${rotateX}deg) rotateY(${25 + rotateY}deg) scale(${scale})`;
    }