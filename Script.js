const rooms = [
    { image: "images/room1.jpg", question: "What is the main color of the object in the center?", answer: "red" },
    { image: "images/room2.jpg", question: "How many chairs are in the room?", answer: "3" },
    { image: "images/room3.jpg", question: "What shape is on the wall?", answer: "circle" },
    { image: "images/room4.jpg", question: "What object is next to the lamp?", answer: "book" },
    { image: "images/room5.jpg", question: "What is the color of the carpet?", answer: "blue" },
    { image: "images/room6.jpg", question: "What pattern is on the curtain?", answer: "stripes" },
    { image: "images/room7.jpg", question: "What is on the table?", answer: "vase" },
    { image: "images/room8.jpg", question: "How many picture frames are on the wall?", answer: "2" },
    { image: "images/room9.jpg", question: "What color is the door?", answer: "green" },
    { image: "images/room10.jpg", question: "Type 'escape' to win!", answer: "escape" }
];

let currentRoom = 0;
let timeLeft = 30;
let timerInterval;
let score = 0;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById("message").textContent = "Time's up! Try again.";
            document.getElementById("wrong-sound").play();
            setTimeout(startTimer, 1000);
        }
    }, 1000);
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.toLowerCase().trim();
    let inputField = document.getElementById("answer");

    if (userAnswer === rooms[currentRoom].answer) {
        document.getElementById("correct-sound").play();
        clearInterval(timerInterval); // Stop timer
        calculateScore();

        currentRoom++;
        if (currentRoom < rooms.length) {
            document.getElementById("room-image").src = rooms[currentRoom].image;
            document.getElementById("room-description").textContent = rooms[currentRoom].question;
            document.getElementById("answer").value = "";
            document.getElementById("message").textContent = "Correct! Next room.";
            startTimer(); // Restart timer
        } else {
            document.getElementById("win-sound").play();
            document.getElementById("room-description").textContent = `Congratulations! You escaped! 🎉 Final Score: ${score}`;
            document.getElementById("room-image").style.display = "none";
            document.getElementById("answer").style.display = "none";
            document.querySelector("button").style.display = "none";
            document.getElementById("timer").style.display = "none";
            document.getElementById("score").style.display = "none";
        }
    } else {
        document.getElementById("wrong-sound").play();
        inputField.classList.add("shake");
        document.getElementById("message").textContent = "Wrong answer, try again!";
        setTimeout(() => inputField.classList.remove("shake"), 300);
    }
}

// Score Calculation
function calculateScore() {
    let points = 0;

    if (timeLeft > 25) {
        points = 10;
    } else if (timeLeft > 20) {
        points = 5;
    } else if (timeLeft > 0) {
        points = 2;
    }

    score += points;
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Music Control
let isMusicPlaying = false;
function toggleMusic() {
    let bgMusic = document.getElementById("bg-music");
    let musicButton = document.getElementById("music-toggle");

    if (isMusicPlaying) {
        bgMusic.pause();
        musicButton.textContent = "🎵 Play Music";
    } else {
        bgMusic.play();
        musicButton.textContent = "🔇 Pause Music";
    }
    isMusicPlaying = !isMusicPlaying;
}

// Start Game
document.getElementById("answer").addEventListener("keypress", function(event) {
    if (event.key === "Enter") checkAnswer();
});

document.getElementById("room-description").textContent = rooms[currentRoom].question;
document.getElementById("room-image").src = rooms[currentRoom].image;
startTimer();
