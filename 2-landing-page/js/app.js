const elem = document.querySelectorAll('img');//Selected all images
var ulLists = document.getElementById('#navbar_list'); // Selected ul id navbar_list
var listArray =['<a>Litsey haqida</a>','<a>Ta\'lim</a>','<a>Boshqaruv</a>','<a>Qabul</a>']// Global variable
const elems = document.querySelectorAll('section');// Selected all section
function scrollFunction() {
    for(var i=0;i<4;i++){
        if (document.body.scrollTop > elem[i].y || document.documentElement.scrollTop > elem[i].y) {
            elem[i].classList.add('toTop');
        }
    }
} // function for images add animation
function addElems(pElem,chElem,currentElems,innerH){
    for(var i=0;i<currentElems;i++){
        const navElement = document.createElement(chElem);
        navElement.innerHTML=innerH[i];
        pElem.appendChild(navElement);
    }
}
function scrolNav(){
    var nav = document.querySelector('nav')
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop >20){
        nav.classList.add('navs')
    }
    else{
        nav.classList.remove('navs')
    }
} // function for navbar animation
function addActive(){
    array = ulLists.querySelectorAll('a');
    elements = document.getElementsByTagName('section');
    for(var i=0;i<4;i++){
        let j = i;
        array[i].addEventListener('click', function(event){
            var current = document.getElementsByClassName('active')
            array = array;
            current[0].classList.remove('active');
            this.classList.add('active');
            elements[j].scrollIntoView();
            event.preventDefault();
        });    };
} // add class active a tag
function isViewport (elem) {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) );
}; // Identify is in Viewport
function setActiveClass(){
    for (let i=0; i < elems.length; i++){
        if (isViewport(elems[i])){
            elems[i].classList.add("active-section");
        }else{
            elems[i].classList.remove("active-section");
        }
    }
} // add or remove class active-section
// Define global functions
addElems(ulLists,'li',4,listArray);
addActive();
// functions
window.onscroll = function() {
    scrolNav();
    scrollFunction();
};
document.addEventListener('scroll', function(){
    setActiveClass();
});
//Define Events 
