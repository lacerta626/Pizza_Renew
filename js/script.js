gsap.registerPlugin(ScrollTrigger);

/* ============================= */
/* 1. INTRO & MAIN VISUAL */
/* ============================= */
const introTl = gsap.timeline();
introTl.to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
    .to(".intro-screen", { yPercent: -100, duration: 1.2, ease: "expo.inOut", delay: 0.5 })
    .to(".img-left", { x: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.2")
    .to(".img-right", { x: 0, opacity: 1, duration: 2.3, ease: "expo.out" }, "-=1.0")
    .to(".pizza-center", { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.5)" }, "-=1.0")
    .to(".new-badge", {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.5");

// 피자 회전 및 페퍼로니 애니메이션
gsap.to(".main-pizza", { rotate: 360, duration: 120, repeat: -1, ease: "none" });

/* ============================= */
/* 2. MARQUEE & VIDEO MASK */
/* ============================= */
gsap.to(".marquee-content", { xPercent: -50, duration: 25, repeat: -1, ease: "none" });

const videoTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".video-section",
        start: "top top",
        end: "+=1500",
        scrub: 1,
        pin: true
    }
});
videoTl.to(".video-mask", { clipPath: "circle(100% at 50% 50%)", ease: "none", duration: 2 })
    .to(".video-text-box", { opacity: 1, y: 0, duration: 1.2 }, "-=1.0");

gsap.to(".fill-text", {
    backgroundSize: "100% 100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".text-container", // 개별 글자가 아닌 컨테이너 기준
        start: "top 60%",           // 컨테이너가 화면 60% 높이에 오면 시작
        end: "bottom 80%",          // 컨테이너 끝이 화면 40% 높이에 오면 종료
        scrub: 1,                   // 스크롤과 동기화 (1은 부드러운 추적)
    },
    stagger: 1 // 🌟 이 값이 줄 간의 간격을 결정합니다. (순차적 실행)
});
/* ============================= */
/* 2-1. SCROLL FILL TEXT (Responsive) */
/* ============================= */
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
    // PC 버전 설정 (기존 유지)
    gsap.to(".fill-text", {
        backgroundSize: "130% 130%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text-container",
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
        },
        stagger: 1
    });
});

mm.add("(max-width: 767px)", () => {
    // 모바일 버전 설정 (글자 크기에 맞춰 조절)
    gsap.to(".fill-text", {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text-container",
            start: "top 75%",     // 조금 더 일찍 시작하게 (화면 75% 지점)
            end: "bottom 95%",    // 글자가 작으므로 더 빨리 끝나게 조절
            scrub: 1,
        },
        stagger: 0.5             // 글자가 작으므로 간격을 좁혀 속도감을 줌
    });
});
/* ============================= */
/* 3. INTERACTIVE PIZZA MENU (PC) */
/* ============================= */
const pizzaSwiper = new Swiper('.pizza-slider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 0,
    speed: 800,
    navigation: {
        nextEl: '.pizza-next',
        prevEl: '.pizza-prev',
    },
    on: {
        init: function () {
            updatePcPizzaText(this);
        },
        slideChange: function () {
            updatePcPizzaText(this);
        }
    }
});

function updatePcPizzaText(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const name = activeSlide.getAttribute('data-name');
    const desc = activeSlide.getAttribute('data-desc');

    const nameElements = [
        document.getElementById('target-name'),
        document.getElementById('target-name-hide1'),
        document.getElementById('target-name-hide2')
    ];
    const descElement = document.getElementById('target-desc');
    
    // PC 요소가 없을 경우 실행 방지 (충돌 방지 핵심)
    if (!nameElements[0] || !descElement) return;

    gsap.to([...nameElements, descElement], {
        opacity: 0, x: -20, duration: 0.3,
        onComplete: () => {
            nameElements.forEach(el => { if(el) el.innerText = name; });
            descElement.innerHTML = desc;
            gsap.to([...nameElements, descElement], {
                opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out"
            });
        }
    });
}

/* ================================= */
/* 3-M. MOBILE PIZZA MENU (MOBILE) */
/* ================================= */
const mPizzaSwiper = new Swiper('.m-pizza-slider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto", // CSS에서 width: 60%로 조절하기 위함
    spaceBetween: 0,
    speed: 600,
    observer: true,       // 창 크기 조절 시 리셋
    observeParents: true,
    grabCursor: true,
    navigation: {
        nextEl: '.m-pizza-next',
        prevEl: '.m-pizza-prev',
    },
    pagination: {
        el: '.m-pizza-pagination',
        clickable: true,
    }
});
// 중복되는 텍스트 업데이트 로직을 함수로 분리
function updatePizzaText(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const name = activeSlide.getAttribute('data-name');
    const desc = activeSlide.getAttribute('data-desc');

    const nameElements = [
        document.getElementById('target-name'),
        document.getElementById('target-name-hide1'),
        document.getElementById('target-name-hide2')
    ];
    const descElement = document.getElementById('target-desc');
    if (!name) return;
    gsap.to([...nameElements, descElement], {
        opacity: 0,
        x: -20,
        duration: 0.3,
        onComplete: () => {
            nameElements.forEach(el => el.innerText = name);
            descElement.innerHTML = desc;

            gsap.to([...nameElements, descElement], {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out"
            });
        }
    });
}
// 4. Footer Reveal Animation
gsap.from(".premium-footer > *", {
    scrollTrigger: {
        trigger: ".premium-footer",
        start: "top 90%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
});