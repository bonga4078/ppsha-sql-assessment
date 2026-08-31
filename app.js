"use strict";

const schema = {
  claims: [
    ["claim_key","INTEGER","Unique claim line identifier; primary key"], ["member_number","TEXT","Principal membership number"],
    ["dependant_number","INTEGER","0 principal, 1 spouse, 2+ dependant"], ["service_date","DATE","Date healthcare service occurred"],
    ["settled_date","DATE","Date claim was finalised; NULL when rejected"], ["tariff_code","TEXT","Medical procedure tariff code"],
    ["icd10_code","TEXT","ICD-10 diagnosis code"], ["icd10_description","TEXT","Diagnosis description"],
    ["claimed_amount","DECIMAL","Amount submitted by provider"], ["benefit_amount","DECIMAL","Amount paid from benefits"],
    ["claim_status","TEXT","Settled or Rejected"]
  ],
  memberships: [
    ["member_number","TEXT","Membership number; primary key"], ["plan_option","TEXT","Benefit plan option"],
    ["join_date","DATE","Membership commencement date"], ["status","TEXT","Active or Terminated"],
    ["province","TEXT","Member province"], ["family_size","INTEGER","Covered beneficiaries"]
  ]
};

const memberships = [
 ["M1001","Essential","2022-02-01","Active","Gauteng",3], ["M1002","Comprehensive","2021-07-15","Active","KwaZulu-Natal",4],
 ["M1003","Core","2023-01-10","Active","Western Cape",1], ["M1004","Essential","2020-11-20","Terminated","Gauteng",2],
 ["M1005","Comprehensive","2019-04-04","Active","Eastern Cape",5], ["M1006","Core","2024-03-01","Active","Limpopo",2],
 ["M1007","Essential","2022-09-12","Active","Mpumalanga",3], ["M1008","Comprehensive","2020-06-18","Active","Gauteng",4]
];
const claims = [
 [10001,"M1001",0,"2025-01-08","2025-01-15","0190","J06.9","Acute upper respiratory infection",820,650,"Settled"],
 [10002,"M1001",1,"2025-02-12",null,"0201","K21.9","Gastro-oesophageal reflux disease",1250,0,"Rejected"],
 [10003,"M1002",2,"2025-01-20","2025-02-03","0308","S93.4","Sprain of ankle",3420,2800,"Settled"],
 [10004,"M1002",0,"2025-03-09","2025-03-22","0402","I10","Essential hypertension",980,850,"Settled"],
 [10005,"M1003",0,"2025-02-04","2025-02-09","0190","J06.9","Acute upper respiratory infection",760,610,"Settled"],
 [10006,"M1004",1,"2025-01-18",null,"0505","M54.5","Low back pain",2100,0,"Rejected"],
 [10007,"M1005",3,"2025-03-14","2025-03-30","0610","A09","Gastroenteritis",1850,1500,"Settled"],
 [10008,"M1005",0,"2025-04-02","2025-04-18","0402","I10","Essential hypertension",1050,900,"Settled"],
 [10009,"M1006",1,"2025-04-12",null,"0707","L30.9","Dermatitis",1340,0,"Rejected"],
 [10010,"M1007",0,"2025-05-01","2025-05-06","0190","J06.9","Acute upper respiratory infection",890,720,"Settled"],
 [10011,"M1008",2,"2025-05-11","2025-05-28","0808","H10.9","Conjunctivitis",1170,980,"Settled"],
 [10012,"M1008",0,"2025-06-05","2025-06-27","0901","E11.9","Type 2 diabetes mellitus",4500,3900,"Settled"],
 [10013,"M1002",1,"2025-06-17",null,"0610","A09","Gastroenteritis",1600,0,"Rejected"],
 [10014,"M1005",2,"2025-07-03","2025-07-15","0308","S93.4","Sprain of ankle",2980,2400,"Settled"],
 [10015,"M1007",1,"2025-07-19","2025-08-01","0505","M54.5","Low back pain",2400,1900,"Settled"],
 [10016,"M1001",2,"2025-08-08","2025-08-20","0808","H10.9","Conjunctivitis",990,790,"Settled"],
 [10017,"M1003",0,"2025-08-21",null,"0707","L30.9","Dermatitis",1450,0,"Rejected"],
 [10018,"M1006",0,"2025-09-13","2025-09-21","0201","K21.9","Gastro-oesophageal reflux disease",2300,1800,"Settled"],
 [10019,"M1008",1,"2025-10-02","2025-10-25","0901","E11.9","Type 2 diabetes mellitus",5100,4300,"Settled"],
 [10020,"M1005",4,"2025-10-15","2025-10-21","0190","J06.9","Acute upper respiratory infection",680,540,"Settled"]
];

