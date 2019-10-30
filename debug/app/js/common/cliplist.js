var CL_getCliplist, CL_setCliplist, CL_showCliplist, CL_isAdded, CL_delete, CL_add, CL_init;
(function($){
CL_getCliplist = function() {
	var str = localStorage.getItem('cliplist');

	if ( str === null || str === '' || typeof str === 'undefined' ) {
		CL_setCliplist([]);
		return [];
	} else {
		return eval(str);
	}
}

CL_setCliplist = function(cliplist) {
	var str = JSON.stringify(cliplist);
	try{
		localStorage.setItem('cliplist', str);
	}catch(e){}
}

CL_showCliplist = function(page, scroll) {

	// https配下では正しく内容を取得できないので http の専用ページに飛ばす
	// リニューアル後は常に専用ページ
	//if ( location.protocol === 'https:' || location.pathname.indexOf('cliplist') === -1 ) {
	//	var url = 'http://' + location.host + '/pj/cliplist/';
	//	location.href = url;
	//	return;
	//}

	var cliplist = CL_getCliplist();
	
	// 0件ならエラーメッセージ出して終了
	if ( cliplist.length === 0 ) {
		$('#main1 div.failure').show();
		$('#main1 div.success').hide();
		$('#main').hide();
		$('#main1').show();
		$('html, body').animate({
			//scrollTop: $('#main1').offset().top
		}, 1000);
		return;
	} else {
		$('#main1 div.failure').hide();
		$('#main1 div.success').show();
	}

	// ページ数を取得
	if ( typeof page === 'undefined' || !(page >= 1 && page <= 5) ) {
		page = 1;
	}
	page = parseInt(page);

	// 適正なページ数に調整する	
	while ( page >= 1 && cliplist.length <= (page-1)*24 ) {
		page--;
	}

	// 対象となる24項目を取得
	var tmp = CL_getCliplist();
	var list = tmp.splice((page-1)*24, 24);

	// DOMを作成して追加する
	$('#cliplist').empty();
	$(list).each(function(){
		var dom = $('#dummy-dom li').clone();
		dom.find('b').html(this.name);
		dom.find('img').attr('src', this.img);
		dom.find('input').attr('value', this.id);
		dom.find('a').attr('href', '/pjitem/detail/?ITM='+this.id + '&outlet=include');
		$('#cliplist').append(dom);
	});
	
	// ページング部分を作成する
	$('.cliplist-paging').empty();

	// prev
	var prev = $('<li class="prev" />');
	if ( page == 1 ) {
		prev.addClass('off').text('PREV');
	} else {
		var a = $('<a />').attr('href', 'javascript:CL_showCliplist('+ (page-1) +');').text('PREV');
		prev.append(a);
	}
	$('.cliplist-paging').append(prev);

	// 1~5
	var page_max = Math.floor((cliplist.length-1) / 24) + 1;
	for ( var i = 1; i <= page_max; i++ ) {
		var li = $('<li />');

		// 現在のページならリンク無し
		if ( i == page ) {
			var a = $('<a />').attr('href', 'javascript:void(0);').text(i);
			li.addClass('active1');
			li.append(a);
		} else {
			var a = $('<a />').attr('href', 'javascript:CL_showCliplist('+i+');').text(i);
			li.append(a);
		}
		
		$('.cliplist-paging').append(li);
	}
	
	// next
	var next = $('<li />');
	if ( page == 5 || page == page_max ) {
		next.addClass('off').text('NEXT');
	} else {
		var a = $('<a />').attr('href', 'javascript:CL_showCliplist('+ (page+1) +');').text('NEXT');
		next.append(a);
	}
	$('.cliplist-paging').append(next);

	
	// 検索件数を表示する
	var start = (page-1)*24 + 1;
	var end   = Math.min(cliplist.length, page*24);
	var count = start+'-'+end+' / '+cliplist.length;
	$('.cliplist-count').html(count);

	// クリップリストを表示する
	$('#main').hide();
	$('#main1').show();
	$('#main1 a.view1').trigger('click');
	if (scroll !== false) {
		$('html, body').animate({
			scrollTop: $('#main1').offset().top
		}, 1000);
	}
}

// 指定したIDがクリップリストに追加済みかどうか調べる
CL_isAdded = function(id) {
	var cliplist = CL_getCliplist();

	if ( cliplist.length === 0 ) {
		return false;
	}
	
	if ( typeof id === 'undefined' || id === null || id === '' ) {
		return false;
	}

	// 一致するIDがあるかチェック
	for ( var i = 0; i < cliplist.length; i++ ) {
		if( cliplist[i].id == id ) {
			return true;
		}
	}
	
	// 見つからなければ false
	return false;
}

CL_delete = function(id) {
	var cliplist = CL_getCliplist();

	// 未使用なら何もしない
	if ( cliplist.length === 0 ) {
		return;
	}
	
	$(cliplist).each(function(i){
		if ( this.id == id ) {
			cliplist.splice(i, 1);
			CL_setCliplist(cliplist);
			return false;
		}
	});
}

CL_add = function(id, name, img) {
	// 追加済みだったら削除
	if ( CL_isAdded(id) ) {
		CL_delete(id);
	}

	var cliplist = CL_getCliplist();

	// 150件以上は追加不可能
	if ( cliplist.length >= 150 ) {
		alert('クリップリストには150件までしか登録できません');
		return false;
	}

	// 最後尾に追加
	cliplist.push({'id': id, 'name': name, 'img': img});
	CL_setCliplist(cliplist);
	return true;
}

// 初期化処理
CL_init = function() {
	// クリックイベントを設定
	$('.cliplist-ico').click(function(e){
		var id   = $(this).data('id');
		var name = $(this).data('name');
		var img  = $(this).data('img');

		if ( $(this).hasClass('added') ) {
			CL_delete(id);
		} else {
			var ret = CL_add(id, name, img);
			
			// 削除失敗したらここでお終い
			if ( !ret ) {
				return;
			}
		}
		$(this).toggleClass('added');

		e.preventDefault();
	});
	
	$('.checkBoxHide').click(function(e){
		var doms = $('input[name=cliplist-item]:checked');
		doms.each(function(){
			var id = $(this).attr('value');
			CL_delete(id);
		});

		// 削除した物がある場合のみリロード
		if ( doms.length > 0 ) {
			var page = $('#main1 ul.paging > li > span:not([class])').text();
			if ( !(page >= 1 && page <= 5) ) {
				page = 1;
			}
			CL_showCliplist(page);
		} else {
			alert('削除する商品を選択して下さい');
		}
		
		e.preventDefault();
	});
	
	// 追加済みならクラス追加
	$('.cliplist-ico').each(function(){
		var id = $(this).data('id');
		if ( CL_isAdded(id) ) {
			$(this).addClass('added');
		}
	});

	// 「チェックリスト」をクリックした時の動作
	$('.checkListURL').click(function(e){
		var block = $(this).parent().parent().parent().siblings('.sub-nav-add');
		if ( block.hasClass('slide-active') ) {
			block.slideUp(500);
			block.removeClass('slide-active');
		} else {
			block.slideDown(500);
			block.addClass('slide-active');
		}

		e.preventDefault();
	});
}

$(function(){
	CL_init();
});

})(jQuery);