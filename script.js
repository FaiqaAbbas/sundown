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

      project_video.style.display="block";
      project_video.style.background=`url(${ e.getAttribute('data-src')})`

    })
    e.addEventListener("mouseleave",function(){
      project_video.style.display="none";
    })
})
// // var data_source=project.getAttribute('data_src');
// // alert(data_source);
// project_list.addEventListener("mouseenter",function(){
//   project_video.style.display="block";
// });
// project_list.addEventListener("mouseleave",function(){
//   project_video.style.display="none";
// });