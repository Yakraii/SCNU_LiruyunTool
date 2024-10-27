// ==UserScript==
// @name         华南师范大学砺儒云课堂辅助工具
// @namespace    http://tampermonkey.net/
// @version      2.0
// @author       Yakraii&XiaoLuo
// @description  自动登录砺儒云课堂,左侧边栏可自定义跳转课堂,跳过教学管理信息平台登录界面5秒强制等待。
// @license      GPL-3.0
// @match        https://moodle.scnu.edu.cn/*
// @match        https://sso.scnu.edu.cn/AccountService/*
// @match        https://jwxt.scnu.edu.cn/*
// @icon         https://spaces.ac.cn/usr/uploads/2012/07/4106407585.jpg
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource css https://cdn.jsdelivr.net/gh/Yakraii/cssRepo@v1.0.8/index2.css
// @downloadURL https://update.greasyfork.org/scripts/492821/%E5%8D%8E%E5%8D%97%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6%E7%A0%BA%E5%84%92%E4%BA%91%E8%AF%BE%E5%A0%82%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7.user.js
// @updateURL https://update.greasyfork.org/scripts/492821/%E5%8D%8E%E5%8D%97%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6%E7%A0%BA%E5%84%92%E4%BA%91%E8%AF%BE%E5%A0%82%E8%BE%85%E5%8A%A9%E5%B7%A5%E5%85%B7.meta.js
// ==/UserScript==

(function() {
    'use strict';

    //填入账密：
    var accountInput = "20222005231";
    var passwordInput = "88888888";

    //样式设置：
    const css = GM_getResourceText("css");
    GM_addStyle(css);

    // 按钮信息
        var buttonsInfo = [
            { text: "大型数据库", url: "https://moodle.scnu.edu.cn/course/view.php?id=16272" },
            { text: "游戏引擎", url: "https://moodle.scnu.edu.cn/course/view.php?id=11871" },
            { text: "软件设计", url: "https://moodle.scnu.edu.cn/course/view.php?id=16088" }
        ];

    if(window.location.href.startsWith("https://moodle.scnu.edu.cn/"))
    {
        var div = document.createElement("div"); //创建一个标签
        div.style.opacity = 0.95;
        div.style.backgroundColor = '#f0f0f0';
        div.style.borderRadius = '10px';
        div.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        div.style.position = 'absolute';
        div.style.top = '20%';
        div.style.paddingTop = '5px'; // 设置 div 顶部内边距
        div.className = "box"; //给创建的 div 设置 class；
        document.body.appendChild(div); //向刚获取的标签中添加创建的标签

      //添加课程名称、网址到buttonsInfo中
		var child = document.createElement("button");
        for (var i = 0; i < buttonsInfo.length; i++) {
            var buttonInfo = buttonsInfo[i];
            var button = document.createElement("button");
            button.innerHTML = buttonInfo.text;
            button.className = "klclass";
            (function(info) {
                button.onclick = function() {
                    window.location.href = info.url;
                };
            })(buttonInfo);
            div.appendChild(button);
        }

        // 设置 div 的大小
        div.style.width = '140px';
        div.style.height = (buttonsInfo.length*40)+5 + 'px';

    }

    if (window.location.href.startsWith("https://moodle.scnu.edu.cn/")) {
       if (document.querySelector(".forgotpass") !== null) {
        window.location.href = "https://sso.scnu.edu.cn/AccountService/openapi/auth.html?client_id=3f86b543c74eed80e7d72658699f6345&response_type=code&redirect_url=https://moodle.scnu.edu.cn/auth/sso/login.php";
       }
    }

    if (window.location.href === "https://sso.scnu.edu.cn/AccountService/user/login.html") {
       // 填写账号和密码
        document.getElementById("account").value = accountInput;
        document.getElementById("password").value = passwordInput;
        loginByPassword();
    }

    if (window.location.href.startsWith("https://sso.scnu.edu.cn/AccountService/openapi/auth.html")) {
       gotoApp(); // 调用页面函数
    }
    //教学管理信息平台跳转统一身份
    if(window.location.href == "https://jwxt.scnu.edu.cn/xtgl/login_slogin.html"){
        var RegistButton = document.querySelector("#tysfyzdl").click();
    }

    //教学管理信息平台
    if(window.location.href.includes("https://jwxt.scnu.edu.cn/xtgl/index_initMenu.html?jsdm=")){
       //直接跳转教学管理信息平台
        window.location.href = "https://jwxt.scnu.edu.cn/xtgl/index_initMenu.html"
    }
})();