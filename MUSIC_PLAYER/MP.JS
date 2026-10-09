
const songs = [
    {
        title: "First Song",
        artist: "Artist One",
        src: "songs/song1.mp3"
    },
    {
        title: "Second Song",
        artist: "Artist Two",
        src: "songs/song2.mp3"
    },
    {
        title: "Third Song",
        artist: "Artist Three",
        src: "songs/song3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

let songIndex = 0;

// Load a song
function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    audio.src = songs[index].src;

    progress.value = 0;
    document.getElementById("current").textContent = "0:00";
    document.getElementById("duration").textContent = "0:00";

    showPlaylist();
}

// Play or pause
function playPause() {
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.textContent = "⏸";
        }).catch(() => {
            alert("Cannot play song. Check the audio file.");
        });
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playPause();
}

// Previous song
function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playPause();
}

// Format seconds as minutes:seconds
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2, "0");
}

// Update progress and song duration
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;

        document.getElementById("current").textContent =
            formatTime(audio.currentTime);

        document.getElementById("duration").textContent =
            formatTime(audio.duration);
    }
});

// Seek to a position in the song
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

// Volume control
document.getElementById("volume").addEventListener("input", (e) => {
    audio.volume = Number(e.target.value);
});

// Autoplay next song when current song ends
audio.addEventListener("ended", nextSong);

// Display clickable playlist
function showPlaylist() {
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = "";

    songs.forEach((song, index) => {
        const item = document.createElement("li");

        item.textContent = song.title + " - " + song.artist;

        if (index === songIndex) {
            item.style.background = "#dcd2ff";
        }

        item.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playPause();
        });

        playlist.appendChild(item);
    });
}

// Load the first song
loadSong(songIndex);
