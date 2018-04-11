$(function () {
  var _clih = document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
  var _cliw = document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
  window.onload = function(){
    setTimeout(function () {
      $('.Loading').stop().fadeOut();
    },300)
    function _ball(){
      if($('.FloorBoll').length == 0) return false;
      var _to = $('.FloorBoll').offset().top;
      if($(window).scrollTop()+_clih>=_to+100) $('.FloorBoll').addClass('active');
    }
    _ball();
    $(window).scroll(_ball);
    function _canv(){
      if($('#canvas').length == 0) return false;
      var c = document.getElementById("canvas"),
        ctx = c.getContext("2d");
      c.width = innerWidth;
      c.height = innerHeight;
      var lines = [],
        maxSpeed = 5,
        spacing = 5,
        xSpacing = 0,
        n = innerWidth / 40,
        colors = ["#dadada", "#d0d0d0", "#d3d3d3", "#d9d9d9"],
        i,
        wx,
        wy,
        vxx,
        vyy;
      for (i = 0; i < n; i++){
        xSpacing += spacing;
        wx = Math.round(Math.random()*c.width);
        wy = Math.round(Math.random()*c.height);
        if(wx >= c.width/2){
          vxx = 2
        }
        if(wx < c.width/2){
          vxx = -2
        }
        if(wy < c.height/2){
          vyy = -2;
        }
        if(wy >= c.height/2){
          vyy = 2;
        }
        lines.push({
          x: wx,//x轴坐标;
//        x: c.width/2,//x轴左边
          y: wy,//y轴坐标
//        y: c.height/2,//y轴坐标
//          z: 0,
          width: 2,//宽度
          vx : vxx,
          vy : vyy,
          r: 0, //半径
          height: Math.round(Math.random()*(innerHeight/10)),//高度
          speed: Math.random()*maxSpeed + 1,//下降速度
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      function draw(){//绘制
        var i;
        ctx.clearRect(0,0,c.width,c.height);//挖空现有canvas
        for (i = 0; i < n; i++){
          ctx.fillStyle = lines[i].color;//填充现有颜色
          ctx.beginPath();//开始
          ctx.arc(lines[i].x, lines[i].y,lines[i].r, 0, Math.PI*2, true);//创建圆以及位置
          ctx.closePath();//闭合
          ctx.fill();//结束
          lines[i].x += lines[i].vx;//动画核心,增加y轴数值实现动画
          lines[i].y += lines[i].vy;//动画核心,增加y轴数值实现动画
          //lines[i].z += lines[i].z;//动画核心,增加y轴数值实现动画
          if(lines[i].r>=2){
            lines[i].r=2
          }
          else if(lines[i].r < 2){
            lines[i].r += (Math.abs(Math.random() * 6 - 3) + Math.abs(Math.random() * 6 - 3)) * 0.01;
          }
          //if (lines[i].y > c.height)lines[i].y = 0 - lines[i].height;//如果y轴坐标大于整个屏幕的高度 将这个坐标变到最上 还是隐藏状态 这也是核心
          if (lines[i].x < 0 || lines[i].x > c.width || lines[i].y < 0 || lines[i].y > c.height) {
            lines[i].x = c.width/2;
            lines[i].y = c.height/2;
            lines[i].r = 0;
            lines[i].vx = Math.random() * 6 - 3;
            lines[i].vy = Math.random() * 4 - 2;
            //lines[i].z = 0;
          }
        }
        requestAnimationFrame(draw);//不失帧动画 无限执行draw
      }
      draw();
    }
    _canv();
  }
  $('.FourImgLf li:nth-child(2n)').css('marginRight','0');
  $('.CaseItem li:nth-child(3n)').css('marginRight','0');

  var _lsw = $('.point').outerWidth()/2;
  var _lsh = $('.point').outerHeight()/2;
  $('.point').mousemove(function (e) {
    var _ew = Math.abs(e.offsetX) - _lsw;
    var _eh = Math.abs(e.offsetY) - _lsh;
    $('.PlayBanner').stop().animate({
      left:(-_ew/20)+'px',
      top:(-_eh/20)+'px'
    },100)
  })

  $('.HMItem ul').on('mouseenter','li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    var _ins = $(this).index();
    var _po = $(this).position();
    $('.header-item-line').css({'width':$(this).outerWidth(),'opacity':'1','left':_po.left});
    $('.subnav-box').stop().eq(_ins).show().siblings().hide();
    var _four = 40;
    var _hei = $('.subnav-box').eq(_ins).outerHeight();
    if(_hei == 0){_four = 0;}
    var _heicon = _hei+_four;
    $('.subnav-box').stop().animate({opacity:'0'},300)
    $('.subnav-box').eq(_ins).stop().animate({opacity:'1'},300)
    $('.HMContent').stop().animate({
      height:_heicon+'px'
    },300)
    $('.HCBG').stop().animate({
      height:_heicon+'px',
      paddingTop:'90px',
      opacity:'1'
    },300)
  })
  $('.HMContent,.HMLever').mouseleave(function () {
    $('.HMItem ul li').removeClass('active');
    $('.subnav-box').stop().animate({opacity:'0'},300)
    $('.header-item-line').css({'opacity':'0'});
    $('.HMContent').stop().animate({
      height:'0'
    },300)
    $('.HCBG').stop().animate({
      height:'0',
      paddingTop:'0',
      opacity:'0'
    },300)
  })

  $('.PlayAccordion ul').on('mouseover','li', function () {
    $(this).addClass('active').siblings().removeClass('active');
  })

  $('.CLItem ul').on('mouseover','li', function () {
    var _ins = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.CLMList').stop().eq(_ins).fadeIn().siblings().fadeOut();
  })

  $('.NLList ul').on('mouseover','li', function () {
    var _ins = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.NLMItem').stop().eq(_ins).fadeIn().siblings().fadeOut();
  })

  $('.FloorTab').on('mouseover','li', function () {
    var _ins = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.FloorImg').eq(_ins).addClass('active').siblings().removeClass('active');
    $('.FloorCount li').stop().eq(_ins).show().siblings().hide();
  })

  jQuery(".picScroll-left").slide({
    titCell:".hd ul",
    mainCell:".bd ul",
    easing:'linear',
    autoPage:true,
    effect:"leftLoop",
    autoPlay:true,
    delayTime:500,
    interTime:5000,
    trigger:"click"
  });
  $(".CaseItem li").bind("mouseenter mouseleave",function(e) {
    if($('.CaseItemCon').length == 0)return false;
    var w = $(this).width();
    var h = $(this).height();
    var x = (e.pageX -  $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1);
    var y = (e.pageY -  $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1);
    var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    var eventType = e.type;
    var dirName = new Array('上方0','右侧1','下方2','左侧3');
    if(e.type == 'mouseenter'){
        switch(direction){
          case 0:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'top':'-100%','left':'0','bottom':'inherit','right':'inherit'})
            $(this).find(".CaseMed").stop().animate({top:0},400)
            break;
          case 1:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'right':'-100%','top':'0','bottom':'inherit','left':'inherit'})
            $(this).find(".CaseMed").stop().animate({right:0},400)
            break;
          case 2:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'bottom':'-100%','left':'0','right':'inherit','top':'inherit'})
            $(this).find(".CaseMed").stop().animate({bottom:0},400)
            break;
          case 3:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'left':'-100%','top':'0','right':'inherit','bottom':'inherit'})
            $(this).find(".CaseMed").stop().animate({left:0},400)
            break;
        }
      }
      else{
        switch(direction){
          case 0:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'top':'0','left':'0','bottom':'inherit','right':'inherit'})
            $(this).find(".CaseMed").stop().animate({top:'-100'+'%'},400)
            break;
          case 1:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'right':'0','top':'0','bottom':'inherit','left':'inherit'})
            $(this).find(".CaseMed").stop().animate({right:'-100'+'%'},400)
            break;
          case 2:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'bottom':'0','left':'0','right':'inherit','top':'inherit'})
            $(this).find(".CaseMed").stop().animate({bottom:'-100'+'%'},400)
            break;
          case 3:
            $(this).find(".CaseMed").removeClass('jin-chu').css({'left':'0%','top':'0','right':'inherit','bottom':'inherit'})
            $(this).find(".CaseMed").stop().animate({left:'-100'+'%'},400)
            break;
        }
      }
    });
  function carousel(){
    //var timer=0;
    var cur=0;//当前显示的图片下标
    var number=$(".BannerList ul li").size()-1;//最大下标
    //下一个
    $(".BannerList ul li").eq(number).removeClass('active');
    $(".BannerList ul li").eq(0).addClass('active');
    function slideNext(){
      if(cur<number){
        $(".BannerList ul li").eq(cur).removeClass('active');
        $(".BannerList ul li").eq(cur+1).addClass('active');
        $(".indicator a").removeClass().eq(cur+1).addClass("cur");
        cur++;
      }else{
        $(".BannerList ul li").eq(number).removeClass('active');
        $(".BannerList ul li").eq(0).addClass('active');
        $(".indicator a").removeClass().eq(0).addClass("cur");
        cur=0;
      }
    }
    //上一个
    function slidePrev(){
      if(cur>0){
        $(".BannerList ul li").eq(cur).removeClass('active');
        $(".BannerList ul li").eq(cur-1).addClass('active');
        $(".indicator a").removeClass().eq(cur-1).addClass("cur");
        cur--;
      }else{
        $(".banner ul li").eq(cur).removeClass('active');
        $(".banner ul li").eq(number).addClass('active');
        $(".indicator a").removeClass().eq(number).addClass("cur");
        cur=number;
      }
    }
    //绑定定时器
    setInterval(slideNext,10000);
  }
  carousel();
})
$(function () {

  // 获取第一张图片的节点对象
  var firstImg = $('.ul li').first().clone();
// 添加到最后的位置 并设置 ul 的宽度
  $('.ul').append(firstImg).width($('.ul li').length * $('.ul li').width());

  var i = 0;
  var imgW = $('.ul li').width();
  var timer;

// 下一张
  $('#next').click(function() {
    moveImg(++i);
  });

// 上一张
  $('#prev').click(function() {
    moveImg(--i);
  });

// 移动到指定的图片
  function moveImg() {
    // alert(num);

    // 最后一张
    if (i == $('.ul li').length) {
      $('.ul').css({
        left: 0
      })
      i = 1;
    }

    // 是第一张的时候
    if (i == -1) {
      i = $('.ul li').length - 2;
      $('.ul').css({
        left: ($('.ul li').length - 1) * -720
      });
    }

    // 移动图片动画
    $('.ul').stop().animate({
      left: i * -imgW
    }, 600);
    // // 换一下每个图片的小标记
    if (i == ($('.ul li').length - 1)) {
      $('.ol li').eq(0).addClass('bg').siblings().removeClass('bg');
    } else {
      $('.ol li').eq(i).addClass('bg').siblings().removeClass('bg');
    }
  }


// 点击小图片，跳转到指定的图片
  $('.ol li').click(function() {
    i = $(this).index();
    moveImg();
  });
  function autoPlay() {
    timer = setInterval(function() {
      i++;
      moveImg();
    }, 6000);
  }
  autoPlay();

// 鼠标移入幻灯片清除定时器
  $('.PlayTo').mouseover(function() {
    $('.PlayTo button').show();
    clearInterval(timer)
  }).mouseout(function() {
    // 鼠标离开重新播放
    autoPlay();
    $('.PlayTo button').hide();
  })
})