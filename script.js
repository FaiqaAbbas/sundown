//  locomotive library
document.addEventListener("DOMContentLoaded", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#wrapper"),
    smooth: true,
  });
});

// Function to preload video and image
function preloadMedia(videoSrc, imageSrc) {
  var video = document.createElement("video");
  video.src = videoSrc;
  video.preload = "auto";

  var img = new Image();
  img.src = imageSrc;

  return {
    video: video,
    image: img,
  };
}




// Pre load all videos related to project lists
var project_video = document.querySelector(".video-on-hover");
var project_list = document.querySelector(".featured-projects-list");
var projects = document.querySelectorAll(".featured-projects-list .project");
// Object to store preloaded media URLs for each project
var preloadedMediaByProject = {};

projects.forEach(function (project) {
  var project_video_tab=querySelector('video');
  var projectName = project.classList[1];
  var videoSrc = project.getAttribute("video-src");
  var imageSrc = project.getAttribute("image-src");
  preloadedMediaByProject[projectName] = preloadMedia(videoSrc, imageSrc);
  project_video_tab.src=preloadedMediaByProject[projectName].video.src;
  // Event listeners for project hover
  project.addEventListener("mouseenter", function () {
    var preloadedMedia = preloadedMediaByProject[projectName];
    if(project_video.src==" "){
      project_video.src = preloadedMedia.video.src;
      project_video.poster = preloadedMedia.image.src;
    }
  });

  // Clear video source and poster on mouse leave
  project.addEventListener("mouseleave", function () {
    project_video.src = "";
    project_video.poster = "";
    // project_video.style.display='none';
  });
});

// for page 4
var a=document.querySelectorAll(".page4 .wrapper .left .three a");
// var before=document.querySelector()
// console.log(a);
// a.forEach(text,addEventListener('click',function(){
  
// }))