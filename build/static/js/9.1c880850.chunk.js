(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[9],{893:function(e,t,a){"use strict";a.r(t);var c=a(114),s=a(0),n=a(886),r=a(890),i=a(891),l=a(755),d=a(756),j=a(695),o=a(186),b=a(885),u=a(118),m=a(749),O=a.n(m),p=a(715),h=a.n(p),x=a(48),g=a(50),f=a(113),v=a.n(f),D=a.p+"static/media/addcustomerbg.fb735161.png",I=a(46),y=a(3),w=function(e){var t=e.current,a=e.updateTodo;e.loading;console.log(t,"current");var m=Object(g.g)(),p=n.a.useForm(),x=Object(c.a)(p,1)[0];Object(s.useEffect)((function(){x.setFieldsValue({owner:t.owner,title:t.title,status:t.status,description:t.description,startDate:h()(t.startDate),endDate:h()(t.endDate)})}),[x,t]);return Object(y.jsxs)(s.Fragment,{children:[Object(y.jsx)(r.a,{title:"Edit Todo",display:!0}),Object(y.jsx)("div",{className:"container",children:Object(y.jsx)(i.a,{bordered:!1,style:{width:"100%"},children:Object(y.jsxs)(l.a,{justify:"center",align:"middle",children:[Object(y.jsx)(d.a,{xs:24,sm:24,md:24,lg:14,children:Object(y.jsxs)(n.a,{form:x,labelCol:{lg:6,md:6},children:[Object(y.jsx)(n.a.Item,{label:"Project Name",name:"title",required:!0,children:Object(y.jsx)(j.a,{})}),Object(y.jsx)(n.a.Item,{label:"Assignee Name",name:"owner",required:!0,children:Object(y.jsx)(j.a,{})}),Object(y.jsx)(n.a.Item,{label:"Status",name:"status",required:!0,children:Object(y.jsxs)(o.a,{placeholder:"-Select Status-",value:!0,children:[Object(y.jsx)(o.a.Option,{value:"Todo",children:"To-Do"}),Object(y.jsx)(o.a.Option,{value:"Research",children:"Research"}),Object(y.jsx)(o.a.Option,{value:"Inprogress",children:"Inprogress"}),Object(y.jsx)(o.a.Option,{value:"Review",children:"Review"}),Object(y.jsx)(o.a.Option,{value:"completed",children:"Completed"})]})}),Object(y.jsx)(n.a.Item,{children:Object(y.jsxs)(l.a,{gutter:16,children:[Object(y.jsx)(d.a,{xs:24,md:24,lg:12,children:Object(y.jsx)(n.a.Item,{label:"Start Date",name:"startDate",labelCol:{lg:12,md:6},required:!0,children:Object(y.jsx)(b.a,{})})}),Object(y.jsx)(d.a,{xs:24,md:24,lg:12,children:Object(y.jsx)(n.a.Item,{label:"End Date",name:"endDate",labelCol:{lg:12,md:6},required:!0,children:Object(y.jsx)(b.a,{})})})]})}),Object(y.jsx)(n.a.Item,{label:"Description",name:"description",required:!0,children:Object(y.jsx)(O.a,{})}),Object(y.jsx)(n.a.Item,{children:Object(y.jsxs)(l.a,{gutter:16,justify:"end",children:[Object(y.jsx)(d.a,{children:Object(y.jsx)(u.a,{htmlType:"button",onClick:function(e){e.preventDefault(),m.goBack()},children:"Cancel"})}),Object(y.jsx)(d.a,{children:Object(y.jsx)(u.a,{type:"primary",htmlType:"submit",onClick:function(e){e.preventDefault(),x.validateFields().then((function(e){var c=e.owner,s=e.title,n=e.status,r=e.description,i=e.startDate,l=e.endDate,d={projectId:t.projectId,owner:c,title:s,status:n,description:r,startDate:i,endDate:l};console.log(d,"update data"),a(d),m.push("/app/todo/list")}))},children:"Add"})})]})})]})}),Object(y.jsx)(d.a,{className:"bgImgOfForm",md:12,lg:10,style:{display:"flex",justifyContent:"center"},children:Object(y.jsx)("img",{src:D,alt:"bgimg",width:"300",className:"img"})})]})})})]})};w.prototype={current:v.a.object.isRequired,updateTodo:v.a.func.isRequired,loading:v.a.object.isRequired};t.default=Object(x.b)((function(e){return{current:e.todo.current,loading:e.todo.loading}}),{updateTodo:I.o})(w)}}]);
//# sourceMappingURL=9.1c880850.chunk.js.map