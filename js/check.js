//校验类
/*function checkprocess(classid,plugid){
    switch (classid){
        case 'isDanhangwenben':
            checkdanhangwenben(plugid)
            break;
        case 'isDuohangwenben':
            checkduohangwenben(plugid)
            break;
    }
}*/
/*对齐切换*/
$(function(){
    $('.duiqi').click(function(){
        $(this).addClass("ative").siblings().removeClass("ative")
    })
})
/*出现页眉*/

$(function(){
    $('.ckeditorer').click(function(){
        $(".yemei .R").addClass("zIndex").parent().parent().siblings().find(".C").removeClass("zIndex")
        $(".yemei .R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
    })
})
/*单张图片上传*/
$(function() {
    $('.a').change(function(e) {
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function() {
                $('.img').attr('src', this.src);
                console.log(this.width)
            };
            img.src = _URL.createObjectURL(file);
        }
    })
})
/*类型切换*/
$(function(){
    $(".yemei_table tbody").eq(0).show()
    $(".yemei_edit").children().hide()
    $(".yemei_edit").children().eq(0).show()
    $('.leixing p').click(function(){
        $(this).addClass("on").siblings().removeClass("on")
        var o = $(this).index()
        $(".yemei_table tbody").hide()
        $(".yemei_table tbody").eq(o).show()
        $(".yemei_edit").children().hide()
        $(".yemei_edit").children().eq(o).show()

    })

})
//提交按钮
$(function(){
    $(".submit").click(function(){
         //checkprocess('isDhwb',"#danhangwenben002")
         vm.$options.components.danhangwenben.methods.danhangwenben_check('#danhangwenben001')
         vm.$options.components.duohangwenben.methods.duohangwenben_check('#duohangwenben002')
         vm.$options.components.danxiangxuanze.methods.danxiangxuanze_check('#danxiangxuanze003')
         vm.$options.components.duoxiangxuanze.methods.duoxiangxuanze_check('#duoxiangxuanze004')
        //console.log(vm)
    });
})
