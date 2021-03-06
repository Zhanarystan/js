window.addEventListener('DOMContentLoaded',()=>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const deadline = '2021-01-20';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t /( 1000 * 60 * 60)) % 24),
              minutes = Math.floor((t/1000/60) % 60),
              seconds = Math.floor((t/1000) % 60);

        return {
            'total': t,
            'days' :days,
            'hours' :hours,
            'minutes' :minutes,
            'seconds' :seconds
        };
    }

    function getZero(num){
        if(num<10){
            return '0'+num;
        }
        return num;
    }

    function selectClock(selector,endtime){
        const timer = document.querySelector(selector),
              days = document.querySelector('#days'),
              hours = document.querySelector('#hours'),
              minutes = document.querySelector('#minutes'),
              seconds = document.querySelector('#seconds'),
              timeInterval = setInterval(updateClock,1000);
              updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds); 
        }
    }

    // const modalTrigger = document.querySelectorAll('[data-modal]'),
    //       modal = document.querySelector('.modal'),
    //       modalClose = document.querySelector('[modal-close]');
    
    // modalTrigger.forEach(item => {
    //     item.addEventListener('click', () => {
    //         modal.classList.remove('hide');
    //         modal.classList.add('show');
    //         document.body.style.overflow='hidden';
    //     });
    // });

    // function closeModal(){
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow='';
    // }
    
    // modalClose.addEventListener('click',(e) => {
    //     closeModal();
    // });

    // modal.addEventListener('click',(e) => {
    //     if(e.target===modal){
    //         closeModal();
    //     }
    // });

    // document.addEventListener('keydown',(e) => {
    //     if(e.code === "Escape" && modal.classList.contains('show')){
    //         closeModal();
    //     }
    // });


    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[modal-close]');
          //openModalInterval = setInterval(openModal,4000);

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });
    function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow='hidden';
            //clearInterval(openModalInterval);
    }

    function hideModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow='';
    }
    
    modalClose.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal){
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')){
            hideModal();        
        }
    });

    function showModlaByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll',showModlaByScroll);
        }
    }

    window.addEventListener('scroll', showModlaByScroll);

    // Используем классы для карточек

    class MenuCard{
        constructor(src, alt, title, description, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            element.innerHTML = `
            <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

     hideTabContent();
     showTabContent();
     selectClock('.timer',deadline);
     const menuCard = new MenuCard(
         'img/tabs/elite.jpg',
         'img/slider/food-12.jpg',
         'Norm Title',
         'Norm description',
         65,
         '.menu .container'
     );
     menuCard.render();

     const menuCard1 = new MenuCard(
        'img/tabs/hamburger.jpg',
        'img/slider/food-12.jpg',
        'Hamburger Title',
        'Hamburger description',
        45,
        '.menu .container'
    );
    menuCard1.render();

    const menuCard2 = new MenuCard(
        'img/tabs/vegy.jpg',
        'img/slider/food-12.jpg',
        'Post Title',
        'Post description',
        10,
        '.menu .container'
    );
    menuCard2.render();
});