const questions = [
 {difficulty:"Easy", title:"Paid claims register", description:"The finance team needs a register of all claims that were successfully paid out. They want to see the claim key, member number, date of service, and the benefit amount — sorted by claim key for easy look-up.", requirements:["Show the claim reference, member number, service date, and benefit amount.","Only include claims that were paid out (settled).","Sort ascending by claim reference."], hint:"Filter the claim_status column using WHERE.", starter:"SELECT\n  \nFROM claims\n", answer:"SELECT claim_key, member_number, service_date, benefit_amount FROM claims WHERE claim_status='Settled' ORDER BY claim_key", ordered:true},
 {difficulty:"Easy", title:"Expensive provider charges", description:"Management wants to flag claims where the provider charged more than R2 000. List each claim's reference, procedure code, and the amount charged, with the most expensive claims appearing first.", requirements:["Show the claim reference, procedure code, and amount charged.","Only include claims exceeding R2 000.","Display the most expensive claims first."], hint:"Use a numeric comparison and ORDER BY … DESC.", starter:"SELECT\n  \nFROM claims\n", answer:"SELECT claim_key, tariff_code, claimed_amount FROM claims WHERE claimed_amount > 2000 ORDER BY claimed_amount DESC", ordered:true},
 {difficulty:"Easy", title:"Claims outcome summary", description:"The operations manager has asked: \"How many of our claims were settled versus rejected?\" Provide a simple summary showing the count for each outcome.", requirements:["Show each claim outcome and the number of claims.","Alias the count column as total_claims."], hint:"Every non-aggregated selected column must appear in the GROUP BY.", starter:"SELECT\n  \nFROM claims\n", answer:"SELECT claim_status, COUNT(*) AS total_claims FROM claims GROUP BY claim_status", ordered:false},
 {difficulty:"Medium", title:"Plan cost analysis", description:"The product team wants to understand how much each benefit plan is costing the scheme. For active members only, summarise the number of claims submitted, the total amounts charged by providers, and the total benefits paid — broken down by plan option, with the most expensive plans listed first. Round monetary values to two decimals.", requirements:["Summarise by benefit plan option.","Show number of claims, total charged, and total paid.","Exclude terminated members.","Round monetary totals to two decimal places and sort by total paid descending."], hint:"Join claims to memberships on the member number, then group by plan option.", starter:"SELECT\n  \nFROM claims c\n", answer:"SELECT m.plan_option, COUNT(*) AS total_claims, ROUND(SUM(c.claimed_amount),2) AS total_claimed, ROUND(SUM(c.benefit_amount),2) AS total_benefit FROM claims c JOIN memberships m ON c.member_number=m.member_number WHERE m.status='Active' GROUP BY m.plan_option ORDER BY total_benefit DESC", ordered:true},
 {difficulty:"Medium", title:"Settlement processing time", description:"Operations is investigating service levels and wants to know the average number of days it takes to settle a claim for each benefit plan. Which plans have the longest processing times? Round the average to one decimal place and list from slowest to fastest.", requirements:["Show the benefit plan and its average days to settle.","Only include claims that were actually settled.","Round the average to one decimal place.","Sort from longest to shortest turnaround."], hint:"In SQLite, use julianday(end_date) − julianday(start_date) to get the number of days between two dates.", starter:"SELECT\n  \nFROM claims c\n", answer:"SELECT m.plan_option, ROUND(AVG(julianday(c.settled_date)-julianday(c.service_date)),1) AS avg_days_to_settle FROM claims c JOIN memberships m ON c.member_number=m.member_number WHERE c.claim_status='Settled' GROUP BY m.plan_option ORDER BY avg_days_to_settle DESC", ordered:true},
 {difficulty:"Medium", title:"Rejection risk by plan", description:"The risk team is concerned about claim rejections and wants to compare plans. For each benefit plan, what percentage of claims are being rejected? Show the total claims alongside the rejection rate (rounded to one decimal).", requirements:["Summarise by benefit plan option.","Show total claims and the rejection rate as a percentage.","Round the rejection rate to one decimal place."], hint:"SUM(CASE WHEN … THEN 1 ELSE 0 END) can count rows matching a condition inside an aggregate.", starter:"SELECT\n  \nFROM claims c\n", answer:"SELECT m.plan_option, COUNT(*) AS total_claims, ROUND(100.0*SUM(CASE WHEN c.claim_status='Rejected' THEN 1 ELSE 0 END)/COUNT(*),1) AS rejection_rate FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option", ordered:false},
 {difficulty:"Medium", title:"High-frequency diagnoses", description:"The clinical team wants to know which diagnoses are driving the most activity. Identify conditions that have been claimed for more than once, showing the diagnosis code, description, number of claims, and total amounts charged — with the most frequent conditions listed first.", requirements:["Show diagnosis code, description, claim count, and total charged.","Only include diagnoses with more than one claim.","Sort by claim count descending, then diagnosis code ascending."], hint:"Use HAVING (not WHERE) to filter on aggregated values.", starter:"SELECT\n  \nFROM claims\n", answer:"SELECT icd10_code, icd10_description, COUNT(*) AS claim_count, SUM(claimed_amount) AS total_claimed FROM claims GROUP BY icd10_code, icd10_description HAVING COUNT(*) > 1 ORDER BY claim_count DESC, icd10_code ASC", ordered:true},
 {difficulty:"Hard", title:"Highest-cost member per plan", description:"The executive team wants to identify the single member driving the most cost within each benefit plan. For every plan option, find the member with the highest total claimed amount and show the plan, member number, and their total.", requirements:["Aggregate total claimed by plan and member.","Identify only the top-spending member in each plan.","Return plan option, member number, and total claimed."], hint:"Use ROW_NUMBER() OVER (PARTITION BY … ORDER BY …) inside a CTE, then filter to rank 1.", starter:"SELECT\n  \nFROM claims c\nJOIN memberships m\n  ON c.member_number = m.member_number\n", answer:"WITH member_totals AS (SELECT m.plan_option, c.member_number, SUM(c.claimed_amount) AS total_claimed FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option,c.member_number), ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY plan_option ORDER BY total_claimed DESC) AS rn FROM member_totals) SELECT plan_option, member_number, total_claimed FROM ranked WHERE rn=1", ordered:false},
 {difficulty:"Hard", title:"Monthly claims trend", description:"Finance needs a month-by-month view of total amounts claimed to spot seasonal patterns. For each month, they also want to see the previous month's total alongside the current one so they can track movement. Format months as YYYY-MM and sort chronologically.", requirements:["Show each month, its total claimed, and the previous month's total.","Format the month as YYYY-MM.","Sort in chronological order."], hint:"Aggregate by month in a CTE first, then use the LAG window function over the result.", starter:"SELECT\n  \nFROM claims\n", answer:"WITH monthly AS (SELECT strftime('%Y-%m',service_date) AS service_month, SUM(claimed_amount) AS monthly_claimed FROM claims GROUP BY strftime('%Y-%m',service_date)) SELECT service_month, monthly_claimed, LAG(monthly_claimed) OVER(ORDER BY service_month) AS previous_month_claimed FROM monthly ORDER BY service_month", ordered:true},
 {difficulty:"Hard", title:"Above-average benefit members", description:"The actuarial team wants to identify members who are costing more than average for their plan. Find members whose total benefits paid exceed the average member total within the same plan option. Show the plan, member number, their total benefit, and the plan's average (rounded to two decimals) — sorted by plan option, then highest benefit first.", requirements:["Calculate total benefits per member.","Compare each member to their plan's average.","Only include members above their plan average.","Round the plan average to two decimals; sort by plan then total benefit descending."], hint:"Use a CTE for member totals, then apply AVG(…) OVER (PARTITION BY plan_option) as a window function to compare.", starter:"SELECT\n  \nFROM claims c\nJOIN memberships m\n  ON c.member_number = m.member_number\n", answer:"WITH member_totals AS (SELECT m.plan_option,c.member_number,SUM(c.benefit_amount) AS total_benefit FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option,c.member_number), compared AS (SELECT *, AVG(total_benefit) OVER(PARTITION BY plan_option) AS plan_avg FROM member_totals) SELECT plan_option,member_number,total_benefit,ROUND(plan_avg,2) AS plan_avg_benefit FROM compared WHERE total_benefit > plan_avg ORDER BY plan_option,total_benefit DESC", ordered:true}
];

