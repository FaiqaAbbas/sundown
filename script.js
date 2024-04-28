//  locomotive library
document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,

      });
    });

var project_video=document.querySelector(".video-on-hover");
var project_list=document.querySelector(".featured-projects-list");

var project=document.querySelectorAll(".featured-projects-list .project");
project.forEach(function(e){
    e.addEventListener("mouseenter",function(){
      project_video.src = e.getAttribute('video-src');
      project_video.poster = e.getAttribute('image-src');
    })
   
})
// e.addEventListener("mouseleave",function(){
//   project_video.style.display="none";
// })

project_list.addEventListener("mouseenter",function(){
  project_video.style.display="block";
});
project_list.addEventListener("mouseleave",function(){
  project_video.style.display="none";
});