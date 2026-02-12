gsap.registerPlugin(ScrollTrigger);

// 1. 모든 애니메이션을 제어할 메인 타임라인 생성
const mainTl = gsap.timeline();

// [Step 1] 인트로 애니메이션
mainTl.to(".intro-word", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power4.out"
})
    .to(".intro-screen", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.5
    })

    // [Step 2] 메인 비주얼 애니메이션 (txt-left는 왼쪽에서, txt-right는 오른쪽에서)
    .to(".txt-left", {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out"
    }, "-=0.2")
    .to(".txt-right", {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out"
    }, "-=1.0")
    .to(".pizza-center", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .to(".pizza-center img", {
        rotate: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
    });

// 2. 무한 마키(Marquee) 애니메이션
gsap.to(".marquee-content", {
    xPercent: -50,
    duration: 20,
    repeat: -1,
    ease: "none"
});

// 3. 영상 섹션 타임라인
const videoTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".video-section",
        start: "top top",    // 섹션 시작점이 화면 상단에 닿을 때 고정
        end: "+=2000",       // 픽셀 단위로 스크롤 길이를 길게 주면 더 천천히 확장됨
        scrub: 1,
        pin: true,           // 섹션 전체를 화면에 고정
        pinSpacing: true,    // 다음 섹션이 미리 올라오지 않도록 공간 확보
        invalidateOnRefresh: true // 화면 리사이즈 시 계산 오류 방지
    }
});

videoTl
    // 1. 원형 마스크 확장 (0% -> 100%)
    .to(".video-mask", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "none",
        duration: 2
    })
    // 2. 텍스트 등장
    .to(".video-text-box", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1.0"); // 마스크 확장 중에 텍스트가 서서히 보이게 연결
gsap.to(".bg-video", {
    scrollTrigger: {
        trigger: ".video-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    y: 80,
    ease: "none"
});