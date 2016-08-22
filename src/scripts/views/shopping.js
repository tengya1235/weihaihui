	var indexshopping= require('../tpls/shoppingcar.string');
	var k=0;
	var shop_dt;
	SPA.defineView('shoppingcar', {
		html:indexshopping,
		plugins: ['delegated'],
	
		
		//bindEvents:{
			//"show":function(){					
				bindActions: {
					
				    'switch': function () {				    					    	
				    	k++				   				      
				       if(k%2==1){
				        shop_dt=$(".shopping_dt").html()	
				       $(".shopping_dt").html("清除失效")
				       $(".shopping_dt").css({
				       	background:"red",
				       	textAlign:"center",
				       	color:"#fff",
				       	fontSize:".16rem",
				       	padding:".16rem .1rem ",
				      
				       })
				       $(".shop_b").text("删除")
				       $(".shop_s").html("完成")
				       }else{
				       	$(".shop_b").text("结算")
				       	$(".shop_s").html("编辑")
				        $(".shopping_dt").html(shop_dt)
				        $(".shopping_dt").css({
					        background:"#fff",					       						       	
					       	color:"#000",
					       	fontSize:".16rem",
					       	padding:".08rem .08rem 0 0",
				        })
				       	 
				       }
				    }
			  }
							
			//}
	//	}
		
	})