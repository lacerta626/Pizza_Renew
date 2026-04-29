/**
 * PIZZA HUT INTERACTIVE LANDING PAGE
 * Dependencies: GSAP (ScrollTrigger, MatchMedia), Swiper.js, jQuery
 */

gsap.registerPlugin(ScrollTrigger);
function initHeaderLogic() {
    // 햄버거 메뉴 클릭 이벤트
    $('.hamburger').off('click').on('click', function () {
        $('.m_gnb_area, .m_overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $(function () {
        // 메뉴 열기
        $('.hamburger').on('click', function () {
            $('.m_gnb_area, .m_overlay').addClass('active');
            $('body').css('overflow', 'hidden'); // 스크롤 잠금
        });

        // 메뉴 닫기 (X버튼 또는 배경 클릭)
        $('.m_close, .m_overlay').on('click', function () {
            $('.m_gnb_area, .m_overlay').removeClass('active');
            $('body').css('overflow', 'auto'); // 스크롤 해제
        });

        // 아코디언 메뉴 (GNB 메뉴 클릭 시)
        $('.m_gnb .depth1').on('click', function (e) {
            e.preventDefault();

            const $subMenu = $(this).next('.m_submenu');

            // 클릭한 메뉴 토글 (나머지는 닫고 싶으면 .slideUp() 추가)
            $subMenu.stop().slideToggle(300);
            $(this).toggleClass('on');
        });
    });
}
// js/common.js 또는 script.js 상단
$(function () {
    // #header-include 영역에 header.html 파일을 불러와서 넣습니다.
    $("#header-include").load("header.html", function () {
        // 헤더를 불러온 후 실행되어야 할 스크립트(햄버거 메뉴 등)를 여기에 넣습니다.
        initHeaderLogic();
    });




    /* ── 히어로 등장 애니메이션 ── */
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
        .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to('.hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' }, '-=0.4')
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to('.hero-line', { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.3');
    /* ── 히어로 애니메이션 ── */
    gsap.from('.menu-hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    gsap.from('.menu-hero-title', { opacity: 0, y: 30, duration: 1.0, ease: 'expo.out', delay: 0.35 });
    gsap.from('.menu-hero-desc', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.55 });
    /* ── 타임라인 아이템 스크롤 등장 ── */
    gsap.utils.toArray('.tl-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 82%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.05
        });
    });

    /* ── 타임라인 진행 선 ── */
    const tlWrap = document.querySelector('.timeline-wrap');
    const tlProgress = document.getElementById('tlProgress');

    if (tlWrap && tlProgress) {
        ScrollTrigger.create({
            trigger: '.history-section',
            start: 'top 60%',
            end: 'bottom 80%',
            onUpdate: (self) => {
                tlProgress.style.height = (self.progress * 100) + '%';
            }
        });
    }

    /* ── 카드 클릭 토글 ── */
    $(document).on('click', '.tl-item', function () {
        const isActive = $(this).hasClass('active');
        $('.tl-item').removeClass('active');
        if (!isActive) $(this).addClass('active');
    });

    /* ── 첫 번째 아이템 기본 오픈 ── */
    setTimeout(() => {
        $('.tl-item').first().addClass('active');
    }, 1200);

});
// footer
// script.js 상단 로드 부분
$(function () {
    // 헤더 불러오기
    $("#header-include").load("header.html", function () {
        initHeaderLogic();
    });

    // 푸터 불러오기
    $("#footer-include").load("footer.html", function () {
        initFooterLogic(); // 푸터 등장 애니메이션을 위해 추가
    });
});

// 푸터 애니메이션 로직 함수화
function initFooterLogic() {
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
}



// modal* ==========================================================
$(function () {
    // 1. 모달 띄우기: 하위 메뉴가 없는 일반 링크(#)나 .btn-ready만 실행
    $(document).on('click', 'a[href="#"], .btn-ready', function (e) {
        // [조건 체크] 모바일 depth1이거나, PC gnb 중 하위 메뉴(submenu)를 가진 항목은 제외
        if ($(this).hasClass('depth1') || $(this).siblings('.submenu').length > 0) {
            return; // 모달을 띄우지 않고 로직 종료
        }

        e.preventDefault();
        $('#ready-modal').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    });

    // 2. 모달 닫기 로직 (유지)
    $(document).on('click', '.btn-modal-close', function () {
        $('#ready-modal').hide();
        $('body').css('overflow', 'auto');
    });
});
/* ==========================================================
   1. INTRO ANIMATION & MAIN VISUAL
   - 초반 로딩 인트로 및 메인 비주얼 등장 액션
   ========================================================== */
const introTl = gsap.timeline();

