// JavaScript Document
// -------------------------------------------------------------------
// Parallax - main visual
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	var box = $('.mainVisual > .inner');
	var textArea = $('.textArea', box);
	var timer = -1;
	
	/*
		�A�j���[�V�����J�n
	*/
	Ts.onFontLoaded(function(){
		box.addClass('anime');
		
		getParams();
		timer = setTimeout(function(){
			timer = null;
			scrollFnc();
		}, 4600);
	});

	/*
		�e��l�擾
	*/
	var textAreaH;
	var getParams = function(){
		textAreaH = textArea.outerHeight(false);
	};

	/*
		�X�N���[��������
	*/
	var scrollFnc = function(){
		if(timer !== null){
			return;
		}
		
		var scroll = $(window).scrollTop();
		if(scroll < 0){
			return;
		}

		var percent = Math.abs(scroll) / textAreaH;
		scroll *= percent * -1 * 0.3;
		textArea.css('transform', 'translateY(' + scroll + '%)');
	};

	/*
		�C�x���g�o�^�A���s
	*/
	$(window).on('resize', function(){
		getParams();
		scrollFnc();
	});
	$(window).on('scroll', scrollFnc);
});

// -------------------------------------------------------------------
// Parallax - scroll visual
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	var currentClass = 'jsCurrent';
	
	var box = $('.anneBlock01 .scrollVisual').data('scrolled', 0);
	var images = $('.images', box);
	var imageItems = images.children();
	imageItems.eq(0).addClass(currentClass);
	var textH01 = $('.textH01', box);
	var textH02 = $('.textH02', box);
	var textV01 = $('.textV01', box);

	/*
		�e��l�擾
	*/
	var boxW, boxH;
	var textH01W, textH02W;
	var textV01H;
	var changePoint01, changePoint02, endPoint;
	
	var getParams = function(){
		boxW = box.outerWidth(false);
		boxH = box.outerHeight(false);
		textH01W = textH01.outerWidth(false);
		textH02W = textH02.outerWidth(false);
		textV01H = textV01.outerHeight(false);
		changePoint01 = boxW * 5;
		changePoint02 = boxW * 11;
		endPoint = boxW * 16.5;
	};

	/*
		�X�N���[��������
	*/
	/* �X�N���[������ */
	var scrollingH01 = false, scrollingH02 = false, scrollingV01 = false;
	var imgScrollEndTimer = null;
	var imgScrollEnd = function(scrollingName){
		if(imgScrollEndTimer){
			clearTimeout(imgScrollEndTimer);
		}
		imgScrollEndTimer = setTimeout(function(){
			switch(scrollingName){
				case 'h01': {
					scrollingH01 = false;
					break;
				}
				case 'h02': {
					scrollingH02 = false;
					break;
				}
				case 'v01': {
					scrollingV01 = false;
					break;
				}
			}
		}, 500);
	};
	
	var scrollProcess = function(deltaY){
		/* �X�N���[���ʂ̎Z�o */
		// �X�N���[������(�v���X�F�i��(�摜�����)�A�}�C�i�X�F�߂�(�摜������))
		var scrollDirection = (deltaY < 0) ? 1 : -1;
		
		var scrolled = parseInt(box.data('scrolled'), 10) - deltaY;
		if(scrolled < 0){
			scrolled = 0;
		}
		if(scrolled > endPoint){
			scrolled = endPoint;
		}
		
		/* �摜�؂�ւ� */
		// �C���f�b�N�X�̎Z�o
		var imgIdx = 0, imgBorder = boxW;
		while(scrolled > imgBorder){
			imgIdx++;
			if(imgIdx === 5){
				imgBorder += boxW * 1.7;
			}
			else{
				imgBorder += boxW * 2;
			}
		}
		// �\���𓮂���
		var transform = 'none';
		var transformTarget;
		switch(imgIdx){
			case 0:
			case 1:
			// �C���f�b�N�X2�́A�c�Ɖ������ɑ�����
			case 2: {
				if(imgIdx === 2 && scrollDirection < 0){
					if(scrollingH01 || scrollingH02){
						return;
					}
				}
				else if(scrollingV01 || scrollingH02){
					return;
				}
				
				if(1 <= imgIdx && imgIdx <= 2){
					transform = 'translateX(-' + imgIdx + '00%)';
				}
				
				if(imgIdx === 2 && scrollDirection < 0){
					scrollingV01 = true;
					transformTarget = 'v01';
				}
				else{
					scrollingH01 = true;
					transformTarget = 'h01';
				}
				
				break;
			}
			case 3:
			case 4:
			// �C���f�b�N�X5�́A�c�Ɖ������ɑ�����
			case 5: {
				if(imgIdx === 5 && scrollDirection < 0){
					if(scrollingH01 || scrollingV01){
						return;
					}
				}
				else if(scrollingH01 || scrollingH02){
					return;
				}
				
				transform = 'translateX(-200%) translateY(-' + (imgIdx - 2) + '00%)';
				if(imgIdx === 5 && scrollDirection < 0){
					scrollingH02 = true;
					transformTarget = 'h02';
				}
				else{
					scrollingV01 = true;
					transformTarget = 'v01';
				}
				
				break;
			}
			case 6:
			case 7:
			case 8: {
				if(scrollingH01 || scrollingV01){
					return;
				}
				
				transform = 'translateX(-' + (imgIdx - 3) + '00%) translateY(-300%)';
				scrollingH02 = true;
				transformTarget = 'h02';
				
				break;
			}
		}
		
		images.css('transform', transform);
		imgScrollEnd(transformTarget);
		// �ڈ�t��
		imageItems.removeClass(currentClass);
		imageItems.eq(imgIdx).addClass(currentClass);

		/* �����̃X�N���[�� */
		var scrollPercent;
		// �������X�N���[������1
		scrollPercent = scrolled * -1 / textH01W * 100;
		textH01.css('transform', 'translateX(' + scrollPercent + '%)');
		// �c�����X�N���[��
		var vOffset = window.innerWidth * 0.3;
		scrollPercent = (scrolled - changePoint01 + vOffset) * -1 / textV01H * 100;
		textV01.css('transform', 'translateY(' + scrollPercent + '%)');
		// �������X�N���[������2
		scrollPercent = (scrolled - changePoint02) * -1 / textH02W * 100;
		textH02.css('transform', 'translateX(' + scrollPercent + '%)');
		
		/* �X�N���[���ʂ̍X�V */
		box.data('scrolled', scrolled);
		
		// �[�܂ŃX�N���[�����Ă�����true��Ԃ�
		return (scrolled === 0 || scrolled === endPoint);
	};
	
	/* PC */
	var scrollEvent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	box.on(scrollEvent, function(e){
		var deltaY;
		if(e.originalEvent.deltaY){
			deltaY = e.originalEvent.deltaY * -1;
		}
		else if(e.originalEvent.wheelDelta){
			deltaY = e.originalEvent.wheelDelta;
		}
		else{
			deltaY = e.originalEvent.detail * -1;
		}
		deltaY *= 0.6;

		var defaultScroll = scrollProcess(deltaY);
		if(!defaultScroll){
			e.preventDefault();
		}
	});

	/* SP */
	var isTouchstart = ('ontouchstart' in window);
	var isTouched = false;
	var touchStartY;
	box.on('touchstart', function(e){
		isTouched = true;
		
		var eventObj = e;
		if(eventObj.originalEvent){
			eventObj = eventObj.originalEvent;
		}
		touchStartY = isTouchstart ? eventObj.changedTouches[0].pageY : eventObj.pageY;
	});
	box.on('touchmove', function(e){
		if(!isTouched){
			return;
		}

		var eventObj = e;
		if(eventObj.originalEvent){
			eventObj = eventObj.originalEvent;
		}
		var posY = isTouchstart ? eventObj.changedTouches[0].pageY : eventObj.pageY;
		var deltaY = posY - touchStartY;

		if(Math.abs(deltaY) > 10){
			deltaY *= 1.7;
			var defaultScroll = scrollProcess(deltaY);
			if(!defaultScroll){
				e.preventDefault();
			}

			touchStartY = posY;
		}
		else{
			e.preventDefault();
		}
	});
	box.on('touchend', function(){
		if(!isTouched){
			return;
		}
		isTouched = false;
	});

	/*
		�C�x���g�o�^�A���s
	*/
	getParams();
	
	$(window).on('load resize', function(){
		getParams();
	});
});

