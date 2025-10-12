(function shellBot() {
    let running = true;

    const pressKey = (key, duration = 200) => {
        const down = new KeyboardEvent('keydown', { key });
        const up = new KeyboardEvent('keyup', { key });
        document.dispatchEvent(down);
        setTimeout(() => document.dispatchEvent(up), duration);
    };

    const clickMouse = (duration = 300) => {
        const down = new MouseEvent('mousedown', { button: 0 });
        const up = new MouseEvent('mouseup', { button: 0 });
        document.dispatchEvent(down);
        setTimeout(() => document.dispatchEvent(up), duration);
    };

    const moveMouse = () => {
        const event = new MouseEvent('mousemove', {
            clientX: window.innerWidth / 2 + (Math.random() * 100 - 50),
            clientY: window.innerHeight / 2 + (Math.random() * 50 - 25),
            movementX: Math.random() * 10 - 5,
            movementY: Math.random() * 10 - 5,
            bubbles: true
        });
        document.dispatchEvent(event);
    };

    const movementKeys = ['w', 'a', 's', 'd'];

    const loop = () => {
        if (!running) return;

        const key = movementKeys[Math.floor(Math.random() * movementKeys.length)];
        pressKey(key, Math.random() * 400 + 200);

        if (Math.random() < 0.5) moveMouse();

        if (Math.random() < 0.4) {
            clickMouse(Math.random() * 200 + 300);
        }

        const delay = Math.random() * 500 + 500;
        setTimeout(loop, delay);
    };

    loop();

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            running = false;
            console.log('ShellBot stopped.');
        }
    });

    console.log('ShellBot running. Press ESC to stop.');
})();
