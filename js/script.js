gsap.registerPlugin(ScrollTrigger);

/* ============================= */
/* 1. INTRO & MAIN VISUAL */
/* ============================= */
const introTl = gsap.timeline();
introTl.to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
    .to(".intro-screen", { yPercent: -100, duration: 1.2, ease: "expo.inOut", delay: 0.5 })
    .to(".img-left", { x: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.2")
    .to(".img-right", { x: 0, opacity: 1, duration: 2.3, ease: "expo.out" }, "-=1.0")
    .to(".pizza-center", { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.5)" }, "-=1.0");

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
/* 3. INTERACTIVE PIZZA MENU */
/* ============================= */
const pizzaSwiper = new Swiper('.pizza-slider', {
  loop: true,            // 무한 루프
  centeredSlides: true,  // 활성 슬라이드를 가운데로
  slidesPerView: 1,      // 한 번에 보일 개수
  speed: 800,            // 전환 속도
  autoplay: {
    delay: 3000,
  },
  // 슬라이드 전환 시 효과를 주고 싶다면 'fade'나 'creative' 효과를 섞을 수 있습니다.
});

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


