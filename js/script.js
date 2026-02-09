document.addEventListener("DOMContentLoaded", () => {
    // 1. Intro Reveal Animation
    const tl = gsap.timeline();
    tl.from(".intro-text", {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    })
    .to(".intro-overlay", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.5
    });

    // 2. Main Visual Scroll Effect
    gsap.to(".main-title", {
        scrollTrigger: {
            trigger: ".main-visual",
            start: "top top",
            scrub: 1
        },
        y: 200,
        scale: 0.8,
        opacity: 0.5
    });

    // 3. Section Fade-in (기영이 스타일)
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // 4. Swiper Initialization
    new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        freeMode: true,
    });
});