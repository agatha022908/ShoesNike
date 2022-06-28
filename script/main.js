// the beginning of the header //
let Back = document.querySelector(".header__content-back"),
    Sale = document.querySelector(".header__content-sale"),
    headerImg = document.querySelector(".header__content-img"),
    headerPrice = document.querySelector(".header__price b"),
    headerPercent = document.querySelector(".header__content-percent_span"),
    headerDrawingPins = document.querySelector(".header__drawing-pins"),
    headerDrawingPin = document.querySelectorAll(".header__drawing-pin"),
    header = document.querySelector(".header"),
    btnMedia = document.querySelector('.header__btn')
    headerbtn = document.querySelector('.header__btn-extra');

    btnMedia.addEventListener('click', function () {
        header.classList.add("active")   
        
    })
    
    btnMedia.addEventListener('dblclick', function () {
        header.classList.remove('active')
    })
for (let i = 0; i < headerDrawingPin.length; i++) {
    headerDrawingPin[i].setAttribute("data-key", i)
}

headerDrawingPins.addEventListener('click', sneaker);

function sneaker(e) {
    const key = e.target.dataset["key"]
    if (key === undefined) {
        return true;
    }
    
    Back.src = `img/header/${sent[key].back}.png`
    headerImg.src = `img/header/${sent[key].pointer}`
    headerDrawingPin.forEach(item => {
        item.classList.remove('active');
    });
    e.target.classList.add('active');
}
// the ending of the header




// the beginning of the burger //

let body = document.querySelector('body'),
    headerMenu = document.querySelector(".header__menu"),
    headerList = document.querySelector(".header__list");


headerMenu.addEventListener("click", function () {
    this.classList.toggle("active")
    headerList.classList.toggle("active")
    body.classList.toggle('active')

})
const sent = [{
        "pointer": "sneaker1.png",
        "back": "back1"
    },
    {
        "pointer": "sneaker2.png",
        "back": "back2"
    },
    {
        "pointer": "sneaker3.png",
        "back": "back3"
    }
]
// the ending of the burger



class TEXT {
    constructor(obj) {
        if (typeof obj.el == 'string') {
            this.el = document.querySelector(obj.el)
        } else if (obj.el instanceof HTMLElement) {
            this.el = obj.el
        };
        this.text = this.el.innerHTML
        this.el.innerHTML = ''
        this.str()
    }
    str(i = 0) {
        this.el.innerHTML += this.text[i];
        i++;
        if (i < this.text.length) {
            setTimeout(() => {
                this.str(i)
            }, 200);
        }
    }
}
const text = new TEXT({
    el: '.header__title',
})




// the beginning of the slider

class Slider {
    constructor(obj) {
        this.slider = document.querySelector(obj.slider)
        this.sliderCard = this.slider.querySelector('.slider__card')
        this.timeMove = obj.time
        this.item = [...this.sliderCard.children]
        this.next = this.slider.querySelector('.slider__next')
        this.prev = this.slider.querySelector('.slider__prev')
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.direction = obj.direction != undefined ? obj.direction : 'X';
        this.moveSize = this.width
        this.active = true
        this.activeSlide = 0
        if (obj.pin) {
            let parent = document.createElement('ul')
            parent.className = 'slider__pin'
            this.item.forEach(key => {
                parent.innerHTML += '<li class="slider__pin-item"></li>';
            })
            this.slider.append(parent)
            this.pin = [...document.querySelector('.slider__pin').children]
            this.pin[this.activeSlide].classList.add('active')
        }
    
        this.pin.forEach((key, index) => {
            key.addEventListener('click', () => this.Dots(index))
        })
        this.sliderCard.style = `
                                position: relative;
                                height: ${this.height}px;
                                overflow: hidden;
                                width: ${this.width}px;
                               `
        for (let i = 0; i < this.item.length; i++) {
            const item = this.item[i];
            item.style = `position: absolute;
                width: ${this.width}px;
                height: ${this.height}px;
               `
            if (i != this.activeSlide) {
                item.style.transform = `translate${this.direction}(${this.moveSize}px)`
            }
            if (i == this.item.length - 1) {
                item.style.transform = `translate${this.direction}(${-this.moveSize}px)`
            }
        }
        this.next.addEventListener('click', () => this.clickBtn(this.next))
        this.prev.addEventListener('click', () => this.clickBtn(this.prev))




    }
    clickBtn(btn) {

        this.prev.disabled = true
        this.next.disabled = true

        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.timeMove);

        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.item.length; i++) {
            const sliders = this.item[i]
            sliders.style.transition = '0ms'
            if (i != this.activeSlide) {
                sliders.style.transform = `translate${this.direction}(${btnLeftOrRight * -1}px)`
            }

        }

        this.item[this.activeSlide].style.transform = `translate${this.direction}(${btnLeftOrRight}px)`
        this.item[this.activeSlide].style.transition = `${this.timeMove}ms`;

        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.item.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.item.length - 1
            }
        }



        this.item[this.activeSlide].style.transform = `translate${this.direction}(0px)`
        this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
        let answer = this.item[this.activeSlide].getAttribute('data-num'),
            pin = document.querySelectorAll('.slider__pin-item');
        pin.forEach(item => item.classList.remove('active'))
        pin[answer].classList.add('active');
    }
    Dots(index) {
        if (this.active && index != this.activeSlide) {
            for (let i = 0; i < this.item.length; i++) {
                const slide = this.item[i];
                slide.style.transition = '0ms';
            }

            this.active = false
            this.pin.forEach(key => key.classList.remove('active'))

            let btnLeftOrRight = index > this.activeSlide ? this.moveSize : -this.moveSize;
            this.item[index].style.transform = `translate${this.direction}(${btnLeftOrRight}px)`;
            setTimeout(() => {
                this.item[this.activeSlide].style.transform = `translate${this.direction}(${-btnLeftOrRight}px)`;
                this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.pin[this.activeSlide].classList.remove('active')

                this.activeSlide = index

                this.item[this.activeSlide].style.transform = `translate${this.direction}(0px)`;
                this.item[this.activeSlide].style.transition = this.timeMove + 'ms';
                this.pin[index].classList.add('active')
            }, 100)
            setTimeout(() => {
                this.active = true
            }, this.timeMove + 200)
        }

    }
}


const slider = new Slider({
    direction: 'Y',
    slider: '#carousel',
    pin: true,
    time: 1000
})

// the ending of the starting //