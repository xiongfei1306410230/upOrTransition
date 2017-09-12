<style>
        @font-face {
            font-family:'koa';
            src:url('../../assets/fonts/koa.otf');
        }
        .font-box{
            position:fixed;
            top:50%;
            left:50%;
            margin-top:-64px;
            margin-left:-192px;
        }
        .koa{
            font-family:'koa';
            text-align:center;
        }
        .max{
            font-size:60px;
            color:#444;
        }
        .min{
            font-size:20px;
        }
        .hamburger{
            overflow-x:visible;
            position:fixed;
            width:20px;
            height:20px;
            z-index:1000;
            background-image:url(../../assets/img/p.png);
            background-size:20px 20px;
            top:50px;
            left:50px;
            cursor:pointer;
            transition: all 3s;
        }
        .hamburger:hover{
            background-image:url(../../assets/img/p1.png);
        }
        .nav-box{
            position:fixed;
            width:500px;
            height:20px;
            left:50px;
            top:50px;
        }
        .sql,.server{
            position:absolute;
            z-index:999;
            cursor:pointer;
            font-family:'koa';
            font-size:13px;
            color:#e66;
            top:0;
            left:0;
            transition: all .4s;
        }
</style>
<template>
    <div>
    <div class="hamburger"></div>
        <div class="nav-box">
        <div class="sql" style="opacity:0">sql转换</div>
        <div class="server" style="opacity:0">上传文件</div>
        </div>
      <div class="font-box">
        <div class="koa max">
            up or transition
        </div>
        <div class="koa min">
        一款sql转换和文件上传工具
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
    export default {
        data () {
            return {
               
            }
        },
        methods:{

            init:function(){
                var $this=this;
                var hamburger=document.querySelector(".hamburger");
                var sql=document.querySelector(".sql");
                var server=document.querySelector(".server");
                $(document).off().on("click",".hamburger",function(){
                    console.log(1111);
                    console.log(sql.getAttribute("style"))
                    if(sql.getAttribute("style")=="opacity: 0;"){
                        sql.setAttribute("style","display:inline-block;");
                        sql.style.marginLeft="70px";
                        server.setAttribute("style","display:inline-block;");
                        server.style.marginLeft="140px";
                    }else{
                        sql.setAttribute("style","opacity: 0;");
                        server.setAttribute("style","opacity: 0;");
                    }
                })
                $(document).on("click",".sql",function(){
                    console.log(1);
                    
                    $this.$router.push({path: '/sql'})
                })
                $(document).on("click",".server",function(){
                    $this.$router.push({path: '/upload'})
                })
                setTimeout(function(){
                    sql.setAttribute("style","display:inline-block;");
                    sql.style.marginLeft="70px";
                    server.setAttribute("style","display:inline-block;");
                    server.style.marginLeft="140px";
                },100)
            }
        },
        mounted () {
           if(this.$route.path==="/"){
               console.log(111);
               this.$router.push({path: '/download1'})
           }
           console.log(this.$route.path);           
           
           this.init();
        },
        
    }
</script>