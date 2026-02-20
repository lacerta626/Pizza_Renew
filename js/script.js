gsap.registerPlugin(ScrollTrigger);

/* ============================= */
/* 1. INTRO & MAIN VISUAL */
/* ============================= */
const introTl = gsap.timeline();
introTl.to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
       .to(".intro-screen", { yPercent: -100, duration: 1.2, ease: "expo.inOut", delay: 0.5 })
       .to(".txt-left", { x: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.2")
       .to(".txt-right", { x: 0, opacity: 1, duration: 2.3, ease: "expo.out" }, "-=1.0")
       .to(".pizza-center", { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.5)" }, "-=1.0");

// 피자 회전 및 페퍼로니 애니메이션
gsap.to(".main-pizza", { rotate: 360, duration: 120, repeat: -1, ease: "none" });
gsap.utils.toArray(".pep").forEach((pep, i) => {
    gsap.to(pep, { y: -30, rotate: i % 2 === 0 ? 15 : -15, duration: 2.5 + i, repeat: -1, yoyo: true, ease: "sine.inOut" });
});

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

/* ============================= */
/* 3. INTERACTIVE PIZZA MENU */
/* ============================= */
const pizzaMenu = [
    { name: "SUPREME", price: "28,900 KRW", color: "rgba(238, 28, 37, 0.15)" },
    { name: "BEEF BBQ", price: "29,900 KRW", color: "rgba(123, 75, 42, 0.15)" },
    { name: "CHEESE LOVER", price: "25,900 KRW", color: "rgba(246, 192, 32, 0.15)" },
    { name: "POTATO BACON", price: "27,900 KRW", color: "rgba(227, 168, 24, 0.15)" },
    { name: "PEPPERONI", price: "24,900 KRW", color: "rgba(255, 78, 0, 0.15)" },
    { name: "HAWAIIAN", price: "26,900 KRW", color: "rgba(255, 204, 0, 0.15)" },
    { name: "HOT SPICY", price: "28,500 KRW", color: "rgba(255, 0, 0, 0.15)" },
    { name: "VEGGIE", price: "23,900 KRW", color: "rgba(76, 175, 80, 0.15)" }
];

const wheel = document.getElementById('pizzaWheel');
const indicator = document.getElementById('indicator');
const radius = 230; // 기본 반지름
const popOut = 110; // 선택 시 돌출 거리
const totalSlices = pizzaMenu.length;
const angleStep = 360 / totalSlices;

// 조각 및 인디케이터 초기화
pizzaMenu.forEach((item, i) => {
    const slice = document.createElement('div');
    slice.className = 'pizza-slice';
    const imgNum = (i + 1).toString().padStart(2, '0');
    slice.innerHTML = `<img src="images/pizza_${imgNum}.png" alt="pizza_${imgNum}">`;
    wheel.appendChild(slice);

    const angleRad = (i * angleStep) * (Math.PI / 180);
    gsap.set(slice, {
        x: Math.sin(angleRad) * radius,
        y: -Math.cos(angleRad) * radius,
        rotation: i * angleStep
    });

    const dot = document.createElement('div');
    dot.className = 'dot';
    indicator.appendChild(dot);
});

const slices = document.querySelectorAll('.pizza-slice');
const dots = document.querySelectorAll('.dot');

// 메인 스크롤 애니메이션
const menuTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".menu-selection-wrapper",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
            snapTo: 1 / (totalSlices - 1),
            duration: 0.7,
            ease: "back.out(1.2)"
        },
        onUpdate: (self) => updateMenu(self.progress)
    }
});

menuTl.to(wheel, { rotation: -360 + angleStep, ease: "none" });

let lastIdx = -1;
function updateMenu(progress) {
    let currentIdx = Math.round(progress * (totalSlices - 1));
    if (currentIdx !== lastIdx) {
        lastIdx = currentIdx;
        const data = pizzaMenu[currentIdx];

        // 텍스트 & 배경 정보 업데이트
        const infoLayer = document.getElementById('infoLayer');
        infoLayer.classList.remove('active-info');
        
        setTimeout(() => {
            document.getElementById('pName').innerText = data.name;
            document.getElementById('pPrice').innerText = data.price;
            document.getElementById('bgGlow').style.background = `radial-gradient(circle, ${data.color} 0%, rgba(0,0,0,0) 75%)`;
            infoLayer.classList.add('active-info');
        }, 30);

        // 인디케이터 & 조각 돌출 효과
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIdx));
        
        slices.forEach((slice, i) => {
            const angleRad = (i * angleStep) * (Math.PI / 180);
            if (i === currentIdx) {
                slice.classList.add('active');
                gsap.to(slice, {
                    x: Math.sin(angleRad) * (radius + popOut),
                    y: -Math.cos(angleRad) * (radius + popOut),
                    scale: 1.2, duration: 0.8, ease: "back.out(2)"
                });
            } else {
                slice.classList.remove('active');
                gsap.to(slice, {
                    x: Math.sin(angleRad) * radius,
                    y: -Math.cos(angleRad) * radius,
                    scale: 1, duration: 0.6, ease: "power2.out"
                });
            }
        });
    }
}

window.onload = () => updateMenu(0);
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
