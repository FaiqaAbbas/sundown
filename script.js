
document.addEventListener('DOMContentLoaded', function() {
  const webPage = document.querySelector('.webPage');
  const loader = document.querySelector('.loader');
  const loaderText = document.querySelector('.loaderText');
  const textArray = ['ENVIRONMENTS', 'EXPERIENCES', 'CONTENT', ''];
  let textIndex = 0;
  
  // Hide the scrollbar initially
  document.body.style.overflow = 'hidden';
  
  // Function to change the text
  function changeText() {
      loaderText.innerText = textArray[textIndex];
      textIndex = (textIndex + 1);
  
      // Check if all texts have been shown
      if (textIndex === textArray.length) {
          // Animate loader sliding up
          loader.style.transition = 'transform 1s ease, opacity 1s ease';
          loader.style.transform = 'translateY(-100%)';
          
          // Optionally hide loader after animation completes
          setTimeout(() => {
              loader.style.display = 'none';
          }, 1000); // Wait for 1 second (adjust as needed)
  
          // Show the main content
          webPage.style.display = 'block';
  
          // Re-enable the scrollbar
          document.body.style.overflow = 'auto';
  
          // Stop the text change loop
          return;
      }
  
      // Continue changing text
      setTimeout(changeText, 2000);
  }
  
  // Initial call to set the first text immediately
  changeText();
  
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

// #region GSAP and ScrollTrigger Animation
  
gsap.registerPlugin(ScrollTrigger);

// #region Page1

// gsap.fromTo(['.page1 .hero .left','.page1 .hero .right'] ,{
//   opacity:0.6,
//   rotate:10
// },
// {
//   opacity:1,
//   rotate:0,
//   duration:3,
//   scrollTrigger:{
//     trigger:".page1 .hero",
//     start:"bottom 100%",
//     end:"bottom 80%",
//     // end:"bottom 30%",
//     scrub:true,
//     // markers:true
//   }
// })

// #endregion Page1

// #region Page2
gsap.fromTo(".page2 .left, .page2 .right", {
  opacity:0,
  scale:0.5,
  rotate:-10
}, 
{
  opacity:1,
  rotate:0,
  scale:1,
  duration: 2,
  scrollTrigger: {
    trigger: ".page2",
    start: "top 80%", // Animation starts when top of the trigger element hits 80% of the viewport height
    end: "bottom 100%", // Animation ends when bottom of the trigger element hits 20% of the viewport height
    scrub: true, // Smoothly animates the values over the duration of the scroll
    ease:"linear.inOut"
    // markers: true // Optional: shows markers for trigger start and end points
  }
});
// #endregion Page2

// #region Page3


// Function to animate each project as it comes into view
function animateProjects() {
  gsap.utils.toArray(".featured-projects-list .project")
  .forEach((project) => {
    gsap.fromTo(project.querySelector("h2"), {
      opacity: 1,
      y: 80
    }, 
    {
      opacity: 1,
      y: 0,
      duration:1,
      scrollTrigger: {
        trigger: project,
        start: "bottom 120%",
        end: "top 40%", 
        // scrub:true,// Start animating when the top of the project is 80% from the top of the viewport
        // end: "bottom 0%", // End animating when the bottom of the project is 20% from the bottom of the viewport
        toggleActions: "play none play reset", // Controls the play and pause behavior
        // markers: true // Optional: Shows markers for debugging
      }
    });
  });
}

animateProjects();
// #endregion Page3

// #region Page 4 
gsap.fromTo([".page4 .wrapper .left",".page4 .wrapper"], {
  y: 200
}, {
  y: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".page3",
    start: "bottom 70%", // Animation starts when top of the trigger element hits 80% of the viewport height
    // end: "bottom 50%", // Animation ends when bottom of the trigger element hits 20% of the viewport height
    scrub: true, // Smoothly animates the values over the duration of the scroll
    // markers: true // Optional: shows markers for trigger start and end points
  }
});
// #endregion Page 4 

// #region Page 5


  // Create a GSAP timeline for sequencing animations
  // const page5Cards = document.querySelectorAll('.page5 .carousel .card');

  // Create a GSAP timeline for sequencing animations
  gsap.fromTo('.page5 .carousel', {
    y: 100, // Start each card 50px below its final position
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 3, // Adjust duration as needed 
    scrollTrigger: {
      trigger: ".page5 .carousel",
      start: "top 80%",
      end:"bottom 90%", 
      ease:'power2.inOut',
      scrub: true
    }
  });

// #endregion Page 5

// #region p-footer
gsap.fromTo([".footer_logo",".footer .top"], {
  opacity:0,
  // scale:0,
  y:-100
}, 
{
    y:0,
  opacity:1,
  // scale:1,
  duration: 4,
  scrollTrigger: {
    trigger: ".page5",
    start: "bottom 70%", // Animation starts when top of the trigger element hits 80% of the viewport height
    // end: "bottom 20%", // Animation ends when bottom of the trigger element hits 20% of the viewport height
    scrub: true, // Smoothly animates the values over the duration of the scroll
    ease:"power2.inOut"
    // markers: true // Optional: shows markers for trigger start and end points
  }
})
// #endregion p-footer

// #endregion GSAP and ScrollTrigger Animation


})


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
     

      // Event listeners for project hover
      projects.forEach(function (project) {
        var video=project.querySelector('video')
        video.src=project.dataset.videoSrc;
        video.poster=project.dataset.imageSrc;
        
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
// Swiper
var swiper = new Swiper('.swiper-container', {
  freeMode: true,
  breakpoints: {
    
    // when window width is >= 480px
    991: {
      slidesPerView: 3.7,
      spaceBetween: 10
    },
    // when window width is >= 640px
    767: {
      slidesPerView: 2.7,
      spaceBetween: 30
    },
    481: {
      slidesPerView: 1.6,
      spaceBetween: 30
    },
    100:{
      slidesPerView: 1.345,
      spaceBetween: 0
    }
    
  }

});
// Cursor
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
