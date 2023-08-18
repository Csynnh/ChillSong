document.title = "sMusic";
window.addEventListener("load", () => {
   const song = document.querySelector("#song");
   const songName = document.querySelector(".player-name");
   const songImg = document.querySelector(".player-img");
   const playBtn = document.querySelector(".player-play");
   const prevbtn = document.querySelector(".player-prev");
   const nextbtn = document.querySelector(".player-next");
   const repeatbtn = document.querySelector(".player-repeat");
   const shufflebtn = document.querySelector(".player-shuffle");
   const songDuration = document.querySelector(".player-duration");
   const songRemaining = document.querySelector(".player-remaining");
   const bar = document.querySelector("#progress-bar");
   const playerImage = document.querySelector(".player-media img");
   const playlist = document.querySelector(".playlist");
   let playing = true;
   const listSongs = [
      {
         name: "Tâm - Mer",
         src: "./mp3/tam.mp3",
         imageSrc: "./image/tam.jpg",
         singer: "Mer",
      },
      {
         name: "Nụ hôn Bisu",
         src: "./mp3/nuhonbisu.mp3",
         imageSrc: "./image/nuhonbisu.jpg",
         singer: "Mikelodic",
      },
      {
         name: "Đủ trải sẽ thấm",
         src: "./mp3/dutraisetham.mp3",
         imageSrc: "./image/dutraisetham.jpg",
         singer: "Mikelodic",
      },
      {
         name: "Chơi như tụi Mỹ",
         src: "./mp3/choinhutuimy.mp3",
         imageSrc: "./image/choinhutuimy.jpg",
         singer: "Andree Right Hand",
      },
      {
         name: "Thủ đô cypher",
         src: "./mp3/thudocypher.mp3",
         imageSrc: "./image/thudocypher.jpg",
         singer: "LOW G, RZMas, MCK",
      },
      {
         name: "3107 1",
         src: "./mp3/31071.mp3",
         imageSrc: "./image/31071.jpg",
         singer: "titie, Nâu ,Dươngg",
      },
      {
         name: "3107 2",
         src: "./mp3/31072.mp3",
         imageSrc: "./image/31072.jpg",
         singer: "DuongG x NÂU x W/N",
      },
      {
         name: "3107 3",
         src: "./mp3/31073.mp3",
         imageSrc: "./image/31073.jpg",
         singer: "DuongG x NÂU x W/N",
      },
      {
         name: "3107 4",
         src: "./mp3/31074.mp3",
         imageSrc: "./image/31074.jpg",
         singer: " Erik ft Nâu x W/N",
      },
      {
         name: "3107 id 2019",
         src: "./mp3/3107id072019.mp3",
         imageSrc: "./image/3107id072019.jpg",
         singer: "W/n if 267",
      },
   ];
   let songIndex = 0;

   const volumeSlider = document.querySelector(".volume-slider");
   const volumeFill = document.querySelector(".volume-fill");
   const volumeIcon = document.querySelector(".volume-icon");

   volumeSlider.addEventListener("click", (e) => {
      const rect = volumeSlider.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const percentage = 100 - (offsetY / volumeSlider.offsetHeight) * 100;
      song.volume = percentage / 100;
      volumeFill.style.height = `${percentage}%`;
   });

   volumeIcon.addEventListener("click", (e) => {
      volumeSlider.classList.toggle("is-hide");
   });

   // set default song:
   songName.textContent = listSongs[songIndex].name;
   song.setAttribute("src", listSongs[songIndex].src);
   songImg.setAttribute("src", listSongs[songIndex].imageSrc);
   displayTimer();
   createPlaylist();
   const playlistItems = document.querySelectorAll(".playlist-item");

   playBtn.addEventListener("click", handleMusicPlay);
   prevbtn.addEventListener("click", () => {
      handleChangeSong(-1);
   });
   nextbtn.addEventListener("click", () => {
      handleChangeSong(1);
   });
   repeatbtn.addEventListener("click", (e) => {
      repeatbtn.classList.toggle("is-active");
   });
   shufflebtn.addEventListener("click", (e) => {
      repeatbtn.classList.remove("is-active");
      shufflebtn.classList.add("is-active");

      song.addEventListener("ended", () => {
         handleChangeSong(1);
      });
   });
   bar.addEventListener("change", (e) => {
      song.currentTime = parseInt(e.target.value);
      displayTimer();
   });
   playlistItems.forEach((item) =>
      item.addEventListener("click", handleSelectPlaylistItem)
   );
   function handleMusicPlay() {
      if (playing) {
         song.play();
         playerImage.classList.add("is-playing");
         playBtn.classList.add("fa-pause");
         playBtn.classList.remove("fa-play");
         listSongs.forEach((item) => {
            if (item.src === song.getAttribute("src")) item.isDisplay = true;
         });
         playing = false;
      } else {
         song.pause();
         playerImage.classList.remove("is-playing");
         playBtn.classList.remove("fa-pause");
         playBtn.classList.add("fa-play");
         playing = true;
      }
      // createPlaylist();
      playlistItems.forEach((playlistItem) => {
         const playlistItemNameSong = playlistItem.querySelector(
            ".playlist-item-name"
         ).textContent;

         if (songName.textContent == playlistItemNameSong) {
            playlistItems.forEach((item) =>
               item.classList.remove("is-display")
            );
            playlistItem.classList.add("is-display");
         }
      });
   }

   function handleChangeSong(dir) {
      if (dir === 1) {
         songIndex++;
         if (songIndex === listSongs.length) {
            songIndex = 0;
         }
      } else if (dir === -1) {
         songIndex--;
         if (songIndex < 0) {
            songIndex = listSongs.length - 1;
         }
      }
      songName.textContent = listSongs[songIndex].name;
      song.setAttribute("src", listSongs[songIndex].src);
      songImg.setAttribute("src", listSongs[songIndex].imageSrc);
      displayTimer();
      playing = true;
      handleMusicPlay();
   }

   function displayTimer() {
      const { duration, currentTime } = song;
      songDuration.textContent = formatTimer(duration);
      songRemaining.textContent = formatTimer(currentTime);
      bar.max = duration;
      bar.value = currentTime;
   }
   function formatTimer(time) {
      const minutes = parseInt(time / 60);
      const seconds = parseInt(time - minutes * 60);
      return isNaN(time) ? `0:00` : `${minutes}:${`0${seconds}`.slice(-2)}`;
   }
   const timer = setInterval(displayTimer, 1000);
   function createPlaylist() {
      listSongs.forEach((item) => {
         const playlistItem = document.createElement("li");
         const playlistItemDiv = document.createElement("div");
         const playlistItemImg = document.createElement("img");
         const playlistItemSong = document.createElement("div");
         const playlistItemName = document.createElement("span");
         const playlistItemSinger = document.createElement("span");
         playlist.appendChild(playlistItem);
         playlistItem.appendChild(playlistItemDiv);
         playlistItemDiv.appendChild(playlistItemImg);
         playlistItemDiv.appendChild(playlistItemSong);
         playlistItemSong.appendChild(playlistItemName);
         playlistItemSong.appendChild(playlistItemSinger);

         playlistItem.className = `${
            [...listSongs].indexOf(item) === 0
               ? "playlist-item is-display"
               : "playlist-item"
         }`;
         playlistItemDiv.classList.add("playlist-item-info");
         playlistItemImg.classList.add("playlist-item-img");
         playlistItemImg.setAttribute("src", item.imageSrc);
         playlistItemSong.classList.add("playlist-item-song");
         playlistItemName.classList.add("playlist-item-name");
         playlistItemName.textContent = item.name;
         playlistItemSinger.classList.add("playlist-item-singer");
         playlistItemSinger.textContent = `@${item.singer}`;
      });
   }
   function handleSelectPlaylistItem(e) {
      const selectedSongName = e.currentTarget.querySelector(
         ".playlist-item-name"
      ).textContent;
      listSongs.forEach((item) => {
         if (item.name === selectedSongName) {
            songIndex = [...listSongs].indexOf(item);
            handleChangeSong(0);
         }
      });
   }
});
