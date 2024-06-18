
// Lenis for smooth scrolling
const lenis = new Lenis();
lenis.on("scroll", (e) => {
  // console.log(e);
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
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
    var preloadPromise = preloadMedia(videoSrc, imageSrc).then(media => {
      project.dataset.mediaLoaded = 'true';
      project.dataset.videoSrc = media.video.src;
      project.dataset.imageSrc = media.image.src;
    }).catch(err => {
      console.error(`Failed to load media for ${projectName}:`, err);
    });
    preloadedMediaPromises.push(preloadPromise);
  });

  Promise.all(preloadedMediaPromises).then(() => {
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
  }).catch(err => {
    console.error("One or more media files failed to load:", err);
    document.body.style.display = "block"; // Show the content even if some media fail to load
  });
});


// Page4
var design = document.querySelector("#design");
var project = document.querySelector("#project");
var execution = document.querySelector("#execution");
var paragraph = document.querySelector(".page4 .left .paragraph");
var image = document.querySelector(".page4 .right img");

function updateHeading() {
  if (design.checked) {
    paragraph.innerText = "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src = "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  } else if (project.checked) {
    paragraph.innerText = "Once we have a design, our production team takes the lead in bringing it to life. We manage all stages of the project, from build specifications and technical drawings to site surveys, vendor management, and 2D & 3D production. We have an extensive network of partners to meet each unique design and project need.";
    image.src = "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d0_Project.webp";
  } else if (execution.checked) {
    paragraph.innerText = "We’re with you every step of the way, from the project initiation to launch day. Our production and design teams are onsite to direct and guide the process down to the last point of completion, ensuring success across the built space and experience.";
    image.src = "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15cd_Execution-p-800.jpg";
  } else {
    design.checked = true;
    paragraph.innerText = "Our team works with our clients to refine an idea and concept into an executable design.We create a final design that encompasses the brand narrative to bring stories to life and provide end-to-end design solutions from concept, design, and architectural drawings to 3D renderings.";
    image.src = "https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15e1_Project-p-800.jpg";
  }
}

design.addEventListener("change", updateHeading);
project.addEventListener("change", updateHeading);
execution.addEventListener("change", updateHeading);
updateHeading();

  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 3.5,
    freeMode: true,
    speed:1000
  });
  if (window.innerWidth <= 767) {
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 1.5,
        freeMode: true,
    });
  }
  

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