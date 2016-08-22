var indexSearch = require('../tpls/search.string');

SPA.defineView('search', {
  html: indexSearch,
 //加载插件
   plugins: [{
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],

 //绑定视图事件
  bindEvents:{

  "show":function(){
        // pullToRefresh
			  var vm = this.getVM();
				 var a=0,b=20;
				 var str=[];

      // ajax拉取数据
      $.ajax({
        url: '/api/livelist.php',
        type: 'get',
        data: {

        },
        success: function (res) {
        	$(".cky_head").show(2000)



        	str=res.data.slice(a,b)



        	vm.livelist = str;

//        var a1=parseInt(Math.ceil(res.data.length/6))
//
//       // for(var i=0;i<a1;i++){
          for(var x=a;x<b;x++){

          $("#sec_ul img").eq(x).attr("src",res.data[x].represent_img)
//
          }
        }
      });


  var myScroll = this.widgets.myScroll;
  var topSize = 35;

  var ele =$('.cky_head');


  myScroll.on('scroll', function () {

    var y = this.y,
    maxY = this.maxScrollY - y;

    if (y >= 0) {
      $('.head_s').show();
     $('.head_s img').addClass("imgactive")
      return '';
    }

  });

    myScroll.on('scrollEnd', function () {

    if (this.y >= 0) {
    setTimeout(function(){
    	$('.head_s span').text("暂没有更新")
    },700)

  setTimeout(function () {
  			$('.head_s').hide();
  			$('.head_s span').text("下拉刷新")
			 $('.head_s img').removeClass("imgactive")
    }, 1000);
    }

    var maxY = this.maxScrollY - this.y;
    var self = this;
  if (maxY >= 0) {
  	 	$('.foot_s img').addClass("imgactive")
    	if(b==200){

    		$(".foot_s span").text("亲~~已经到底了")
        $('.foot_s').show();
    		setTimeout(function(){
    			$('.foot_s').hide();
    			 myScroll.scrollTo(0, self.y + topSize);
    		},1000)
    		return
    	}

      // ajax上拉加载数据

     setTimeout(function(){
     $.ajax({
        url: '/api/livelist.php',
        type: 'get',
        data: {

        },
        success: function (res) {

        	a=b;b+=20


          for(var y=a;y<b;y++){
        	str.push(res.data.slice(y,y+1))
        	}

        		vm.livelist = str;
        	for(var x=0;x<b;x++){
          $("#sec_ul p").eq(x).text(res.data[x].shopname)
          $("#sec_ul img").eq(x).attr("src",res.data[x].represent_img)
	        }
           myScroll.refresh();
           myScroll.scrollTo(0, self.y + topSize);

          }
      });

     	},800)
    }
  });




    }

    }

  })
