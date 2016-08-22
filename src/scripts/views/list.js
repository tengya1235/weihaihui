var indexList = require('../tpls/list.string');
var onOff=true;

SPA.defineView('list', {
  html: indexList,
  plugins: [
    "delegated",
    {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],
  bindEvents: {
    'show': function () {
      var vm = this.getVM();
      var myScroll=this.widgets.myScroll;
      myScroll.on('scroll', function () {
        myScroll.refresh();
      })
      $.ajax({
        url: '/api/CategoryList.php',
        type: 'get',
        data: {},
        success: function (res) {
          vm.livelist = res.data;
          var imgInit= $(".content .banner").eq(1).find("div").find("img").eq(1)
          imgInit.attr("src","/weihaihui/imgList/type_arrow_normal.png")
        }
      })
    }
  },
  bindActions: {
    'upDown': function (el, data) {
      var $img=$(el.el).find("img").eq(1);
      var $dl=$(el.el).parent().find("dl");
      $dl.toggle()
      var $changeImg=$dl.parent().find("div").find("img").eq(1)
      var $changeDl=$dl.parent().siblings().find("dl")
      $changeDl.hide()
      $changeDl.parent().find("div").find("img").eq(1).attr("src","/weihaihui/imgList/type_arrow_normal.png")
      if($dl.css("display")=="none"){
        $img.attr("src","/weihaihui/imgList/type_arrow_normal.png")
      }else{
        $img.attr("src","/weihaihui/imgList/type_arrow_select.png")
      }
    }
  }

});
