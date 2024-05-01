//  locomotive library
document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,

      });
    });
    var page1_video_clone=document.createElement("video");
    page1_video_clone.src="./sources/page1video.mp4";
    page1_video_clone.preload='auto';
    var page1_video=document.querySelector('.page1_video');
    page1_video.src=page1_video_clone.src;


    var project_video = document.querySelector(".video-on-hover");
    var project_list = document.querySelector(".featured-projects-list");
    var projects = document.querySelectorAll(".featured-projects-list .project");
      // Object to store preloaded media URLs for each project
    var preloadedMediaByProject = {};
    
    // Function to preload video and image
    function preloadMedia(videoSrc, imageSrc) {
        var video = document.createElement('video');
        video.src = videoSrc;
        video.preload = 'auto';
    
        var img = new Image();
        img.src = imageSrc;
    
        return {
            video: video,
            image: img
        };
    }
    
    // // Preload media for each project
    projects.forEach(function(project) {
        var projectName = project.classList[1];
        var videoSrc = project.getAttribute('video-src');
        var imageSrc = project.getAttribute('image-src');
        preloadedMediaByProject[projectName] = preloadMedia(videoSrc, imageSrc);
         // Event listeners for project hover
         project.addEventListener("mouseenter", function() {
          var preloadedMedia = preloadedMediaByProject[projectName];
          project_video.src = preloadedMedia.video.src;
          project_video.poster = preloadedMedia.image.src;
      });
  
      // Clear video source and poster on mouse leave
      project.addEventListener("mouseleave", function() {
          project_video.src = "";
          project_video.poster = "";
      });

});
           
    // Show video on project list hover
    project_list.addEventListener("mouseenter", function() {
        project_video.style.display = "block";
    });
    
    // Hide video on project list mouse leave
    project_list.addEventListener("mouseleave", function() {
        project_video.style.display = "none";
    });
    


























    // var project_video=document.querySelector(".video-on-hover");
// var project_list=document.querySelector(".featured-projects-list");

// var project=document.querySelectorAll(".featured-projects-list .project");
// project.forEach(function(e){
//     e.addEventListener("mouseenter",function(){
//       project_video.src = e.getAttribute('video-src');
//       project_video.poster = e.getAttribute('image-src');
//     })
   
// })
// // e.addEventListener("mouseleave",function(){
// //   project_video.style.display="none";
// // })

// project_list.addEventListener("mouseenter",function(){
//   project_video.style.display="block";
// });
// project_list.addEventListener("mouseleave",function(){
//   project_video.style.display="none";
// });