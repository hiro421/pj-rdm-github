//header
function Header(){
    var html = "";
	html += '<header id="header">';
	html += '	<div class="headArea">';
	html += '		<div class="inner">';
	html += '			<h1><a href="/pj/salon/">SALON by PEACH JOHN</a></h1>';
	html += '			<div class="menuBtn">menu</div>';
	html += '			<div class="btn clearfix">';
	html += '				<div class="wishList pc"><a href="http://www.peachjohn.co.jp/pj/cliplist/">�`�F�b�N���X�g</a></div>';
	html += '				<div class="wishList sp"><a href="http://www.peachjohn.co.jp/pj/cliplist/">�`�F�b�N���X�g</a></div>';
	html += '				<div class="cart"><a href="http://www.peachjohn.co.jp/shopping/bag/">�J�[�g������</a></div>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</header>';
    document.write(html);}
	
//gnavi
function gNavi(){
    var html = "";
	html += '<div id="gnavi">';
	html += '	<div class="gnaviInner">';
	html += '		<div class="wrap">';
	html += '			<div class="head">';
	html += '				<p class="title"><img src="/pj/salon/img/common/gnavi_title_menu.png" alt="MENU"/></p>';
	html += '				<div class="closeBtn"><img src="/pj/salon/img/common/gnavi_close_btn_head.png" alt="close"/></div>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<ul>';
	html += '					<li class="catTopLogin"><a href="/member/login/">���O�C���^����o�^</a></li>';
	html += '					<li><a href="/shopping/bag/">�J�[�g</a></li>';
	html += '					<li><a href="/member/wishlist/">�ق������̃��X�g</a></li>';
	html += '					<li><a href="/pj/cliplist/">���C�ɓ���</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<p class="stitle"><img src="/pj/salon/img/common/gnavi_title_category.png" alt="CATEGORY"/></p>';
	html += '				<ul>';
	html += '					<li class="catTop"><a href="/pjitem/list/?_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">�S�ẴA�C�e��</a></li>';
	html += '					<li><a href="/pjitem/list/?_pcg=101&_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">�u���W���[</a></li>';
  html += '					<li><a href="/pjitem/list/?_pcg=102&_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">�p���e�B</a></li>';
	html += '					<li><a href="/pjitem/list/?_pcg=105&_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">�����W�F���[</a></li>';
  html += '					<li><a href="/pjitem/list/?_pcg=104&_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">���[���E�F�A</a></li>';
	html += '					<li><a href="/pjitem/list/?_pcg=304&_al=sa_all&sort=6&outlet=include&count=150&_iid=1&itemSrcFlt=1&_dm=2">�A�N�Z�T���[</a></li>';
  html += '					<li><a href="/pjitem/list/?_al=sa_all&sort=6&outlet=only&count=150&_iid=1&itemSrcFlt=1&_dm=2">�Z�[��</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<p class="stitle specialTitle"><img src="/pj/salon/img/common/gnavi_title_special.png" alt="SPECIAL"/></p>';
	html += '				<ul>';
	html += '					<li><a href="/pj/salon/ranking/">�����L���O</a></li>';
  html += '					<li><a href="/pjitem/list/?_al=sl_new&count=60&_iid=1&outlet=include&sort=6">�V���A�C�e��</a></li>';
  html += '					<li><a href="/pj/salon/pickup/">���R�~�l�C�A�C�e��</a></li>';
  html += '					<li><a href="https://www.youtube.com/watch?v=Mg0pt533lXU" class="popup-youtube">MOVIE</a></li>';
  html += '					<li><a href="/pj/salon/store/">�X�g�A</a></li>';
	html += '					<li><a href="http://peachjohn.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://peachjohn.scene7.com/s7/emailFriend&serverUrl=http://peachjohn.scene7.com/is/image/&config=Scene7SharedAssets/Universal_HTML5_eCatalog&contenturl=http://peachjohn.scene7.com/skins/&config2=companypreset&asset=PeachJohn/SLvol22&direction=left" target="_blank">�ŐV�J�^���O</a></li>';
	html += '					<li><a href="/pj/salon/about/">SALON by PEACH JOHN�Ƃ�</a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box bannerArea">';
	html += '				<ul>';
	html += '					<li><a href="http://www.peachjohn.co.jp/"><img src="/pj/salon/img/common/gnavi_foot_banner01.png" alt="PEACH JOHN"/></a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/pj/beauty/"><img src="/pj/salon/img/common/gnavi_foot_banner02.png" alt="PEACH JOHN Beauty"/></a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/pj/yummymart/"><img src="/pj/salon/img/common/gnavi_foot_banner03.png" alt="YUMMY MART"/></a></li>';
	html += '				</ul>';
	html += '			</div>';
	html += '			<div class="box">';
	html += '				<ul class="fnavi clearfix">';
	html += '					<li><a href="https://faq.peachjohn.co.jp" target="_blank">���₢���킹</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/info/about/">��ЊT�v</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/rule/privacy_policy.html">�v���C�o�V�[�|���V�[</a></li>';
	html += '					<li><a href="http://www.peachjohn.co.jp/al/info/browser/">������</a></li>';
	html += '				</ul>';
	html += '				<div class="closeBtn foot"><a href="javascript:void(0)" onClick="setmenu(false);"><img src="/pj/salon/img/common/gnavi_close_btn_bottom.png" alt=""/></a></div>';
	html += '			</div>';
	html += '		</div>';
	html += '	</div>';
	html += '</div>';
    document.write(html);}

