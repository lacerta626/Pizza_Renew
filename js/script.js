gsap.registerPlugin(ScrollTrigger);

// 1. 인트로 애니메이션
const introTl = gsap.timeline();
introTl.to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
       .to(".intro-screen", { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.5 });
// 기존 인트로 애니메이션 이후 혹은 별도로 실행
const visualTl = gsap.timeline();

visualTl
    // 1. 왼쪽 텍스트 등장
    .to(".txt-left", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out"
    })
    // 2. 오른쪽 텍스트 등장 (약간 겹치게 시작)
    .to(".txt-right", {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out"
    }, "-=0.5")
    // 3. 중앙 피자 등장 (텍스트가 나온 뒤 팝업 느낌)
    .to(".pizza-center", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)" // 살짝 커졌다가 줄어드는 탄성 효과
    })
    // 4. 피자 미세하게 회전하는 대기 모션 (선택 사항)
    .to(".pizza-center img", {
        rotate: 360,
        duration: 50,
        repeat: -1,
        ease: "none"
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