const prev = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let sliderWrapp = document.getElementsByClassName('slider__wrapper')[0];

let countSlide = 20;
let width = -27;
let timer;
let isSliderAnimation = false;
let index = 1;

dots[index - 1].classList.add('active');

const activeSlide = (n) => {
  for (slide of slides) {
    slide.classList.remove('active');
  }
  slides[n].classList.add('active');
};

const activeDot = (n) => {
  for (dot of dots) {
    dot.classList.remove('active');
  }
  dots[n].classList.add('active');
  console.log(n);
  if (n === 8) dots[1].classList.add('active');
  if (n === 0) dots[7].classList.add('active');
};

const nextSlide = () => {
  if (isSliderAnimation) return false;
  index++;
  activeDot(index);

  sliderAnimation('right');
};
const prevSlide = () => {
  if (isSliderAnimation) return false;
  index--;
  activeDot(index);

  sliderAnimation('left');
};
dots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    if (indexDot == index) {
      return false;
    }
    indexDot >= index ? sliderAnimation('right') : sliderAnimation('left');

    index = indexDot;
    activeDot(indexDot);
  });
});

function sliderAnimation(pos) {
  isSliderAnimation = true;
  pos = pos === 'left' ? -1 : 1;
  timer = setInterval(function () {
    countSlide = countSlide + pos;
    sliderWrapp.style.marginLeft = width * countSlide + 'px';
    if (countSlide !== 20 * index) return false;
    clearInterval(timer);
    isLastOrFirst();
    isSliderAnimation = false;
  }, 20);
}

function isLastOrFirst() {
  if (index <= 0) {
    countSlide = 20 * (slides.length - 2);
    index = slides.length - 2;
    sliderWrapp.style.marginLeft = width * countSlide + 'px';
  }
  if (index >= slides.length - 1) {
    countSlide = 20;
    index = 1;
    sliderWrapp.style.marginLeft = width * countSlide + 'px';
  }
}
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