//footer Footer(){
function Footer(){
    var html = "";
  html += '<div id="footBannerArea">';
	html += '	<ul>';
	html += '		<li><a href="/pj/salon/about/index.html"><img src="/pj/salon/img/common/foot_bn_about.png" alt="ABOUT SALON"/></a></li>';
	html += '		<li><a href="http://peachjohn.scene7.com/s7viewers/html5/eCatalogViewer.html?emailurl=http://peachjohn.scene7.com/s7/emailFriend&serverUrl=http://peachjohn.scene7.com/is/image/&config=Scene7SharedAssets/Universal_HTML5_eCatalog&contenturl=http://peachjohn.scene7.com/skins/&config2=companypreset&asset=PeachJohn/SLvol22&direction=left" target="_blank"><img src="/pj/salon/img/common/foot_bn_lookbook.png" alt="DIGITAL CATALOG"/></a></li>';
  html += '		<li><a href="/pj/salon/store/"><img src="/pj/salon/img/common/foot_bn_store.png" alt="STORE �X�܏��"/></a></li>';
	html += '	</ul>';
	html += '</div>';
	html += '<div id="snsArea">';
	html += '	<h3><img src="/pj/salon/img/common/title_sns.png" alt="SALON OFFICIAL SNS"/></h3>';
	html += '	<ul>';
	html += '		<li><a href="https://www.facebook.com/SALON-by-PEACH-JOHN-744125885617916/" target="_blank"><img src="/pj/salon/img/common/ico_fb.png" alt=""/></a></li>';
	html += '		<li><a href="https://twitter.com/salonbypj" target="_blank"><img src="/pj/salon/img/common/ico_tw.png" alt=""/></a></li>';
	html += '		<li><a href="https://instagram.com/salonbypj/" target="_blank"><img src="/pj/salon/img/common/ico_insta.png" alt=""/></a></li>';
	html += '		<li><a href="https://line.me/R/ti/p/%40gis5818c" target="_blank"><img src="/pj/salon/img/common/ico_lineat.png" alt=""/></a></li>';
	html += '	</ul>';
	html += '</div>';
	html += '<div id="bannerArea">';
	html += '	<ul>';
	html += '		<li><a href="http://www.peachjohn.co.jp/"><img src="/pj/salon/img/common/foot_banner01.png" alt="PEACH JOHN"/></a></li>';
	html += '		<li><a href="http://www.peachjohn.co.jp/pj/beauty/"><img src="/pj/salon/img/common/foot_banner02.png" alt="PEACH JOHN Beauty"/></a></li>';
	html += '		<li><a href="http://www.peachjohn.co.jp/pj/yummymart/"><img src="/pj/salon/img/common/foot_banner03.png" alt="YUMMY MART"/></a></li>';
	html += '	</ul>';
	html += '</div>';
	html += '<div id="shareArea">';
	html += '	<h3><img src="/pj/salon/img/common/title_share.png" alt="SHARE"/></h3>';
	html += '	<ul>';
	html += '		<li><a href="http://www.facebook.com/sharer.php?u=http://www.peachjohn.co.jp/pj/salon/" target="_blank"><img src="/pj/salon/img/common/btn_share_fb.png" alt="Facebook"/></a></li>';
	html += '		<li><a href="http://twitter.com/share?url=http://salonbypj.jp" target="_blank"><img src="/pj/salon/img/common/btn_share_tw.png" alt="Twitter"/></a></li>';
	html += '		<li><a href="http://line.me/R/msg/text/?http://salonbypj.jp" target="_blank"><img src="/pj/salon/img/common/btn_share_line.png" alt="LINE"/></a></li>';
	html += '	</ul>';
	html += '</div>';
	html += '<footer id="footer">';
	html += '	<nav id="fnavi">';
	html += '		<ul>';
	html += '			<li><a href="https://faq.peachjohn.co.jp" target="_blank">���₢���킹</a></li>';
	html += '			<li><a href="http://www.peachjohn.co.jp/al/info/about/">��ЊT�v</a></li>';
	html += '			<li><a href="http://www.peachjohn.co.jp/al/rule/privacy_policy.html">�v���C�o�V�[�|���V�[</a></li>';
	html += '			<li><a href="http://www.peachjohn.co.jp/al/info/browser/">������</a></li>';
	html += '		</ul>';
	html += '	</nav>';
	html += '	<div id="copyright">';
	html += '		<p>COPYRIGHT(C)PEACH JOHN CO.,LTD</p>';
	html += '	</div>';
	html += '</footer>';
    document.write(html);}

