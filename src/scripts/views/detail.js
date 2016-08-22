var detailTpl=require("../tpls/detail.string");

SPA.defineView("detail",{
  html:detailTpl,
  bindEvents:{
    "show":function(){


      var mySwiper = new Swiper('.swiper-container', {
        loop:true,
        pagination : '.swiper-pagination',
        autoplay:30000
      })
    }
  }
})
