function Observe() {
    this.video = {
        play: new Set(),
        pause: new Set(),
        next: new Set(),
        prev: new Set(),
    };

    this.subscribe = function (eventName, listener) {
        this.video[eventName].add(listener);
    };

    this.unsubscribe = function (eventName, listener) {
        this.video[eventName].delete(listener);
    };

    this.notify = function (eventName) {
        if (this.video[eventName]) {
            this.video[eventName].forEach(listener => listener());
        }
    };
}

const video = document.querySelector("video");
const elementPauseCenter = document.querySelector(".center-pause")
const screenVideo = document.querySelector(".screen-video")
const pausePlayBtn = document.querySelector(".pause-play-btn");
const controlBar = document.querySelector(".control-bar");
const playBtn = document.querySelector(".play-btn");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");
const muteBtn = document.querySelector(".mute-btn");
const fullscrBtn = document.querySelector(".fullscr-btn");
const currentTimeDisplay = document.querySelector(".current-time");
const durationTimeDisplay = document.querySelector(".duration-time");

const isPlayProxy = new Proxy({
    isPlay: false,
}, {
    set: (target, prop, value) => {
        target[prop] = value;
        if (value) {
            playVideo();
        } else {
            pauseVideo();
        }
        return true;
    },
});

const playVideo = () => {
    pausePlayBtn.src = isPlayProxy.isPlay ? "./assets/imgs/play.svg" : "./assets/imgs/pause.svg"
    elementPauseCenter.classList.add("hidden")
    video.play();
};

const pauseVideo = () => {
    pausePlayBtn.src = isPlayProxy.isPlay ? "./assets/imgs/play.svg" : "./assets/imgs/pause.svg"
    elementPauseCenter.classList.remove("hidden")
    video.pause();
};

const togglePlayPause = () => {
    isPlayProxy.isPlay = !isPlayProxy.isPlay;
};

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const toggleMute = () => {
    video.muted = !video.muted;
    muteBtn.src = video.muted ? './assets/imgs/mute.svg' : './assets/imgs/unmute.svg';
};

const skip = (seconds) => {
    if (video.currentTime + seconds < 0) {
        video.currentTime = 0;
    }
    if (video.currentTime + seconds > video.duration) {
        video.currentTime = 0;
    }
    video.currentTime += seconds;
};

const updateProgressBar = () => {
    const percentage = (video.currentTime / video.duration) * 100;
    progressFill.style.width = `${percentage}%`;
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    durationTimeDisplay.textContent = formatTime(video.duration);
};

const handleProgressBarClick = (event) => {
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    video.currentTime = percentage * video.duration;
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const showControls = () => {
    controlBar.classList.remove('hidden');
};

const hideControls = () => {
    setTimeout(()=>{
        controlBar.classList.add('hidden');
    },2000)
};

screenVideo.addEventListener("mousemove", showControls);
screenVideo.addEventListener("mouseleave", hideControls);
controlBar.addEventListener("mousemove", showControls);
controlBar.addEventListener("mouseleave", hideControls);
pausePlayBtn.addEventListener("click", togglePlayPause);
elementPauseCenter.addEventListener("click", togglePlayPause);
fullscrBtn.addEventListener("click", toggleFullscreen);
muteBtn.addEventListener("click", toggleMute);
progressBar.addEventListener("click", handleProgressBarClick);
video.addEventListener("timeupdate", updateProgressBar);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case " ":
            event.preventDefault();
            togglePlayPause();
            break;
        case "ArrowRight":
            skip(15);
            break;
        case "ArrowLeft":
            skip(-15);
            break;
        case "Escape":
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            break;
    }
});

