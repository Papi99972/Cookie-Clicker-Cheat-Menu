javascript:(function(){(function() {
    const intervalCheck = setInterval(function() {
        if (typeof Game !== 'undefined' && Game.cookies !== undefined) {
            clearInterval(intervalCheck);
            const game = Game;

            // Cheat Menu Setup
            const menu = document.createElement('div');
            menu.style.position = 'absolute';
            menu.style.top = '10px';
            menu.style.right = '10px';
            menu.style.background = 'black';
            menu.style.color = '#00FF00';
            menu.style.padding = '20px';
            menu.style.borderRadius = '10px';
            menu.style.fontFamily = 'monospace';
            menu.style.zIndex = '99999';
            menu.style.width = '350px';
            menu.style.height = '400px';
            menu.style.overflowY = 'auto';
            menu.style.resize = 'both';
            menu.style.boxShadow = '0 0 20px 4px rgba(0, 255, 0, 0.7)';
            menu.style.transition = 'width 0.2s ease, height 0.2s ease';

            const matrixCanvas = document.createElement('canvas');
            matrixCanvas.style.position = 'absolute';
            matrixCanvas.style.top = '0';
            matrixCanvas.style.left = '0';
            matrixCanvas.width = 350;
            matrixCanvas.height = 400;
            matrixCanvas.style.zIndex = '-1';
            menu.appendChild(matrixCanvas);

            const ctx = matrixCanvas.getContext('2d');
            const fontSize = 16;
            const columns = Math.floor(matrixCanvas.width / fontSize);
            const drops = Array(columns).fill(1);
            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                ctx.fillStyle = '#00FF00';
                ctx.font = `${fontSize}px monospace`;
                for (let i = 0; i < drops.length; i++) {
                    const text = Math.random() > 0.5 ? '1' : '0';
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
            setInterval(drawMatrix, 50);

            const title = document.createElement('h3');
            title.textContent = 'Matrix Cheat Menu';
            title.style.textAlign = 'center';
            title.style.color = '#00FF00';
            title.style.textShadow = '0 0 8px #00FF00';
            menu.appendChild(title);

            function createButton(text, description, onClick) {
                const button = document.createElement('button');
                button.textContent = text;
                button.title = description;
                button.style.width = '100%';
                button.style.padding = '10px';
                button.style.marginBottom = '10px';
                button.style.background = 'black';
                button.style.color = '#00FF00';
                button.style.border = '2px solid #00FF00';
                button.style.fontSize = '16px';
                button.style.cursor = 'pointer';
                button.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.5)';
                button.style.transition = 'all 0.1s ease';
                button.onmouseover = () => (button.style.boxShadow = '0 0 12px rgba(0, 255, 0, 1)');
                button.onmouseout = () => (button.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.5)');
                button.onmousedown = () => (button.style.transform = 'translateY(4px)');
                button.onmouseup = () => (button.style.transform = 'translateY(0)');
                button.onclick = onClick;
                menu.appendChild(button);
            }

            // Add Cheats
            createButton('Gain Cookies', 'Add 1 million cookies to your count.', () => {
                game.cookies += 1000000;
                game.CalculateGains();
                alert('Gained 1 million cookies!');
            });

            createButton('Enable Auto Clicker', 'Click the big cookie every 10ms.', () => {
                if (window.autoClickerInterval) {
                    clearInterval(window.autoClickerInterval);
                    window.autoClickerInterval = null;
                    alert('Auto Clicker Disabled.');
                } else {
                    window.autoClickerInterval = setInterval(() => {
                        document.getElementById('bigCookie').click();
                    }, 10);
                    alert('Auto Clicker Enabled.');
                }
            });

            createButton('Unlock All Achievements', 'Unlock all achievements without triggering cheats.', () => {
                for (let i in game.Achievements) {
                    if (game.Achievements[i].won === 0) game.Achievements[i].won = 1;
                }
                alert('All achievements unlocked!');
            });

            createButton('Unlock All Upgrades', 'Unlock all upgrades for free.', () => {
                for (let i in game.Upgrades) {
                    game.Upgrades[i].bought = 1;
                }
                alert('All upgrades unlocked!');
            });

            createButton('Edit Values', 'View and modify key game values.', () => {
                const editMenu = document.createElement('div');
                editMenu.style.position = 'fixed';
                editMenu.style.top = '50%';
                editMenu.style.left = '50%';
                editMenu.style.transform = 'translate(-50%, -50%)';
                editMenu.style.background = 'black';
                editMenu.style.color = '#00FF00';
                editMenu.style.padding = '20px';
                editMenu.style.borderRadius = '10px';
                editMenu.style.fontFamily = 'monospace';
                editMenu.style.zIndex = '100000';
                editMenu.style.boxShadow = '0 0 20px 4px rgba(0, 255, 0, 0.7)';
                editMenu.style.width = '300px';
                editMenu.style.height = 'auto';
                editMenu.style.overflowY = 'auto';

                const closeButton = document.createElement('button');
                closeButton.textContent = 'X';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '5px';
                closeButton.style.right = '5px';
                closeButton.style.background = 'red';
                closeButton.style.color = 'white';
                closeButton.style.border = 'none';
                closeButton.style.padding = '5px 10px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.borderRadius = '5px';
                closeButton.onclick = () => document.body.removeChild(editMenu);
                editMenu.appendChild(closeButton);

                const values = [
                    { key: 'cookies', label: 'Cookies' },
                    { key: 'lumps', label: 'Sugar Lumps' },
                    { key: 'prestige', label: 'Prestige Level' },
                ];

                values.forEach(({ key, label }) => {
                    const container = document.createElement('div');
                    container.style.marginBottom = '10px';

                    const labelEl = document.createElement('label');
                    labelEl.textContent = `${label}: `;
                    container.appendChild(labelEl);

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.value = game[key] || 0;
                    input.style.marginLeft = '10px';
                    container.appendChild(input);

                    editMenu.appendChild(container);

                    input.onchange = () => {
                        game[key] = parseInt(input.value);
                        game.CalculateGains(); // Update game state after change
                        alert(`${label} set to ${input.value}`);
                    };
                });

                document.body.appendChild(editMenu);
            });

            createButton('Open Sesame', 'Trigger the game\'s built-in Open Sesame debug mode.', () => {
                Game.OpenSesame();
                alert('Open Sesame enabled!');
            });

            document.body.appendChild(menu);
        }
    }, 100);
})();
})();
