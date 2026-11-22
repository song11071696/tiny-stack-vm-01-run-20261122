import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
function R(p,q){
let n=p.length,D=new Int32Array(256),s=0,C=new Int32Array(64),c=0,M=new Int32Array(256),o=new Uint8Array(65536),l=0,f=0,x=0,t=0;
const T=e=>[e,o.subarray(0,l)];
for(;;){
if(t==1e6)return T(10);
if(x<0||x>=n)return T(9);
let k=p[x];
if(k>7&&(k<16||k>34)&&(k<48||k>52)&&(k<64||k>65)&&(k<80||k>83))return T(5);
let m=k==1?1:k==2?4:k>47&&k<52?2:0;
if(x+m>=n)return T(9);
t++;
let y=x+1+m,u=k==7?3:k==5||k==6||k==65||(k>15&&k<35&&k!=23&&k!=27)?2:(k==3||k==4||k==23||k==27||k==49||k==50||k==64||(k>79&&k<84&&k!=82))?1:0,v=k==6||k==7?3:k==4?2:k==1||k==2||k==64||k==82||(k>15&&k<35)?1:0;
if(s<u)return T(2);
if(s-u+v>256)return T(3);
x=y;
switch(k){
case 0:return T(0);
case 1:D[s++]=(p[y-1]<<24)>>24;break;
case 2:D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{let z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{let z=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=z;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{let r=((p[y-2]|p[y-1]<<8)<<16)>>16;if(k==48||(k==49)==(D[--s]==0))x=y+r;break;}
case 51:if(c==64)return T(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;break;
case 52:if(!c)return T(8);x=C[--c];break;
case 64:{let a=D[s-1];if(a<0||a>255)return T(6);D[s-1]=M[a];break;}
case 65:{let a=D[s-1],w=D[s-2];if(a<0||a>255)return T(6);s-=2;M[a]=w;break;}
case 80:{let g=String(D[s-1]),n=g.length;if(l+n>65536)return T(11);s--;for(let j=0;j<n;j++)o[l++]=g.charCodeAt(j);break;}
case 81:if(l>65535)return T(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=f<q.length?q[f++]:-1;break;
case 83:return T(D[--s]&255);
default:{let b=D[s-1],a=D[s-2],r;
if(k==16)r=(a+b)|0;
else if(k==17)r=(a-b)|0;
else if(k==18)r=Math.imul(a,b);
else if(k==19){if(!b)return T(4);r=a==-2147483648&&b==-1?a:(a/b)|0;}
else if(k==20){if(!b)return T(4);r=b==-1?0:a%b|0;}
else if(k==21){if(!b)return T(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(k==22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0;}
else if(k==24)r=a&b;
else if(k==25)r=a|b;
else if(k==26)r=a^b;
else if(k==28)r=a<<(b&31);
else if(k==29)r=a>>(b&31);
else if(k==30)r=(a>>>(b&31))|0;
else if(k==32)r=a==b?1:0;
else if(k==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;break;}
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(I).sort()){
const[r,o]=R(readFileSync(join(I,d,"program.bin")),readFileSync(join(I,d,"input.bin")));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,"stdout.bin"),o);
writeFileSync(join(O,d,"exit.txt"),r+"\n");
}
