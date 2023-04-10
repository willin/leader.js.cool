__NUXT_JSONP__("/experience/graphql/authorization", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as){return {data:[{document:{slug:"authorization",description:"",title:"GraphQL 鉴权",position:2502,category:"经验篇-GraphQL",toc:[{id:y,depth:F,text:y},{id:z,depth:F,text:z},{id:A,depth:F,text:A}],body:{type:"root",children:[{type:b,tag:n,props:{},children:[{type:a,value:"GraphQL 项目的架构:"}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:b,tag:"img",props:{alt:"架构",src:"https:\u002F\u002Fgraphql.js.cool\u002Fimg\u002Fdiagrams\u002Fbusiness_layer.png"},children:[]}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"其中鉴权部分应当属于业务逻辑层."}]},{type:a,value:g},{type:b,tag:G,props:{id:y},children:[{type:b,tag:B,props:{href:"#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9",ariaHidden:H,tabIndex:I},children:[{type:b,tag:c,props:{className:[J,K]},children:[]}]},{type:a,value:y}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"这里是一个鉴权的例子, 作者可以管理(编辑)自己的文章, 在定义模型的时候加入了权限的判断:"}]},{type:a,value:g},{type:b,tag:S,props:{className:[T]},children:[{type:b,tag:U,props:{className:[V,W]},children:[{type:b,tag:X,props:{},children:[{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:L}]},{type:a,value:Y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:M}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:Z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,_]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:aa}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:ac}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:C},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:N}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,ae]},children:[{type:a,value:af}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,ag,D]},children:[{type:a,value:ah}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:b,tag:c,props:{className:[d,ai]},children:[{type:a,value:aj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:ak},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:am},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,an,h]},children:[{type:a,value:ao}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,ap]},children:[{type:a,value:"\u002F\u002F return the post body only if the user is the post's author"}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,l,E]},children:[{type:a,value:"if"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:a,value:O},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:P}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"&&"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:a,value:O},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:P}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:"id"}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"==="}]},{type:a,value:Q},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:"authorId"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:"\n          "},{type:b,tag:c,props:{className:[d,l,E]},children:[{type:a,value:R}]},{type:a,value:Q},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:N}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,l,E]},children:[{type:a,value:R}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l,aq,"nil"]},children:[{type:a,value:aq}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:C},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:g}]}]}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"但有个问题在于, 鉴权的逻辑不被保留完全同步, 用户通过其他方式调用(如通过 RESTful 接口)时依然需要重新鉴权."}]},{type:a,value:g},{type:b,tag:S,props:{className:[T]},children:[{type:b,tag:U,props:{className:[V,W]},children:[{type:b,tag:X,props:{},children:[{type:b,tag:c,props:{className:[d,ap]},children:[{type:a,value:"\u002F\u002FAuthorization logic lives inside postRepository"}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:L}]},{type:a,value:" postRepository "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:M}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"require"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:b,tag:c,props:{className:[d,"string"]},children:[{type:a,value:"'postRepository'"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:"\n\n"},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:L}]},{type:a,value:Y},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:M}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,l]},children:[{type:a,value:Z}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,_]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:aa}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:ab},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:ac}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:C},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:N}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,p,q]},children:[{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,ae]},children:[{type:a,value:af}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,ag,D]},children:[{type:a,value:ah}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:m}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:b,tag:c,props:{className:[d,ai]},children:[{type:a,value:aj},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:ak},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:al},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:am},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,an,h]},children:[{type:a,value:ao}]},{type:a,value:f},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:i}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,l,E]},children:[{type:a,value:R}]},{type:a,value:" postRepository"},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,"method",D,t]},children:[{type:a,value:"getBody"}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:o}]},{type:a,value:O},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:s}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:P}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:j}]},{type:a,value:Q},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:v},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:C},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:u},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:a,value:g},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:k}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:r}]},{type:b,tag:c,props:{className:[d,e]},children:[{type:a,value:w}]},{type:a,value:g}]}]}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"这样, 我们就可以将用户对象传递到下一层(业务逻辑层)去进行鉴权的处理."}]},{type:a,value:g},{type:b,tag:"adsbygoogle",props:{},children:[{type:a,value:g}]},{type:a,value:g},{type:b,tag:G,props:{id:z},children:[{type:b,tag:B,props:{href:"#%E9%89%B4%E6%9D%83%E4%B8%AD%E9%97%B4%E4%BB%B6",ariaHidden:H,tabIndex:I},children:[{type:b,tag:c,props:{className:[J,K]},children:[]}]},{type:a,value:z}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"Express 中的 GraphQL 鉴权中间件示例: "},{type:b,tag:B,props:{href:ar,rel:["nofollow","noopener","noreferrer"],target:"_blank"},children:[{type:a,value:ar}]}]},{type:a,value:g},{type:b,tag:G,props:{id:A},children:[{type:b,tag:B,props:{href:"#%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE",ariaHidden:H,tabIndex:I},children:[{type:b,tag:c,props:{className:[J,K]},children:[]}]},{type:a,value:A}]},{type:a,value:g},{type:b,tag:n,props:{},children:[{type:a,value:"完整示例项目待添加."}]}]},dir:"\u002Fzh\u002Fexperience\u002Fgraphql",path:"\u002Fzh\u002Fexperience\u002Fgraphql\u002Fauthorization",extension:".md",createdAt:as,updatedAt:as,to:"\u002Fexperience\u002Fgraphql\u002Fauthorization"},prev:{title:"MySQL 向 GraphQL 迁移",path:"\u002Fzh\u002Fexperience\u002Fgraphql\u002Fmysql",to:"\u002Fexperience\u002Fgraphql\u002Fmysql"},next:{title:"DataLoader",path:"\u002Fzh\u002Fexperience\u002Fgraphql\u002Fdataloader",to:"\u002Fexperience\u002Fgraphql\u002Fdataloader"}}],fetch:{},mutations:[]}}("text","element","span","token","punctuation"," ","\n","operator","{",",","}","keyword",":","p","(","literal-property","property",")",".","property-access","\n  ","\n      ",";","\n        ","注意事项","鉴权中间件","示例项目","a","\n    ","function","control-flow",2,"h2","true",-1,"icon","icon-link","var","=","body","context","user"," post","return","div","nuxt-content-highlight","pre","language-js","line-numbers","code"," postType ","new","class-name","GraphQLObjectType","name"," ‘Post’","fields","type","maybe-class-name","GraphQLString","function-variable","resolve","parameter","post"," args"," context"," rootValue ","arrow","=\u003E","comment","null","https:\u002F\u002Fgraphql.js.cool\u002Fgraphql-js\u002Fauthentication-and-express-middleware\u002F","2023-04-10T01:57:54.076Z")));