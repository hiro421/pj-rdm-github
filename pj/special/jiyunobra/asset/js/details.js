// ***********************************************
// DETAILS JS
// ***********************************************
// changeImage01
$(function(){
	setInterval(function(){
		var selectImage = $('.changeImage01 li.active').index();
		selectImage++;
		if (selectImage == 6){
			selectImage = 0;
		}
		$('.changeImage01 li').removeClass('active');
		$('.changeImage01 li').eq(selectImage).addClass('active');
	},3000);
});

// changeImage02
$(function(){
	setInterval(function(){
		$('.changeImage02').each(function(){
			var selectImage = $(this).find('li.active').index();
			selectImage++;
			if (selectImage == 3){
				selectImage = 0;
			}
			$(this).find('li').removeClass('active');
			$(this).find('li').eq(selectImage).addClass('active');
		});
	},3000);
});

// colorSelect
$(function(){
	$('.slider02').slick({
		arrows:false,
		dots:true,
		fade:true
	});
});

// modal
$(function(){
	$('.popup').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'3',
			'opacity':'1'
		});
		$('.modalBlock01 .closeWrap').css('display','block');
	});
	$('.closeWrap').on('click', function(){
		$('.modalBlock01 .modalBox').css({
			'z-index':'-10',
			'opacity':'0'
		});
		$(this).css('display','none');
	});

	$('.slider').slick();
});

// compareImage
$(window).load(function(){
	$(".compareImage").twentytwenty({default_offset_pct: 0.33});
});

// fixedBtn
$(function(){
		var showTop = 400;
		var fixedTop = $('.fixedCartBtn');
		$(window).on('load scroll resize',function(){
				if($(window).scrollTop() >= showTop){
						fixedTop.fadeIn('normal');
				} else if($(window).scrollTop() < showTop){
						fixedTop.fadeOut('normal');
				}
		});
});
