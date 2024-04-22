jQuery(function($) {
    const CustomizeFixedFooter = $('#customize-fixed-footer');
    const BtnClose = $('#btn-close');
    let BaseScroll = $(this).scrollTop();

    BtnClose.on('click', function() {
        CustomizeFixedFooter.addClass('closed permanently');
    });

    // $(window).on('scroll', function() {
    //     if (!CustomizeFixedFooter.hasClass('permanently')) {
    //         if ($(this).scrollTop() > BaseScroll) {
    //             CustomizeFixedFooter.addClass('closed');
    //         } else {
    //             CustomizeFixedFooter.removeClass('closed');
    //         }
    //         BaseScroll = $(this).scrollTop();
    //     }
    // });
    $(window).on('load', function() {
        CustomizeFixedFooter.removeClass('closed');
    });

    // インステバナーを開閉する関数
    const interstitial = document.getElementById('interstitial');
    function interstitialToggle() {
        interstitial.classList.toggle('interstitial-on');
    }

    // 一度実行したらリロード、ページ遷移までは実行しないように
    let isEnabled = true;

    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 要素がビューポートに表示されているか確認
            if (entry.isIntersecting && isEnabled) {
                interstitialToggle();
                isEnabled = false;
            }
        });
    }, { threshold: 1 });

    // ターゲットとなる要素を取得
    const targetElement = document.getElementsByTagName('h2');
    if(targetElement[1]){
        // H2がページ内にあったら、ターゲット要素をIntersection Observerに追加
        observer.observe(targetElement[1]);
    }

    // 余白部分クリックでバナー非表示に
    const interstitial_event_clickArea = document.getElementsByClassName('interstitial_event');
    for(let i = 0; i < interstitial_event_clickArea.length; i++) {
        interstitial_event_clickArea[i].addEventListener('click', interstitialToggle, false);
    }

    // バブリングを停止(キャンセルボタン)・バナー非表示に
    function stopEvent(event) {
        event.stopPropagation();
        interstitialToggle();
    }

    // キャンセルボタンクリックでバナー非表示に
    const overlayInner = document.getElementById('interstitial_cancel_btn');
    if(overlayInner){
        overlayInner.addEventListener('click', stopEvent, false);
    }
});