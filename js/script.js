gsap.registerPlugin(ScrollTrigger);

/* ============================= */
/* MAIN TIMELINE */
/* ============================= */
const mainTl = gsap.timeline();

mainTl.to(".intro-word", { opacity: 1, y: 0, duration: .8, stagger: .2, ease: "power4.out" })
    .to(".intro-screen", { yPercent: -100, duration: 1.2, ease: "expo.inOut", delay: .5 })

    .to(".txt-left", { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.2")
    .to(".txt-right", { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=1.0")
    .to(".pizza-center", { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.5)" }, "-=1.0");

/* ============================= */
/* PIZZA ROTATION */
/* ============================= */
gsap.to(".main-pizza", { rotate: 360, duration: 100, repeat: -1, ease: "none" });

/* ============================= */
/* PEPPERONI FLOAT */
/* ============================= */
gsap.utils.toArray(".pep").forEach((pep, i) => {
    gsap.to(pep, { y: -25, rotate: i % 2 === 0 ? 10 : -10, duration: 2 + i, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * .2 });
});

/* ============================= */
/* MARQUEE */
/* ============================= */
gsap.to(".marquee-content", { xPercent: -50, duration: 20, repeat: -1, ease: "none" });

/* ============================= */
/* VIDEO SCROLL TIMELINE */
/* ============================= */
const videoTl = gsap.timeline({
    scrollTrigger: { trigger: ".video-section", start: "top top", end: "+=2000", scrub: 1, pin: true, pinSpacing: true, invalidateOnRefresh: true }
});

videoTl
    .to(".video-mask", { clipPath: "circle(100% at 50% 50%)", ease: "none", duration: 2 })
    .to(".video-text-box", { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1.0");

/* ============================= */
/* VIDEO PARALLAX */
/* ============================= */
gsap.to(".bg-video", { scrollTrigger: { trigger: ".video-section", start: "top bottom", end: "bottom top", scrub: true }, y: 80, ease: "none" });