// -------------------------------------------------------------------
// Slider - line up
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	$('.anneBlock02 .slider').slick({
		centerMode: true,
		centerPadding: '0px',
		speed: 500,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					speed: 500,
					variableWidth: false
				}
			}
		]
	});
});

// -------------------------------------------------------------------
// Slider - item informations
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	// items
	$('.anneBlock04 .slider02').slick({
		arrows: false,
		dots: true,
		fade: true
	});
	
	// popup
	$('.popup').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'3',
			'opacity':'1'
		});
		$('.modalBlock01 .closeWrap').css('display','block');
		$('.modalBlock01 .closeBtn').css('display','block');
	});
	$('.closeWrap').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'-10',
			'opacity':'0'
		});
		$(this).css('display','none');
	});
	$('.closeBtn').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'-10',
			'opacity':'0'
		});
		$(this).css('display','none');
	});

	$('.modalBlock01 .slider').slick({
		autoplay: true,
		autoplaySpeed: 2000
	});
});

// -------------------------------------------------------------------
// Movie popup
// -------------------------------------------------------------------
$(function(){
	'use strict';
	
	$('.popup-iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 200,
		preloader: false,
		fixedContentPos: false,
		iframe: {
			patterns: {
				youtube: {
					index: 'youtube.com', 
					id: 'v=', 
					src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
				}
			}
		}
	});
});