introTl
    // 인트로 텍스트 순차 등장
    .to(".intro-word", { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4.out" })
    // 인트로 배경 위로 사라짐
    .to(".intro-screen", {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
        delay: 0.5,
        onComplete: () => { $('.intro-screen').hide(); } // 애니메이션 후 클릭 방해 방지
    })
    // 메인 이미지들 등장
    .to(".img-left", { x: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, "-=0.2")
    .to(".img-right", { x: 0, opacity: 1, duration: 2.3, ease: "expo.out" }, "-=1.0")
    // 중앙 피자 스케일 업
    .to(".pizza-center", { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.5)" }, "-=1.0")
    // 신제품 배지 등장
    .to(".new-badge", { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");

// 메인 피자 무한 회전 (자연스러운 360도 루프)
gsap.to(".main-pizza", { rotate: 360, duration: 120, repeat: -1, ease: "none" });


/* ==========================================================
   2. SCROLL EFFECTS (Marquee, Video Mask, Fill Text)
   - 스크롤에 반응하는 시각 효과들
   ========================================================== */

// 전광판(Marquee) 무한 흐름
gsap.to(".marquee-content", { xPercent: -50, duration: 25, repeat: -1, ease: "none" });

// 비디오 섹션 마스크 확장 (고정 및 스크롤 연동)
const videoTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".video-section",
        start: "top top",
        end: "+=3000",
        scrub: 1,
        pin: true
    }
});
videoTl.to(".video-mask", { clipPath: "circle(100% at 50% 50%)", ease: "none", duration: 2 })
    .to(".video-text-box", { opacity: 1, y: 0, duration: 1.2 }, "-=1.0")
    .to({}, { duration: 4 });
// [Responsive] 스크롤 시 글자 색상 채워지는 효과
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
    // PC: 글자 크기에 맞춰 backgroundSize 넉넉하게 설정
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
    // Mobile: 트리거 시작점을 앞당기고 속도감 조절
    gsap.to(".fill-text", {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".text-container",
            start: "top 75%",
            end: "bottom 95%",
            scrub: 1,
        },
        stagger: 0.5
    });
});


/* ==========================================================
   3. PIZZA MENU SLIDER (PC & Mobile)
   - 슬라이드 이동 시 해당 피자의 이름/설정 업데이트
   ========================================================== */

/**
 * 슬라이드 데이터(Name, Desc) 동기화 함수
 * @param {Object} swiper - 해당 스와이퍼 객체
 */
function updatePizzaInfo(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const name = activeSlide.getAttribute('data-name');
    const desc = activeSlide.getAttribute('data-desc');

    const nameElements = [
        document.getElementById('target-name'),
        document.getElementById('target-name-hide1'),
        document.getElementById('target-name-hide2')
    ].filter(el => el !== null); // 존재하는 요소만 필터링

    const descElement = document.getElementById('target-desc');

    if (!name || !descElement) return;

    // 텍스트 전환 애니메이션 (GSAP)
    gsap.to([...nameElements, descElement], {
        opacity: 0, x: -20, duration: 0.3,
        onComplete: () => {
            nameElements.forEach(el => el.innerText = name);
            descElement.innerHTML = desc;
            gsap.to([...nameElements, descElement], {
                opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out"
            });
        }
    });
}

// PC 슬라이더 설정
const pizzaSwiper = new Swiper('.pizza-slider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    speed: 800,
    navigation: { nextEl: '.pizza-next', prevEl: '.pizza-prev' },
    on: {
        init: function () { updatePizzaInfo(this); },
        slideChange: function () { updatePizzaInfo(this); }
    }
});

// Mobile 슬라이더 설정
const mPizzaSwiper = new Swiper('.m-pizza-slider', {
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    speed: 600,
    observer: true,
    observeParents: true,
    navigation: { nextEl: '.m-pizza-next', prevEl: '.m-pizza-prev' },
    pagination: { el: '.m-pizza-pagination', clickable: true },
    on: {
        init: function () { updatePizzaInfo(this); }, // 초기 실행 시 텍스트 연동
        slideChange: function () { updatePizzaInfo(this); } // 슬라이드 넘길 때 텍스트 연동
    }
});


/* ==========================================================
   4. INTERACTIVE FOOTER
   - 푸터 섹션 등장 시 순차적 페이드 업
   ========================================================== */
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




// map
/* ==========================================================
   STORE MAP LOGIC (Kakao Map)
   ========================================================== */
$(function () {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.5551, 126.9707), // 초기 중심좌표 (서울역)
            level: 3 // 지도의 확대 레벨
        };

    // 1. 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 2. 주소-좌표 변환 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();

    // 3. 매장 클릭 시 이벤트
    $('.store-item').on('click', function () {
        var $this = $(this);
        var addr = $this.find('.address').text(); // HTML의 주소 텍스트 가져오기
        var storeName = $this.find('h4').text();

        // 리스트 활성화 스타일 제어
        $('.store-item').removeClass('active');
        $this.addClass('active');

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(addr, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 마커 이미지 설정 (피자 아이콘 등으로 변경 가능)
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.panTo(coords);
            }
        });
    });
});

