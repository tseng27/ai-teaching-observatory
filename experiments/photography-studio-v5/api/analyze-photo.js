'use strict';
// 只接受學生主動提交的縮小 JPEG；不記錄或保存影像。
// 此示範版不是正式班級登入系統，部署正式班級前需加上身分驗證與集中式限流。
const WINDOW_MS=60000,MAX_PER_WINDOW=3;
const visits=new Map();
function respond(res,status,body){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');return res.status(status).json(body)}
function cleaned(v,max=160){return typeof v==='string'?v.trim().slice(0,max):''}
module.exports=async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return respond(res,405,{success:false,message:'僅支援照片分析請求'})}
  const origin=req.headers.origin||'';
  const host=req.headers.host||'';
  if(!origin||origin!==('https://'+host))return respond(res,403,{success:false,message:'請從原課程網站提交影像'});
  const ip=String(req.headers['x-forwarded-for']||'anonymous').split(',')[0].trim().slice(0,80);
  const now=Date.now();for(const [k,v] of visits)if(now-v.start>WINDOW_MS)visits.delete(k);
  const v=visits.get(ip)||{start:now,count:0};
  if(now-v.start>WINDOW_MS){v.start=now;v.count=0}
  if(v.count>=MAX_PER_WINDOW)return respond(res,429,{success:false,message:'每分鐘最多分析三次，請稍後再試'});
  v.count++;visits.set(ip,v);
  const p=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
  if(!['campus','sony','mini'].includes(p.kind)||typeof p.image!=='string'||p.image.length>1700000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(p.image))
    return respond(res,400,{success:false,message:'請上傳合適大小的 JPEG 校園照片'});
  const auth=process.env.AI_GATEWAY_API_KEY||process.env.VERCEL_OIDC_TOKEN||req.headers['x-vercel-oidc-token'];
  if(!auth)return respond(res,503,{success:false,message:'AI 服務尚未啟用，請教師設定 Vercel AI Gateway 存取'});
  const subject=p.kind==='mini'?'微縮攝影：主體小人物、物件比例、拍攝高度、故事性和背景關係':p.kind==='sony'?'Sony α7 III 校園實拍：主體焦點、景深、構圖和光線':'校園即時攝影：主體位置、引導線、畫面平衡、前後景與光影';
  const instruction=[
    '你是台灣高中美術課的 AI 攝影觀察教練。請看學生當下實拍的照片，使用繁體中文（台灣用語）。',
    '只根據真正看得見的影像內容提供精簡、具體的學習觀察，不猜測相機設定、EXIF、人物身分、學校名稱、拍攝動機或場景歷史。',
    '不給分、不代寫學生答案、不宣稱構圖標準唯一。不必硬套三分法，若線索不明確須承認。',
    '不描述人物身份或外貌，且不要引導拍攝可辨識的人臉與個資。',
    '焦點：'+subject,
    '僅輸出一個合法 JSON 物件，無 Markdown，欄位必須是 subject, composition, lighting, viewpoint, tryNext 和 questions。',
    '前五欄各為 25～85 字的具體觀察或攝影實驗。questions 是恰好 3 個不同問題的字串陣列，每題 18～55 字。',
    '三題分別要求學生：(1) 指出照片中可見的構圖證據；(2) 解釋自己拍攝當下的取景選擇以及是否認同 AI 觀察；(3) 決定下一張要如何改拍與預期效果。',
    '不要代答；以鼓勵探究但不奉承的語氣書寫。'
  ].join('\n');
  try{
    const ctl=new AbortController();const stop=setTimeout(()=>ctl.abort(),27000);
    let response;
    try{response=await fetch('https://ai-gateway.vercel.sh/v1/chat/completions',{
      method:'POST',signal:ctl.signal,headers:{Authorization:'Bearer '+auth,'Content-Type':'application/json'},
      body:JSON.stringify({model:process.env.AI_COACH_MODEL||'openai/gpt-4.1-mini',stream:false,max_tokens:920,temperature:.3,messages:[{role:'system',content:instruction},{role:'user',content:[{type:'text',text:'請根據這張照片，提出專屬這位學生的攝影觀察與開放式引導問題。'},{type:'image_url',image_url:{url:p.image,detail:'auto'}}]}]})
    })}finally{clearTimeout(stop)}
    if(!response.ok){
      // 不將金鑰、外部服務內部細節交給瀏覽器
      if(response.status===429)return respond(res,503,{success:false,message:'AI 模型使用額度暫時已滿，請稍後再試'});
      return respond(res,503,{success:false,message:'AI 服務目前無法完成分析，請教師檢查 AI Gateway 設定'});
    }
    const json=await response.json(),raw=json.choices&&json.choices[0]&&json.choices[0].message&&json.choices[0].message.content;
    if(typeof raw!=='string')throw Error('NO_TEXT');
    const match=raw.match(/\{[\s\S]*\}/);if(!match)throw Error('NO_JSON');
    const obj=JSON.parse(match[0]);
    const feedback={subject:cleaned(obj.subject),composition:cleaned(obj.composition),lighting:cleaned(obj.lighting),viewpoint:cleaned(obj.viewpoint),tryNext:cleaned(obj.tryNext),questions:Array.isArray(obj.questions)?obj.questions.slice(0,3).map(x=>cleaned(x)):[]};
    if(!feedback.subject||!feedback.composition||feedback.questions.length!==3||feedback.questions.some(x=>x.length<5))throw Error('INVALID_OUTPUT');
    return respond(res,200,{success:true,feedback});
  }catch(err){return respond(res,503,{success:false,message:'AI 觀察暫時失敗，請稍後再試或先完成自主觀察'})}
};