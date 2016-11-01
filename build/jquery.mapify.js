/* 
	
The MIT License (MIT)

Copyright (c) 2014 etienne-martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

!function(a){function b(b,d,e,f){var g=a(b).data("group-id");g?a(b).siblings("area[data-group-id="+g+"]").andSelf().each(function(){c(this,d,e,f.hoverClass)}):c(b,d,e,f.hoverClass)}function c(b,c,d,e){var f=a(b).attr("data-coords").split(","),g="";for(key in f)g+=key%2==0?a(c).width()*(f[key]/100):","+a(c).height()*(f[key]/100)+" ";var h=d.find("polygon:eq("+a(b).index()+")");h.attr("points",g).attr("class",function(a,b){return b+" mapify-hover"}),""!=e&&h.attr("points",g).attr("class",function(a,b){return b+" "+e})}function d(b,c){b.each(function(){var b=a(this).attr("data-coords").split(",");for(key in b)key%2==0?b[key]=a(c).width()*(b[key]/100):b[key]=a(c).height()*(b[key]/100);a(this).attr("coords",b.toString())})}function e(a){for(var b,c=a.getAttribute("coords"),d=c.split(","),e=[],f=maxX=parseInt(d[0],10),g=maxY=parseInt(d[1],10),h=0,i=d.length;h<i;h++)b=parseInt(d[h],10),h%2==0?b<f?f=b:b>maxX&&(maxX=b):b<g?g=b:b>maxY&&(maxY=b);return f=f,maxX=maxX,g=g,maxY=maxY,centerX=parseInt((f+maxX)/2,10),centerY=parseInt((g+maxY)/2,10),e={"center top":{0:centerX,1:g},"center bottom":{0:centerX,1:maxY}}}var f={hoverClass:"",popOver:!1},g={hoverClass:"",popOver:{content:function(a,b){return""},delay:.8,margin:"10px",width:"",height:""}},h=/(iPad|iPhone|iPod)/g.test(navigator.userAgent);a.fn.mapify=function(c){var c=a.extend(!0,{},f,c);if(c.popOver){var c=a.extend(!0,{},g,c);c.popOver.margin=parseInt(c.popOver.margin),c.popOver.width=c.popOver.width;var i="",j="";isNaN(c.popOver.delay)||(i="all "+c.popOver.delay+"s",j="margin "+c.popOver.delay+"s")}var k=this;return k.each(function(){function f(a,b){n&&(clearTimeout(x),x=setTimeout(function(){a.removeClass("mapify-visible")},300)),b.find("polygon").attr("class","mapify-polygon")}function g(b,d){var f=a(d)[0],g=e(f),h=g["center top"],l=b.outerWidth(),m=c.popOver.margin;w.width()-2*m<=l?(l=w.width()-2*m,b.css({maxWidth:l})):q.width()-2*m<=l?(l=q.width()-2*m,b.css({maxWidth:l})):b.css({maxWidth:""}),b.css({marginLeft:-(l/2)});var n=0;if(q.width()<w.width()){var o=h[0]-l/2-w.scrollLeft();o+l>q.width()-m?n=o+l-q.width()+m:o<m&&(n=o-m)}else{var o=h[0]-l/2-w.scrollLeft();o+l>w.outerWidth()-m?n=o+l-w.outerWidth()+m:o<m&&(n=o-m)}h[1]-b.outerHeight()-m<0?(h=g["center bottom"],b.addClass("mapify-to-bottom")):b.hasClass("mapify-to-bottom")&&b.removeClass("mapify-to-bottom"),h[0]-=n;var p=n;n>l/2-2*m?p=l/2-2*m:n<-(l/2-2*m)&&(p=-(l/2)+2*m),b.hasClass("mapify-visible")||(b.css({top:h[1],left:h[0],transition:"none"}),t.css({marginLeft:p,transition:"none"})),clearTimeout(x),x=setTimeout(function(){var e=c.popOver.content(a(d),k);b.find(".mapify-popOver-content").html(e),b.hasClass("mapify-to-bottom")?(b.css({marginTop:""}),b.hasClass("mapify-bottom")||t.css({marginLeft:n,transition:"none"}),b.addClass("mapify-bottom"),b.removeClass("mapify-to-bottom")):(b.hasClass("mapify-bottom")&&t.css({marginLeft:n,transition:"none"}),b.removeClass("mapify-bottom"),b.css({marginTop:-b.outerHeight()})),setTimeout(function(){b.css({top:h[1],left:h[0],transition:i}).addClass("mapify-visible"),t.css({marginLeft:p,transition:j})},10)},100)}var k=this,l=a(k).attr("usemap"),m=a(l).find("area");if(!a(k).hasClass("mapify")){var n=!1;c.popOver&&(n=!0),a(k).addClass("mapify");var o=parseInt(a(k).attr("width")),p=parseInt(a(k).attr("height"));if(!a(k).attr("width")||!a(k).attr("height"))return alert("The width and height attributes must be specified on your image."),"Not mapified";a(k).wrap(function(){return'<div class="mapify-holder"></div>'});var q=a(k).parent();a(l).appendTo(q),a(k).before('<img class="mapify-img" src="'+a(k).attr("src")+'" />');a(k).prev(".mapify-img");a(k).before('<svg class="mapify-svg" width="'+o+'" height="'+p+'"></svg>');var r=a(k).prev(".mapify-svg");if(m.each(function(){if("rect"===a(this).attr("shape")){var b=a(this).attr("coords").split(","),c=[];a.each([0,1,0,3,2,3,2,1],function(a,d){c.push(b[d])}),a(this).attr("coords",c.join(",")),a(this).attr("shape","poly")}a(this).attr("data-coords-default",a(this).attr("coords")),n&&a(this).removeAttr("alt").attr("data-title",a(this).attr("title")).removeAttr("title");var d=a(this).attr("coords").split(",");for(key in d)key%2==0?d[key]=100*d[key]/o:d[key]=100*d[key]/p;a(this).attr("data-coords",d.toString());var e=document.createElementNS("http://www.w3.org/2000/svg","polygon");e.className="mapify-polygon",e.setAttribute("fill","none"),r.append(e)}),a(k).wrap(function(){return'<div class="mapify-imgHolder"></div>'}).css("opacity",0),n){a(k).after('<div class="mapify-popOver" style=" transition:'+i+'; "><div class="mapify-popOver-content"></div><div class="mapify-popOver-arrow" style=" transition:'+j+'; "></div></div>');var s=a(k).next(".mapify-popOver"),t=s.find(".mapify-popOver-arrow");s.css({width:c.popOver.width,height:c.popOver.height})}var u=!1;a(document).bind("touchend.mapify",function(a){u||f(s,r),u=!1}).bind("touchmove.mapify",function(a){u=!0}),a(k).bind("touchmove.mapify",function(a){}),m.css({outline:"none"}).bind("touchend.mapify",function(b){a(this).hasClass("mapify-clickable")&&(a(this).trigger("click"),m.removeClass("mapify-clickable")),u=!1,b.stopPropagation()}).bind("click.mapify",function(a){if(void 0!==a.originalEvent&&h)return!1}).bind("touchstart.mapify",function(b){m.removeClass("mapify-clickable"),r.find("polygon:eq("+a(this).index()+")")[0].classList.contains("mapify-hover")?a(this).addClass("mapify-clickable"):a(this).addClass("mapify-hilightable")}).bind("touchmove.mapify",function(a){m.removeClass("mapify-clickable mapify-hilightable")}).bind("mouseenter.mapify focus.mapify touchend.mapify",function(d){var e=this;return!(!a(this).hasClass("mapify-hilightable")&&h)&&(f(s,r),n&&g(s,e),b(e,k,r,c),void d.preventDefault())}).bind("mouseout.mapify",function(){f(s,r)}),h||m.bind("blur.mapify",function(){f(s,r)});var v;a(window).bind("resize.mapify",function(){v&&clearTimeout(v),v=setTimeout(function(){n&&(s.hasClass("mapify-visible")||s.css({left:0,top:0})),r.find("polygon").attr("points",""),d(m,k);var a=m[r.find("polygon.mapify-hover").index()];a&&(n&&g(s,a),b(a,k,r,c))},100)});var w=a(k).scrollParent();a(w).is(document)&&(w=a(window)),w.addClass("mapify-GPU"),w.bind("scroll.mapify",function(){h&&m.removeClass("mapify-clickable mapify-hilightable"),n&&(h&&(s.css({top:s.css("top"),left:s.css("left"),transition:"none"}),t.css({marginLeft:t.css("margin-left"),transition:"none"})),clearTimeout(a.data(this,"scrollTimer")),a.data(this,"scrollTimer",setTimeout(function(){var a=m[r.find("polygon.mapify-hover").index()];a&&(g(s,a),h&&(s.css({top:corners[1],left:corners[0],transition:i}),t.css({marginLeft:popOverArrowCompensation,transition:j})))},100)))}),console.log("mapified");var x}d(m,k),a(k).bind("load.mapify",function(){d(m,k)})}),"mapified"},a.fn.scrollParent=function(){var b=this.css("position"),c="absolute"===b,d=this.parents().filter(function(){var b=a(this);return(!c||"static"!==b.css("position"))&&/(auto|scroll)/.test(b.css("overflow")+b.css("overflow-y")+b.css("overflow-x"))}).eq(0);return"fixed"!==b&&d.length?d:a(this[0].ownerDocument||document)}}(jQuery);