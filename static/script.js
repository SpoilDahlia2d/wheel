let wheel;
let audio = document.getElementById('audio');

function initWheel() {
    wheel = new Winwheel({
        'numSegments': 6,
        'outerRadius': 200,
        'segments': [
            {'fillStyle': '#e91e63', 'text': 'Hot PIC'},
            {'fillStyle': '#9c27b0', 'text': '5 HOT Pic'},
            {'fillStyle': '#2196f3', 'text': 'Voice Audio'},
            {'fillStyle': '#ffc107', 'text': 'Nothing'},
            {'fillStyle': '#4caf50', 'text': 'Feet Pic'},
            {'fillStyle': '#f44336', 'text': 'Nothing'}
        ],
        'animation': {
            'type': 'spinToStop',
            'duration': 5,
            'spins': 8,
            'callbackFinished': alertPrize
        }
    });
}

function hasPlayed() {
    return localStorage.getItem("played");
}

function spinWheel() {
    if (hasPlayed()) {
        document.getElementById("result").textContent = "You have already received your gift💋";
        return;
    }
    document.getElementById("spin-btn").disabled = true;

    audio.currentTime = 0;
    audio.play();

    wheel.startAnimation();
}

function alertPrize(indicatedSegment) {
    document.getElementById("result").textContent = "You won: " + indicatedSegment.text + " 💖";
    localStorage.setItem("played", "true");
    // Se vuoi puoi abilitare di nuovo il pulsante per riprovare:
    // document.getElementById("spin-btn").disabled = false;
}

function checkPassword() {
    let input = document.getElementById("password").value;
    if (input === "goodgirlfordahlia") {
        document.getElementById("password-screen").style.display = "none";
        document.getElementById("wheel-container").style.display = "block";
        loadPopupImages();
        initWheel();
    } else {
        alert("Wrong password 😘");
    }
}

function loadPopupImages() {
    fetch('/images-list')
        .then(res => res.json())
        .then(images => {
            const container = document.getElementById('popup-images');
            container.innerHTML = '';
            images.forEach(url => {
                let img = document.createElement('img');
                img.src = url;
                img.style.top = Math.floor(Math.random() * 350) + 'px';
                img.style.left = Math.floor(Math.random() * 350) + 'px';
                img.style.opacity = 0.3 + Math.random() * 0.4;
                container.appendChild(img);
            });
        })
        .catch(err => {
            console.error('Errore caricamento immagini:', err);
        });
}
