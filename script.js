document.addEventListener('DOMContentLoaded', function() {
  // Your code here
// #region p-Lenis for smooth scrolling
const lenis = new Lenis();
lenis.on("scroll", (e) => {
  // console.log(e);
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
// #endregion p-Lenis for smooth scrolling


// #region Page1

const heroLeft = document.querySelectorAll('.page1 .hero .left p');
const heroRight = document.querySelector('.page1 .hero .right p');


  // Create a GSAP timeline for sequencing animations
  const tl = gsap.timeline();

  // Animate each paragraph in heroLeft one after another
  heroLeft.forEach((p, index) => {
    tl.fromTo(p, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.3 }, 
      index * 0.2  // Delay each subsequent animation by 0.2 seconds
    );
  });

  // Animate heroRight paragraph after heroLeft animations
  tl.fromTo(heroRight, 
    { opacity: 0, y: 60 }, 
    { opacity: 1, y: 0, duration: 1 },
    '-=1'  // Start this animation 0.8 seconds before the previous one ends
  );

// #endregion Page1

// #region Page2

let page1=document.querySelector('.page1 video')
let page2Left=document.querySelector('.page2 .left')
let page2Right=document.querySelector('.page2 .right')

page1.addEventListener('mouseenter',function(){
  gsap.fromTo([page2Left,page2Right],{
    opacity:0,
    y:100
  },
  {
    opacity:1,
    y:0,
    duration:2
  })
})
// #endregion Page2

// #region Page 3 


const project_heading = document.querySelectorAll(
  ".featured-projects-list .project a h2"
);
let page2Content=document.querySelector('.page2-content-container')


page2Content.addEventListener("mouseleave", function () {
  project_heading.forEach((project) => {
    gsap.from(project, {
      opacity: 0,
      y: 100
    });
    gsap.to(project, {
      opacity: 1,
      y: 0,
      duration: 1, // Optionally, specify the animation duration
    });
  });
});
// #endregion Page 3 

// #region Page 4 
let page3=document.querySelector('.page3 .featured-projects-list')
let page4=document.querySelector('.page4 .wrapper .left')
page3.addEventListener('mouseleave',function(){
  gsap.fromTo(page4,
    {
      y:100,
      opacity:0
    },
    {
      y:0,
      opacity:1,
      duration:1
    })
})
// #endregion Page 4 

// #region Page 5
let page4Left=document.querySelector('.page4 .wrapper .left')
let page4Right=document.querySelector('.page4 .wrapper .right img')
let page4content=[page2Left,page4Right]
let page5=document.querySelector('.page5 .carousel')
page4content.forEach((side)=>{
  side.addEventListener('mouseleave',function(){
  gsap.fromTo(page5,{
    opacity:0,
    y:100
  },
  {
    opacity:1,
    y:0
  }

)})

})

// #endregion Page 5
// #endregion GSAP Animation
})



// #endregion Page3



// #region Page3 Media Preloading
// Preloading Media for Page 3
function preloadMedia(videoSrc, imageSrc) {
  return new Promise((resolve, reject) => {
    var video = document.createElement("video");
    video.src = videoSrc;
    video.preload = "auto";
    video.onloadeddata = () => resolve(video);
    video.onerror = reject;

    var img = new Image();
    img.src = imageSrc;

    resolve({
      video: video,
      image: img,
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Pre load all videos related to project lists
  var project_video = document.querySelector(".video-on-hover");
  var projects = document.querySelectorAll(".featured-projects-list .project");

  // Object to store preloaded media URLs for each project
  var preloadedMediaPromises = [];

  projects.forEach(function (project) {
    var projectName = project.classList[1];
    var imageSrc = project.getAttribute("image-src");
    var videoSrc = project.getAttribute("video-src");
    var preloadPromise = preloadMedia(videoSrc, imageSrc)
      .then((media) => {
        project.dataset.mediaLoaded = "true";
        project.dataset.videoSrc = media.video.src;
        project.dataset.imageSrc = media.image.src;
      })
      .catch((err) => {
        console.error(`Failed to load media for ${projectName}:`, err);
      });
    preloadedMediaPromises.push(preloadPromise);
  });

  Promise.all(preloadedMediaPromises)
    .then(() => {
      document.body.style.display = "block"; // Show the content after all media are loaded

      // Event listeners for project hover
      projects.forEach(function (project) {
        project.addEventListener("mouseenter", function () {
          project_video.poster = project.dataset.imageSrc;
          project_video.src = project.dataset.videoSrc;
        });

        project.addEventListener("mouseleave", function () {
          project_video.poster = " ";
          project_video.src = " ";
        });
      });
    })
    .catch((err) => {
      console.error("One or more media files failed to load:", err);
      document.body.style.display = "block"; // Show the content even if some media fail to load
    });
});

//  #endregion Page3 Media Preloading

// #region Page4 Picture and Changing content
var design = document.querySelector("#design");
var project = document.querySelector("#project");
var execution = document.querySelector("#execution");
var paragraph = document.querySelector(".page4 .left .paragraph");
var image = document.querySelector(".page4 .right img");

function updateHeading() {
  if (design.checked) {
    paragraph.innerText =
      "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src =
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  } else if (project.checked) {
    paragraph.innerText =
      "Once we have a design, our production team takes the lead in bringing it to life. We manage all stages of the project, from build specifications and technical drawings to site surveys, vendor management, and 2D & 3D production. We have an extensive network of partners to meet each unique design and project need.";
    image.src =
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d0_Project.webp";
  } else if (execution.checked) {
    paragraph.innerText =
      "We’re with you every step of the way, from the project initiation to launch day. Our production and design teams are onsite to direct and guide the process down to the last point of completion, ensuring success across the built space and experience.";
    image.src =
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15cd_Execution-p-800.jpg";
  } else {
    design.checked = true;
    paragraph.innerText =
      "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src =
      "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  }
}

design.addEventListener("change", updateHeading);
project.addEventListener("change", updateHeading);
execution.addEventListener("change", updateHeading);
updateHeading();
// #endregion Page4 Picture and Changing content

// #region Page 5 Swiper and Cursor
var swiper = new Swiper(".swiper-container", {
  slidesPerView: 3.5,
  freeMode: true,
  speed: 1000,
});
if (window.innerWidth <= 767) {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1.5,
    freeMode: true,
  });
}
// Page 5 swiper cursor

function mouseMover() {
  const cursor = document.querySelector(".cursor");
  const page5 = document.querySelector(".page5");
  page5.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
    });
  });
  page5.addEventListener("mouseleave", (dets) => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
  page5.addEventListener("mouseenter", (dets) => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });
}
mouseMover();
// #endregion Page 5 Swiper and Cursor


