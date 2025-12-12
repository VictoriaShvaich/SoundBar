let btnBar = document.querySelector('.nav-button');
let navBar= document.querySelector('.navigationBarModal');
let btnClose= document.querySelector('.btnClose');
btnBar.addEventListener('click',function(){
  navBar.style.display = 'block';
})
btnClose.addEventListener('click',function(){
  navBar.style.display = 'none';
})