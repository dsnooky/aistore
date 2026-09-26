
const TAB={
Products:["Product_ID","Product_Name","Slug","Category","Price","Old_Price","Discount","Currency","Image_URL","Gallery_URLs","Short_Description","Full_Description","Shopee_Link","TikTok_Link","Lazada_Link","Featured","Status","Badge","Rating","Reviews","Stock_Label","Sort_Order","Date_Added","AI_Title","AI_Description","AI_Hooks","AI_Caption","SEO_Title","SEO_Description","Keywords","UTM_Campaign"],
Categories:["Category_ID","Category_Name","Slug","Description","Image_URL","Status","Sort_Order"],
Settings:["Key","Value"],
Banners:["Banner_ID","Title","Subtitle","Image_URL","Button_Text","Button_Link","Position","Status","Sort_Order"],
Campaigns:["Campaign_ID","Name","Start_Date","End_Date","Platform","Status","UTM_Source","UTM_Medium","UTM_Campaign"],
Content_Queue:["Content_ID","Product_ID","Platform","Content_Type","Caption","Media_URL","Destination_URL","Scheduled_At","Status","Published_URL","Created_At"],
Click_Tracking:["Timestamp","Product_ID","Product_Name","Platform","Destination_URL","Referrer","Device","Campaign","Session_ID"]
};
function ss(){return SpreadsheetApp.getActiveSpreadsheet()}
function sheet(n){let s=ss().getSheetByName(n);if(!s)throw Error("Missing sheet: "+n);return s}
function rows(n){let s=sheet(n),v=s.getDataRange().getValues();if(v.length<2)return[];let h=v[0].map(String);return v.slice(1).filter(r=>r.some(x=>x!=="")).map(r=>{let o={};h.forEach((k,i)=>o[k]=r[i]);return o})}
function out(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function doGet(e){let p=e.parameter||{},a=p.action||"store";try{
 if(a==="store")return out(store());
 if(a==="admin")return out({ok:true,products:rows("Products"),categories:rows("Categories"),campaigns:rows("Campaigns"),content:rows("Content_Queue"),stats:stats()});
 if(a==="product")return out({ok:true,product:rows("Products").find(x=>String(x.Product_ID)===String(p.id)||String(x.Slug)===String(p.slug))||null});
 if(a==="stats")return out({ok:true,stats:stats()});
 if(a==="content")return out({ok:true,content:rows("Content_Queue")});
 return out({ok:false,error:"Unknown action"});
}catch(e){return out({ok:false,error:String(e)})}}
function doPost(e){try{let b=JSON.parse(e.postData.contents||"{}"),a=b.action;
 if(a==="saveProduct")return out(save("Products",b.product||{},"Product_ID"));
 if(a==="deleteProduct")return out(del("Products","Product_ID",b.id));
 if(a==="saveCampaign")return out(save("Campaigns",b.campaign||{},"Campaign_ID"));
 if(a==="saveContent")return out(save("Content_Queue",b.content||{},"Content_ID"));
 if(a==="deleteContent")return out(del("Content_Queue","Content_ID",b.id));
 if(a==="track")return out(track(b));
 if(a==="bulkProducts")return out({ok:true,results:(b.products||[]).map(x=>save("Products",x,"Product_ID"))});
 return out({ok:false,error:"Unknown action"});
}catch(e){return out({ok:false,error:String(e)})}}
function store(){let settings={};rows("Settings").forEach(x=>settings[x.Key]=x.Value);return{ok:true,settings,products:rows("Products").filter(x=>String(x.Status).toLowerCase()!=="inactive"),categories:rows("Categories").filter(x=>String(x.Status).toLowerCase()!=="inactive"),banners:rows("Banners").filter(x=>String(x.Status).toLowerCase()!=="inactive")}}
function stats(){let c=rows("Click_Tracking"),p=rows("Products"),q=rows("Content_Queue"),bp={},bprod={};c.forEach(x=>{let a=String(x.Platform||"Other"),b=String(x.Product_Name||x.Product_ID||"Unknown");bp[a]=(bp[a]||0)+1;bprod[b]=(bprod[b]||0)+1});return{products:p.filter(x=>String(x.Status).toLowerCase()!=="inactive").length,clicks:c.length,content:q.length,published:q.filter(x=>String(x.Status).toLowerCase()==="published").length,scheduled:q.filter(x=>String(x.Status).toLowerCase()==="scheduled").length,shopee:bp.Shopee||0,tiktok:bp["TikTok Shop"]||0,lazada:bp.Lazada||0,byProduct:bprod}}
function track(b){sheet("Click_Tracking").appendRow([new Date(),b.product_id||"",b.product_name||"",b.platform||"",b.url||"",b.referrer||"",b.device||"",b.campaign||"",b.session_id||""]);return{ok:true}}
function save(n,o,idf){let s=sheet(n),h=s.getRange(1,1,1,s.getLastColumn()).getValues()[0].map(String);if(!o[idf])o[idf]=(n==="Products"?"P":"ID")+Date.now();if(n==="Products"&&!o.Slug)o.Slug=slug(o.Product_Name||o[idf]);let d=s.getDataRange().getValues(),ix=h.indexOf(idf),row=-1;for(let i=1;i<d.length;i++)if(String(d[i][ix])===String(o[idf])){row=i+1;break}let v=h.map(k=>o[k]!==undefined?o[k]:"");if(row<0)s.appendRow(v);else s.getRange(row,1,1,h.length).setValues([v]);return{ok:true,id:o[idf]}}
function del(n,idf,id){let s=sheet(n),d=s.getDataRange().getValues(),ix=d[0].map(String).indexOf(idf);for(let i=1;i<d.length;i++)if(String(d[i][ix])===String(id)){s.deleteRow(i+1);return{ok:true}}return{ok:false,error:"Not found"}}
function slug(s){return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
