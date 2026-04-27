gsap.registerPlugin(ScrollTrigger);
gsap.from(".product-card", {
    scrollTrigger: {
        trigger: ".menu-grid",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out"
});