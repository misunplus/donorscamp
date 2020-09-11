$(function() {
	let $body = $('body');
	$body.addClass('web');
	$(window).on('resize', function() {
		// window.location.reload();
		divice();
	});

	const divice = function() {
		/****************************************웹 부분*************/
		if ($(window).width() > 768) {
			console.log('.width() > 768)');
			if ($('body').hasClass('web')) {
				console.log("hasClass('web')");
				$body.removeClass('mobile').addClass('web');
				$('body').reload();
				const $hGnb = $('body.web #wrap > header > nav > ul#h-gnb > li');
				const $search = $('body.web #wrap > header > nav > #h-icon > .search > a');
				const $tapMenu = $('body.web #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps');
				const $myMenu = $('body.web #h-icon .my-menu');
				const $indicater = $('body.web #wrap > section > .slide-container .indicater > li');
				const $slideContainer = $('body.web .slide-container');
				const $playBtn = $('body.web .play');
				const $tapSlider = $('body.web #tab-content > div > .slide-frame > ul');
				const $tapContent = $('body.web #tab-content > div > .slide-frame');
				const moveSizeX = 200;
				let viewidx = 0;
				let sliedImgLeng = $('body.web #wrap > section > .slide-container > ul > li > img').length;
				let nowIdx = 0;
				let mouseDown = 0;
				let mouseUp = 0;
				let interValId = null;
				let tapIdx = 0;
				let indicatorHtml = '';
				let img = 0;

				//웹 마이메뉴 마우스 엔터 리브 이벤트
				$myMenu.on('mouseenter', function() {
					$('body.web #wrap > header > nav > #h-icon > li:nth-child(3) > ul').addClass('on');
				});
				$myMenu.on('mouseleave', function() {
					$('body.web #wrap > header > nav > #h-icon > li:nth-child(3) > ul').removeClass('on');
				});
				/***************************************** 메인섹션 *****/
				/*********************** 웹 공통 함수 부분 */
				//슬라이드 이동함수
				const moveFn = function(target, size, index) {
					target.stop().animate({
						left: size * index + 'px'
					});
				};
				//슬라이드 텍스트변경 함수
				const textColor = function() {
					if (nowIdx == 4) {
						$('body.web #wrap > section > .slide-container .indicater > li > a ').attr({
							style: 'border:2px solid #fff',
							style: 'background: #fff'
						});
					} else {
						$('body.web #wrap > section > .slide-container .indicater > li > a ').attr({
							style: 'border:2px solid #000',
							style: 'background: #000'
						});
					}
				};
				//인디케이터 on 함수
				const indicaterOn = function(taget, idx) {
					taget.eq(idx).addClass('on').siblings().removeClass('on');
				};
				//인덱스 계산 함수
				const nowIdxFn = function(length, index) {
					if (index < length - 1) {
						console.log(index, length);
						nowIdx++;
					} else {
						nowIdx = 0;
					}
				};
				//자동이동 함수
				const IntervalFn = function() {
					interValId = setInterval(function() {
						if (nowIdx < sliedImgLeng - 1) {
							nowIdx++;
						} else {
							nowIdx = 0;
						}
						moveFn($('body.web #slider'), -1760, nowIdx);
						textColor();
						indicaterOn($indicater, nowIdx);
					}, 1000);
				};

				//인디케이터 메뉴 생성 함수
				const tapNewIndicaterFn = function() {
					img = $('body.web #tab-content > .on >div >ul >li');
					for (let i = 0; i < img.length; i++) {
						indicatorHtml += '<li>' + (i + 1) + '</li>';
					}
					$('body.web .tab-content-indicater>ul').html(indicatorHtml);
					$('body.web .tab-content-indicater>ul >li:first-child').addClass('on');
					indicaterOn($('body.web .tab-content-indicater>ul >li'), 0);
				};
				tapNewIndicaterFn();

				/*********************** 웹 해드 이벤트 부분 */
				//해드 메뉴 마우스 이벤트
				$hGnb.on('mouseenter', function() {
					$(this).children('.sub').show();
				});
				$hGnb.on('mouseleave', function() {
					$(this).children('.sub').hide();
				});
				//해드 서치아이콘 마우스 이벤트
				$search.on('mouseenter', function() {
					$search.addClass('on').children().fadeOut(0).fadeIn(0).text('동아리와 영상을 찾아 보세요!');
				});
				$search.on('mouseleave', function() {
					$search.removeClass('on').children().fadeOut(0).fadeIn(0).text('#');
				});

				//인디케이터 클릭 이벤트
				$indicater.on('click', function() {
					nowIdx = $indicater.index(this);
					$(this).addClass('on').siblings().removeClass('on');
					moveFn($('body.web #slider'), -1760, nowIdx);
					textColor();
				});

				//자동실행 & 멈춤 클릭이벤트
				$playBtn.on('click', function() {
					if ($playBtn.hasClass('on')) {
						clearInterval(interValId);
						$playBtn.removeClass('on');
					} else {
						clearInterval(interValId);
						$playBtn.addClass('on');
						IntervalFn();
					}
				});

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
						moveFn($('body.web #slider'), -1760, nowIdx);
						textColor();
						indicaterOn($indicater, nowIdx);
					} else if (mouseUp - mouseDown >= moveSizeX) {
						nowIdx--;
						if (nowIdx < 0) {
							nowIdx = sliedImgLeng - 1;
						}
						moveFn($('body.web #slider'), -1760, nowIdx);
						textColor();
						indicaterOn($indicater, nowIdx);
						$playBtn.removeClass('on');
					}
				});

				/***************************************** taps 섹션 *****/
				/*********************** 웹 섹션 이벤트 부분 */
				//탭메뉴 클릭이벤트
				$(
					document
				).on('click', 'body.web #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps', function(
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
				//탭 마우스오버 이벤트
				$('body.web #wrap > #tap > .btn-container >a').on('mouseenter', function() {
					if (viewidx == 1) {
						console.log(viewidx);
						$(this).stop().animate({
							width: '170px',
							borderRadius: 40,
							'background-position-x': '150px'
						});
					} else {
						$(this).stop().animate({
							width: '200px',
							borderRadius: 40
						});
					}
				});
				//탭 마우스리브 이벤트
				$('body.web #wrap > #tap > .btn-container >a').on('mouseleave', function() {
					$(this).stop().animate(
						{
							width: '50px'
						},
						200
					);
				});

				//컨텐츠 슬라이드 클릭시 초기화 이벤트
				$(document).on('click', 'body.web .tab-content-indicater > ul > li', function() {
					tapIdx = $('body.web .tab-content-indicater>ul >li').index(this);
					moveFn($tapSlider, -1200, tapIdx);
					indicaterOn($('body.web .tab-content-indicater>ul >li'), tapIdx);
				});

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
						moveFn($tapSlider, -1200, tapIdx);
						indicaterOn($('body.web .tab-content-indicater>ul >li'), tapIdx);
					} else if (mouseUp - mouseDown >= moveSizeX) {
						console.log(img.length);
						if (tapIdx <= 0) {
							tapIdx = img.length - 1;
						}
						tapIdx--;
						moveFn($tapSlider, -1200, tapIdx);
						indicaterOn($('body.web .tab-content-indicater>ul >li'), tapIdx);
					}
				});
			}
		} else {
			$body.removeClass('web').addClass('mobile');
			/****************************************모바일 부분 *************/
			if ($('body').hasClass('mobile')) {
				const $toggleBtn = $('body.mobile #wrap > header > nav > p.toggle');
				const $mgnb = $('#wrap > header > nav > ul#h-gnb');
				const $title = $('#h-gnb h2');
				const $sub = $('.sub');
				const $indicaterM = $('body.mobile #wrap > section > .slide-container .indicater > li');
				const $slideContainerM = $('body.mobile .slide-container');
				const $playBtnM = $('body.mobile .play');
				const moveSizeXM = 100;
				let sliedImgLengM = $('body.mobile #wrap > section > .slide-container > ul > li > img')
					.length;
				let nowIdxM = 0;
				let mouseDownM = 0;
				let mouseUpM = 0;
				let interValIdM = null;
				let imgM = 0;
				// 메뉴창 전부 닫기 함수
				const closeMenu = function() {
					$sub.hide();
					$title.removeClass('on');
				};
				/*********************** 모바일 공통함수 부분 */

				//슬라이드 이동함수
				const moveFnM = function(target, size, index) {
					target.stop().animate({
						left: size * index + '%'
					});
				};

				//자동이동 함수
				const IntervalFnM = function() {
					interValIdM = setInterval(function() {
						if (nowIdxM < sliedImgLengM - 1) {
							nowIdxM++;
						} else {
							nowIdxM = 0;
						}
						moveFnM($('body.mobile #slider'), -100, nowIdxM);
						indicaterOn($indicaterM, nowIdxM);
					}, 1000);
				};
				/*********************** 모바일 해드 이벤트 부분 */
				// 토글버튼 클릭 이벤트
				$toggleBtn.on('click', function() {
					console.log('토글진입 진입');
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
				/*****************************************모바일 메인섹션 *****/
				//인디케이터 클릭 이벤트
				$indicaterM.on('click', function() {
					nowIdxM = $indicaterM.index(this);
					console.log(nowIdxM);
					$(this).addClass('on').siblings().removeClass('on');
					moveFnM($('body.mobile #slider'), -100, nowIdxM);
				});
				//자동실행 & 멈춤 클릭이벤트
				$playBtnM.on('click', function() {
					if ($playBtnM.hasClass('on')) {
						clearInterval(interValIdM);
						$playBtnM.removeClass('on');
					} else {
						clearInterval(interValIdM);
						$playBtnM.addClass('on');
						IntervalFnM();
					}
				});

				//슬라이더 마우스 드레그 이미지이동 이벤트
				$slideContainerM.on('mousedown', function(evt) {
					clearInterval(interValIdM);
					$slideContainerM.attr({
						style: 'cursor: default;'
					});
					mouseDownM = evt.pageX;
					evt.preventDefault();
				});
				$slideContainerM.on('mouseup', function(evt) {
					$slideContainerM.attr({
						style: 'cursor: pointer;'
					});
					mouseUpM = evt.pageX;
					if (mouseDownM - mouseUpM >= moveSizeXM) {
						nowIdxM++;
						if (nowIdxM >= sliedImgLengM) {
							nowIdxM = 0;
						}
						moveFnM($('body.mobile #slider'), -100, nowIdxM);

						indicaterOn($indicaterM, nowIdxM);
					} else if (mouseUpM - mouseDownM >= moveSizeXM) {
						nowIdxM--;
						if (nowIdxM < 0) {
							nowIdxM = sliedImgLengM - 1;
						}
						moveFnM($('body.mobile #slider'), -100, nowIdxM);

						indicaterOn($indicaterM, nowIdxM);
						$playBtnM.removeClass('on');
					}
				});
			}
		}
	};
	/*********************************************** 모바일 탭스 부분 */
	//탭메뉴 클릭이벤트
	$('body.moblie .tab-content-indicater>ul >li:first-child').addClass('on');
	$(
		document
	).on('click', 'body.mobile #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps', function(
		evt
	) {
		tapIdxM = 0;
		indicatorHtmlM = '';
		$('body.mobile .tab-content-indicater').hide();
		$(this).addClass('on').siblings().removeClass('on');
		viewidxM = $('body.mobile #wrap > #tap > .tap-wrap > .tap-indicater > ul > .taps').index(this);
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
		// tapNewIndicaterFnM();
	});
	divice();
});
