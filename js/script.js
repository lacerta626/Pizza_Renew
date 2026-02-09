gsap.registerPlugin(ScrollTrigger);

// 1. 인트로 애니메이션
const introTl = gsap.timeline();
introTl.to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
       .to(".intro-screen", { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.5 });

// 2. 히어로 섹션 패럴랙스
gsap.to(".hero-bg img", {
    scrollTrigger: { trigger: ".hero", start: "top top", scrub: true },
    y: 200, scale: 1.2
});

gsap.to(".topping", {
    scrollTrigger: { trigger: ".hero", start: "top top", scrub: 1 },
    y: -150, rotate: 45
});

// 3. 무한 마키(Marquee) 애니메이션
gsap.to(".marquee-content", {
    xPercent: -50,
    duration: 20,
    repeat: -1,
    ease: "none"
});

// 4. 섹션 등장 애니메이션 (기영이 스타일 스크롤 트리거)
const scrollAnis = document.querySelectorAll('.scroll-ani');
scrollAnis.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power3.out"
    });
});