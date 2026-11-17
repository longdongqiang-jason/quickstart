// Hide the Argon sidebar entry while QuickStart is loaded.
const quickstartSidebarStyle = document.createElement("style");
quickstartSidebarStyle.textContent = `
    .main-left li:has(> a:is(
        [href$="/admin/network_guide"],
        [href$="/admin/network_guide/"],
        [href*="/admin/network_guide?"]
    )) {
        display: none !important;
    }
`;
document.head.appendChild(quickstartSidebarStyle);

/* quickstart-online-modal-v5: preserve the dashboard and reuse native flash flow. */
(function () {
    var active = null;
    window.openX86OnlineUpdate = function (url) {
        if (active) return;
        var layer = document.createElement('div');
        layer.style.cssText = 'position:fixed;inset:0;z-index:2147483000;background:transparent';
        var frame = document.createElement('iframe');
        frame.title = '在线更新';
        frame.style.cssText = 'width:100%;height:100%;border:0;background:transparent;color-scheme:only light;visibility:hidden;opacity:0';
        frame.setAttribute('allowtransparency', 'true');
        var hint = document.createElement('div');
        hint.textContent = '正在打开在线更新…';
        hint.style.cssText = 'display:none;position:absolute;top:40%;left:50%;transform:translateX(-50%);background:white;color:#333;padding:24px;border-radius:6px';
        var exit = document.createElement('button');
        exit.type = 'button';
        exit.textContent = '关闭窗口';
        exit.style.cssText = 'display:none;position:absolute;right:16px;top:8px;z-index:2;padding:6px 12px;border:1px solid #bbb;border-radius:4px;cursor:pointer;color:#333;background:white';
        var timer = null, seen = false, idleSince = 0, revealPending = false;
        var loadingTimer = window.setTimeout(function () {
            if (!seen && active === layer) { hint.style.display = "block"; exit.style.display = "block"; }
        }, 1200);
        var oldOverflow = document.body.style.overflow;
        function close() {
            if (timer) window.clearInterval(timer);
            window.clearTimeout(deadline);
            window.clearTimeout(loadingTimer);
            layer.remove();
            document.body.style.overflow = oldOverflow;
            active = null;
        }
        exit.onclick = function () {
            /* Let the original modal close handler stop progress polling first. */
            try {
                var doc = frame.contentDocument;
                var buttons = doc.querySelectorAll('#modal_overlay button');
                for (var i = 0; i < buttons.length; i++) {
                    if (/^(关闭|取消|Close|Cancel)$/i.test(buttons[i].textContent.trim()) && !buttons[i].disabled) {
                        buttons[i].click(); break;
                    }
                }
            } catch (e) {}
            close();
        };
        var deadline = window.setTimeout(function () {
            if (!seen) hint.textContent = '未能打开更新窗口。请确认 flash.js 已加入自动打开逻辑，且当前登录有效。';
        }, 30000);
        frame.onload = function () {
            if (timer) window.clearInterval(timer);
            try {
                var doc = frame.contentDocument;
                if (doc.querySelector('input[type="password"]')) {
                    hint.textContent = '登录已失效，请刷新首页并重新登录后再试。';
                    return;
                }
                var style = doc.createElement('style');
                // Match the iframe and document color schemes so the browser keeps
                // the embedded canvas transparent, even with a dark LuCI theme.
                style.textContent = `
                    :root { color-scheme: only light !important; }
                    html, body, #modal_overlay, #modal_overlay::before, #modal_overlay::after {
                        background: transparent !important;
                        background-image: none !important;
                        box-shadow: none !important;
                        backdrop-filter: none !important;
                    }
                    html::before, html::after, body::before, body::after {
                        display: none !important;
                    }
                    body { visibility: hidden !important; }
                    body > :not(#modal_overlay) { display: none !important; }
                    body.modal-overlay-active #modal_overlay,
                    body.modal-overlay-active #modal_overlay * { visibility: visible !important; }
                    body.modal-overlay-active #modal_overlay {
                        position: fixed !important;
                        inset: 0 !important;
                        margin: 0 !important;
                        z-index: 2147483000 !important;
                    }
                    #modal_overlay, #modal_overlay .modal {
                        animation: none !important;
                        transition: none !important;
                    }
                `;
                doc.head.appendChild(style);
                doc.addEventListener('click', function (event) {
                    var button = event.target.closest && event.target.closest('button');
                    if (!button || button.disabled ||
                        !/^(关闭|取消|Close|Cancel)$/i.test(button.textContent.trim())) return;
                    window.setTimeout(function () {
                        if (active === layer && !doc.body.classList.contains('modal-overlay-active')) close();
                    }, 0);
                }, true);
                timer = window.setInterval(function () {
                    var showing = doc.body.classList.contains('modal-overlay-active');
                    if (showing) {
                        seen = true; idleSince = 0;
                        hint.style.display = 'none';
                        if (!revealPending) {
                            revealPending = true;
                            window.requestAnimationFrame(function () {
                                window.requestAnimationFrame(function () {
                                    if (active !== layer) return;
                                    layer.style.background = 'rgba(0,0,0,.4)';
                                    frame.style.visibility = 'visible';
                                    frame.style.opacity = '1';
                                });
                            });
                        }
                        /* Avoid an extra dismiss button during a running upgrade. */
                        exit.style.display = 'none';
                        window.clearTimeout(deadline);
                    } else if (seen) {
                        if (!idleSince) idleSince = Date.now();
                        if (Date.now() - idleSince > 1500) close();
                    }
                }, 150);
            } catch (e) {
                hint.textContent = '无法加载同源升级页面：' + e.message;
            }
        };
        active = layer;
        document.body.style.overflow = 'hidden';
        layer.appendChild(frame); layer.appendChild(hint); layer.appendChild(exit);
        document.body.appendChild(layer);
        frame.src = url;
    };
})();
import{createApp as c}from"/luci-static/quickstart/card-runtime-v1.js";import{i as a,A as p,S as m,a as l,b as d,c as u,d as f,e as g,f as v,p as S,g as h,h as y,j as w,k as b,E as O,l as A,r as L,m as P}from"./app.js?v=txJtMzYh";import{s as I}from"./vendor.js?v=B46K-l76";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(o){if(o.ep)return;o.ep=!0;const t=i(o);fetch(o.href,t)}})();a();const e=c(p);e.component("svg-menu",m);e.component("svg-system",l);e.component("svg-download",d);e.component("svg-store",u);e.component("svg-info",f);e.component("svg-disk",g);e.component("svg-nav",v);e.component("progress-item",S);e.component("svg-view-show",h);e.component("svg-view-hidden",y);e.component("article-item",w);e.component("switch-box",b);e.component("editable-select",O);e.use(A);e.use(L);e.use(I());P(e).finally(()=>e.mount("#app"));
