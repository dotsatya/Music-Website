const music = new Audio('audio/1.mp3');
// music.play();



//song side JS
const songs = [
  {
    id: "1",
    songName: `Biday <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/1.png"
  },

  {
    id: "2",
    songName: `Chaya <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/2.png"
  },

  {
    id: "3",
    songName: `Ghor Gari <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/3.png"
  },

  {
    id: "4",
    songName: `Obosthan <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/4.png"
  },

  {
    id: "5",
    songName: `Shakkhi <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/5.png"
  },

  {
    id: "6",
    songName: `Villain <br>
            <div class="subtitle">High Way</div>`,
    poster: "img/6.png" 
  }
]


Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
  e.getElementsByTagName('img')[0].src = songs[i].poster;
  e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

//seaarch data
let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach((element) => {
  const { id, songName, poster } = element;
  // console.log(poster);
  let card = document.createElement('a');
  card.classList.add('card');

  card.innerHTML = `<img src="${poster}" alt="">
              <div class="content">${songName}
              </div>`;
  search_results.appendChild(card);
  card.href = "#" + id;

})

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', () => {
  let input_value = input.value.toUpperCase()
  let items = search_results.getElementsByTagName('a');

  for (let index = 0; index < items.length; index++) {
    let as = items[index].getElementsByClassName('content')[0]
    let text_value = as.textContent || as.innerHTML;

    if (text_value.toUpperCase().indexOf(input_value) > -1) {
      items[index].style.display = "flex";
      
    } else {

      items[index].style.display = "none";
    }
    if (input.value == 0) {
      search_results.style.display = "none";
    } else {
      search_results.style.display = "";
    }
  }
})

//search end






// Play side js and music wave creating 
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
})

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('playlistplay')).forEach((el) => {
    el.classList.add('bi-play-circle-fill');
    el.classList.remove('bi-pause-circle-fill');
  })
}
const makeAllBackgrounnd = () => {
  Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
    el.style.background = 'rgb(105, 105, 105, .0)';
  })
}


// play pause working and playing songs
let index = 0;
let poster_play_side = document.getElementById('poster_play_side');
let title = document.getElementById('title');
let download_music = document.getElementById('download_music');

Array.from(document.getElementsByClassName('playlistplay')).forEach((e) => {
  e.addEventListener('click', (el) => {
    index = el.target.id;
    // console.log(index);
    music.src = `audio/${index}.mp3`;
    // poster_play_side.src = `img/${index}.jpg`;
    music.play();

    wave.classList.add('active1');

    master_play.classList.remove('bi-play-fill');
    master_play.classList.add('bi-pause-fill');
    //download music
    download_music.href = `audio/${index}.mp3`;

    let songTitles = songs.filter((els) => {
      return els.id == index;
    });
    songTitles.forEach(elss => {
      let { songName, poster } = elss;
      title.innerHTML = songName;
      poster_play_side.src = poster;
      //download music with title
      download_music.setAttribute('download', songName);
    })

    makeAllBackgrounnd();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
    makeAllPlays();
    el.target.classList.add('bi-pause-circle-fill');
    el.target.classList.remove('bi-play-circle-fill');
  })
})



// seek bar changing effect
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min1 = Math.floor(music_dur / 60);
  let sec1 = Math.floor(music_dur % 60);

  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }

  currentEnd.innerText = `${min1}:${sec1}`;

  let min2 = Math.floor(music_curr / 60);
  let sec2 = Math.floor(music_curr % 60);

  if (sec2 < 10) {
    sec2 = `0${sec2}`;
  }
  currentStart.innerText = `${min2}:${sec2}`;

  let progressBar = parseInt((music_curr / music_dur) * 100);
  seek.value = progressBar;
  let seekbar = seek.value;;

  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
  music.currentTime = seek.value * music.duration / 100;
})


// vol changing effect
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', () => {
  if (vol.value == 0) {
    vol_icon.classList.remove('bi-volume-up-fill');
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.add('bi-volume-off-fill');
  }
  if (vol.value > 0) {
    vol_icon.classList.remove('bi-volume-up-fill');
    vol_icon.classList.add('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-off-fill');
  }
  if (vol.value > 50) {
    vol_icon.classList.add('bi-volume-up-fill');
    vol_icon.classList.remove('bi-volume-down-fill');
    vol_icon.classList.remove('bi-volume-off-fill');
  }
  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;

  music.volume = vol_a / 100;
})


//previous track for changing songs
let previous = document.getElementById('previous');
let next = document.getElementById('next');
index = Array.from(document.getElementsByClassName('songItem')).length;
console.log(index);

previous.addEventListener('click', () => {
  index -= 1;

  if (index < 1) {
    index = Array.from(document.getElementsByClassName('songItem')).length;
  }

  music.src = `audio/${index}.mp3`;
  // poster_play_side.src = `img/${index}.jpg`;
  music.play();
  wave.classList.add('active1');
  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');

  //download music
  download_music.href = `audio/${index}.mp3`;

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach(elss => {
    let { songName, poster } = elss;
    title.innerHTML = songName;
    poster_play_side.src = poster;
    //download music with title
    download_music.setAttribute('download', songName);
  })

  makeAllBackgrounnd();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllPlays();
  el.target.classList.add('bi-pause-circle-fill');
  el.target.classList.remove('bi-play-circle-fill');
})


// next track for changing songs
next.addEventListener('click', () => {
  index++;

  if (index > Array.from(document.getElementsByClassName('songItem')).length) {
    index = 1;
  }

  music.src = `audio/${index}.mp3`;
  // poster_play_side.src = `img/${index}.jpg`;
  music.play();

  wave.classList.add('active1');

  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');
  //download music
  download_music.href = `audio/${index}.mp3`;

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach(elss => {
    let { songName, poster } = elss;
    title.innerHTML = songName;
    poster_play_side.src = poster;
    //download music with title
    download_music.setAttribute('download', songName);
  });

  makeAllBackgrounnd();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllPlays();
  el.target.classList.add('bi-pause-circle-fill');
  el.target.classList.remove('bi-play-circle-fill');
});

//download button customizatipon
let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
  let a = shuffle.innerHTML;
  switch (a) {

    case "next":
      shuffle.classList.add('bi-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML = 'repeat';
      break;
    case "repeat":
      shuffle.classList.remove('bi-repeat');
      shuffle.classList.remove('bi-music-note-beamed');
      shuffle.classList.add('bi-shuffle');
      shuffle.innerHTML = 'random';
      break;
    case "random":
      shuffle.classList.remove('bi-repeat');
      shuffle.classList.add('bi-music-note-beamed');
      shuffle.classList.remove('bi-shuffle');
      shuffle.innerHTML = 'next';
      break;
  }
});

// play songs after last song

const next_music = () => {
  if (index == songs.length) {
    index = 1;
  } else {
    index++;
  }
  music.src = `audio/${index}.mp3`;
  // poster_play_side.src = `img/${index}.jpg`;
  music.play();

  wave.classList.add('active1');

  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');
  //download music
  download_music.href = `audio/${index}.mp3`;

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach(elss => {
    let { songName, poster } = elss;
    title.innerHTML = songName;
    poster_play_side.src = poster;
    //download music with title
    download_music.setAttribute('download', songName);
  });

  makeAllBackgrounnd();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllPlays();
  el.target.classList.add('bi-pause-circle-fill');
  el.target.classList.remove('bi-play-circle-fill');
}


const repeat_music = () => {
  index;
  music.src = `audio/${index}.mp3`;
  // poster_play_side.src = `img/${index}.jpg`;
  music.play();

  wave.classList.add('active1');

  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');
  //download music
  download_music.href = `audio/${index}.mp3`;

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach(elss => {
    let { songName, poster } = elss;
    title.innerHTML = songName;
    poster_play_side.src = poster;
    //download music with title
    download_music.setAttribute('download', songName);
  });

  makeAllBackgrounnd();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllPlays();
  el.target.classList.add('bi-pause-circle-fill');
  el.target.classList.remove('bi-play-circle-fill');
}

const random_music = () => {
  if (index == songs.length) {
    index = 1;
  } else {
    index = Math.floor((Math.random() * songs.length) + 1);
  }
  music.src = `audio/${index}.mp3`;
  // poster_play_side.src = `img/${index}.jpg`;
  music.play();

  wave.classList.add('active1');

  master_play.classList.remove('bi-play-fill');
  master_play.classList.add('bi-pause-fill');
  //download music
  download_music.href = `audio/${index}.mp3`;

  let songTitles = songs.filter((els) => {
    return els.id == index;
  });
  songTitles.forEach(elss => {
    let { songName, poster } = elss;
    title.innerHTML = songName;
    poster_play_side.src = poster;
    //download music with title
    download_music.setAttribute('download', songName);
  });

  makeAllBackgrounnd();
  Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105, 105, 105, .1)";
  makeAllPlays();
  el.target.classList.add('bi-pause-circle-fill');
  el.target.classList.remove('bi-play-circle-fill');
}


music.addEventListener('ended', () => {
  let b = shuffle.innerHTML;
  switch (b) {
    case 'repeat':
      repeat_music();
      break;

    case 'next':
      next_music();
      break;

    case 'random':
      random_music();
      break;
  }
});










//buttons for scrolling



let pop_song_left = document.getElementById('pop_song_left');
let pop_song_right = document.getElementById('pop_song_right');
let horizonal_content = document.getElementsByClassName('horizonal_content')[0];

pop_song_right.addEventListener('click', () => {
  horizonal_content.scrollLeft += 330;
});
pop_song_left.addEventListener('click', () => {
  horizonal_content.scrollLeft -= 330;
});

let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let artists = document.getElementsByClassName('artists')[0];

pop_art_right.addEventListener('click', () => {
  artists.scrollLeft += 330;
});
pop_art_left.addEventListener('click', () => {
  artists.scrollLeft -= 330;
});





//for side manu bar

let menu_list_active_button = document.getElementById('menu_list_active_button');
let menu_side = document.getElementsByClassName('menu_side')[0];
menu_list_active_button.addEventListener('click', () => {
menu_side.style.transform = "unset";
menu_list_active_button.style.opacity=0;
})

let song_side = document.getElementsByClassName('song_side')[0];
song_side.addEventListener('click', () => {
  if (window.innerWidth <= 900) {
      menu_side.style.transform = "translateX(-100%)";
      menu_list_active_button.style.opacity = 1;
} 
})
song_side.addEventListener('click', () => {
 if (window.innerWidth >= 900) {
  menu_side.style.transform = "translateX(0%)";
  // menu_list_active_button.style.opacity = 1;
} 
})