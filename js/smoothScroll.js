!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){var t="1.7.2",l={},o={exclude:[],excludeWithin:[],offset:0,direction:"top",delegateSelector:null,scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficient:2,preventDefault:!0},n=function(t){var l=[],o=!1,n=t.dir&&"left"===t.dir?"scrollLeft":"scrollTop";return this.each(function(){var t=e(this);if(this!==document&&this!==window)return!document.scrollingElement||this!==document.documentElement&&this!==document.body?void(t[n]()>0?l.push(this):(t[n](1),o=t[n]()>0,o&&l.push(this),t[n](0))):(l.push(document.scrollingElement),!1)}),l.length||this.each(function(){this===document.documentElement&&"smooth"===e(this).css("scrollBehavior")&&(l=[this]),l.length||"BODY"!==this.nodeName||(l=[this])}),"first"===t.el&&l.length>1&&(l=[l[0]]),l};e.fn.extend({scrollable:function(e){var t=n.call(this,{dir:e});return this.pushStack(t)},firstScrollable:function(e){var t=n.call(this,{el:"first",dir:e});return this.pushStack(t)},smoothScroll:function(t,l){if(t=t||{},"options"===t)return l?this.each(function(){var t=e(this),o=e.extend(t.data("ssOpts")||{},l);e(this).data("ssOpts",o)}):this.first().data("ssOpts");var o=e.extend({},e.fn.smoothScroll.defaults,t),n=function(t){var l=function(e){return e.replace(/(:|\.|\/)/g,"\\$1")},n=this,s=e(this),r=e.extend({},o,s.data("ssOpts")||{}),i=o.exclude,c=r.excludeWithin,a=0,h=0,f=!0,u={},d=e.smoothScroll.filterPath(location.pathname),m=e.smoothScroll.filterPath(n.pathname),p=location.hostname===n.hostname||!n.hostname,g=r.scrollTarget||m===d,S=l(n.hash);if(S&&!e(S).length&&(f=!1),r.scrollTarget||p&&g&&S){for(;f&&a<i.length;)s.is(l(i[a++]))&&(f=!1);for(;f&&h<c.length;)s.closest(c[h++]).length&&(f=!1)}else f=!1;f&&(r.preventDefault&&t.preventDefault(),e.extend(u,r,{scrollTarget:r.scrollTarget||S,link:n}),e.smoothScroll(u))};return null!==t.delegateSelector?this.undelegate(t.delegateSelector,"click.smoothscroll").delegate(t.delegateSelector,"click.smoothscroll",n):this.unbind("click.smoothscroll").bind("click.smoothscroll",n),this}}),e.smoothScroll=function(t,o){if("options"===t&&"object"==typeof o)return e.extend(l,o);var n,s,r,i,c,a=0,h="offset",f="scrollTop",u={},d={};"number"==typeof t?(n=e.extend({link:null},e.fn.smoothScroll.defaults,l),r=t):(n=e.extend({link:null},e.fn.smoothScroll.defaults,t||{},l),n.scrollElement&&(h="position","static"===n.scrollElement.css("position")&&n.scrollElement.css("position","relative"))),f="left"===n.direction?"scrollLeft":f,n.scrollElement?(s=n.scrollElement,/^(?:HTML|BODY)$/.test(s[0].nodeName)||(a=s[f]())):s=e("html, body").firstScrollable(n.direction),n.beforeScroll.call(s,n),r="number"==typeof t?t:o||e(n.scrollTarget)[h]()&&e(n.scrollTarget)[h]()[n.direction]||0,u[f]=r+a+n.offset,i=n.speed,"auto"===i&&(c=Math.abs(u[f]-s[f]()),i=c/n.autoCoefficient),d={duration:i,easing:n.easing,complete:function(){n.afterScroll.call(n.link,n)}},n.step&&(d.step=n.step),s.length?s.stop().animate(u,d):n.afterScroll.call(n.link,n)},e.smoothScroll.version=t,e.smoothScroll.filterPath=function(e){return e=e||"",e.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},e.fn.smoothScroll.defaults=o});