//BacknumberInterview
function BacknumberInterview(){
    var html = "";
	html += '<div class="backnumber">';
	html += '	<h3>BACK NUMBER</h3>';
	html += '	<ul>';
	html += '		<li><a href="/pj/salon/interview/">';
	html += '			<div class="thumb"><img src="/pj/salon/interview/img/160824/thumb01.jpg" alt=""/></div>';
	html += '			<p>vol.4<br>�q������</p>';
	html += '			</a></li>';
	html += '		<li><a href="/pj/salon/interview/160518.html">';
	html += '			<div class="thumb"><img src="/pj/salon/interview/img/160518/thumb01.jpg" alt=""/></div>';
	html += '			<p>vol.3<br>�c�ۖ��I</p>';
	html += '			</a></li>';
	html += '		<li> <a href="/pj/salon/interview/160301.html">';
	html += '			<div class="thumb"><img src="/pj/salon/interview/img/160301/thumb01.jpg" alt=""/></div>';
	html += '			<p>vol.2<br>������</p>';
	html += '			</a> </li>';
	html += '		<li> <a href="/pj/salon/interview/151111.html">';
	html += '			<div class="thumb"><img src="/pj/salon/interview/img/thumb01.jpg" alt=""/></div>';
	html += '			<p>vol.1<br>���c�^�R�� & ��x����</p>';
	html += '			</a> </li>';	
	html += '	</ul>';
	html += '</div>';
    document.write(html);}
	
//BacknumberColumn
function BacknumberColumn(){
    var html = "";
	html += '<div class="backnumber">';
	html += '	<h3>BACK NUMBER</h3>';
	html += '	<div class="wrap">';
	html += '		<ul class="customScroll">';
	html += '			<li> <a href="/pj/salon/column/180606.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb15.png" alt=""/></div>';
	html += '				<p>No.15 �\�t�g���[�X�t���i�C�g�u�� </p>';
	html += '				</a> </li>';	
	html += '			<li> <a href="/pj/salon/column/180514.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb14.png" alt=""/></div>';
	html += '				<p>No.14 �V���v�����N�X���[�V�B</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/180214.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb13.png" alt=""/></div>';
	html += '				<p>No.13 ���[�u�h�D�}���G</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/171108.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb12.png" alt=""/></div>';
	html += '				<p>No.12 �V���N���[�����V���[�Y</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/170830.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb11.png" alt=""/></div>';
	html += '				<p>No.11 ���[���s�A���R���Z�b�^</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/170726.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb10.png" alt=""/></div>';
	html += '				<p>No.10 SALON�̃T�j�^���[</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/170517.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb09.png" alt=""/></div>';
	html += '				<p>No.9 SALON�̃X�C���E�G�A</p>';
	html += '				</a> </li>';	
	html += '			<li> <a href="/pj/salon/column/170227.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb08.png" alt=""/></div>';
	html += '				<p>No.8 �����N�X���[�X�t���X�g���b�v���X</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/161107.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb07.png" alt=""/></div>';
	html += '				<p>No.7 ���B���e�[�W�V���N�u��</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/160824.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb06.png" alt=""/></div>';
	html += '				<p>No.6 ���[�N�u�������N�X</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/160518.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb05.png" alt=""/></div>';
	html += '				<p>No.5 �u���U�[�u���u��</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/160413.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb04.png" alt=""/></div>';
	html += '				<p>No.4 �X�v�����O�t�����[�X�g�[���[</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/160301.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb03.jpg" alt=""/></div>';
	html += '				<p>No.3 �A���e�B�[�N�t�����[�X�g�[���[</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/160127.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb02.jpg" alt=""/></div>';
	html += '				<p>No.2 �A���e�B�[�N�u���[���X�g�[���[</p>';
	html += '				</a> </li>';
	html += '			<li> <a href="/pj/salon/column/151111.html">';
	html += '				<div class="thumb"><img src="/pj/salon/column/img/thumb01.jpg" alt=""/></div>';
	html += '				<p>No.1 �}���b�W�t���[���X�g�[���[</p>';
	html += '				</a> </li>';
	html += '		</ul>';
	html += '	</div>';
	html += '</div>';
    document.write(html);}