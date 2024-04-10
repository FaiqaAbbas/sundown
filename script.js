document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,

      });
    });


function x(y){
  console.log('x');
  y();
  console.log("hello Y is gone")
}
setTimeout(function y(){
  console.log('y');
},1000);
