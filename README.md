开发者：刘亮
开发时间：2018.7.28
说明：单行文本组件

#模板文件:
      一、单行文本模板：
      <template id="dhwb">
    <div @click="edit_dhwb()">
        <div class="dhwb1">
            <li>
                <h2>{{title}}<span v-if="bitian" :gg="bitian" style="color: #f03d0d">*</span></h2>
                <h4>{{tishi}}</span></h4>
                <input class="dhwb_k_n" type="text" name="" v-model="input" :val="input">
                <input class="dhwb_hidden" type="hidden" :bitian="bitian" :repeat="repeat" :cardid="cardid" :fanwei="fanwei" :min="min" :minval="minval" :max="max" :maxval="maxval" :err="err" :errval="errval" :widt="widt" :widtval="widtval" :widtone="widtone" :texthide="texthide" :auto="auto">
            </li>
        </div>
        <div class="R">
            <li v-if="editshow" class="dhwb_edit">
                <h3>标题</h3>
                <input class="dhwb_title" type="text" name="" v-model="title" :title="title">
                <h3>默认值</h3>
                <input class="dhwb_input" type="text" name="" v-model="input" :input="input">
                <h3>提示</h3>
                <input class="dhwb_tishi" type="text" name="" v-model="tishi" :tishi="tishi">
                <h3>校验</h3>
                <label><input type="checkbox" name="" v-model="bitian"><span>必须填</span></label>
                <label><input type="checkbox" name="" v-model="repeat"><span>不能和已有数据重复</span></label>
                <label><input type="checkbox" name="" v-model="cardid"><span>身份证号验证</span></label>
                <label><input type="checkbox" name="" v-model="fanwei"><span>限定填写范围设定允许范围</span></label>
                <label><input type="checkbox" name="" v-model="min"><span>最少填<input type="text" v-model="minval">个字</span></label>
                <label><input type="checkbox" name="" v-model="max"><span>最多填<input type="text" v-model="maxval">个字</span></label>
                <label><input type="checkbox" name="" v-model="err"><span>自定义出错文案<input type="text" v-model="errval"></span></label>
                <h3>布局设置</h3>
                <label><input type="checkbox" name="" v-model="widt">
                    <span>宽度占用整行的</span>
                    <select v-model="widtval">
                        <option disabled value="">请选择其中一项</option>
                        <option>1/4</option>
                        <option>2/4</option>
                        <option>3/4</option>
                    </select>
                </label>
                <label><input type="checkbox" name="" v-model="widtone"><span>新起一行</span></label>
                <h3>其他设置</h3>
                <label><input type="checkbox" name="" v-model="texthide"><span>字段隐藏</span></label>
                <label><input type="checkbox" name="" v-model="auto"><span>自动填写上次填写内容</span></label>
            </li>
        </div>
    </div>

    </template>

#主文件:

        <div id="app">
            <!--左侧按钮-->
            <div class="L">
                <li @click="add('danhangwenben')">单行文本</li>
            </div>
                <!--编辑内容-->
              <div class="M" id="dhwb01">
                  <li :is="item.component" v-for="(item,index) in items" :date-id="index" :id="'dhwb00'+(index+1)"></li>
              </div>

              <a class="cc">提交</a>
            </div>

#vue数据js文件:
   var vm=new Vue({
                el: '#app',
                components: {
                //单行文本模板
                    'danhangwenben':{
                        template:"#dhwb",
                        data:function(){
                            return{
                                editshow:false,
                                title:'未命名',
                                input:"",
                                tishi:"",
                                bitian:false,
                                repeat:false,
                                cardid:false,
                                fanwei:false,
                                min:false,
                                minval:'',
                                max:false,
                                maxval:'',
                                err:false,
                                errval:'',
                                widt:false,
                                widtval:'',
                                widtone:'',
                                texthide:false,
                                auto:false
                            }
                        },
                        methods:{
                            edit_dhwb:function(){
                                this.editshow = true
                            },
                        }
                    }
                },
                data:function(){
                    return{
                        items: [],
                    }
                },
                methods: {
                    add:function(component) {
                        this.items.push({
                            'component': component,
                        })

                    },
                },
            })

