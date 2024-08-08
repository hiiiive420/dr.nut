  document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    const totalItems = items.length;

    // Create indicators based on the number of items
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll('.indicator');

    function updateCarouselPosition() {
        const itemWidth = items[0].offsetWidth;
        track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
        updateIndicators();
    }

    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function moveToNextSlide() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarouselPosition();
    }

    // Auto-slide function
    let autoSlide = setInterval(moveToNextSlide, 2000);

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carouselContainer.addEventListener('mouseleave', () => autoSlide = setInterval(moveToNextSlide, 3000));

    // Indicators click event
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselPosition();
        });
    });

    // Update carousel on window resize
    window.addEventListener('resize', updateCarouselPosition);
});

