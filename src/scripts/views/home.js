var indexHome = require('../tpls/home.string');

SPA.defineView('home', {
  html: indexHome,

  plugins: [
  "delegated",
  {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
      vm.adlist=[];
      vm.brandlist=[];
      vm.actlist=[];
      vm.hotlist=[];
    }
  }],

  // 绑定视图事件
  bindEvents: {
    'show': function () {
      var vm = this.getVM();
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,

        // 如果需要分页器
        pagination: '.swiper-pagination',
        autoplay:5000

      })
      $.ajax({
        url: '/api/index.php',
        type: 'get',
        data: {
          type:"more",
          pageNo:1
        },
        success: function (res) {
          vm.livelist = res.data1.categoryList;
          vm.adlist=res.data1.specList;
          vm.brandlist=res.data1.brandData.brandList;
          vm.actlist=res.data1.actData.actList;
          vm.hotlist=res.data2

        }
      });
      var myScroll=this.widgets.myScroll;

      var topSize=35;
      var head=$(".head img"),
          topImgHasClass=head.hasClass("up");
      var foot=$(".foot img"),
          bottomImgHasClass=head.hasClass("down");
      myScroll.on("scroll",function(){
        var y=this.y,
            maxY=this.maxScrollY-y;
        if(y>=0){
          $(".head").show();
          !topImgHasClass&&head.addClass("up");
          return "";
        }
        if(maxY >=0){
          $(".foot").show();
          !bottomImgHasClass && foot.addClass("down");
          return "";
        }
      });
      myScroll.on("scrollEnd",function(){
        if(this.y>=-topSize && this.y<0){
          myScroll.scrollTo(0,-topSize);
          head.removeClass("up");
        } else if (this.y >=0){
          head.attr("src","/weihaihui/img2/ajax-loader.gif");
          //TODO ajax 下拉刷新数据
            $.ajax({
              url: '/api/index.php',
              type: 'get',
              data: {
                type:"more",
                pageNo:2
              },
              success: function (res) {
                 vm.hotlist.pushArray(res.data);

              }
            });
            myScroll.scrollTo(0,-topSize);
            head.removeClass("up");
            head.attr("src","img2/arrow.png");

        }
        var maxY=this.maxScrollY-this.y;
        var self=this;
        if(maxY>-topSize&&maxY<0){
          myScroll.scrollTo(0,self.maxScrollY+topSize);
          foot.removeClass("down")
        }else if(maxY>=0){
          foot.attr("src","/weihaihui/img2/ajax-loader.gif");
          //ajax上拉加载数据
          $.ajax({
            url: '/api/index.php',
            type: 'get',
            data: {
              type:"more",
              pageNo:2
            },
            success: function (res) {
               vm.hotlist.pushArray(res.data);

            }
          });

            myScroll.refresh();
            myScroll.scrollTo(0,self.y+topSize);
            foot.attr("src","img2/arrow.png");

        }
      });
    }
  },
  // 绑定tap事件
  bindActions: {
    "goto.list": function () {
      SPA.open("list");
    },
    "goto.detail":function(el,data){
      SPA.open("search");
    }
  }
});
