�����ߣ�����
����ʱ�䣺2018.7.28
˵���������ı����

#ģ���ļ�:
      һ�������ı�ģ�壺
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
                <h3>����</h3>
                <input class="dhwb_title" type="text" name="" v-model="title" :title="title">
                <h3>Ĭ��ֵ</h3>
                <input class="dhwb_input" type="text" name="" v-model="input" :input="input">
                <h3>��ʾ</h3>
                <input class="dhwb_tishi" type="text" name="" v-model="tishi" :tishi="tishi">
                <h3>У��</h3>
                <label><input type="checkbox" name="" v-model="bitian"><span>������</span></label>
                <label><input type="checkbox" name="" v-model="repeat"><span>���ܺ����������ظ�</span></label>
                <label><input type="checkbox" name="" v-model="cardid"><span>���֤����֤</span></label>
                <label><input type="checkbox" name="" v-model="fanwei"><span>�޶���д��Χ�趨����Χ</span></label>
                <label><input type="checkbox" name="" v-model="min"><span>������<input type="text" v-model="minval">����</span></label>
                <label><input type="checkbox" name="" v-model="max"><span>�����<input type="text" v-model="maxval">����</span></label>
                <label><input type="checkbox" name="" v-model="err"><span>�Զ�������İ�<input type="text" v-model="errval"></span></label>
                <h3>��������</h3>
                <label><input type="checkbox" name="" v-model="widt">
                    <span>���ռ�����е�</span>
                    <select v-model="widtval">
                        <option disabled value="">��ѡ������һ��</option>
                        <option>1/4</option>
                        <option>2/4</option>
                        <option>3/4</option>
                    </select>
                </label>
                <label><input type="checkbox" name="" v-model="widtone"><span>����һ��</span></label>
                <h3>��������</h3>
                <label><input type="checkbox" name="" v-model="texthide"><span>�ֶ�����</span></label>
                <label><input type="checkbox" name="" v-model="auto"><span>�Զ���д�ϴ���д����</span></label>
            </li>
        </div>
    </div>

    </template>

#���ļ�:

        <div id="app">
            <!--��ఴť-->
            <div class="L">
                <li @click="add('danhangwenben')">�����ı�</li>
            </div>
                <!--�༭����-->
              <div class="M" id="dhwb01">
                  <li :is="item.component" v-for="(item,index) in items" :date-id="index" :id="'dhwb00'+(index+1)"></li>
              </div>

              <a class="cc">�ύ</a>
            </div>

#vue����js�ļ�:
   var vm=new Vue({
                el: '#app',
                components: {
                //�����ı�ģ��
                    'danhangwenben':{
                        template:"#dhwb",
                        data:function(){
                            return{
                                editshow:false,
                                title:'δ����',
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

#У�����ļ�:
        @���js:  
                //�����ı�У��
                function checkdhwb() {
                    //����У��
                    if($(".dhwb_title").attr("title") == ''){
                        alert("���ⲻ��Ϊ��")
                        return
                    }
                    //����У��
                    if($(".dhwb_hidden").attr("bitian") == "true"){
                        if( $(".dhwb_k_n").attr("val") == ''){
                            alert("��������ݲ���Ϊ��")
                            return
                        }
                    }
                    //���֤����֤
                    var idCard = $(".dhwb_k_n").attr("val")
                    if($(".dhwb_hidden").attr("cardid") == "true") {
                        var reg_idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                        if (!reg_idCard.test(idCard)) {
                            alert("����������ȷ�����֤��")
                            return
                        }
                    }
                    //���ٶ��ٸ���
                    if($(".dhwb_hidden").attr("min") == "true"){
                        if( $(".dhwb_k_n").attr("val").length < $(".dhwb_hidden").attr("minval")){
                            alert("�����ַ�����С��"+$(".dhwb_hidden").attr("minval"))
                            return
                        }
                    }
                    //�����ٸ���
                    if($(".dhwb_hidden").attr("max") == "true"){
                        if( $(".dhwb_k_n").attr("val").length > $(".dhwb_hidden").attr("maxval")){
                            alert("�����ַ����ܴ���"+$(".dhwb_hidden").attr("maxval"))
                            return
                        }
                    }
                    //�Զ��������
                    if($(".dhwb_hidden").attr("err") == "true"){
                        alert("������Ϊ"+$(".dhwb_hidden").attr("errval"))
                            }
                            //
                        }
                        //У����
                        function checkprocess(classid){
                            switch (classid){
                                case 'isDhwb':
                                    checkdhwb()
                                    break;
                            }
                        }
                        //�ύ��ť
                        $(function(){
                            $(".cc").click(function(){
                                checkprocess("isDhwb")
                            })
                        })

        @����js:  check.js
#css�ļ�:
        @����css:  
                        @charset "utf-8";
                        /*�������ÿ�ʼ*/
                        *{ margin:0; padding:0; font-family: Arial, "Microsoft YaHei", SimSun; font-size:14px; color:#7e7f84;}
                        html, body, ul, p { padding: 0; margin: 0; }
                        img,input{ border:none;}
                        li{ list-style:none;}
                        a{text-decoration:none; color:#333;}
                        body{ width:100%; height:100%; min-width:1170px;}
                        /*�������ý���**/
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
        @����css:  index.csss
        
        
        
        