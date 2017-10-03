var tabButton = document.getElementsByClassName('tab'),
tabContent = document.getElementsByClassName('tab-content');

tabButton[0].classList.add('active');
tabContent[0].style.display = 'block';

function city(e, x) {
var i;
for (i = 0; i < tabButton.length; i++) {
    tabContent[i].style.display = 'none';
    tabButton[i].classList.remove('active');
}
document.getElementById(x).style.display = 'block';
e.currentTarget.classList.add('active');
}
