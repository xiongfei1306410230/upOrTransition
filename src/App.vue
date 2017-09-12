<style>
        @font-face {
            font-family:'koa';
            src:url('../assets/fonts/koa.otf');
        }
        .top{
            position: fixed;
            height: 36px;
            line-height: 36px;
            width: calc(100% - 88px);
            color:#fff;
            padding-left:20px;
            top: 0;
            left: 0;
            /*background:#F6C6CE;*/
            background:#f66;
            -webkit-app-region: drag;
        }
        .pull-right{
            float:right;
        }
        .my_minimize_box,.my_close_box{
            position:fixed;
            top: 0;
            height:36px;
            width:44px;
            text-align: center;
            cursor: pointer;
            background:#f66;
            transition: all .5s;
        }
        .my_minimize_box img,.my_close_box img{
            cursor: pointer;
        }
        .my_close_box{
            right: 0;
            padding:10px;
        }
        .my_minimize_box{
            right:44px;
            padding:9px;
        }
        .my_close_box:hover,.my_minimize_box:hover{
            background: #f6c6ce;
        }
</style>
<template>
    <div>
        <div class="top">
            <img src="" alt="">
            up or transition
        </div>

        <div class="my_close_box" @click="close">
            <img width="16" src="../assets/img/close.png" alt="">
        </div>
        <div class="my_minimize_box" >
            <img width="18" src="../assets/img/minimize.png" alt="">
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import $ from 'jquery'
    export default {
        data () {
            return {
                width:"",
                height:""
            }
        }, 
        methods: {
            close:function(){
                window.close();
            },
            minimize:function(){
                var _this=this;
                resizeTo(0,0);
            },
            init(){
                var _this=this;
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
           if(this.$route.path==="/"){
               this.$router.push({path: '/download1'})
           }
             this.init();
        }
    }
</script>
