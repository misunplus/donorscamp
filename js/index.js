$(function() {
	$(document).on('ready', function() {
		/**************************************************************리사이즈시 실행  */
		const $mgnb = $('#wrap > header > nav > ul#h-gnb');
		let nowIdx = 0;
		let interValId = null;
		const $playBtn = $('#wrap > section > .slide-container .play');
		//슬라이드 텍스트변경 인디케이터 색상변경 함수
		const textColor = function() {
			$('#wrap > section > .slide-container .indicater > li > a ').attr({
				style: 'border:2px solid #000',
				style: 'background: #000'
			});
			if (nowIdx == 4) {
				$('body.web #wrap > section > .slide-container .indicater > li > a ').attr({
					style: 'border:2px solid #fff',
					style: 'background: #fff'
			  	});
			}
		};

		const $indicater = $('#wrap > section > .slide-container .indicater > li');

		//슬라이드 이동함수
		const moveFn = function(target, size, index, px) {
			target.stop().animate({
				left: size * index + px
			});
		};
		//인디케이터 on 함수
		const indicaterOn = function(taget, idx) {
			taget.eq(idx).addClass('on').siblings().removeClass('on');
		};

		// 인디케이터 클릭 이벤트
		$indicater.on('click', function() {
			nowIdx = $indicater.index(this);
			$(this).addClass('on').siblings().removeClass('on');
			moveFn($('#slider'), -100, nowIdx, '%');
			textColor();

			if ($playBtn.hasClass('on')) {
				clearInterval(interValId);
				$playBtn.removeClass('on');
			}
		});

		const $slideContainer = $('.slide-container');
		const moveSizeX = 200;
		let mouseDown = 0;
		let mouseUp = 0;
		//슬라이더 마우스 드레그 이미지이동 이벤트
		$slideContainer.on('mousedown', function(evt) {
			clearInterval(interValId);
			$slideContainer.attr({
				style: 'cursor: default;'
			});
			mouseDown = evt.pageX;
			evt.preventDefault();
		});
		$slideContainer.on('mouseup', function(evt) {
			$slideContainer.attr({
				style: 'cursor: pointer;'
			});
			mouseUp = evt.pageX;
			if (mouseDown - mouseUp >= moveSizeX) {
				nowIdx++;
				if (nowIdx >= sliedImgLeng) {
					nowIdx = 0;
				}
				moveFn($('#slider'), -100, nowIdx, '%');

				textColor();
				indicaterOn($indicater, nowIdx);
			} else if (mouseUp - mouseDown >= moveSizeX) {
				nowIdx--;
				if (nowIdx < 0) {
					nowIdx = sliedImgLeng - 1;
				}
				moveFn($('#slider'), -100, nowIdx, '%');

				textColor();
				indicaterOn($indicater, nowIdx);
				$playBtn.removeClass('on');
			}
		});

		//자동이동 함수
		let sliedImgLeng = $('#wrap > section > .slide-container > ul > li > img').length;
		const IntervalFn = function() {
			interValId = setInterval(function() {
				if (nowIdx < sliedImgLeng - 1) {
					nowIdx++;
				} else {
					nowIdx = 0;
				}
				moveFn($('#slider'), -100, nowIdx, '%');
				textColor();
				indicaterOn($indicater, nowIdx);
			}, 3000);
		};

		//자동실행 & 멈춤 클릭이벤트
		$playBtn.on('click', function() {
			if ($playBtn.hasClass('on')) {
				clearInterval(interValId);
				$playBtn.removeClass('on');
			} else {
				$playBtn.addClass('on');
				IntervalFn();
			}
		});

		// 접속 화면 체크 함수
		const sart = function() {
			let userDevice = 'web';
			if ($(window).width() < 768) {
				userDevice = 'mobile';
			}
			/****************************************************************화면공통 일때  */

			/****************************************************************Pc  화면 일때  */
			if (userDevice === 'web') {
				//인디케이터 메뉴 생성 함수
				$mgnb.show();
				let indicatorHtml = '';
				let img = '';
				const tapNewIndicaterFn = function() {
					img = $('#tab-content > .on >div >ul >li');

					for (let i = 0; i < img.length; i++) {
						indicatorHtml += '<li>' + (i + 1) + '</li>';
					}
					$('body.web .tab-content-indicater>ul').html(indicatorHtml);
					$('body.web .tab-content-indicater>ul >li:first-child').addClass('on');
					indicaterOn($('body.web .tab-content-indicater>ul >li'), 0);
				};

				$('body').addClass('web').removeClass('mobile');
				if ($('body').hasClass('web')) {
					$('#wrap > #tap > .tap-wrap > #tab-content > .tab-content-indicater > ul > li').remove();
					tapNewIndicaterFn();
					//탭 마우스오버 이벤트
					$('body.web #tap > .btn-container >a').on('mouseenter', function() {
						if (viewidx == 1) {
							$(this).stop().animate({
								width: '180px',
								borderRadius: 40,
								'background-position-x': '150px'
							});
						} else {
							$(this).stop().animate({
								width: '210px',
								borderRadius: 40
							});
						}
					});
					//탭 마우스리브 이벤트
					$('body.web  #tap > .btn-container >a').on('mouseleave', function() {
						$(this).stop().animate(
							{
								width: '50px'
							},
							200
						);
					});
					const $tapContent = $('body.web #tab-content > div > .slide-frame');

					//마우스 드레그 이미지이동 이벤트
					$(document).on('mousedown', 'body.web #tab-content > div > .slide-frame', function(evt) {
						$tapContent.attr({
							style: 'cursor: default;'
						});
						mouseDown = evt.pageX;
						evt.preventDefault();
					});
					$(document).on('mouseup', 'body.web #tab-content > div > .slide-frame', function(evt) {
						$tapContent.attr({
							style: 'cursor: pointer;'
						});
						mouseUp = evt.pageX;
						if (mouseDown - mouseUp >= moveSizeX) {
							tapIdx++;
							if (tapIdx >= img.length) {
								tapIdx = 0;
							}
							moveFn($tapSlider, -1200, tapIdx, 'px');
							indicaterOn($('body.web .tab-content-indicater>ul >li'), tapIdx);
						} else if (mouseUp - mouseDown >= moveSizeX) {
							if (tapIdx <= 0) {
								tapIdx = img.length - 1;
							}
							tapIdx--;
							moveFn($tapSlider, -1200, tapIdx, 'px');
							indicaterOn($('body.web .tab-content-indicater>ul >li'), tapIdx);
						}
					});
					/* 해드 부분 이벤트  */
					//내비게이션 마우스 엔터 리브 이벤트
					const $hGnb = $('body.web #wrap > header > nav > ul#h-gnb > li');
					$hGnb.on({
						mouseenter: function() {
							$(this).children('.sub').show();
						},
						mouseleave: function() {
							$(this).children('.sub').hide();
						}
					});
					//서치메뉴 마우스 엔터 리브 이벤트
					const $search = $('body.web #wrap > header > nav > #h-icon > .search > a');
					$search.on({
						mouseenter: function() {
							$search.addClass('on').children().fadeOut(0).fadeIn(0).text('동아리와 영상을 찾아 보세요!');
						},
						mouseleave: function() {
							$search.removeClass('on').children().fadeOut(0).fadeIn(0).text('#');
						}
					});
					//마이메뉴 마우스 엔터 리브 이벤트
					const $myMenu = $('body.web #h-icon .my-menu');
					$myMenu.on({
						mouseenter: function() {
							$('body.web #wrap > header > nav > #h-icon > li:nth-child(3) > ul').addClass('on');
						},
						mouseleave: function() {
							$('body.web #wrap > header > nav > #h-icon > li:nth-child(3) > ul').removeClass('on');
						}
					});
				}
				let tapIdx = 0;
				let viewidx = 0;
				const $tapSlider = $('#tab-content > div > .slide-frame > ul');
				const $tapMenu = $('#wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps');

				//탭메뉴 클릭이벤트
				$(document).on('click', '#wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps', function(
					evt
				) {
					tapIdx = 0;
					indicatorHtml = '';
					moveFn($tapSlider, -1200, tapIdx);
					$('body.web .tab-content-indicater').hide();
					$(this).addClass('on').siblings().removeClass('on');
					viewidx = $tapMenu.index(this);
					//탭메뉴 상단 뷰
					$('body.web #wrap > #tap > .tap-wrap > #tab-content > div')
						.eq(viewidx)
						.addClass('on')
						.show()
						.siblings()
						.removeClass('on')
						.hide();
					$('body.web .tab-content-indicater').show();
					//탭메뉴 하단 뷰
					$('body.web #wrap > #tap > .btn-container > a')
						.eq(viewidx)
						.addClass('on')
						.show()
						.siblings()
						.removeClass('on')
						.hide();
					tapNewIndicaterFn();
				});

				/**********************************************************모바일  화면 일때  */
			} else if (userDevice === 'mobile') {
				$mgnb.hide();
				$('body').addClass('mobile').removeClass('web');
				if ($('body').hasClass('mobile')) {
					// 메뉴창 전부 닫기 함수
					const $sub = $('.sub');
					const closeMenu = function() {
						$sub.hide();
						$title.removeClass('on');
					};
					// 토글버튼 클릭 이벤트
					const $toggleBtn = $('body.mobile #wrap > header > nav > p.toggle');
					const $title = $('#h-gnb h2');

					$toggleBtn.on('click', function() {
						if ($(this).hasClass('show') != true) {
							$mgnb.show();
							$(this).addClass('show');
						} else {
							$mgnb.hide();
							$(this).removeClass('show');
							closeMenu();
						}
					});
					// 네비게이션 서브메뉴 클릭 이벤트
					$title.on('click', function() {
						if ($(this).hasClass('on')) {
							$sub.hide();
							$(this).removeClass('on');
							$(this).next('.sub').hide();
						} else {
							closeMenu();
							$(this).addClass('on');
							$(this).next('.sub').show();
						}
					});
					$('#wrap > #tap > .tap-wrap > #tab-content > .tab-content-indicater > ul > li').remove();
					//탭메뉴 클릭이벤트
					$('body.moblie .tab-content-indicater>ul >li:first-child').addClass('on');
					$(
						document
					).on(
						'click',
						'body.mobile #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps',
						function(evt) {
							tapIdxM = 0;
							indicatorHtmlM = '';
							$('body.mobile .tab-content-indicater').hide();
							$(this).addClass('on').siblings().removeClass('on');
							viewidxM = $(
								'body.mobile #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps'
							).index(this);
							//탭메뉴 상단 뷰
							$('body.mobile #wrap > #tap > .tap-wrap > #tab-content > div')
								.eq(viewidxM)
								.addClass('on')
								.show()
								.siblings()
								.removeClass('on')
								.hide();
							//탭메뉴 하단 뷰
							$('body.mobile #wrap > #tap > .btn-container > a')
								.eq(viewidxM)
								.addClass('on')
								.show()
								.siblings()
								.removeClass('on')
								.hide();
						}
					);
				}
			}
		};
		sart();

		let delta = 400;
		let timer = null;
		$(window).on('resize', function() {
			clearTimeout(timer);
			timer = setTimeout(resizeDone, delta);
		});
		function resizeDone() {
			clearInterval(interValId);
			$playBtn.removeClass('on');
			sart();
			textColor();
		}
	});
});
