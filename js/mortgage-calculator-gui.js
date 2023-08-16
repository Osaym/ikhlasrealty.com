const logo = document.querySelector('.logo');
let animationTimer;

function triggerAnimation() {
    logo.classList.add('sway-animation');
    setTimeout(() => {
        logo.classList.remove('sway-animation');
    }, 3000);
}

function startAutoAnimation() {
    triggerAnimation(); // Trigger the animation immediately
    animationTimer = setInterval(triggerAnimation, 10000); // Trigger every 10 seconds
}

startAutoAnimation();