import {getZero} from './timer';

function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const   slider = document.querySelector(container),
            slides = document.querySelectorAll(slide),
            prevSlider = document.querySelector(prevArrow),
            nextSlider = document.querySelector(nextArrow),
            totalSlide = document.querySelector(totalCounter),
            currentSlide = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width,
            indicators = document.createElement('ol'),
            dots = [];

    let slideIndex = 1,
    offset = 0;

    if (slides.length < 10) {
        totalSlide.textContent = getZero(slides.length);
        currentSlide.textContent = getZero(slideIndex);
    } else {
        totalSlide.textContent = slides.length
        currentSlide.textContent = slideIndex;
    }

    slidesField.style.cssText = `
        display: flex;
        width: ${100 * slides.length}%;
        transition: all 0.3s;
    `;

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');

        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i === 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    nextSlider.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            currentSlide.textContent = getZero(slideIndex)
        } else {
            currentSlide.textContent = slideIndex
        }

        changeActiveDot();
    });

    prevSlider.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            currentSlide.textContent = getZero(slideIndex)
        } else {
            currentSlide.textContent = slideIndex
        }

        changeActiveDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currentSlide.textContent = getZero(slideIndex)
            } else {
                currentSlide.textContent = slideIndex
            }

            changeActiveDot();
        })
    });

    function changeActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
}

export default slider;