#校验检测文件:
        @设计js:  
                //单行文本校验
                function checkdhwb() {
                    //标题校验
                    if($(".dhwb_title").attr("title") == ''){
                        alert("标题不能为空")
                        return
                    }
                    //必填校验
                    if($(".dhwb_hidden").attr("bitian") == "true"){
                        if( $(".dhwb_k_n").attr("val") == ''){
                            alert("必填项，内容不能为空")
                            return
                        }
                    }
                    //身份证号验证
                    var idCard = $(".dhwb_k_n").attr("val")
                    if($(".dhwb_hidden").attr("cardid") == "true") {
                        var reg_idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                        if (!reg_idCard.test(idCard)) {
                            alert("必须填入正确的身份证号")
                            return
                        }
                    }
                    //最少多少个字
                    if($(".dhwb_hidden").attr("min") == "true"){
                        if( $(".dhwb_k_n").attr("val").length < $(".dhwb_hidden").attr("minval")){
                            alert("输入字符不能小于"+$(".dhwb_hidden").attr("minval"))
                            return
                        }
                    }
                    //最多多少个字
                    if($(".dhwb_hidden").attr("max") == "true"){
                        if( $(".dhwb_k_n").attr("val").length > $(".dhwb_hidden").attr("maxval")){
                            alert("输入字符不能大于"+$(".dhwb_hidden").attr("maxval"))
                            return
                        }
                    }
                    //自定义出错方案
                    if($(".dhwb_hidden").attr("err") == "true"){
                        alert("出错方案为"+$(".dhwb_hidden").attr("errval"))
                            }
                            //
                        }
                        //校验类
                        function checkprocess(classid){
                            switch (classid){
                                case 'isDhwb':
                                    checkdhwb()
                                    break;
                            }
                        }
                        //提交按钮
                        $(function(){
                            $(".cc").click(function(){
                                checkprocess("isDhwb")
                            })
                        })

        @发行js:  check.js
#css文件:
        @开发css:  
                        @charset "utf-8";
                        /*属性重置开始*/
                        *{ margin:0; padding:0; font-family: Arial, "Microsoft YaHei", SimSun; font-size:14px; color:#7e7f84;}
                        html, body, ul, p { padding: 0; margin: 0; }
                        img,input{ border:none;}
                        li{ list-style:none;}
                        a{text-decoration:none; color:#333;}
                        body{ width:100%; height:100%; min-width:1170px;}
                        /*属性重置结束**/
                            #app{ overflow: hidden;}
                            .L{ width: 400px; height:700px; border: 1px solid #ccc; position: absolute; left: 0; top:0;padding: 10px; background: #fff}
                            .L li{ width: 100px; height: 50px; text-align: center; line-height: 50px;border: 1px solid #ccc; margin-bottom: 20px;}



                            .M{ width: 400px; height: 700px; border: 1px solid #ccc; margin:0 auto; padding: 10px; background: #fff; opacity: 0.8}
                            .M li{ width: 90%; border-bottom: 1px solid #ccc; padding: 20px; }
                            .M li h2{}
                            .M li input[type='text']{ width: 200px; height:30px; line-height: 30px;border: 1px solid #ccc; }
                            .M li label{ display: block; margin: 10px 0;}
                            .M li label input[type='radio']{}

                            .R{ width: 400px; height: 700px; border: 1px solid #ccc; position: absolute; right: 0; top:0;padding: 10px; background: #fff}
                            .R li input[type='text']{ width: 200px; height:30px; line-height: 30px;border: 1px solid #ccc; }
                            .R li label{ display: block; margin: 10px 0;}
                            .R li label input[type='radio']{}
                            .bg1{ background: red;}
                            .bg2{ background: blue;}
                            .colorred{ color: red }
                            .colorblue{ color: blue }
                            .cc{ display: block; width: 100px; height: 30px; text-align: center;line-height: 30px; background: #f01400; color: #ffffff; margin: 30px auto; cursor: pointer}
        @发行css:  index.csss
        
        
        
        