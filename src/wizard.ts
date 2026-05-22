// ClineBox Wizard HTML

export function wizardHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>ClineBox Setup</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0a0a0f;color:#e4e4e7;display:flex;justify-content:center;padding:2rem}
.container{max-width:720px;width:100%}
h1{font-size:1.75rem;font-weight:600;margin-bottom:.5rem;color:#fff}
.subtitle{color:#a1a1aa;margin-bottom:2rem;font-size:.9rem}
.form-group{margin-bottom:1.5rem}
label{display:block;font-size:.85rem;font-weight:500;color:#d4d4d8;margin-bottom:.4rem}
.hint{font-size:.75rem;color:#71717a;margin-top:.25rem;line-height:1.4}
input,select{width:100%;padding:.6rem .8rem;background:#1f1f23;border:1px solid #3f3f46;border-radius:8px;color:#e4e4e7;font-size:.9rem;outline:none}
input:focus,select:focus{border-color:#3b82f6}
select{cursor:pointer}
.btn{width:100%;padding:.75rem;background:#3b82f6;color:#fff;border:none;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer}
.btn:hover{background:#2563eb}
.btn:disabled{opacity:.5;cursor:not-allowed}
.error{background:#450a0a;border:1px solid #991b1b;color:#fca5a5;padding:.75rem;border-radius:8px;margin-bottom:1rem;display:none}
.card{background:#18181b;border-radius:12px;padding:1.5rem;border:1px solid #27272a}
.grid{display:grid;gap:.5rem}
.grid-2{grid-template-columns:1fr 1fr}
.grid-3{grid-template-columns:1fr 1fr 1fr}
.btn-opt{padding:.6rem;background:#1f1f23;border:1px solid #3f3f46;border-radius:8px;color:#e4e4e7;cursor:pointer;font-size:.85rem;text-align:center}
.btn-opt.sel{border-color:#3b82f6;background:#1e293b}
.back-link{display:inline-block;margin-bottom:1rem;color:#71717a;text-decoration:none;font-size:.85rem}
.model-list{background:#1f1f23;border-radius:8px;padding:.75rem;margin-top:.25rem;font-size:.8rem;color:#a1a1aa;line-height:1.5}
.model-list span{display:inline-block;background:#27272a;padding:.15rem .5rem;border-radius:4px;margin:.1rem;font-size:.75rem;color:#d4d4d8}
</style>
</head>
<body><div class="container">
<a href="/" class="back-link">\u2190 Back</a>
<h1>Setup Workspace</h1>
<p class="subtitle">Configure your ClineBox workspace</p>
<div id="error" class="error"></div>
<div class="card">
<form id="wf" onsubmit="return pr(event)">
<div class="form-group"><label for="workspaceName">Workspace Name</label>
<input type="text" id="workspaceName" name="workspaceName" placeholder="my-workspace" required />
<div class="hint">Lowercase letters, numbers, and hyphens only.</div></div>
<div class="form-group"><label>Template</label>
<div class="grid grid-3" id="tsel">
<button type="button" class="btn-opt sel" data-v="node" onclick="st('node')">Node.js</button>
<button type="button" class="btn-opt" data-v="python" onclick="st('python')">Python</button>
<button type="button" class="btn-opt" data-v="go" onclick="st('go')">Go</button>
<button type="button" class="btn-opt" data-v="rust" onclick="st('rust')">Rust</button>
<button type="button" class="btn-opt" data-v="zig" onclick="st('zig')">Zig</button>
<button type="button" class="btn-opt" data-v="blank" onclick="st('blank')">Blank</button>
</div><input type="hidden" id="template" name="template" value="node" /></div>
<div class="form-group"><label for="accountId">Cloudflare Account ID</label>
<input type="text" id="accountId" name="accountId" placeholder="Paste your 32-char Account ID" required />
<div class="hint">Found in your Cloudflare Dashboard: go to <strong>Workers &amp; Pages</strong> and look at the right sidebar, or go to <strong>Overview</strong> and scroll to the bottom. It is a 32-character hex string.</div></div>
<div class="form-group"><label for="gatewayId">AI Gateway ID</label>
<input type="text" id="gatewayId" name="gatewayId" placeholder="Paste your AI Gateway ID" required />
<div class="hint">Create one at <strong>AI &gt; AI Gateway</strong> in your Cloudflare Dashboard, then paste the gateway name here.</div></div>
<div class="form-group"><label>AI Provider</label>
<div class="grid grid-2" id="psel">
<button type="button" class="btn-opt" data-v="openai" onclick="sp('openai')">OpenAI</button>
<button type="button" class="btn-opt sel" data-v="anthropic" onclick="sp('anthropic')">Anthropic</button>
<button type="button" class="btn-opt" data-v="google" onclick="sp('google')">Google</button>
<button type="button" class="btn-opt" data-v="deepseek" onclick="sp('deepseek')">DeepSeek</button>
<button type="button" class="btn-opt" data-v="openrouter" onclick="sp('openrouter')">OpenRouter</button>
<button type="button" class="btn-opt" data-v="cline" onclick="sp('cline')">Cline API</button>
</div><input type="hidden" id="provider" name="provider" value="anthropic" /></div>
<div class="form-group"><label for="model">Model</label>
<select id="model" name="model"></select>
<div class="model-list" id="model-list"></div></div>
<div class="form-group"><label for="apiKey">Provider API Key</label>
<input type="password" id="apiKey" name="apiKey" placeholder="sk-..." required />
<div class="hint">Your API key for the selected provider.</div></div>
<button type="submit" class="btn" id="sbtn">Provision Workspace</button>
</form>
</div>
</div>
<script>
var m={openai:["gpt-4o","gpt-4o-mini","gpt-4-turbo","o3-mini"],anthropic:["claude-sonnet-4","claude-haiku-3-5","claude-opus-4"],google:["gemini-2.5-pro","gemini-2.0-flash"],deepseek:["deepseek-v4-flash","deepseek-v4-pro"],openrouter:["anthropic/claude-sonnet-4","openai/gpt-4o","google/gemini-2.5-pro","deepseek/deepseek-chat","deepseek/deepseek-r1"],cline:["cline-sonnet","cline-haiku"]};
function st(v){var b=document.querySelectorAll("#tsel .btn-opt");for(var i=0;i<b.length;i++){b[i].classList.toggle("sel",b[i].dataset.v===v)}document.getElementById("template").value=v}
function sp(v){var b=document.querySelectorAll("#psel .btn-opt");for(var i=0;i<b.length;i++){b[i].classList.toggle("sel",b[i].dataset.v===v)}document.getElementById("provider").value=v;var s=document.getElementById("model");s.innerHTML="";var models=m[v]||[];for(var i=0;i<models.length;i++){var o=document.createElement("option");o.value=models[i];o.textContent=models[i];s.appendChild(o)}var ml=document.getElementById("model-list");ml.innerHTML="<strong>Available models:</strong><br>";for(var i=0;i<models.length;i++){ml.innerHTML+="<span>"+models[i]+"</span>"}}
function pr(e){e.preventDefault();var btn=document.getElementById("sbtn");var er=document.getElementById("error");var fd=new FormData(document.getElementById("wf"));var b={workspaceName:fd.get("workspaceName"),template:fd.get("template"),provider:fd.get("provider"),model:fd.get("model"),accountId:fd.get("accountId"),gatewayId:fd.get("gatewayId"),apiKey:fd.get("apiKey")};if(!b.accountId||!b.gatewayId||!b.apiKey){er.textContent="Fill in Account ID, Gateway ID, and API Key.";er.style.display="block";return}er.style.display="none";btn.disabled=true;btn.textContent="Provisioning...";fetch("/api/provision",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then(function(r){return r.json()}).then(function(d){if(!d.ok){er.textContent=d.error||"Failed";er.style.display="block";btn.disabled=false;btn.textContent="Provision Workspace"}else{window.location.href="/?provisioned=1"}}).catch(function(e2){er.textContent:"Error: "+e2.message;er.style.display="block";btn.disabled=false;btn.textContent="Provision Workspace"})}
sp("anthropic");
</script>
</body>
</html>`; }

