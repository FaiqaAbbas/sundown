<<<<<<< Updated upstream
document.addEventListener("DOMContentLoaded", function() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,

      });
    });

=======
>>>>>>> Stashed changes

function x(y){
  console.log('x');
  y();
  console.log("after y")
}
<<<<<<< Updated upstream
setTimeout(function y(){
  console.log('y');
},1000);
=======

x(function y(){
    setTimeout(function(){
      for(i=0;i<20;i++){
        console.log(i);
      }
    },2000)
});


























// document.addEventListener("DOMContentLoaded", function() {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector("#wrapper"),
//         smooth: true,

//       });
//     });
>>>>>>> Stashed changes
