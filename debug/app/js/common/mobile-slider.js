var sliderName = 'MobileSlider',thumSliderName = 'MobileThumbsSlider',$targetLists,$targetThumbLists;
var index;
$(function(){
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        $targetLists = $('#slider .slides .slick-track li').not('slick-cloned');
        $targetThumbLists = $('#carousel .slides li');
        add_trigger();
    }
});
function add_trigger()
{
    $targetLists.bind('click.slideTrigger',function(e){
        e.preventDefault();
        remove_trigger();
        make_mobile_slider($(this));
    });
}
function remove_trigger()
{
    $targetLists.unbind('click.slideTrigger');
}

function make_mobile_slider(t)
{
    index = t.data('slick-index');
    var $MobileSlider = copy_slide( sliderName, $targetLists );
    var $MobileThumbsSlider = copy_slide(thumSliderName,$targetThumbLists);
    var $MobileSliderContainer = $('<div>',{id:'MobileSliderContainer','style':'opacity:0'});
    $MobileSliderContainer.append($MobileSlider,$MobileThumbsSlider,'<p class="slider_num"><span id="ChildNum"></span> / <span id="ParentNum"></span></p><span class="close hairline" id="RemoveSlider">');
    $('body').append($MobileSliderContainer);
    $('#MobileThumbsSlider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 80,
        itemMargin: 4,
        startAt:index,
        asNavFor: '#MobileSlider',
        after: function(){

        }
    });
    $('#MobileSlider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        directionNav: false,
        slideshow: false,
        startAt:index,
        sync: "#MobileThumbsSlider",
        start: function(slider){
            $('#ParentNum').text( slider.count );
            $('#ChildNum').text( slider.currentSlide + 1 );
        },
        after: function(slider){
            $('#ChildNum').text(slider.currentSlide+1);
            index = slider.currentSlide;
            $('.pan').panzoom("reset",true);
        }
    });
    $('#RemoveSlider').bind('click.slideRemove',function(e){
        e.preventDefault();
        $('#RemoveSlider').unbind('click.slideRemove')
        remove_mobile_slider();
    });

    $MobileSliderContainer.animate({'opacity':1},300);
    setZoom();
}

function setZoom()
{
    var tmpPan = 0;
    var tmpCount = 0;

    $('.pan').panzoom({
        minScale: 1,
        panOnlyWhenZoomed: true,
        contain: 'automatic',
        onPan: function(e,panzoom,x,y){
            if( x === tmpPan ){
                tmpCount++;
            }else{
                tmpCount = 0;
            }
            tmpPan = x;
            if( tmpCount > 20 )
            {
              if( x < 0 )
              {
                  var next = index + 1;
                  if( next >= $targetThumbLists.length )
                  {
                      tmpCount = 0;
                      return;
                  }
                  $('#MobileSlider').flexslider(index + 1);
              }
              else
              {
                  var prev = index - 1;
                  if( prev < 0 )
                  {
                      tmpCount = 0;
                      return;
                  }
                  $('#MobileSlider').flexslider(index - 1);
              }
              tmpCount = 0;
            }
        }
    });

}

function remove_mobile_slider()
{
    $('.pan').panzoom("destroy");
    $("#MobileSliderContainer").remove();
    add_trigger();
}

function copy_slide(wrapperId,targetList)
{
    var $Wrapper = $('<div>',{class:'flexslider',id:wrapperId});
    var $slideUl = $('<ul>',{class:'slides'});
    targetList.each(function(index){
        if( $(this).hasClass('slick-cloned')) return true;
        var img = $(this).find('img:first-child').clone();
        img.addClass('pan');
        var li = $('<li>',{
            css: {position: "relative"}
        });
        var span = $('<span>',{
            //class: 'pan'//,
            //css: {display:"block",position: "absolute",width:"50%",height:"50%"}
        });
        li.append(span);
        span.append(img);
        $slideUl.append(li);
    });
    $Wrapper.append($slideUl);
    return $Wrapper;
}