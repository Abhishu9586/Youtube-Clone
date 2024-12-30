const videoCardContainer = document.querySelector(".video-wrapper");

let api_key = "AIzaSyDD5BpZSzVz_mh1w079o8sZ2mpvsa6_gt8";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
const YOUTUBE_VIDEO_API = `${video_http}part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${api_key}`;

fetch(YOUTUBE_VIDEO_API)
.then((res) => res.json())
.then((data) => {
    data.items.forEach((item) =>{
        getChannelIcon(item);
    });
})
.catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
    let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
    fetch(
        channel_http + 
        new URLSearchParams({
            key : api_key,
            part : "snippet",
            id : video_data.snippet.channelId,
        })
    )
    .then((res) => res.json())
    .then((data) =>{
        video_data.channelThumbnail = 
        data.items[0].snippet.thumbnails.default.url;
        makeVideocard(video_data);
    })
    .catch((err) => console.log(err));
};

const playVideo = (embedHtml) => {
    sessionStorage.setItem("videoEmbedHtml" , embedHtml);

window.location.href = "video-page.html"

}

const makeVideocard =(data) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videoCard.innerHTML =`  
                    <div class="video-content">
                        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=""/>
                    </div>
                    <div class="video-details">
                        <div class="channel-logo">
                            <img src="${data.channelThumbnail}" class="channel-icon" alt=""/>
                        </div>
                        <div class="detail">
                            <h3 class="title">${data.snippet.title}</h3>
                            <div class="channel-name">${data.snippet.channelTitle}</div>
                        </div>
                    </div> `;

                    videoCard.addEventListener("click" , ()=> {
                        playVideo(data.player.embedHtml);
                    });
                videoCardContainer.appendChild(videoCard);
};
