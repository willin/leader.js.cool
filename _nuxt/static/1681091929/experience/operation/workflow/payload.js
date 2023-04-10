__NUXT_JSONP__("/experience/operation/workflow", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y){return {data:[{document:{slug:"workflow",description:"",title:"CI 持续交付",position:2204,category:"经验篇-运维",toc:[{id:B,depth:r,text:C},{id:D,depth:r,text:E},{id:F,depth:r,text:G},{id:p,depth:v,text:p},{id:H,depth:r,text:I},{id:s,depth:v,text:s},{id:J,depth:v,text:p}],body:{type:"root",children:[{type:b,tag:"h1",props:{id:K},children:[{type:b,tag:f,props:{href:"#%E6%8C%81%E7%BB%AD%E4%BA%A4%E4%BB%98%E5%B7%A5%E4%BD%9C%E6%B5%81",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:K}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"阿里云持续交付平台： "},{type:b,tag:f,props:{href:L,rel:["nofollow","noopener","noreferrer"],target:"_blank"},children:[{type:a,value:L}]}]},{type:a,value:c},{type:b,tag:t,props:{id:B},children:[{type:b,tag:f,props:{href:"#1%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BB%BB%E5%8A%A1",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:C}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow1.png"},children:[]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"点击红色箭头所指圆圈位置设置触发器任务。"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"一般情况下，需要部署到产品环境是侦听"},{type:b,tag:q,props:{},children:[{type:a,value:M}]},{type:a,value:"分支，集成测试可以为其他开发分支。"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"本文示例以一套完整的自动化测试部署流程为例，选择了"},{type:b,tag:q,props:{},children:[{type:a,value:M}]},{type:a,value:"分支。"}]},{type:a,value:c},{type:b,tag:t,props:{id:D},children:[{type:b,tag:f,props:{href:"#2%E4%BB%A3%E7%A0%81%E6%A3%80%E5%87%BA",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:E}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow2.png"},children:[]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"这里的信息都是自动填入的，无需做更改。"}]},{type:a,value:c},{type:b,tag:t,props:{id:F},children:[{type:b,tag:f,props:{href:"#3%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:G}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"如果是简单的测试脚本，如单元测试，不需要数据库的。可以直接使用阿里云的编译测试功能，如下图所示："}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow3-1.png"},children:[]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"如果有专门的测试服务，可以用如下图所示方式进行测试："}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow3-2.png"},children:[]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"提示：CRP 提供的测试环境是 Ubuntu，未安装数据库，但据说可以自己安装，目前还没有尝试过。"}]},{type:a,value:c},{type:b,tag:"adsbygoogle",props:{},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:w,props:{id:p},children:[{type:b,tag:f,props:{href:"#%E6%B3%A8%E6%84%8F%E7%82%B9",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:p}]},{type:a,value:c},{type:b,tag:N,props:{id:O},children:[{type:b,tag:f,props:{href:"#%E8%87%AA%E5%8A%A8%E5%AE%8C%E6%88%90",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:O}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"左侧活动信息中，【自动完成】选项，如果勾选，则测试通过就会自动进入下一步（如部署产品环境），否则会停在这里，需要手动触发，如下图所示："}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow3-3.png"},children:[]}]},{type:a,value:c},{type:b,tag:N,props:{id:P},children:[{type:b,tag:f,props:{href:"#%E8%A1%A8%E5%8D%95%E9%A1%B9",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:P}]},{type:a,value:c},{type:b,tag:u,props:{id:Q},children:[{type:b,tag:f,props:{href:"#%E7%9B%AE%E6%A0%87%E6%9C%BA%E5%99%A8",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:Q}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"填入测试服务器 ip。"}]},{type:a,value:c},{type:b,tag:u,props:{id:R},children:[{type:b,tag:f,props:{href:"#%E9%83%A8%E7%BD%B2%E8%B7%AF%E5%BE%84",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:R}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"可以是用户目录，如 "},{type:b,tag:q,props:{},children:[{type:a,value:"\u002Fhome\u002Fuser\u002F"}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"或是项目目录，如 "},{type:b,tag:q,props:{},children:[{type:a,value:"\u002Fhome\u002Fuser\u002Fproject"}]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"无太大影响，因为【部署命令】中可以使用 "},{type:b,tag:q,props:{},children:[{type:a,value:S}]},{type:a,value:" 命令。"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"一般这里我填入的是用户目录。"}]},{type:a,value:c},{type:b,tag:u,props:{id:T},children:[{type:b,tag:f,props:{href:"#%E9%83%A8%E7%BD%B2%E5%91%BD%E4%BB%A4",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:T}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"流程："}]},{type:a,value:c},{type:b,tag:U,props:{start:0},children:[{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"根据需要，启动、重启数据库\u002F缓存服务（一般可以不用放在自动测试流程里）"}]},{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"进入项目目录"}]},{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"更新代码，新建当前版本分支，以备回滚操作"}]},{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"更新依赖项"}]},{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"启动测试脚本"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"Shell 命令"}]},{type:a,value:c},{type:b,tag:"div",props:{className:["nuxt-content-highlight"]},children:[{type:b,tag:"pre",props:{className:["language-bash","line-numbers"]},children:[{type:b,tag:q,props:{},children:[{type:b,tag:d,props:{className:[k,x,y]},children:[{type:a,value:S}]},{type:a,value:" \u002Fhome\u002Fxxx-user\u002Fxxx-project\u002F\n"},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:z}]},{type:a,value:V},{type:b,tag:d,props:{className:[k,x,y]},children:[{type:a,value:"."}]},{type:a,value:c},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:z}]},{type:a,value:" fetch\n"},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:z}]},{type:a,value:V},{type:b,tag:d,props:{className:[k,"variable"]},children:[{type:a,value:"$CODE_VERSION"}]},{type:a,value:c},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:A}]},{type:a,value:" -d "},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:"install"}]},{type:a,value:c},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:A}]},{type:a,value:" update\n"},{type:b,tag:d,props:{className:[k,o]},children:[{type:a,value:A}]},{type:a,value:" "},{type:b,tag:d,props:{className:[k,x,y]},children:[{type:a,value:"test"}]},{type:a,value:c},{type:b,tag:d,props:{className:[k,W]},children:[{type:a,value:"# 产品环境加入："}]},{type:a,value:c},{type:b,tag:d,props:{className:[k,W]},children:[{type:a,value:"# pm2 reload xxx-server-name"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:u,props:{id:X},children:[{type:b,tag:f,props:{href:"#%E7%99%BB%E5%BD%95%E7%94%A8%E6%88%B7",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:X}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"SSH 登入服务的用户名称"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"提示: 系统需要您的目标机器添加部署公钥方可执行部署任务。请将公钥拷贝到服务器部署用户目录的$HOME\u002F.ssh\u002Fauthorized_keys 文件中。"}]},{type:a,value:c},{type:b,tag:t,props:{id:H},children:[{type:b,tag:f,props:{href:"#4%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:I}]},{type:a,value:c},{type:b,tag:w,props:{id:s},children:[{type:b,tag:f,props:{href:"#%E6%96%B0%E5%BB%BA%E6%B5%81%E7%A8%8B",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:s}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"模板默认流程只有两个，需要新建的时候根据下图："}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow4-1.png"},children:[]}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:a,value:"箭头所指小圆圈部分单击拖拽新建一个工作流，并将结束定向到新的工作流上。"}]},{type:a,value:c},{type:b,tag:e,props:{},children:[{type:b,tag:l,props:{alt:m,src:"\u002Fexperience\u002Foperation\u002Fworkflow4-2.png"},children:[]}]},{type:a,value:c},{type:b,tag:w,props:{id:J},children:[{type:b,tag:f,props:{href:"#%E6%B3%A8%E6%84%8F%E7%82%B9-1",ariaHidden:g,tabIndex:h},children:[{type:b,tag:d,props:{className:[i,j]},children:[]}]},{type:a,value:p}]},{type:a,value:c},{type:b,tag:U,props:{},children:[{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"【自动触发】、【自动完成】勾选上，如果需要，还可以打开【异常通知】"}]},{type:a,value:c},{type:b,tag:n,props:{},children:[{type:a,value:"【目标机器】如有多台负载均衡横向扩展的相同环境机器以逗号分隔"}]},{type:a,value:c}]}]},dir:"\u002Fzh\u002Fexperience\u002Foperation",path:"\u002Fzh\u002Fexperience\u002Foperation\u002Fworkflow",extension:".md",createdAt:Y,updatedAt:Y,to:"\u002Fexperience\u002Foperation\u002Fworkflow"},prev:{title:"Later 计划任务",path:"\u002Fzh\u002Fexperience\u002Foperation\u002Flater",to:"\u002Fexperience\u002Foperation\u002Flater"},next:{title:"重启服务",path:"\u002Fzh\u002Fexperience\u002Foperation\u002Frestarter",to:"\u002Fexperience\u002Foperation\u002Frestarter"}}],fetch:{},mutations:[]}}("text","element","\n","span","p","a","true",-1,"icon","icon-link","token","img","Image","li","function","注意点","code",2,"新建流程","h2","h5",3,"h3","builtin","class-name","git","npm","1触发器任务","1.触发器任务","2代码检出","2.代码检出","3集成测试","3.集成测试","4自动部署","4.自动部署","注意点-1","持续交付工作流","https:\u002F\u002Fcrp.aliyun.com\u002F","Master","h4","自动完成","表单项","目标机器","部署路径","cd","部署命令","ol"," checkout ","comment","登录用户","2023-04-10T01:57:54.076Z")));