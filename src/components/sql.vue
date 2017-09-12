<style>
        @font-face {
            font-family:'koa';
            src:url('../../assets/fonts/koa.otf');
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
        .placeholder{height:100px}
        .main-box{
            width:760px;
        }
        .main-box .sql-box,.main-box .result-box{
            height:200px;
            width:600px;
            float:left;
            border:none;
            border-radius:8px;
            margin-left:80px;
            color:#888;
            background:#fcfcfc;
            cursor:text;
            max-width:600px;
            max-height:200px;
        }
        .sql-box,.result-box{
            padding:10px;
        }
        .sql-box:hover{
            box-shadow:3px 3px 10px #ccc;
        }
        .sql-box:focus{
            outline:none;
            box-shadow:3px 3px 10px #ccc;
        }
        .sql-transition{
            float:left;
            border-radius:8px;
            margin-left:80px;
            width:600px;
            height:30px;
            text-align:center;
            margin-top:15px;
            color:#e66;
        }
        .result-box:hover{
            box-shadow:3px 3px 10px #ccc;
        }
        .result-box:focus{
            outline:none;
            box-shadow:3px 3px 10px #ccc;
        }
        .transition-box{
            cursor:pointer;
            line-height:20px;
        }
</style>
<template>
    <div>
        <div class="hamburger"></div>
        <div class="nav-box">
        <div class="sql" style="opacity:0">sql转换</div>
        <div class="server" style="opacity:0">上传文件</div>
        </div>
        <div class="placeholder"></div>
        <div class="main-box">
            <textarea class="sql-box">
            </textarea>
            <div class="sql-transition">
                <div @click="copy" class="transition-box">
                    <img src="../../assets/img/transition.png" style="vertical-align:middle" width="12" alt=""> 转换
                </div>
            </div>
            <textarea class="result-box">
            </textarea>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
    export default {
        data () {
            return { }
        },
        methods:{
            //点击复制事件
            copy:function(){
                var $e=$(".result-box");
                $e.select();
                var tag=document.execCommand("Copy");
                if(tag){
                    alert("复制内容成功")
                }
            },
            init:function(){
                var $this=this;
                var hamburger=document.querySelector(".hamburger");
                var sql=document.querySelector(".sql");
                var server=document.querySelector(".server");
                $(document).off().on("click",".hamburger",function(){
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
                const electron=require('electron');
                const BrowserWindow = electron.BrowserWindow;
                const remote=electron.remote;
                const ipc = electron.ipcRenderer;
                var trayOn = false;
                setTimeout(function(){
                    $(document).on("click",".my_minimize_box",function(){
                        if(trayOn){
                            trayOn = false;
                            ipc.send('remove-tray')
                        }else{
                            trayOn = true;
                            ipc.send('put-in-tray')
                        }
                    })
                    ipc.on('tray-removed', function () {
                        ipc.send('remove-tray');
                        trayOn = false
                    })
                },10)
            }
        },
        mounted () {
            
           this.init();
        },
    }
</script>

