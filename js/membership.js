  gsap.registerPlugin(ScrollTrigger);
 
        $(function () {
            $("#header-include").load("header.html", function () { initHeaderLogic(); });
            $("#footer-include").load("footer.html", function () { initFooterLogic(); });
 
            /* ── Hero entrance ── */
            const heroTl = gsap.timeline({ delay: 0.3 });
            heroTl
                .to('.mem-hero__eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
                .to('.mem-hero__title',   { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out' }, '-=0.3')
                .to('.mem-hero__sub',     { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
                .to('.mem-hero__cta',     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
 
            /* ── Tier cards ── */
            gsap.utils.toArray('.tier-card').forEach((el, i) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out'
                });
            });
 
            /* ── Points steps ── */
            gsap.utils.toArray('.points-step').forEach((el, i) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: '.points-flow', start: 'top 80%' },
                    opacity: 1, x: 0, duration: 0.7, delay: i * 0.15, ease: 'power3.out'
                });
            });
 
            /* ── Benefit cards ── */
            gsap.utils.toArray('.benefit-card').forEach((el, i) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 0.75, delay: i * 0.08, ease: 'power3.out'
                });
            });
 
            /* ── FAQ items ── */
            gsap.utils.toArray('.faq-item').forEach((el, i) => {
                gsap.to(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                    opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out'
                });
            });
 
            /* ── FAQ accordion ── */
            $('.faq-question').on('click', function () {
                const $item = $(this).closest('.faq-item');
                const isActive = $item.hasClass('active');
                $('.faq-item').removeClass('active');
                if (!isActive) $item.addClass('active');
            });
 
            /* ── Modal ── */
            $(document).on('click', 'a[href="#"], .btn-ready', function (e) {
                if ($(this).hasClass('depth1') || $(this).siblings('.submenu').length > 0) return;
                e.preventDefault();
                $('#ready-modal').css('display', 'flex');
                $('body').css('overflow', 'hidden');
            });
            $(document).on('click', '.btn-modal-close', function () {
                $('#ready-modal').hide();
                $('body').css('overflow', 'auto');
            });
        });
 
        function initHeaderLogic() {
            $('.hamburger').off('click').on('click', function () {
                $('.m_gnb_area, .m_overlay').addClass('active');
                $('body').css('overflow', 'hidden');
            });
            $('.m_close, .m_overlay').on('click', function () {
                $('.m_gnb_area, .m_overlay').removeClass('active');
                $('body').css('overflow', 'auto');
            });
            $('.m_gnb .depth1').on('click', function (e) {
                e.preventDefault();
                $(this).next('.m_submenu').stop().slideToggle(300);
                $(this).toggleClass('on');
            });
        }
 
        function initFooterLogic() {
            gsap.from(".premium-footer > *", {
                scrollTrigger: { trigger: ".premium-footer", start: "top 90%" },
                y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power2.out"
            });
        }