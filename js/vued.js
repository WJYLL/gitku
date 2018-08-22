
var vm=new Vue({
    el: '#app',
    components: {
        'yemei':{
            template:"#yemei",
            data:function(){
                return {
                    data:[{
                        "title":'标题',
                        "yemei_show":'显示',
                        "fontSize":'14',
                        "fontWeight":false,
                        "fontFamily":'黑体',
                        "textalign":'left',
                        "backgroundcolor":'#000000',
                        "imgalign":'left',
                        "duoimg":['./images/1.jpg','./images/1.png','./images/bg.jpg']
                    }],
                    "yemei_hide":true,
                }
            },
            methods:{
                yemei_edit:function(){
                    this.$parent.yemei_edit1()
                },
                change:function(k){
                    if(k == '显示'){
                        this.yemei_hide = true
                    }else if(k == '隐藏'){
                        this.yemei_hide = false
                    }
                },
                fontwt:function(){
                    this.data[0].fontWeight = !this.data[0].fontWeight
                },
                remove:function(){
                    $("#danimgshow img").attr("src","")

                }
            },
            mounted:function(){

            }

        },
        'ckeditor':{
            template:"#ckeditor",
            data:function(){
                return {
                    data:[{
                        "bigtitle":'123'
                    }]
                }
            },
            methods:{

            },
            mounted:function(){


            }

        },
        'danhangwenben':{
            template:"#danhangwenben",
            data:function(){
                var v = parseInt(vm.$refs)
                return {
                    data:this.$parent.items[v].array
                }
            },
            methods:{
                //显示左侧
                danhangwenben_edit:function(){
                    this.$parent.danhangwenben_edit1()
                },
                //显示微信录入
                wxjq_show:function(){
                    this.data[0].wxjq_show = !this.data[0].wxjq_show

                },
                //显示范围框
                fanwei_show:function(){
                    this.data[0].fanwei_show = true
                },
                //取消范围框
                cancel:function(){
                    this.data[0].fanwei_show = false
                },
                //保存范围数据
                save:function(){
                    var count = this.data[0].fanwei_neirong.split('\n').length
                    this.data[0].fanwei_btn = "(已设"+count+"个)<a>修改</a>"
                    this.data[0].fanwei_show = false
                },
                //运行校验
                danhangwenben_check:function(id){

                    //标题校验
                    if($(id).find(".danhangwenben_title").attr("title") == ''){
                        $(id).find("h6").show()
                        $(id).find("h6").html("标题不能为空")
                        $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                        return false
                    }
                    //必填校验
                    if($(id).find(".danhangwenben_hidden").attr("bitian") == "true"){
                        if( $(id).find(".danhangwenben_k_n").attr("val") == ''){
                            $(id).find("h6").show()
                            $(id).find("h6").html("必填项，内容不能为空")
                            $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }
                    }
                    //身份证号验证
                    var idCard = $(id).find(".danhangwenben_k_n").attr("val")
                    if($(id).find(".danhangwenben_hidden").attr("cardid") == "true") {
                        var reg_idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
                        if (!reg_idCard.test(idCard)) {
                            $(id).find("h6").show()
                            $(id).find("h6").html("必须填入正确的身份证号")
                            $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }
                    }
                    //最少多少个字
                    if($(id).find(".danhangwenben_hidden").attr("min") == "true"){
                        if( $(id).find(".danhangwenben_k_n").attr("val").length < $(id).find(".danhangwenben_hidden").attr("minval")){
                            $(id).find("h6").show()
                            $(id).find("h6").html("输入字符不能小于"+$(id).find(".danhangwenben_hidden").attr("minval"))
                            $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }
                    }
                    //最多多少个字
                    if($(id).find(".danhangwenben_hidden").attr("max") == "true"){
                        if( $(id).find(".danhangwenben_k_n").attr("val").length > $(id).find(".danhangwenben_hidden").attr("maxval")){
                            $(id).find("h6").show()
                            $(id).find("h6").html("输入字符不能大于"+$(id).find(".danhangwenben_hidden").attr("maxval"))
                            $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }
                    }
                    //填写范围
                    if($(id).find(".fanwei1").attr("fanwei") == "true"){
                        var fanwei_array = $(id).find(".fanwei_neirong").attr("fanwei_neirong").split('\n')
                        if(fanwei_array.indexOf($(id).find(".danhangwenben_k_n").attr("val")) == -1){
                            //自定义出错方案
                            if($(id).find(".danhangwenben_hidden").attr("err") == "true"){
                                $(id).find("h6").show()
                                $(id).find("h6").html($(id).find(".danhangwenben_hidden").attr("errval"))
                                $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("不在设定的允许范围内")
                                $(id).find(".danhangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }
                        }
                        $(id).find("h6").hide()
                        $(id).find("h6").html('')
                        $(id).find(".danhangwenben_k_n").css("border","1px solid #ccc")

                    }
                    //成功之后
                    $(id).find("h6").hide()
                    $(id).find("h6").html('')
                    $(id).find(".danhangwenben_k_n").css("border","1px solid #ccc")
                    //alert("验证通过")
                    /*$.ajax({
                        type: "post",
                        url: "./Command.asmx/DanHangWenBen",
                        data:{
                            "cmd": "Chongfu",
                            "repeat": $(id).find(".danhangwenben_k_n").attr("val"),
                            "userid":userid,
                            "biaoid":biaoid,
                            "zujianid":id
                        },
                        success: function (data) {
                            if(data.cmd = 'OK'){
                                alert(data.message)
                            }else if(data.cmd = 'NO'){
                                alert(data.message)
                            }
                        },
                        error: function () {
                            alert("保存失败，请检查网络连接");
                        }
                    });*/
                },
                //获取json
                danhangwenben_getjson:function(id){
                    var dhwb = id
                    var getjson = {
                        'plugid':dhwb,
                        'title':$(dhwb).find(".danhangwenben_title").attr("title"),
                        'input':$(dhwb).find(".danhangwenben_input").attr("input"),
                        'tishi':$(dhwb).find(".danhangwenben_tishi").attr("tishi"),
                        'bitian':$(dhwb).find(".danhangwenben_hidden").attr("bitian")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("bitian"),
                        'repeat':$(dhwb).find(".danhangwenben_hidden").attr("repeat")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("repeat"),
                        'cardid':$(dhwb).find(".danhangwenben_hidden").attr("cardid")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("cardid"),
                        'fanwei':$(dhwb).find(".danhangwenben_hidden").attr("fanwei")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("fanwei"),
                        'min':$(dhwb).find(".danhangwenben_hidden").attr("min")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("min"),
                        'minval':$(dhwb).find(".danhangwenben_hidden").attr("minval"),
                        'max':$(dhwb).find(".danhangwenbenhidden").attr("max")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("max"),
                        'maxval':$(dhwb).find(".danhangwenben_hidden").attr("maxval"),
                        'err':$(dhwb).find(".danhangwenben_hidden").attr("err")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("err"),
                        'errval':$(dhwb).find(".danhangwenben_hidden").attr("errval"),
                        'texthide':$(dhwb).find(".danhangwenben_hidden").attr("texthide")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("texthide"),
                        'auto':$(dhwb).find(".danhangwenben_hidden").attr("auto")==undefined ? false:$(dhwb).find(".danhangwenben_hidden").attr("auto"),
                        'weixin':$(dhwb).find(".danhangwenben_weixin").attr("weixin")==undefined ? false:$(dhwb).find(".danhangwenben_weixin").attr("weixin"),
                        'weixinjiequ':$(dhwb).find(".danhangwenben_jiequ").attr("weixinjiequ")==undefined ? false:$(dhwb).find(".danhangwenben_jiequ").attr("weixinjiequ"),
                        'first':$(dhwb).find(".danhangwenben_first").attr("first")==undefined ? false:$(dhwb).find(".danhangwenben_first").attr("first"),
                        'last':$(dhwb).find(".danhangwenben_last").attr("last")==undefined ? false:$(dhwb).find(".danhangwenben_last").attr("last"),
                        'fanwei':$(dhwb).find(".fanwei1").attr("fanwei")==undefined ? false:$(dhwb).find(".fanwei1").attr("fanwei"),
                        'fanwei_neirong':$(dhwb).find(".fanwei_neirong").attr("fanwei_neirong")
                    }
                    console.log(getjson)
                },
                //删除
                del:function(){
                    var delid = '#'+this.$attrs.id
                    var index = parseInt(this.$attrs.delid)
                    this.$parent.items.splice(index,1,'')
                },
                //复制
                copy:function(){
                    var e = this.$attrs.delid+1
                    vm.$refs = e
                    var current=[{
                        "title":this.data[0].title,
                        "input":this.data[0].input,
                        "tishi":this.data[0].tishi,
                        "bitian":this.data[0].bitian,
                        "repeat":this.data[0].repeat,
                        "cardid":this.data[0].cardid,
                        "fanwei":this.data[0].fanwei,
                        "min":this.data[0].min,
                        "minval":this.data[0].minval,
                        "max":this.data[0].max,
                        "maxval":this.data[0].maxval,
                        "err":this.data[0].err,
                        "errval":this.data[0].errval,
                        "texthide":this.data[0].texthide,
                        "auto":this.data[0].auto,
                        "weixin":this.data[0].weixin,
                        "wxjq_show":this.data[0].wxjq_show,
                        "weixinjiequ":this.data[0].weixinjiequ,
                        "first":this.data[0].first,
                        "last":this.data[0].last,
                        "fanwei_show":this.data[0].fanwei_show,
                        "fanwei_neirong":this.data[0].fanwei_neirong,
                        "fanwei_btn":this.data[0].fanwei_btn,}]
                    this.$parent.addcopy("danhangwenben",current,e)
                },
            },
        },
        'duohangwenben':{
            template:"#duohangwenben",
            data:function(){
                var v = parseInt(vm.$refs)
                return {
                    data:this.$parent.items[v].array
                }
            },
            methods:{
                //显示左侧
                duohangwenben_edit:function(){
                    this.$parent.duohangwenben_edit1()
                },
                //运行校验
                duohangwenben_check:function(id){
                    //标题校验
                    if($(id).find(".duohangwenben_title").attr("title") == ''){
                        if($(id).find(".duohangwenben_hidden").attr("err") == "true"){
                            $(id).find("h6").show()
                            $(id).find("h6").html($(id).find(".duohangwenben_hidden").attr("errval"))
                            $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }else{
                            $(id).find("h6").show()
                            $(id).find("h6").html("标题不能为空")
                            $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                            return false
                        }

                    }
                    //必填校验
                    if($(id).find(".duohangwenben_hidden").attr("bitian") == "true"){
                        if( $(id).find(".duohangwenben_k_n").attr("val") == ''){
                            if($(id).find(".duohangwenben_hidden").attr("err") == "true"){
                                $(id).find("h6").show()
                                $(id).find("h6").html($(id).find(".duohangwenben_hidden").attr("errval"))
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("必填项，内容不能为空")
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }

                        }
                    }
                    //最少多少个字
                    if($(id).find(".duohangwenben_hidden").attr("min") == "true"){
                        if( $(id).find(".duohangwenben_k_n").attr("val").length < $(id).find(".duohangwenben_hidden").attr("minval")){
                            if($(id).find(".duohangwenben_hidden").attr("err") == "true"){
                                $(id).find("h6").show()
                                $(id).find("h6").html($(id).find(".duohangwenben_hidden").attr("errval"))
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("输入字符不能小于"+$(id).find(".duohangwenben_hidden").attr("minval"))
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }
                        }
                    }
                    //最多多少个字
                    if($(id).find(".duohangwenben_hidden").attr("max") == "true"){
                        if( $(id).find(".duohangwenben_k_n").attr("val").length > $(id).find(".duohangwenben_hidden").attr("maxval")){
                            if($(id).find(".duohangwenben_hidden").attr("err") == "true"){
                                $(id).find("h6").show()
                                $(id).find("h6").html($(id).find(".duohangwenben_hidden").attr("errval"))
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("输入字符不能大于"+$(id).find(".duohangwenben_hidden").attr("maxval"))
                                $(id).find(".duohangwenben_k_n").css("border","1px solid #f00")
                                return false
                            }

                        }
                    }
                    //成功之后
                    $(id).find("h6").hide()
                    $(id).find("h6").html('')
                    $(id).find(".duohangwenben_k_n").css("border","1px solid #ccc")
                    //alert("验证通过")
                },
                //获取json
                duohangwenben_getjson:function(id){
                    var dhwb = id
                    var getjson = {
                        'plugid':dhwb,
                        'title':$(dhwb).find(".duohangwenben_title").attr("title"),
                        'input':$(dhwb).find(".duohangwenben_input").attr("input"),
                        'tishi':$(dhwb).find(".duohangwenben_tishi").attr("tishi"),
                        'bitian':$(dhwb).find(".duohangwenben_hidden").attr("bitian")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("bitian"),
                        'repeat':$(dhwb).find(".duohangwenben_hidden").attr("repeat")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("repeat"),
                        'cardid':$(dhwb).find(".duohangwenben_hidden").attr("cardid")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("cardid"),
                        'fanwei':$(dhwb).find(".duohangwenben_hidden").attr("fanwei")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("fanwei"),
                        'min':$(dhwb).find(".duohangwenben_hidden").attr("min")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("min"),
                        'minval':$(dhwb).find(".duohangwenben_hidden").attr("minval"),
                        'max':$(dhwb).find(".duohangwenben_hidden").attr("max")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("max"),
                        'maxval':$(dhwb).find(".duohangwenben_hidden").attr("maxval"),
                        'err':$(dhwb).find(".duohangwenben_hidden").attr("err")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("err"),
                        'errval':$(dhwb).find(".duohangwenben_hidden").attr("errval"),
                        'texthide':$(dhwb).find(".duohangwenben_hidden").attr("texthide")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("texthide"),
                        'auto':$(dhwb).find(".duohangwenben_hidden").attr("auto")==undefined ? false:$(dhwb).find(".duohangwenben_hidden").attr("auto"),
                        'weixin':$(dhwb).find(".duohangwenben_weixin").attr("weixin")==undefined ? false:$(dhwb).find(".duohangwenben_weixin").attr("weixin"),
                        'weixinjiequ':$(dhwb).find(".duohangwenben_jiequ").attr("weixinjiequ")==undefined ? false:$(dhwb).find(".duohangwenben_jiequ").attr("weixinjiequ"),
                        'first':$(dhwb).find(".duohangwenben_first").attr("first")==undefined ? false:$(dhwb).find(".duohangwenben_first").attr("first"),
                        'last':$(dhwb).find(".duohangwenben_last").attr("last")==undefined ? false:$(dhwb).find(".duohangwenben_last").attr("last"),
                        'fanwei':$(dhwb).find(".fanwei1").attr("fanwei")==undefined ? false:$(dhwb).find(".fanwei1").attr("fanwei"),
                        'fanwei_neirong':$(dhwb).find(".fanwei_neirong").attr("fanwei_neirong")
                    }
                    console.log(getjson)
                },
                //删除
                del:function(){
                    var delid = '#'+this.$attrs.id
                    var index = parseInt(this.$attrs.delid)
                    this.$parent.items.splice(index,1,'')
                },
                //复制
                copy:function(){
                    var e = this.$attrs.delid+1
                    vm.$refs = e
                    var current=[{
                        "title":this.data[0].title,
                        "input":this.data[0].input,
                        "tishi":this.data[0].tishi,
                        "bitian":this.data[0].bitian,
                        "min":this.data[0].min,
                        "minval":this.data[0].minval,
                        "max":this.data[0].max,
                        "maxval":this.data[0].maxval,
                        "err":this.data[0].err,
                        "errval":this.data[0].errval,
                        "texthide":this.data[0].texthide,
                        "auto":this.data[0].auto,}]

                    this.$parent.addcopy("duohangwenben",current,e)
                },
            },
        },
        //单项选择
        'danxiangxuanze':{
            template:"#danxiangxuanze",
            data:function(){
                var v = parseInt(vm.$refs)
                return {
                    data:this.$parent.items[v].array
                }
            },
            methods:{
                danxiangxuanze_check:function(id){
                    //标题验证
                    if($(id).find(".danhangwenben_title").attr("title") == ''){
                        $(id).find("h6").show()
                        $(id).find("h6").html("标题不能为空")
                        //自定义出错验证
                        if($(id).find('.zdyxuan').attr('err') == 'true'){
                            $(id).find("h6").html($('.zdytian').val())
                            return false
                        }
                        return false

                    }
                    //必填项验证
                    if($(id).find('.bitian').attr('bitian') == "true"){
                        // console.log($(id).find('.xuan').length)
                        var arry = [],
                            Length = $(id).find('.xuan').length;

                        for(var i=0;i<Length;i++){
                            arry.push($(id).find(".xuan").eq(i).prop("checked"))
                        }

                        if($.inArray(true, arry)){
                            $(id).find("h6").show()
                            $(id).find("h6").html("必填项必须有选中")
                            if($(id).find('.zdyxuan').attr('err') == 'true'){
                                $(id).find("h6").html($('.zdytian').val())
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("必填项必须有选中")
                            }
                            return false
                        }else{
                            $(id).find("h6").hide()
                        }
                        return false
                    }else{
                        $(id).find("h6").hide()
                    }
                    $(id).find("h6").hide()
                    $(id).find("h6").html('')
                    $(id).find(".danxiangxuanze_k_n").css("border","1px solid #ccc")

                },
                //点击切换
                danxiangxuanze_edit:function(){
                    this.$parent.danxiangxuanze_edit1()
                },
                //删除
                del:function(){
                    var delid = '#'+this.$attrs.id
                    var index = parseInt(this.$attrs.delid)
                    this.$parent.items.splice(index,1,'')
                },
                //复制
                copy:function(){
                    var e = this.$attrs.delid+1
                    var mas=[];

                    vm.$refs = e
                    var arrLength = this.data[0].msg.length;
                    for(var i=0;i<arrLength;i++){
                        mas.push(this.data[0].msg[i])
                    }

                    var current=[{
                        "msg":mas,
                        "title":this.data[0].title,
                        "bitian":this.data[0].bitian,
                        "err":this.data[0].err,
                        "texthide":this.data[0].texthide,
                        "auto":this.data[0].auto,
                        "mode1":this.data[0].mode1,
                        "mode2":this.data[0].mode2,
                        "checked":this.data[0].checked,
                        "tips":this.data[0].tips,
                        "dis":this.data[0].dis,
                    }]
                    this.$parent.addcopy("danxiangxuanze",current,e)
                },

                //纵向排列
                portrait:function(){
                    this.data[0].mode2 = false
                    this.data[0].mode1 = true
                },

                //横向排列
                transverse:function(){
                    this.data[0].mode1 = false
                    this.data[0].mode2 = true
                },
                //增加选项
                add:function(a){
                    var arr=this.data[0].msg;
                    var jia = a+1;
                    arr.splice(jia,0,"选项")
                    if(a<this.data[0].checked){
                        this.data[0].checked = this.data[0].checked+1
                    }
                    if(arr.length!=1){
                        this.data[0].dis = false;
                    }
                },
                //删除选项
                dele:function(a){
                    var arr=this.data[0].msg;
                    arr.splice(a,1);

                    if(a<this.data[0].checked){
                        this.data[0].checked = this.data[0].checked-1
                    }else if(a=this.data[0].checked){
                        this.data[0].checked = -1
                    }
                    if(arr.length==1){
                        this.data[0].dis = true;
                    }
                },
            },
        },
        //多项选择
        'duoxiangxuanze':{
            template:"#duoxiangxuanze",
            data:function(){
                var v = parseInt(vm.$refs)
                return {
                    data:this.$parent.items[v].array
                }
            },
            methods:{

                //点击切换
                duoxiangxuanze_edit:function(){
                    this.$parent.duoxiangxuanze_edit1()
                },
                //删除
                del:function(){
                    var delid = '#'+this.$attrs.id
                    var index = parseInt(this.$attrs.delid)
                    this.$parent.items.splice(index,1,'')
                },
                //复制
                copy:function(){
                    var e = this.$attrs.delid+1
                    var mas=[];
                    var checked=[];
                    vm.$refs = e
                    var arrLength = this.data[0].msg.length;
                    var arryLength = this.data[0].checked.length;
                    for(var i=0;i<arryLength;i++){
                        checked.push(this.data[0].checked[i])
                    }
                    for(var i=0;i<arrLength;i++){
                        mas.push(this.data[0].msg[i])
                    }
                    var current=[{
                        "msg":mas,
                        "title":this.data[0].title,
                        "bitian":this.data[0].bitian,
                        "err":this.data[0].err,
                        "texthide":this.data[0].texthide,
                        "auto":this.data[0].auto,
                        "mode1":this.data[0].mode1,
                        "mode2":this.data[0].mode2,
                        "checked":checked,
                        "tips":this.data[0].tips,
                        "dis":this.data[0].dis,
                        "errval":this.data[0].errval,
                    }]

                    this.$parent.addcopy("duoxiangxuanze",current,e);
                    var Id="#" + this.$el.id;
                },
                //纵向排列
                portrait2:function(){
                    this.data[0].mode2 = false
                    this.data[0].mode1 = true
                },

                //横向排列
                transverse2:function(){
                    this.data[0].mode1 = false
                    this.data[0].mode2 = true
                },
                //增加选项
                add2:function(a){
                    var arr=this.data[0].msg;
                    var arry=this.data[0].checked;
                    var jia = a+1;
                    arr.splice(jia,0,"选项")
                    arry.splice(jia,0,false)
                    console.log(arry)
                    if(arr.length!=1){
                        this.data[0].dis = false;
                    }
                },
                //删除选项
                dele2:function(a){
                    var arr=this.data[0].msg;
                    var xiabiao = a + 1;
                    var arry=this.data[0].checked;
                    arr.splice(a,1);
                    arry.splice(a,1);
                    console.log(arry)
                    if(arr.length==1){
                        this.data[0].dis = true;
                    }
                },
                //选择
                xz:function(){
                    var arry=this.data[0].checked;
                    var Id="#" + this.$el.id;
                    var Length = $(Id).find(".xuan").length;
                    arry.splice(0,arry.length);
                    for(i=0;i<Length;i++){
                        arry.push($(Id).find(".xuan").eq(i).prop("checked"))
                    }
                    console.log(this.data[0].checked)
                },
                duoxiangxuanze_check:function(id){
                    //标题验证

                    if($(id).find(".duohangwenben_title").attr("title") == ''){
                        $(id).find("h6").show()
                        $(id).find("h6").html("标题不能为空")
                        //自定义出错验证
                        if($(id).find('.zdyxuan').attr('err') == 'true'){
                            $(id).find("h6").html($('.zdytian').val())
                            return false
                        }
                        return false
                    }else{
                        $(id).find("h6").hide()
                    }
                    //必填项验证
                    if($(id).find('.bitian').attr('bitian') == "true"){
                        // console.log($(id).find('.xuan').length)
                        var arry = [],
                            Length = $(id).find('.xuan').length;

                        for(var i=0;i<Length;i++){
                            arry.push($(id).find(".xuan").eq(i).prop("checked"))
                        }

                        if($.inArray(true, arry)){
                            $(id).find("h6").show()
                            $(id).find("h6").html("必填项必须有选中")
                            if($(id).find('.zdyxuan').attr('err') == 'true'){
                                $(id).find("h6").html($('.zdytian').val())
                                return false
                            }else{
                                $(id).find("h6").show()
                                $(id).find("h6").html("必填项必须有选中")
                            }
                            return false
                        }else{
                            $(id).find("h6").hide()
                        }
                        return false
                    }else{
                        $(id).find("h6").hide()
                    }
                    $(id).find("h6").hide()
                    $(id).find("h6").html('')
                    $(id).find(".duoxiangxuanze_k_n").css("border","1px solid #ccc")

                },
            }
        }
    },
    data:function(){
        return {
            items: [],
            userid:'user123',
            biaoid:'biao123',
        }
    },
    methods: {
        add:function(component) {
            var i = this.items.length;
            if(component == 'danhangwenben'){
                //单行文本数据
                var json = [{
                    "editshow":false,
                    "title":'单行文本未命名',
                    "input":"",
                    "tishi":"",
                    "bitian":false,
                    "repeat":false,
                    "cardid":false,
                    "fanwei":false,
                    "min":false,
                    "minval":'',
                    "max":false,
                    "maxval":'',
                    "err":false,
                    "errval":'',
                    "texthide":false,
                    "auto":false,
                    "weixin":false,
                    "wxjq_show":false,
                    "weixinjiequ":false,
                    "first":'',
                    "last":'',
                    "fanwei":false,
                    "fanwei_show":false,
                    "fanwei_neirong":'',
                    "fanwei_btn":"设定允许范围",

                }];
            }else if(component == 'duohangwenben'){
                //多行文本数据
                var json = [{
                    "editshow":false,
                    "title":'多行文本未命名',
                    "input":"",
                    "tishi":"",
                    "bitian":false,
                    "min":false,
                    "minval":'',
                    "max":false,
                    "maxval":'',
                    "err":false,
                    "errval":'',
                    "texthide":false,
                    "auto":false,
                }];
            }else if(component == 'danxiangxuanze'){
                //单项选择数据
                var json = [{
                    'msg':['选项','选项','选项'],
                    "title":'未命名',
                    "bitian":false,
                    "err":false,
                    "texthide":false,
                    "auto":false,
                    "mode1":true,
                    "mode2":false,
                    "tips":"",
                    "dis":false,
                    "checked":[false,false,false],
                    "errval": "",
                    "ui":"ui"+i+Date.parse(new Date())+Math.random(),
                    "ui1":"ui1"+i+Date.parse(new Date())+Math.random(),

                }];
            }else if(component == 'duoxiangxuanze'){
                //多项选则数据
                var json = [{
                    'msg':['选项','选项','选项'],
                    "title":'未命名',
                    "bitian":false,
                    "err":false,
                    "texthide":false,
                    "auto":false,
                    "mode1":true,
                    "mode2":false,
                    "checked":[false,false,false],
                    "tips":"",
                    "dis":false,
                    "errval": "",
                }];
            }
            this.addcopy(component,json,i);

        },
        addcopy:function(component,current,e) {
            var i = this.items.length
            vm.$refs = e
            this.items.splice(e,0,{
                    'component': component,
                    'i':i,
                    'id':component+'00'+(i+1),
                    'array':current,
                })
        },
        yemei_edit1:function(){
            $(".M").children().click(function(){
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
            })
        },
        danhangwenben_edit1:function(){
            $(".M").children().click(function(){
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
            })
        },
        duohangwenben_edit1:function(){
            $(".M").children().click(function(){
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
            })
        },
        danxiangxuanze_edit1:function(){
            $(".M").children().click(function(){
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".C").removeClass("zIndex")
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
            })
        },
        duoxiangxuanze_edit1:function(){
            $(".M").children().click(function(){
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".C").removeClass("zIndex")
                $(this).find(".R").addClass("zIndex").parent().parent().siblings().find(".R").removeClass("zIndex")
            })
        },
    },
})
