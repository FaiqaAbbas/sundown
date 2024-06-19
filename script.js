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

  gsap.registerPlugin(ScrollTrigger);
// #endregion Page1

// #region Page2


gsap.fromTo(".page2 .left, .page2 .right", {
  y: 200
}, {
  y: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".page2",
    start: "top 50%", // Animation starts when top of the trigger element hits 80% of the viewport height
    end: "bottom 50%", // Animation ends when bottom of the trigger element hits 20% of the viewport height
    scrub: true, // Smoothly animates the values over the duration of the scroll
    // markers: true // Optional: shows markers for trigger start and end points
  }
});
// #endregion Page2

// #region Page3

gsap.registerPlugin(ScrollTrigger);

// Function to animate each project as it comes into view
function animateProjects() {
  gsap.utils.toArray(".featured-projects-list .project").forEach((project) => {
    gsap.fromTo(project.querySelector("h2"), {
      opacity: 1,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      duration:1,
      scrollTrigger: {
        trigger: project,
        start: "top 80%", // Start animating when the top of the project is 80% from the top of the viewport
        end: "bottom 0%", // End animating when the bottom of the project is 20% from the bottom of the viewport
        toggleActions: "play reset play reset", // Controls the play and pause behavior
        // markers: true // Optional: Shows markers for debugging
      }
    });
  });
}

animateProjects();
// #endregion Page3

// #region Page 4 
gsap.fromTo(".page4 .wrapper .left", {
  y: 200
}, {
  y: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".page4",
    start: "top 90%", // Animation starts when top of the trigger element hits 80% of the viewport height
    end: "bottom 50%", // Animation ends when bottom of the trigger element hits 20% of the viewport height
    scrub: true, // Smoothly animates the values over the duration of the scroll
    // markers: true // Optional: shows markers for trigger start and end points
  }
});
// #endregion Page 4 

// #region Page 5


  // Create a GSAP timeline for sequencing animations
  const page5Cards = document.querySelectorAll('.page5 .carousel .card');

  // Create a GSAP timeline for sequencing animations
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5",
      start: "top 60%", // Animation starts when top of .page5 is 60% from the top of viewport
      end: "bottom 100%", // Animation ends when bottom of .page5 is 100% from the top of viewport
      scrub: true, // Smoothly animates the timeline over the duration of the scroll
      // markers: true // Optional: shows markers for trigger start and end points
    }
  });

  // Loop through each card and add to timeline with smooth animation
  page5Cards.forEach((card, index) => {
    tl1.fromTo(card, {
      y: 100, // Start each card 50px below its final position
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2, // Adjust duration as needed
      ease: "sine.inOut" // Use a smooth easing function
    }, index * 1); // Stagger each card animation by 0.1 seconds
  });


// #endregion Page 5
})
// #endregion GSAP Animation



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


