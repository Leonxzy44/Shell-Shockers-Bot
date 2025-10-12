(function sniperBotWithSmartMovement() {
    let running = true;
    let heldKeys = new Set();

    const pressKeyDown = (key) => {
        if (!heldKeys.has(key)) {
            document.dispatchEvent(new KeyboardEvent('keydown', { key }));
            heldKeys.add(key);
        }
    };

    const releaseKey = (key) => {
        if (heldKeys.has(key)) {
            document.dispatchEvent(new KeyboardEvent('keyup', { key }));
            heldKeys.delete(key);
        }
    };

    const releaseAllKeys = () => {
        for (const key of heldKeys) {
            releaseKey(key);
        }
    };

    const movementCombos = [
        ['w'],
        ['w', 'a'],
        ['w', 'd'],
        ['s', 'a'],
        ['s', 'd'],
        ['a'],
        ['d'],
    ];

    const setMovement = () => {
        releaseAllKeys();
        const combo = movementCombos[Math.floor(Math.random() * movementCombos.length)];
        combo.forEach(key => pressKeyDown(key));
    };

    const clickMouse = () => {
        const down = new MouseEvent('mousedown', { button: 0 });
        const up = new MouseEvent('mouseup', { button: 0 });
        document.dispatchEvent(down);
        setTimeout(() => document.dispatchEvent(up), 80);
    };

    const smoothAim = () => {
        const steps = 10;
        const delay = 30;

        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                const moveX = (Math.random() * 6 - 3);
                const moveY = (Math.random() * 4 - 2);
                const event = new MouseEvent('mousemove', {
                    clientX: window.innerWidth / 2 + moveX,
                    clientY: window.innerHeight / 2 + moveY,
                    movementX: moveX,
                    movementY: moveY,
                    bubbles: true
                });
                document.dispatchEvent(event);
            }, i * delay);
        }
    };

    const shootIfTracking = () => {
        // Simulate spotting target with 1-in-3 chance
        if (Math.random() < 0.33) {
            console.log("🎯 Sniper: Target locked");
            clickMouse();
        }
    };

    const loop = () => {
        if (!running) return;

        setMovement();     // Move realistically
        smoothAim();       // Simulate aiming
        shootIfTracking(); // Fire if "seeing" someone

        setTimeout(loop, 1800 + Math.random() * 500); // Sniper reload delay
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            running = false;
            releaseAllKeys();
            console.log("🛑 Sniper bot stopped.");
        }
    });

    console.log("🎯 Sniper bot with movement running. Press ESC to stop.");
    loop();
})();


