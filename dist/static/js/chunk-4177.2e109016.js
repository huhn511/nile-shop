(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4177"],{20:function(t,e){},21:function(t,e){},22:function(t,e){},23:function(t,e){},Wj4w:function(t,e,r){"use strict";r.d(e,"a",function(){return m}),r.d(e,"c",function(){return y}),r.d(e,"h",function(){return g}),r.d(e,"f",function(){return T}),r.d(e,"g",function(){return S}),r.d(e,"e",function(){return E}),r.d(e,"d",function(){return M}),r.d(e,"b",function(){return K});var n=r("QbLZ"),a=r.n(n),o=r("4d7F"),c=r.n(o),s=r("14Xm"),u=r.n(s),i=r("gDS+"),p=r.n(i),d=r("D3Ub"),f=r.n(d),h=r("I+RW"),l=r.n(h),v=r("UPFR"),x=r("fcXd"),w=r("t+wR"),b=Object(w.composeAPI)({provider:x.a}),_=function(){var t=f()(u.a.mark(function t(e,r){var n,a;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=Object(v.asciiToTrytes)(p()(e)),a=l.a.create(r,n),t.next=5,l.a.attach(a.payload,a.address,3,14);case 5:return t.abrupt("return",{root:a.root,state:a.state});case 8:return t.prev=8,t.t0=t.catch(0),t.abrupt("return",null);case 11:case"end":return t.stop()}},t,void 0,[[0,8]])}));return function(e,r){return t.apply(this,arguments)}}(),m=function(){var t=f()(u.a.mark(function t(e,r,n,o,s){var i,p;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i={subscribed:[],channel:{side_key:"TEST",mode:"restricted",next_root:o,security:2,start:s,count:1,next_count:1,index:0},seed:n},p=new c.a(function(){var t=f()(u.a.mark(function t(n,o){var c,s;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!e){t.next=12;break}return(c={}).data=e,c.timestamp=Date.now(),c.status=r,a()({},c),t.next=9,_(c,i);case 9:return(s=t.sent)&&(c.root=s.root,c.secretKey=s.state.channel.secretKey,c.next_root=s.state.channel.next_root,c.start=s.state.channel.start),t.abrupt("return",n(c));case 12:return t.abrupt("return",o());case 15:return t.prev=15,t.t0=t.catch(0),t.abrupt("return",o());case 18:case"end":return t.stop()}},t,void 0,[[0,15]])}));return function(e,r){return t.apply(this,arguments)}}()),t.abrupt("return",p);case 3:case"end":return t.stop()}},t,void 0)}));return function(e,r,n,a,o){return t.apply(this,arguments)}}(),y=(function(){var t=f()(u.a.mark(function t(e,r,n,o){var c,s,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return c={subscribed:[],channel:{side_key:"TEST",mode:"restricted",next_root:n,security:2,start:o,count:1,next_count:1,index:0},seed:r},t.prev=1,(s={}).data=e,s.timestamp=Date.now(),s.status="updated",a()({},s),t.next=9,_(e,c);case 9:return(i=t.sent)&&(s.root=i.root,s.secretKey=i.state.channel.secretKey,s.next_root=i.state.channel.next_root,s.start=i.state.channel.start),t.abrupt("return",s);case 14:return t.prev=14,t.t0=t.catch(1),console.log("MAM append error",t.t0),t.abrupt("return",null);case 18:case"end":return t.stop()}},t,void 0,[[1,14]])}))}(),function(){var t=f()(u.a.mark(function t(e,r,n){var a,o,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=l.a.init(x.a,e,2),a=l.a.changeMode(a,"restricted","TEST"),"TEST",t.prev=3,o=[],c=function(t){var e=JSON.parse(Object(v.trytesToAscii)(t));o.push(e)},t.next=8,l.a.fetch(r,"restricted","TEST",c);case 8:return t.abrupt("return",o[o.length-1]);case 11:return t.prev=11,t.t0=t.catch(3),console.error("fetchItem:","\n",t.t0),t.abrupt("return",t.t0);case 15:case"end":return t.stop()}},t,void 0,[[3,11]])}))}(),function(t,e){var r=l.a.init(x.a,e,2);return r=l.a.changeMode(r,"restricted","TEST"),new c.a(function(){var e=f()(u.a.mark(function e(n,a){var o,c,s,i,p,d;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(o={}).type="blueprint",o.data=t,o.timestamp=Date.now(),o.status="created",c=S(),s=l.a.init(x.a,c,2),s=l.a.changeMode(s,"restricted","TEST"),(i={}).type="stock",i.data=[],i.timestamp=o.timestamp,i.status="created",i.blueprint=l.a.getRoot(r),e.next=17,_(i,s);case 17:if(!(p=e.sent)){e.next=27;break}return o.stock_root=p.root,e.next=22,_(o,r);case 22:(d=e.sent)&&(o.root=d.root,o.secretKey=d.state.channel.secretKey,o.next_root=d.state.channel.next_root,o.start=d.state.channel.start),o.stock_next_root=p.state.channel.next_root,o.stock_seed=c,o.stock_start=p.state.channel.start;case 27:return e.abrupt("return",n(o));case 30:return e.prev=30,e.t0=e.catch(0),console.log("createProductChannel error",e.t0),e.abrupt("return",a());case 34:case"end":return e.stop()}},e,void 0,[[0,30]])}));return function(t,r){return e.apply(this,arguments)}}())}),g=function(t,e){var r=S(),n={},a=l.a.init(x.a,r,2);return a=l.a.changeMode(a,"restricted","TEST"),new c.a(function(){var r=f()(u.a.mark(function r(o,c){var s,i,p;return u.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,console.log("product info",e),console.log("product data",t),(s={}).type="product",s.data=t,s.timestamp=Date.now(),s.status="created",s.blueprint=e.root,s.stock=e.stock_root,r.next=12,_(s,a);case 12:if(!(i=r.sent)){r.next=20;break}return console.log("success",i),p=[i.root],r.next=18,k(p,e.stock_root,e.stock_seed,e.stock_next_root,e.stock_start);case 18:n=r.sent,console.log("stock attended: ",n);case 20:return r.abrupt("return",o(n));case 23:return r.prev=23,r.t0=r.catch(0),console.log("increaseStock error",r.t0),r.abrupt("return",c());case 27:case"end":return r.stop()}},r,void 0,[[0,23]])}));return function(t,e){return r.apply(this,arguments)}}())},k=function(){var t=f()(u.a.mark(function t(e,r,n,a,o){var s,i;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={subscribed:[],channel:{side_key:"TEST",mode:"restricted",next_root:a,security:2,start:o,count:1,next_count:1,index:0},seed:n},i=new c.a(function(){var t=f()(u.a.mark(function t(n,a){var o,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!r){t.next=11;break}return(o={}).data=e,o.timestamp=Date.now(),o.status="increased",t.next=8,_(o,s);case 8:return(c=t.sent)&&(o.root=c.root,o.secretKey=c.state.channel.secretKey,o.next_root=c.state.channel.next_root,o.start=c.state.channel.start),t.abrupt("return",n(o));case 11:return t.abrupt("return",a());case 14:return t.prev=14,t.t0=t.catch(0),console.log("appendStock error",t.t0),t.abrupt("return",a());case 18:case"end":return t.stop()}},t,void 0,[[0,14]])}));return function(e,r){return t.apply(this,arguments)}}()),t.abrupt("return",i);case 3:case"end":return t.stop()}},t,void 0)}));return function(e,r,n,a,o){return t.apply(this,arguments)}}(),T=function(){var t=f()(u.a.mark(function t(e,r,n){var a,o,c;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=l.a.init(x.a,e,2),a=l.a.changeMode(a,"restricted","TEST"),"TEST",t.prev=3,o=[],c=function(t){var e=JSON.parse(Object(v.trytesToAscii)(t));o.push(e)},t.next=8,l.a.fetch(r,"restricted","TEST",c);case 8:return t.abrupt("return",o);case 11:return t.prev=11,t.t0=t.catch(3),console.error("fetchItem:","\n",t.t0),t.abrupt("return",t.t0);case 15:case"end":return t.stop()}},t,void 0,[[3,11]])}));return function(e,r,n){return t.apply(this,arguments)}}(),S=function(){if(window.crypto&&window.crypto.getRandomValues){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZ9",e="",r=new Uint32Array(81);return window.crypto.getRandomValues(r),r.forEach(function(r){return e+=t[r%t.length]}),e}throw new Error("Your browser is outdated and cant generate secure random numbers")},E=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"public",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments[3],a=arguments[4];if(x.a&&t)return new c.a(function(){var o=f()(u.a.mark(function o(c,s){return u.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,l.a.init(x.a),o.next=4,l.a.fetch(t,e,r,function(t){var e=JSON.parse(Object(v.trytesToAscii)(t));n(e)});case 4:return o.abrupt("return",c(a()));case 7:return o.prev=7,o.t0=o.catch(0),console.log("MAM fetch error",o.t0),o.abrupt("return",s());case 11:case"end":return o.stop()}},o,void 0,[[0,7]])}));return function(t,e){return o.apply(this,arguments)}}())},M=function(t,e){var r=S(),n=l.a.init(x.a,r,2);return n=l.a.changeMode(n,"restricted","TEST"),new c.a(function(){var a=f()(u.a.mark(function a(o,c){var s,i,p,d,f,h,v,w;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,console.log("_shop 000",s),(s={}).type=e,s.data=t,s.timestamp=Date.now(),s.status="created",console.log("_shop 0",s),i=S(),a.next=11,b.getNewAddress(i,{index:0}).then(function(t){return t}).catch(function(t){});case 11:return p=a.sent,s.order_request_address=p,d=S(),f=l.a.init(x.a,d,2),f=l.a.changeMode(f,"restricted","TEST"),(h={}).type="catalog",h.data=[],h.timestamp=s.timestamp,h.status="created",h.shop=l.a.getRoot(n),console.log("_shop 1",s),a.next=25,_(h,f);case 25:if(!(v=a.sent)){a.next=46;break}return console.log("mam_catalog published!",v),s.catalog_root=v.root,console.log("_shop 2",s),a.next=32,_(s,n);case 32:if(w=a.sent,console.log("shop_channel published!",w),!w){a.next=46;break}return s.root=w.root,s.secretKey=w.state.channel.secretKey,s.next_root=w.state.channel.next_root,s.start=w.state.channel.start,s.seed=r,s.catalog_seed=d,s.catalog_key=v.state.channel.secretKey,s.catalog_next_root=v.state.channel.next_root,s.catalog_start=v.state.channel.start,s.order_reques_seed=i,a.abrupt("return",o(s));case 46:a.next=52;break;case 48:return a.prev=48,a.t0=a.catch(0),console.log("createMAMChannel error",a.t0),a.abrupt("return",c());case 52:case"end":return a.stop()}},a,void 0,[[0,48]])}));return function(t,e){return a.apply(this,arguments)}}())},K=function(t,e){var r=S(),n=l.a.init(x.a,r,2);return n=l.a.changeMode(n,"restricted","TEST"),new c.a(function(){var a=f()(u.a.mark(function a(o,c){var s,i;return u.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,(s={}).type=e,s.data=t,s.timestamp=Date.now(),s.status="created",a.next=8,_(s,n);case 8:return(i=a.sent)&&(s.root=i.root,s.secretKey=i.state.channel.secretKey,s.next_root=i.state.channel.next_root,s.start=i.state.channel.start,s.seed=r),a.abrupt("return",o(s));case 13:return a.prev=13,a.t0=a.catch(0),console.log("createMAMChannel error",a.t0),a.abrupt("return",c());case 17:case"end":return a.stop()}},a,void 0,[[0,13]])}));return function(t,e){return a.apply(this,arguments)}}())}},fcXd:function(t){t.exports={a:"https://nutzdoch.einfachiota.de"}}}]);