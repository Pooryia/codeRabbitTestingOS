document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid');
    const gridSize = 9;
    const cells = [];
    
    // Generate grid cells
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        // Calculate row and column for position-based effects
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        
        // Add custom properties for position-aware animations
        cell.style.setProperty('--row', row);
        cell.style.setProperty('--col', col);
        
        // Add initial animation delay based on position
        const initialDelay = (row + col) * 50; // Diagonal wave effect
        cell.style.animationDelay = `${initialDelay}ms`;
        
        // Add click event listener
        cell.addEventListener('click', () => {
            if (!cell.classList.contains('flipped')) {
                // Apply random rotation style
                const rotationStyle = getRandomRotationStyle();
                cell.style.animation = rotationStyle.animation;
                
                // Generate a semi-transparent color that will let the gradient show through
                const color = getRandomColor();
                cell.style.backgroundColor = color;
                
                // Add flipped class after a small delay to ensure animation starts
                setTimeout(() => {
                    cell.classList.add('flipped');
                    
                    // Check if all cells are flipped
                    checkAllFlipped();
                }, 50);
            }
        });
        
        cells.push(cell);
        gridContainer.appendChild(cell);
    }
    
    // Function to check if all cells are flipped and trigger a special effect
    function checkAllFlipped() {
        const allFlipped = cells.every(cell => cell.classList.contains('flipped'));
        if (allFlipped) {
            // Add a pulsing effect to the entire grid when all cells are flipped
            gridContainer.style.animation = 'pulse 2s infinite';
        }
    }
    
    // Function to get random rotation animation style
    function getRandomRotationStyle() {
        const animations = [
            { animation: 'rotate-scale 0.8s forwards' },
            { animation: 'rotate-scale 1s reverse forwards' },
            { animation: 'rotate-scale 1.2s alternate forwards' },
            { animation: 'flip-in 0.7s forwards' },
            { animation: 'spin-out 1s forwards, flip-in 0.5s 1s forwards' },
            { animation: 'pulse 0.5s 2 forwards, rotate-scale 1s 1s forwards' }
        ];
        
        const randomIndex = Math.floor(Math.random() * animations.length);
        return animations[randomIndex];
    }
    
    // Function to generate semi-transparent random colors
    function getRandomColor() {
        // Generate colors that will blend nicely with the purple gradient
        const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple range
        const saturation = Math.floor(Math.random() * 30) + 40; // 40-70%
        const lightness = Math.floor(Math.random() * 20) + 30; // 30-50%
        const alpha = Math.random() * 0.4 + 0.2; // 0.2-0.6 alpha
        
        return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
    }
}); 