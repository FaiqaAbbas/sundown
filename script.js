
// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#wrapper'),
//     smooth: true
// });



// function counter(){
//     var count=0;
//     return {
//         increment(){
//             count++;
//             console.log(count)
//         },
//         dcerement(){
//             count--;
//             console.log(count)
//         }
//     }
    
// }

// var counter1=counter();
// counter1.increment();

// function Counter(){
//     var count=100;
//     this.increment= function(){
//         count++;
//         console.log(count)
//     }
//     this.dcerement=function(){
//         count--;
//         console.log(count)
//     }    
// }
// var counter1=new Counter();
















function Counter(){
    var count=0;
    this.increment=function(){
        count++;
        console.log(count);
    }
    
    this.decrement=function(){
        count--;
        console.log(count);
    }
    
}
var counter1=new Counter();
counter1.increment();

var counter2=new Counter();
counter2.increment();
counter2.increment();
counter2.decrement();