let db, editor, current=0, currentTable="claims";
const progress=JSON.parse(localStorage.getItem("sqlAssessmentProgress") || '{"passed":{},"answers":{}}');
const $=id=>document.getElementById(id);

function initEditor(){
 ace.config.set("basePath","https://cdn.jsdelivr.net/npm/ace-builds@1.36.0/src-min-noconflict/");
 editor=ace.edit("editor"); editor.session.setMode("ace/mode/sql"); editor.setTheme(document.documentElement.dataset.theme==="dark"?"ace/theme/tomorrow_night":"ace/theme/chrome");
 editor.setOptions({fontSize:"15px",showPrintMargin:false,enableBasicAutocompletion:true,enableLiveAutocompletion:true,enableSnippets:false,wrap:true});
 const keywords="SELECT FROM WHERE JOIN INNER LEFT RIGHT ON AS AND OR NOT NULL IS IN BETWEEN LIKE GROUP BY HAVING ORDER ASC DESC LIMIT DISTINCT COUNT SUM AVG MIN MAX ROUND CASE WHEN THEN ELSE END WITH OVER PARTITION ROW_NUMBER LAG UNION ALL INSERT UPDATE DELETE CREATE TABLE VALUES".split(" ");
 const completer={getCompletions:(ed,session,pos,prefix,cb)=>cb(null,keywords.filter(k=>!prefix||k.startsWith(prefix.toUpperCase())).map(k=>({caption:k,value:k,meta:"SQL keyword",score:1000})))};
 editor.completers=[completer];
 editor.commands.addCommand({name:"runQuery",bindKey:{win:"Ctrl-Enter",mac:"Command-Enter"},exec:runQuery});
 editor.on("change",()=>{progress.answers[current]=editor.getValue();saveProgress();});
}
async function initDatabase(){
 try{
  const SQL=await initSqlJs({locateFile:file=>`https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/${file}`}); db=new SQL.Database();
  db.run(`CREATE TABLE memberships(member_number TEXT PRIMARY KEY,plan_option TEXT,join_date TEXT,status TEXT,province TEXT,family_size INTEGER);`);
  db.run(`CREATE TABLE claims(claim_key INTEGER PRIMARY KEY,member_number TEXT,dependant_number INTEGER,service_date TEXT,settled_date TEXT,tariff_code TEXT,icd10_code TEXT,icd10_description TEXT,claimed_amount REAL,benefit_amount REAL,claim_status TEXT);`);
  const mi=db.prepare("INSERT INTO memberships VALUES (?,?,?,?,?,?)"); memberships.forEach(r=>{mi.run(r)}); mi.free();
  const ci=db.prepare("INSERT INTO claims VALUES (?,?,?,?,?,?,?,?,?,?,?)"); claims.forEach(r=>{ci.run(r)}); ci.free();
  $("databaseStatus").textContent="Database ready · 20 claims · 8 memberships";
 }catch(e){$("databaseStatus").textContent="Database failed to load"; showError("Could not load SQL engine. Check the internet connection and refresh.\n"+e.message)}
}
function renderQuestion(){
 const q=questions[current]; $("questionCounter").textContent=`Question ${current+1} / ${questions.length}`; $("questionNumber").textContent=`Q${current+1}`;
 $("difficultyBadge").textContent=q.difficulty; $("difficultyBadge").className=`badge ${q.difficulty.toLowerCase()}`; $("questionTitle").textContent=q.title;
 $("questionDescription").textContent=q.description;
 editor.setValue("SELECT * FROM claims;",-1); $("previousQuestion").disabled=current===0; $("nextQuestion").disabled=current===questions.length-1; updateScore(); clearOutputs();
}

