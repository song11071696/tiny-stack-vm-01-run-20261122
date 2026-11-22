import{readFileSync as r,mkdirSync as k,writeFileSync as w}from"node:fs";
let I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",F=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>a/b|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,a=>-a|0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,a=>~a,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>a>>>b|0,0,(a,b)=>a==b|0,(a,b)=>a<b|0,(a,b)=>(a>>>0)<(b>>>0)|0];
for(let j=1;j<41;j++){
let d="i"+("00"+j).slice(-3),p=r(I+"/"+d+"/program.bin"),q=r(I+"/"+d+"/input.bin"),s=[],c=[],m=Array(256).fill(0),o=[],pc=0,ip=0,st=0,e=0,g=(n,t)=>{if(s.length<n)throw 2;if(s.length-n+t>256)throw 3};
try{for(;;){
if(st++>=1e6)throw 10;
if(pc<0|pc>=p.length)throw 9;
let op=p[pc],L=op==1?1:op==2?4:op>47&op<52?2:0;
if(pc+1+L>p.length)throw 9;
let v=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;
pc+=1+L;
if(op==0)throw 0;
else if(op<3){g(0,1);s.push(op==1?(v<<24)>>24:v);}
else if(op==3){g(1,0);s.pop();}
else if(op==4){g(1,2);s.push(s[s.length-1]);}
else if(op==5){g(2,2);s.push(s.splice(s.length-2,1)[0]);}
else if(op==6){g(2,3);s.push(s[s.length-2]);}
else if(op==7){g(3,3);s.push(s.splice(s.length-3,1)[0]);}
else if(op>15&op<35&op!=31){
if(op==23||op==27){g(1,1);let t=s.length-1;s[t]=F[op-16](s[t]);}
else{g(2,1);let b=s.pop();if(op>18&op<23&!b)throw 4;s.push(F[op-16](s.pop(),b));}}
else if(op>47&op<52){
if(op==48)pc+=((v<<16)>>16);
else if(op==51){if(c.length>63)throw 7;c.push(pc);pc=v&65535;}
else{g(1,0);let a=s.pop();if((op==49)==!a)pc+=((v<<16)>>16);}}
else if(op==52){if(!c.length)throw 8;pc=c.pop();}
else if(op==64){g(1,1);let a=s[s.length-1];if(a<0|a>255)throw 6;s[s.length-1]=m[a];}
else if(op==65){g(2,0);let a=s.pop(),t=s.pop();if(a<0|a>255)throw 6;m[a]=t;}
else if(op==80){g(1,0);let t=String(s.pop());if(o.length+t.length>65536)throw 11;o.push(...Buffer.from(t));}
else if(op==81){g(1,0);if(o.length>65535)throw 11;o.push(s.pop()&255);}
else if(op==82){g(0,1);s.push(ip<q.length?q[ip++]:-1);}
else if(op==83){g(1,0);throw s.pop()&255;}
else throw 5;
}}catch(x){e=x|0;}
k(O+"/"+d,{recursive:true});
w(O+"/"+d+"/stdout.bin",Buffer.from(o));
w(O+"/"+d+"/exit.txt",e+"");
}
