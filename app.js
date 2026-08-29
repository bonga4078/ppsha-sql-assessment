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
 {difficulty:"Easy", title:"View settled claims", description:"Return claim_key, member_number, service_date, and benefit_amount for claims where claim_status is Settled. Order by claim_key ascending.", requirements:["Return claim_key, member_number, service_date and benefit_amount.","Include only claim_status = 'Settled'.","Order by claim_key ascending."], hint:"Use WHERE to filter the claim_status column.", starter:"SELECT\n  claim_key,\n  member_number,\n  service_date,\n  benefit_amount\nFROM claims\nWHERE ", answer:"SELECT claim_key, member_number, service_date, benefit_amount FROM claims WHERE claim_status='Settled' ORDER BY claim_key", ordered:true},
 {difficulty:"Easy", title:"High-value submitted claims", description:"Return claim_key, tariff_code, and claimed_amount for claims where claimed_amount is greater than 2000. Order by claimed_amount descending.", requirements:["Return claim_key, tariff_code and claimed_amount.","Filter claimed_amount greater than 2000.","Show the highest amount first."], hint:"Use a numeric comparison and ORDER BY ... DESC.", starter:"SELECT\n  claim_key,\n  tariff_code,\n  claimed_amount\nFROM claims\n", answer:"SELECT claim_key, tariff_code, claimed_amount FROM claims WHERE claimed_amount > 2000 ORDER BY claimed_amount DESC", ordered:true},
 {difficulty:"Easy", title:"Count claims by status", description:"Return claim_status and total_claims by counting claim lines per status using COUNT(*). Group by claim_status.", requirements:["Return claim_status and total_claims.","Use COUNT(*) for the total.","Group by claim_status."], hint:"Every non-aggregated selected column must be grouped.", starter:"SELECT\n  claim_status,\n  COUNT(*) AS total_claims\nFROM claims\n", answer:"SELECT claim_status, COUNT(*) AS total_claims FROM claims GROUP BY claim_status", ordered:false},
 {difficulty:"Medium", title:"Claims expenditure by plan option", description:"Join claims to memberships on member_number and return plan_option, total_claims, total_claimed, and total_benefit for active memberships only. Round monetary totals to 2 decimals and order by total_benefit descending.", requirements:["Return plan_option, total_claims, total_claimed and total_benefit.","Include active memberships only.","Round monetary totals to two decimals.","Order by total_benefit descending."], hint:"Join on member_number, then use GROUP BY plan_option.", starter:"SELECT\n  m.plan_option,\n  COUNT(*) AS total_claims\nFROM claims c\nJOIN memberships m\n  ON ", answer:"SELECT m.plan_option, COUNT(*) AS total_claims, ROUND(SUM(c.claimed_amount),2) AS total_claimed, ROUND(SUM(c.benefit_amount),2) AS total_benefit FROM claims c JOIN memberships m ON c.member_number=m.member_number WHERE m.status='Active' GROUP BY m.plan_option ORDER BY total_benefit DESC", ordered:true},
 {difficulty:"Medium", title:"Average settlement turnaround", description:"Return plan_option and avg_days_to_settle, calculated as the average of julianday(settled_date) - julianday(service_date) for settled claims only. Round to 1 decimal and order from highest to lowest.", requirements:["Return plan_option and avg_days_to_settle.","Only include settled claims.","Round the average to one decimal place.","Order from longest to shortest turnaround."], hint:"SQLite date subtraction uses julianday(settled_date) - julianday(service_date).", starter:"SELECT\n  m.plan_option,\n  ROUND(AVG(\n    julianday(c.settled_date) - julianday(c.service_date)\n  ), 1) AS avg_days_to_settle\nFROM claims c\n", answer:"SELECT m.plan_option, ROUND(AVG(julianday(c.settled_date)-julianday(c.service_date)),1) AS avg_days_to_settle FROM claims c JOIN memberships m ON c.member_number=m.member_number WHERE c.claim_status='Settled' GROUP BY m.plan_option ORDER BY avg_days_to_settle DESC", ordered:true},
 {difficulty:"Medium", title:"Rejection rate by plan", description:"Join claims to memberships and return plan_option, total_claims, and rejection_rate where rejection_rate is the percentage of rejected claims per plan rounded to 1 decimal.", requirements:["Return plan_option, total_claims and rejection_rate.","Use conditional aggregation to count rejected claims.","Return rejection_rate as a percentage rounded to one decimal."], hint:"SUM(CASE WHEN ... THEN 1 ELSE 0 END) can count matching rows.", starter:"SELECT\n  m.plan_option,\n  COUNT(*) AS total_claims,\n  ROUND(100.0 * SUM(CASE WHEN ", answer:"SELECT m.plan_option, COUNT(*) AS total_claims, ROUND(100.0*SUM(CASE WHEN c.claim_status='Rejected' THEN 1 ELSE 0 END)/COUNT(*),1) AS rejection_rate FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option", ordered:false},
 {difficulty:"Medium", title:"Diagnosis utilisation", description:"Return icd10_code, icd10_description, claim_count, and total_claimed for diagnoses that appear more than once. Order by claim_count descending, then icd10_code ascending.", requirements:["Return icd10_code, icd10_description, claim_count and total_claimed.","Include diagnoses with more than one claim.","Order by claim_count descending, then icd10_code ascending."], hint:"Filter aggregated groups with HAVING, not WHERE.", starter:"SELECT\n  icd10_code,\n  icd10_description,\n  COUNT(*) AS claim_count\nFROM claims\n", answer:"SELECT icd10_code, icd10_description, COUNT(*) AS claim_count, SUM(claimed_amount) AS total_claimed FROM claims GROUP BY icd10_code, icd10_description HAVING COUNT(*) > 1 ORDER BY claim_count DESC, icd10_code ASC", ordered:true},
 {difficulty:"Hard", title:"Top claimant in each plan", description:"Aggregate total_claimed per plan_option and member_number, rank members inside each plan by total_claimed descending, and return only rank 1 with columns plan_option, member_number, and total_claimed.", requirements:["Aggregate total claimed amount by plan and member.","Rank each member within the member's plan.","Return plan_option, member_number and total_claimed for rank 1.","Use a CTE and a window function."], hint:"Use ROW_NUMBER() OVER (PARTITION BY plan_option ORDER BY SUM(...) DESC).", starter:"WITH member_totals AS (\n  SELECT\n    m.plan_option,\n    c.member_number,\n    SUM(c.claimed_amount) AS total_claimed\n  FROM claims c\n  JOIN memberships m ON c.member_number = m.member_number\n", answer:"WITH member_totals AS (SELECT m.plan_option, c.member_number, SUM(c.claimed_amount) AS total_claimed FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option,c.member_number), ranked AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY plan_option ORDER BY total_claimed DESC) AS rn FROM member_totals) SELECT plan_option, member_number, total_claimed FROM ranked WHERE rn=1", ordered:false},
 {difficulty:"Hard", title:"Monthly claims trend", description:"Return service_month, monthly_claimed, and previous_month_claimed by aggregating claimed_amount per month (YYYY-MM) and applying LAG over chronological month order.", requirements:["Return service_month, monthly_claimed and previous_month_claimed.","Format service_month as YYYY-MM.","Use LAG to obtain the previous month's value.","Order chronologically."], hint:"Aggregate by month in a CTE before applying LAG.", starter:"WITH monthly AS (\n  SELECT\n    strftime('%Y-%m', service_date) AS service_month,\n    SUM(claimed_amount) AS monthly_claimed\n  FROM claims\n", answer:"WITH monthly AS (SELECT strftime('%Y-%m',service_date) AS service_month, SUM(claimed_amount) AS monthly_claimed FROM claims GROUP BY strftime('%Y-%m',service_date)) SELECT service_month, monthly_claimed, LAG(monthly_claimed) OVER(ORDER BY service_month) AS previous_month_claimed FROM monthly ORDER BY service_month", ordered:true},
 {difficulty:"Hard", title:"Members above their plan average", description:"Calculate total_benefit per member, calculate the average member total per plan_option, and return plan_option, member_number, total_benefit, and plan_avg_benefit for members above their plan average. Round plan_avg_benefit to 2 decimals and order by plan_option then total_benefit descending.", requirements:["Calculate total_benefit per member.","Calculate the plan-level average of member totals.","Return plan_option, member_number, total_benefit and plan_avg_benefit.","Round plan_avg_benefit to two decimals and order by plan, then total benefit descending."], hint:"Use one CTE for member totals and another window calculation with AVG(...) OVER (PARTITION BY plan_option).", starter:"WITH member_totals AS (\n  SELECT\n    m.plan_option,\n    c.member_number,\n    SUM(c.benefit_amount) AS total_benefit\n  FROM claims c\n", answer:"WITH member_totals AS (SELECT m.plan_option,c.member_number,SUM(c.benefit_amount) AS total_benefit FROM claims c JOIN memberships m ON c.member_number=m.member_number GROUP BY m.plan_option,c.member_number), compared AS (SELECT *, AVG(total_benefit) OVER(PARTITION BY plan_option) AS plan_avg FROM member_totals) SELECT plan_option,member_number,total_benefit,ROUND(plan_avg,2) AS plan_avg_benefit FROM compared WHERE total_benefit > plan_avg ORDER BY plan_option,total_benefit DESC", ordered:true}
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