function initPanelResizer(){
 const workspace=document.querySelector(".workspace"), handle=$("panelResizeHandle");
 if(!workspace||!handle) return;
 let dragging=false;
 const minLeft=320, minRight=420, gutter=10;

 const onMove=e=>{
  if(!dragging||window.innerWidth<=900) return;
  const rect=workspace.getBoundingClientRect();
  const maxLeft=rect.width-minRight-gutter;
  const nextLeft=Math.max(minLeft,Math.min(e.clientX-rect.left,maxLeft));
  workspace.style.setProperty("--left-pane-width",`${nextLeft}px`);
 };
 const onUp=()=>{
  dragging=false;
  document.body.classList.remove("resizing");
  window.removeEventListener("pointermove",onMove);
  window.removeEventListener("pointerup",onUp);
 };
 handle.addEventListener("pointerdown",e=>{
  if(window.innerWidth<=900) return;
  e.preventDefault();
  dragging=true;
  document.body.classList.add("resizing");
  window.addEventListener("pointermove",onMove);
  window.addEventListener("pointerup",onUp);
 });
}
function renderSchema(){
 $("schemaTable").innerHTML=`<table><thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead><tbody>${schema[currentTable].map(r=>`<tr><td class="field-name">${r[0]}</td><td class="field-type">${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</tbody></table>`;
 const rows=currentTable==="claims"?claims.slice(0,6):memberships.slice(0,6), headers=schema[currentTable].map(x=>x[0]);
 $("sampleDataTable").innerHTML=`<table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v===null?"NULL":escapeHtml(String(v))}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function execute(sql){
 if(!db) throw new Error("Database is still loading."); const start=performance.now(); const result=db.exec(sql); $("executionTime").textContent=`${(performance.now()-start).toFixed(1)} ms`; return result;
}
function scalarResult(result){if(!result.length)return {columns:[],values:[]};return result[result.length-1]}
function runQuery(){
 try{const r=scalarResult(execute(editor.getValue())); showResults(r)}catch(e){showError(e.message)}
}
function showResults(r){
 activateOutput("results"); if(!r.columns.length){$("resultsView").innerHTML='<div class="empty-state"><strong>Query completed</strong><span>No rows returned.</span></div>';return}
 $("resultsView").innerHTML=`<div class="result-caption">${r.values.length} row(s) returned</div><div class="data-grid-wrap"><table><thead><tr>${r.columns.map(c=>`<th>${escapeHtml(c)}</th>`).join("")}</tr></thead><tbody>${r.values.map(row=>`<tr>${row.map(v=>`<td>${v===null?"NULL":escapeHtml(String(v))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function showError(msg){activateOutput("results"); $("resultsView").innerHTML=`<div class="feedback-card error"><strong>SQL error</strong><div class="error-message">${escapeHtml(msg)}</div></div>`}
function normalized(r,ordered){const cols=r.columns.map(c=>c.toLowerCase());let rows=r.values.map(row=>row.map(v=>typeof v==="number"?Number(v.toFixed(6)):v));if(!ordered)rows.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));return {cols,rows}}
function checkAnswer(){
 try{
  const actual=scalarResult(execute(editor.getValue())), expected=scalarResult(execute(questions[current].answer)); showResults(actual);
  const pass=JSON.stringify(normalized(actual,questions[current].ordered))===JSON.stringify(normalized(expected,questions[current].ordered)); activateOutput("feedback");
  if(pass){progress.passed[current]=true;saveProgress();updateScore();$("feedbackView").innerHTML=`<div class="feedback-card success"><strong>Correct result ✓</strong><p>The query returns the expected columns and rows. Question ${current+1} is marked complete.</p></div>`}
  else{$("feedbackView").innerHTML=`<div class="feedback-card error"><strong>Not quite yet</strong><p>The query ran, but the output does not match the expected result. Check column names, filters, grouping and sort order.</p><p><strong>Expected shape:</strong> ${expected.columns.length} columns and ${expected.values.length} rows. <strong>Your output:</strong> ${actual.columns.length} columns and ${actual.values.length} rows.</p></div>`}
 }catch(e){activateOutput("feedback");$("feedbackView").innerHTML=`<div class="feedback-card error"><strong>Query could not be evaluated</strong><div class="error-message">${escapeHtml(e.message)}</div></div>`}
}
function activateOutput(name){document.querySelectorAll(".output-tab").forEach(b=>b.classList.toggle("active",b.dataset.output===name));document.querySelectorAll(".output-view").forEach(v=>v.classList.toggle("active",v.id===name+"View"))}
function clearOutputs(){$("resultsView").innerHTML='<div class="empty-state"><strong>No query executed yet</strong><span>Write SQL and select “Run query”.</span></div>';$("feedbackView").innerHTML='<div class="empty-state"><strong>No answer checked yet</strong><span>Select “Check answer” when the result looks correct.</span></div>';activateOutput("results")}
function updateScore(){$("scoreDisplay").textContent=`Score: ${Object.values(progress.passed).filter(Boolean).length} / ${questions.length}`}
function saveProgress(){localStorage.setItem("sqlAssessmentProgress",JSON.stringify(progress))}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
function setTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem("sqlTheme",theme);$("themeToggle").textContent=theme==="dark"?"☀ Light":"☾ Dark";if(editor)editor.setTheme(theme==="dark"?"ace/theme/tomorrow_night":"ace/theme/chrome")}

document.addEventListener("DOMContentLoaded",async()=>{
 setTheme(localStorage.getItem("sqlTheme")||"light"); initEditor(); renderSchema(); renderQuestion(); initPanelResizer(); await initDatabase();
 $("previousQuestion").onclick=()=>{if(current>0){current--;renderQuestion()}}; $("nextQuestion").onclick=()=>{if(current<questions.length-1){current++;renderQuestion()}};
 $("runQuery").onclick=runQuery; $("checkAnswer").onclick=checkAnswer; $("themeToggle").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
 document.querySelectorAll(".schema-tab").forEach(b=>b.onclick=()=>{currentTable=b.dataset.table;document.querySelectorAll(".schema-tab").forEach(x=>x.classList.toggle("active",x===b));renderSchema()});
 document.querySelectorAll(".output-tab").forEach(b=>b.onclick=()=>activateOutput(b.dataset.output));
 $("resetAssessment").onclick=()=>{localStorage.removeItem("sqlAssessmentProgress");progress.passed={};progress.answers={};renderQuestion()};
});
