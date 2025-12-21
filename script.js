document.getElementById('generate').addEventListener('click', generate);
document.getElementById('clear').addEventListener('click', ()=>{
  document.getElementById('input').value = '';
  document.getElementById('output').innerHTML = '';
});

function generate(){
  const input = document.getElementById('input').value.trim();
  const size = parseInt(document.getElementById('size').value,10) || 200;
  const out = document.getElementById('output');
  out.innerHTML = '';
  if(!input){ out.textContent = 'Paste one or more links, then click Generate.'; return; }

  const lines = input.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  lines.forEach((link, idx)=>{
    const item = document.createElement('div'); item.className = 'qr-item';
    const img = document.createElement('img'); img.className = 'qr-img';
    const src = 'https://api.qrserver.com/v1/create-qr-code/?size=' + size + 'x' + size + '&data=' + encodeURIComponent(link);
    img.src = src; img.alt = 'QR for ' + link;

    const label = document.createElement('div'); label.className = 'qr-label'; label.textContent = link;

    const actions = document.createElement('div'); actions.className = 'qr-actions';
    const dl = document.createElement('a'); dl.href = src; dl.download = 'qr-' + (idx+1) + '.png'; dl.textContent = 'Download';
    const copyBtn = document.createElement('button'); copyBtn.textContent = 'Copy Link';
    copyBtn.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(link); copyBtn.textContent = 'Copied!'; setTimeout(()=>copyBtn.textContent='Copy Link',1200);}catch(e){alert('Copy failed');}
    });

    actions.appendChild(dl); actions.appendChild(copyBtn);
    item.appendChild(img); item.appendChild(label); item.appendChild(actions);
    out.appendChild(item);
  });
}
