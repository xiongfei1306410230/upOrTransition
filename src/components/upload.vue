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
            color: #000;
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
       .up-box{
          cursor: pointer;
           padding:10px;
       }
       .main-box .up-box,.main-box .up-result-box{
           float:left;
           border:none;
           border-radius:8px;
           margin-left:50px;
           color:#888;
           width:250px;
           height:400px;
           background:#fcfcfc;
       }
       .up-box,.up-result-box{
           overflow-y: auto;
       }
       .up{
           float:left;
           margin-left:40px;
           width:60px;
           color:#e66;
           text-align:center;
           cursor:pointer;
           line-height:400px;
       }
       .up-result-box:hover,.up-box:hover{
            box-shadow:3px 3px 10px #ccc;
        }
        .up-box>div{
            width: 200px;
            height:20px;
            overflow: hidden;
            text-overflow: ellipsis;
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
            <div class="up-box"></div>
            <div class="up">
                <img src="../../assets/img/up.png" style="vertical-align:middle" width="12" alt=""> 上传
            </div>
            <div class="up-result-box">
            </div>
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
                const ipc = require('electron').ipcRenderer;
                $(document).on("click",".up-box",function(){
                    ipc.send('open-file-dialog')
                })
                let upHtml="";
                const electron=require('electron');
                const BrowserWindow = electron.BrowserWindow;
                const remote=electron.remote;
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
                ipc.on('selected-directory', function (event, path) {
                    upHtml+="<div title="+path[0]+">"+path[0]+"</div>"
                    document.getElementsByClassName("up-box")[0].innerHTML=upHtml;

                })
            }
        },
        mounted () {
           this.init();
        },
    }
</script>
