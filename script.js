// ১. এইচটিএমএল এলিমেন্টগুলো সিলেক্ট করা
const noBtn = document.getElementById("no-btn");
const yesBtn = document.getElementById("yes-btn");
const displayImg = document.getElementById("display-image");
const questionText = document.getElementById("question");
const bgImage = document.querySelector(".bg-image");
const container = document.querySelector(".container");
const buttonContainer = document.querySelector(".buttons");

// ২. No বাটনের জন্য বিভিন্ন মেসেজ লিস্ট
const messages = [
    "No",
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You're breaking my heart ;("
];

let messageIndex = 0;

// ৩. No বাটন ক্লিক ইভেন্ট
noBtn.addEventListener("click", function () {
    messageIndex = (messageIndex + 1) % messages.length;
    noBtn.innerHTML = messages[messageIndex];

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.3) + "px";
    yesBtn.style.padding = (currentSize * 0.8) + "px " + (currentSize * 2) + "px";
    yesBtn.style.width = "auto";

    if (messageIndex === messages.length - 1) {
        noBtn.style.display = "none";
    }
});

// ৪. Yes বাটন ক্লিক ইভেন্ট
yesBtn.addEventListener("click", function () {
    questionText.innerHTML = "Happy Valentine's Day! ❤️";
    displayImg.src = "success_image.gif";

    bgImage.classList.add("bg-clear");
    buttonContainer.style.display = "none";

    container.style.backgroundColor = "transparent";
    container.style.backdropFilter = "none";
    container.style.border = "none";
    container.style.boxShadow = "none";

    startConfettiEffect();
});

// ৫. জরির (Confetti) ইফেক্ট ফাংশন
function startConfettiEffect() {
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        var particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));

        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));

    }, 250);
}

