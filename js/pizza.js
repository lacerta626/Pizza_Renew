 gsap.registerPlugin(ScrollTrigger);
 
    $(function () {
 
        /* ── 헤더 ── */
        $("#header-include").load("header.html", function () {
            if (typeof initHeaderLogic === 'function') initHeaderLogic();
        });
 
        /* ── 카테고리 탭 전환 ── */
        $('.tab-btn').on('click', function () {
            const tab = $(this).data('tab');
            $('.tab-btn').removeClass('active');
            $(this).addClass('active');
            $('.menu-panel').removeClass('active');
            $('#panel-' + tab).addClass('active');
            // 새 패널 카드 애니메이션
            animateCards('#panel-' + tab + ' .menu-card');
        });
 
        /* ── 서브 카테고리 필터 ── */
        $(document).on('click', '.sub-btn', function () {
            const $btn = $(this);
            $btn.siblings().removeClass('active');
            $btn.addClass('active');
            const sub = $btn.data('sub');
            const $cards = $btn.closest('.menu-panel').find('.menu-card');
            if (sub === 'all') {
                $cards.show();
            } else {
                $cards.each(function () {
                    $(this).data('sub') === sub ? $(this).show() : $(this).hide();
                });
            }
        });
 
        /* ── 카드 등장 애니메이션 ── */
        function animateCards(selector) {
            gsap.fromTo(selector,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' }
            );
        }
 
        // 초기 피자 패널 애니메이션
        gsap.fromTo('.menu-panel.active .menu-card',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
        );
 
        /* ── 메뉴 카드 클릭 → 모달 ── */
        $(document).on('click', '.menu-card', function () {
            const $c = $(this);
            const sizes = JSON.parse($c.data('sizes') || '[]');
            const tags  = ($c.data('tags') || '').split(',').filter(Boolean);
            const badge = $c.data('badge');
            const img   = $c.data('img');
            const emoji = $c.data('emoji');
 
            // 이미지
            const $img = $('#mImg');
            $img.attr('src', img).attr('alt', $c.data('name')).show();
            $img.off('error').on('error', function () {
                $(this).hide();
                $(this).parent().find('.modal-img-placeholder').remove();
                $(this).parent().append(`<div class="modal-img-placeholder">${emoji}</div>`);
            });
 
            // 배지
            const $bw = $('#mBadgeWrap').empty();
            if (badge === 'new')  $bw.append('<span class="modal-badge new">NEW</span>');
            if (badge === 'best') $bw.append('<span class="modal-badge best">BEST</span>');
 
            // 텍스트
            $('#mCat').text($c.data('cat'));
            $('#mName').text($c.data('name'));
            $('#mDesc').text($c.data('desc'));
 
            // 사이즈/가격
            const $sz = $('#mSizes').empty();
            sizes.forEach((s, i) => {
                $sz.append(`
                    <div class="size-row ${i === 0 ? 'selected' : ''}" onclick="$('.size-row').removeClass('selected');$(this).addClass('selected')">
                        <span class="size-label">${s.label}<span class="size-sub">${s.sub}</span></span>
                        <span class="size-price">${s.price}원</span>
                    </div>
                `);
            });
 
            // 알레르기 태그
            const $tg = $('#mTags').empty();
            tags.forEach(t => $tg.append(`<span class="modal-tag">${t.trim()}</span>`));
 
            // 모달 열기
            $('#menuModal').scrollTop(0);
            $('#menuModalOverlay').addClass('open');
            $('body').css('overflow', 'hidden');
        });
 
        /* ── 모달 닫기 ── */
        function closeModal() {
            $('#menuModalOverlay').removeClass('open');
            $('body').css('overflow', 'auto');
        }
 
        $('#modalClose').on('click', closeModal);
        $('#menuModalOverlay').on('click', function (e) {
            if ($(e.target).is('#menuModalOverlay')) closeModal();
        });
        $(document).on('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });
 
        /* ── 히어로 애니메이션 ── */
        gsap.from('.menu-hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.2 });
        gsap.from('.menu-hero-title',   { opacity: 0, y: 30, duration: 1.0, ease: 'expo.out',   delay: 0.35 });
        gsap.from('.menu-hero-desc',    { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.55 });
 
    });