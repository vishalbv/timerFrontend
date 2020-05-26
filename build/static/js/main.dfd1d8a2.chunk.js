(this.webpackJsonptimer=this.webpackJsonptimer||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(17)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(7),s=n.n(i),o=(n(14),n(15),n(1)),m=n(8),c=n(2),l=n(3),u=n(5),h=n(4),d=(n(16),function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).Address="https://mybackcodetimer.herokuapp.com/",a.getData=function(){fetch(a.Address+"/getData").then((function(e){return e.json()})).then((function(e){a.setState({timers:e}),console.log(a.state)}))},a.addTimer=function(e){var t={name:e.name,time:e.time,startTime:0,status:"A"},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch(a.Address+"/addTimer",n).then((function(e){return e.json()})).then((function(e){a.setState({timers:[].concat(Object(m.a)(a.state.timers),[Object(o.a)(Object(o.a)({},t),{},{_id:e._id,displayTime:"Newly Added"})])})}))},a.resetTimer=function(e){for(var t=a.state.timers,n=0;n<t.length;n++)t[n].name===e.name&&(t[n].status=0,t[n].displayTime=0);a.setState({timers:t})},a.timerStatusChange=function(e){var t=e.val,n=e.st,r=void 0,i=void 0,s=void 0;"S"===n?(r=(new Date).getTime(),i="S",s=t.displayTime):"R"===n?(r=0,i="R",s=0):"D"===n?(r=t.startTime,i="D"):"E"===n&&(r=t.startTime,i="E",s="EXPIRED");var m=Object(o.a)(Object(o.a)({},t),{},{startTime:r,status:i,displayTime:s}),c={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)};fetch(a.Address+"/updateTimer",c).then((function(e){return e.json()})).then((function(e){if("D"===n){var m=a.state.timers.filter((function(e,n){return e._id!==t._id}));a.setState({timers:m})}else{for(var c=a.state.timers,l=0;l<c.length;l++)c[l]._id===t._id&&(c[l]=Object(o.a)(Object(o.a)({},c[l]),{},{startTime:r,status:i,displayTime:s}));a.setState({timers:c})}}))},a.state={value:"",timers:[]},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.getData();setInterval((function(){e.refreshData(e.state.timers)}),1e3)}},{key:"getDisplayTime",value:function(e,t){var n=new Date(e);n.setHours(n.getHours()+parseInt(t));var a=n.getTime()-(new Date).getTime(),r=Math.floor(a%864e5/36e5),i=Math.floor(a%36e5/6e4),s=Math.floor(a%6e4/1e3),o="S";return a<0&&(o="E"),{displayTime:r<0?"expired":r+"h"+i+"m"+s+"s",status:o}}},{key:"refreshData",value:function(e){for(var t=0;t<e.length;t++)"S"===e[t].status&&(e[t]=Object(o.a)(Object(o.a)({},e[t]),this.getDisplayTime(e[t].startTime,e[t].time)));this.setState({timers:e})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"BOSS TIMERS"),r.a.createElement(f,{addTimer:this.addTimer}),r.a.createElement(p,{timers:this.state.timers,timerStatusChange:this.timerStatusChange}))}}]),n}(a.Component)),f=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).timer={},e.handleChange=function(t){var n=t.target;"name"===n.name?e.timer.name=n.value:"time"===n.name&&(e.timer.time=n.value)},e.handleSubmit=function(t){t.preventDefault(),e.props.addTimer(e.timer)},e}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("form",null,r.a.createElement("label",null,"Name:",r.a.createElement("input",{type:"text",name:"name",onChange:this.handleChange})),r.a.createElement("label",null,"time:",r.a.createElement("input",{type:"text",name:"time",onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Submit",onClick:this.handleSubmit}))}}]),n}(a.Component),p=function(e){Object(u.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).timer={},e}return Object(l.a)(n,[{key:"handleEvent",value:function(e,t){this.props.timerStatusChange({val:e,st:t})}},{key:"render",value:function(){var e=this,t=function(t){return r.a.createElement("span",{className:"timerBlock"},r.a.createElement("h1",null,t.timer.name),r.a.createElement("h2",null,t.timer.displayTime),r.a.createElement("button",{onClick:function(){return e.handleEvent(t.timer,"R")}},"Reset"),r.a.createElement("button",{onClick:function(){return e.handleEvent(t.timer,"S")}},"start"),r.a.createElement("button",{onClick:function(){return e.handleEvent(t.timer,"D")}},"Delete"))};return r.a.createElement("div",{className:"timers"},this.props.timers.map((function(e,n){return r.a.createElement(t,{key:n,timer:e})})))}}]),n}(a.Component),v=d;var b=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.dfd1d8a2.chunk.js.map