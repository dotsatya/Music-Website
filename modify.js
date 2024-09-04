const API_URL = 'https://api.deezer.com/search?q='; // Deezer API base URL
let music = new Audio(); // Create a new Audio object

// Function to search songs from Deezer API
const searchSongs = async (query) => {
  try {
    const response = await fetch(`${API_URL}${query}&limit=20`);
    const data = await response.json();
    return data.data; // Return the songs array
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
};

// Update the UI with fetched songs
const updateSongList = (songs) => {
  let search_results = document.getElementsByClassName('search_results')[0];
  search_results.innerHTML = ''; // Clear previous results

  songs.forEach((element) => {
    const { id, title, artist, album } = element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = `#${id}`;
    card.innerHTML = `<img src="${album.cover_medium}" alt="">
                      <div class="content">${title} <br><div class="subtitle">${artist.name}</div></div>`;
    search_results.appendChild(card);

    // Click event to play the song
    card.addEventListener('click', () => {
      playSong(element);
    });
  });
};

// Function to play the selected song
const playSong = (song) => {
  const { preview, title, album } = song; // Use the preview URL for playback
  music.src = preview; // Set the audio source to the preview URL
  music.play(); // Play the music
  wave.classList.add('active1');
  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');

  // Update the UI with the current song details
  document.getElementById('title').innerHTML = `${title} <br> <div class="subtitle">${song.artist.name}</div>`;
  document.getElementById('poster_play_side').src = album.cover_medium;
};

// Add search functionality
let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', async () => {
  let input_value = input.value.trim();
  if (input_value) {
    search_results.style.display = ""; // Show search results
    const songs = await searchSongs(input_value); // Fetch songs from Deezer API
    updateSongList(songs); // Update the song list UI
  } else {
    search_results.style.display = "none"; // Hide search results
  }
});

// Play and pause button event listener
let play_side = document.getElementById('master_play');
let wave = document.getElementById('wave');

play_side.addEventListener('click', () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    wave.classList.add('active1');
    master_play.classList.remove('bi-play-fill');
    master_play.classList.add('bi-pause-fill');
  } else {
    music.pause();
    wave.classList.remove('active1');
    master_play.classList.add('bi-play-fill');
    master_play.classList.remove('bi-pause-fill');
  }
});

// Volume control
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
  music.volume = vol.value / 100; // Set the volume
  vol_bar.style.width = `${vol.value}%`;
  vol_dot.style.left = `${vol.value}%`;
});

// Handle song end (loop, next, random functionality can be added as needed)
music.addEventListener('ended', () => {
  music.pause();
  wave.classList.remove('active1');
  master_play.classList.add('bi-play-fill');
  master_play.classList.remove('bi-pause-fill');
});
