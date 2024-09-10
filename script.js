let songs = [
    {
        title: "Reflections",
        artist: "The Neighbourhood",
        src: "reflections.mp3",
        img: "reflections.jfif"
    },
    {
        title: "Do I Wanna Know",
        artist: "Arctic Monkeys",
        src: "diwk.mp3",
        img: "diwk.jfif"
    },
    {
        title: "Falling",
        artist: "Chase Atlantic",
        src: "falling.mp3",
        img: "falling.jfif"
    },
    {
        title: "Sweater Weather",
        artist: "The Neighbourhood",
        src: "SW.mp3",
        img: "sw.jfif"
    },
    {
        title: "BTBT",
        artist: "B.I x Soulja Boy feat. DeVita",
        src: "btbt.mp3",
        img: "btbt.jfif"
    },
    {
        title: "Dream It Possible",
        artist: "Delacey",
        src: "dip.mp3",
        img: "dip.jfif"
    }
];

let currentSongIndex = 0;
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
    let songData = songs[index];
    document.querySelector("h1").textContent = songData.title;
    document.querySelector("p").textContent = songData.artist;
    song.src = songData.src;
    document.querySelector(".song-img").src = songData.img;
    song.load();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play"); // Ensure the button shows play initially
    document.querySelector(".song-img").onload = changePlayerColor; // Ensure color changes after image loads
}

document.addEventListener("DOMContentLoaded", () => {
    // Initial call to set default color
    changePlayerColor();
});

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

document.querySelector(".fa-forward").addEventListener("click", function() {
    currentSongIndex = isShuffle ? Math.floor(Math.random() * songs.length) : (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

document.querySelector(".fa-backward").addEventListener("click", function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

document.getElementById("shuffleBtn").addEventListener("click", function() {
    isShuffle = !isShuffle;
    this.classList.toggle("active", isShuffle); // Use toggle with a condition
});

document.getElementById("repeatBtn").addEventListener("click", function() {
    isRepeat = !isRepeat;
    this.classList.toggle("active", isRepeat); // Use toggle with a condition
});

song.onended = function() {
    if (isRepeat) {
        song.currentTime = 0;
        song.play();
    } else {
        document.querySelector(".fa-forward").click();
    }
};

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.oninput = function() {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
};

function changePlayerColor() {
    const colors = {
        "sw.jfif": "linear-gradient(to bottom, #2b2b2b, #555555, #888888, #bbbbbb, #eeeeee)",
        "diwk.jfif": "linear-gradient(to top, #434343, #000000)",
        "falling.jfif": "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
        "reflections.jfif": "linear-gradient(to bottom, #FFA17F, #00223E)",
        "btbt.jfif": "linear-gradient(to bottom, #00C9FF, #92FE9D)",
        "dip.jfif": "linear-gradient(to bottom, #0a001f, #0b033a, #1e287a, #27409c, #3b6cb7)"
    };

    let imgSrc = document.querySelector(".song-img").src.split('/').pop();
    let gradient = colors[imgSrc] || '#333'; // Default gradient if not found

    document.querySelector(".music-player").style.background = gradient;
    document.querySelector(".container").style.background = gradient; // Update container background
}
