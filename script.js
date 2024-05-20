//  locomotive library
document.addEventListener("DOMContentLoaded", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#wrapper"),
    smooth: true,
  });
});

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
// var project_video_tab=document.querySelector('.featured-projects-list .project video');
// Object to store preloaded media URLs for each project
var preloadedMediaByProject = {};
projects.forEach(function (project) {
  var projectName = project.classList[1];
  var videoSrc = project.getAttribute("video-src");
  var imageSrc = project.getAttribute("image-src");
  preloadedMediaByProject[projectName] = preloadMedia(videoSrc, imageSrc);
  // project_video_tab.src=preloadedMediaByProject[projectName].video.src;
  // Event listeners for project hover
  project.addEventListener("mouseenter", function () {
    var preloadedMedia = preloadedMediaByProject[projectName];
    project_video.src = preloadedMedia.video.src;
    project_video.poster = preloadedMedia.image.src;
    if(project_video.src==" "){
      project_video.src = preloadedMedia.video.src;
      project_video.poster = preloadedMedia.image.src;
    }
  });
  // Clear video source and poster on mouse leave
  project.addEventListener("mouseleave", function () {
    project_video.src = " ";
    project_video.poster = " ";
    // project_video.style.display='none';
  });
});

// Page4
var design=document.querySelector("#design");
var project=document.querySelector("#project");
var execution=document.querySelector("#execution");
var paragraph = document.querySelector(".page4 .left .paragraph"); // Assuming there's only one h1 element
var image = document.querySelector(".page4 .right img"); // Assuming there's only one h1 element

function updateHeading() {
  if (design.checked) {
    paragraph.innerText = "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src="https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  } else if (project.checked) {
    paragraph.innerText = "Once we have a design, our production team takes the lead in bringing it to life. We manage all stages of the project, from build specifications and technical drawings to site surveys, vendor management, and 2D & 3D production. We have an extensive network of partners to meet each unique design and project need.";
    image.src="https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d0_Project.webp";
  } else if (execution.checked) {
    paragraph.innerText = "We’re with you every step of the way, from the project initiation to launch day. Our production and design teams are onsite to direct and guide the process down to the last point of completion, ensuring success across the built space and experience.";
    image.src="https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15cd_Execution-p-800.jpg"
  } else {
    // Handle the case where no radio button is selected (optional)
    design.checked=true;
    paragraph.innerText = "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src="https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  }
}

// Add event listeners for all radio buttons
design.addEventListener("change", updateHeading);
project.addEventListener("change", updateHeading);
execution.addEventListener("change", updateHeading);

// Optionally, call updateHeading() initially to set the heading based on the default selection
updateHeading();





  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mousemove',function(details){
    let scrollIndicator=document.querySelector(".scrollIndicator")
    scrollIndicator.style.top=`${details.clientY}px`; 
    scrollIndicator.style.left=`${details.clientX}px`; 
})
  let isMouseDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the scroll speed multiplier as needed
    carousel.scrollLeft = scrollLeft - walk;
  });
