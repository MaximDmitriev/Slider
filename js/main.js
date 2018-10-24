window.addEventListener('DOMContentLoaded', () => {
    
    'use strict';

    // Tabs 

    let tabContainer = document.querySelector('.info-header'),
        tab = document.getElementsByClassName('info-header-tab'),
        tabContent = document.getElementsByClassName('info-tabcontent fade');

    function hideTabContent(a) {
        for (let i = a; i < tab.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }

    tabContainer.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    // Timer

    let deadline = '2018-10-26';

    function getTimeRemaining(endtime) {
        
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/1000/60/60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        if (hours < 10) {
            hours = `0${hours}`;
        }

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }
    }

    function setClock(id, endtime) {
        
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        
        
        function updateClock() {
            
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            
            if (t.total < 0) {
                clearInterval(timeInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }

    }


    setClock('timer', deadline);
 
    // Scroll

    let infoBtn = document.querySelectorAll('ul>li>a'),
        aboutScreen = document.querySelector('.info'),
        photoScreen = document.querySelector('#photo'),
        priceScreen = document.querySelector('#price'),
        contactsScreen = document.querySelector('#contacts');


    infoBtn[0].addEventListener('click', () => {
        
        let coordY = aboutScreen.offsetTop - 80;
                        
        let scroller = setInterval( () => {
            let scrollBy = coordY / 60;
            
              if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                
                window.scrollBy(0, scrollBy);
              } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
              }
            }, 17);
    });

    infoBtn[1].addEventListener('click', () => {
        
        let coordY = photoScreen.offsetTop - 80;
                        
        let scroller = setInterval( () => {
            let scrollBy = coordY / 60;
            
              if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                
                window.scrollBy(0, scrollBy);
              } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
              }
            }, 17);
    });
        
        
        
    infoBtn[2].addEventListener('click', () => {
        
        let coordY = priceScreen.offsetTop - 80;
                        
        let scroller = setInterval( () => {
            let scrollBy = coordY / 60;
            
              if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                
                window.scrollBy(0, scrollBy);
              } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
              }
            }, 17);
    });

    infoBtn[3].addEventListener('click', () => {
        
        let coordY = contactsScreen.offsetTop - 80;
                        
        let scroller = setInterval( () => {
            let scrollBy = coordY / 60;
            
              if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                
                window.scrollBy(0, scrollBy);
              } else {
                window.scrollTo(0, coordY);
                clearInterval(scroller);
              }
            }, 17);
    });


    // Modal

    let btnMore = document.querySelector('.more'),
        btnClose = document.querySelector('.popup-close'),
        overlayWindow = document.querySelector('.overlay');


    function showMore(){
        overlayWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        btnMore.classList.add('more-splash');
    }

    btnMore.addEventListener('click', () => {
        showMore();
    });
   
    btnClose.addEventListener('click', () => {
        overlayWindow.style.display = 'none';
        btnMore.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    aboutScreen.addEventListener('click', (event) => {
        if(event.target.classList.contains('description-btn')){
            showMore();
        }
    });


    // Form

    let message = {
        loading: "<img src='img/load.png'><p>Загрузка...</p>",
        success: "<img src='img/success.png'><p>Спасибо! Мы с вами свяжемся в ближайшее время!</p>",
        failure: "<img src='img/error.png'><p>Произошла ошибка, попробуйте еще раз</p>",
        wrongInput: "<img src='img/alert.png'><p>Неправильный ввод: только цифры и '+'</p>"
    };

    let form = document.querySelector('.main-form'),
        formContact = document.querySelector('.contact-form > form'),
        statusInfo = document.createElement('div');

    statusInfo.classList.add('status');
    
    function sendData(question){
        let input = question.querySelectorAll('input'),
            phone = question.querySelector('input[name=phone]');

        question.appendChild(statusInfo);

        function clearInput() {
            for (let i=0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        function checkStatus(data) {
            return new Promise(function(resolve, reject){
                let request = new XMLHttpRequest();

                request.open('POST', '../server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
                request.addEventListener('readystatechange', function(){
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
                request.send(data);
            });
        }
        
        if (/\D/.test(phone.value) && !/\+/.test(phone.value)) {
            statusInfo.innerHTML = message.wrongInput;
            phone.value = '';
        } else {
            let formData = new FormData(question);

            checkStatus(formData)
                .then(() => statusInfo.innerHTML = message.loading)
                .then(() => statusInfo.innerHTML = message.success)
                .catch(() => statusInfo.innerHTML = message.failure)
                .then(() => clearInput())
        }
    }

    form.addEventListener('submit', function(event){
        event.preventDefault();
        sendData(form);
    });

    formContact.addEventListener('submit', function(event){
        event.preventDefault();
        sendData(formContact);
    });

// Slider

    let slideIndex = 2,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
       
        if(n > slides.length) {
            slideIndex = 1;
            
        }

        if(n < 1) {
            slideIndex = slides.length;
            
        }

        slides.forEach((item) => item.style.display = 'none');
        slides[slideIndex-1].style.display = 'block';
        slides[slideIndex-1].classList.add('widthTransform');

        dots.forEach((item) => item.classList.remove('dot-active'));
        dots[slideIndex-1].classList.add('dot-active');

    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function changeSlides(n) {
        showSlides(slideIndex += n);
    }

    next.addEventListener('click', () => {
        changeSlides(1);
    });

    prev.addEventListener('click', () => {
        changeSlides(-1);
    });

    dotsWrap.addEventListener('click', (event) => {
        for(let i = 1; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });


    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        daysSum = 0,
        personsSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    function calcTotal(){
        total = (daysSum * personsSum) * 2000;

        if(persons.value == '' || restDays.value == ''){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    }


            //  Инпутами отсекаем ненужный ввод, ченджем вызываем рассчет

    persons.addEventListener('input', function() {
        if(/\D/.test(persons.value[persons.value.length - 1])) {
            persons.value = persons.value.slice(0, persons.value.length - 1);
        } else {
            personsSum = +this.value;
        }
    });

    persons.addEventListener('change', () => calcTotal());

    restDays.addEventListener('input', function() {
        if(/\D/.test(restDays.value[restDays.value.length - 1])) {
            restDays.value = restDays.value.slice(0, restDays.value.length - 1);
        } else {
            daysSum = +this.value;
        }
    });

    restDays.addEventListener('change', () => calcTotal());

    place.addEventListener('change', function(){
        if(persons.value == '' || restDays == ''){
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});