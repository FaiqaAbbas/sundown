
const carousel_container=document.querySelector('.carousel-container')
const cursor=document.querySelector('.cursor')
carousel_container.addEventListener('mousemove',function(details){ 
  cursor.style.top=`${details.clientY}px`; 
  cursor.style.left=`${details.clientX}px`; 
})
