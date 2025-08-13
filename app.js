
const stateKey = 'mht_state_v1';
const state = JSON.parse(localStorage.getItem(stateKey) || '{}');

function save(){ localStorage.setItem(stateKey, JSON.stringify(state)); }

function showPage(name){
  const el = document.getElementById('content');
  if(name==='home'){ renderHome(el); return; }
  if(name==='roadmap'){ renderRoadmap(el); return; }
  if(name==='checklist'){ renderChecklist(el); return; }
  if(name==='kalkulator'){ renderKalkulator(el); return; }
  if(name==='progres'){ renderProgres(el); return; }
  renderHome(el);
}

function renderHome(el){
  el.innerHTML = `
    <section class="section">
      <h2>Ringkasan Status</h2>
      <div class="kpi">
        <div class="box">
          <div>Progres Keuangan</div>
          <div class="progress"><span style="width:${state.finPct||0}%"></span></div>
          <small class="muted">${state.finPct||0}%</small>
        </div>
        <div class="box">
          <div>Status Kesehatan</div>
          <div class="progress"><span style="width:${state.healthPct||0}%"></span></div>
          <small class="muted">${state.healthPct||0}%</small>
        </div>
        <div class="box">
          <div>Aktivitas Sosial</div>
          <div class="progress"><span style="width:${state.socialPct||0}%"></span></div>
          <small class="muted">${state.socialPct||0}%</small>
        </div>
        <div class="box">
          <div>Target Spiritual</div>
          <div class="progress"><span style="width:${state.spiritPct||0}%"></span></div>
          <small class="muted">${state.spiritPct||0}%</small>
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Kutipan Hari Ini</h2>
      <p>“Menata hari tua adalah menanam kebahagiaan masa depan di hari ini.”</p>
      <button class="button" onclick="showPage('roadmap')">Mulai Hari Ini</button>
    </section>
  `;
}

const YEARS = [
  "Tahun ke-7","Tahun ke-6","Tahun ke-5","Tahun ke-4",
  "Tahun ke-3","Tahun ke-2","Tahun ke-1","Tahun Pertama Pensiun"
];

const ROADMAP = [
  {fin:"Audit aset & utang", health:"Medical check-up lengkap", social:"Daftar komunitas aktif", spirit:"Evaluasi ibadah harian"},
  {fin:"Kurangi utang 50%", health:"Pola makan sehat & olahraga", social:"Pertemuan komunitas rutin", spirit:"Ikut kajian mingguan"},
  {fin:"Diversifikasi investasi", health:"Olahraga komunitas", social:"Peran aktif organisasi", spirit:"Sedekah rutin bulanan"},
  {fin:"Mulai usaha kecil/pasif", health:"Pemeriksaan rutin", social:"Relasi strategis baru", spirit:"Ibadah sunnah harian"},
  {fin:"Hidup sesuai anggaran pensiun", health:"Pola tidur teratur", social:"Mentoring/mengajar", spirit:"Program ibadah intensif"},
  {fin:"Bebas utang; dana darurat 12 bln", health:"Cek kesehatan 2x/tahun", social:"Kelompok pensiunan", spirit:"Umrah/Ziarah"},
  {fin:"Finalisasi dana pensiun", health:"Rencana kesehatan pascapensiun", social:"Silaturahmi rutin", spirit:"Mantapkan ibadah wajib/sunnah"},
  {fin:"Evaluasi pengeluaran 3 bulanan", health:"Olahraga & cek rutin", social:"Aktif di komunitas", spirit:"Perbanyak amal & ibadah"}
];

function renderRoadmap(el){
  let html = `<section class="section"><h2>Roadmap 7 Tahun</h2><small class="muted">Rencana tahunan dari 7 tahun sebelum pensiun hingga tahun pertama pensiun.</small>`;
  YEARS.forEach((y,idx)=>{
    const r = ROADMAP[idx];
    html += `
      <div class="roadmap-year">
        <h3><span class="badge">${y}</span></h3>
        <ul class="list">
          <li><b>Keuangan:</b> ${r.fin}</li>
          <li><b>Kesehatan:</b> ${r.health}</li>
          <li><b>Sosial:</b> ${r.social}</li>
          <li><b>Spiritual:</b> ${r.spirit}</li>
        </ul>
        <div class="checkbox"><input type="checkbox" onchange="toggleDone(${idx}, this.checked)" ${state['done_'+idx]?'checked':''}/> Tandai tahun ini selesai</div>
      </div>`;
  });
  html += `</section>`;
  el.innerHTML = html;
}

function toggleDone(i, val){
  state['done_'+i] = !!val; save();
}

const CHECKLIST = {
  7:["Buat daftar aset & utang","MCU lengkap","Ikut 1 komunitas","Catat ibadah harian"],
  6:["Kurangi utang konsumtif 50%","Olahraga 3x/minggu","Hadir pertemuan komunitas","Ikut kajian mingguan"],
  5:["Diversifikasi investasi","Olahraga komunitas","Jadi pengurus komunitas","Sedekah bulanan"],
  4:["Mulai usaha kecil/pasif","Pemeriksaan rutin","Bangun relasi strategis","Ibadah sunnah harian"],
  3:["Simulasi anggaran pensiun","Tidur 7–8 jam","Mentoring di komunitas","Program ibadah intensif"],
  2:["Bebas utang ; dana darurat 12 bln","Cek kesehatan 2x/tahun","Kelompok pensiunan","Umrah/Ziarah"],
  1:["Finalisasi administrasi pensiun","Rencana kesehatan pascapensiun","Silaturahmi keluarga","Mantapkan ibadah wajib/sunnah"]
};

function renderChecklist(el){
  let html = `<section class="section"><h2>Checklist Tahunan</h2><table><thead><tr><th>Tahun</th><th>Target</th><th>Selesai?</th></tr></thead><tbody>`;
  Object.keys(CHECKLIST).sort((a,b)=>b-a).forEach(y=>{
    CHECKLIST[y].forEach((item, idx)=>{
      const key = `c_${y}_${idx}`;
      const checked = state[key] ? 'checked' : '';
      html += `<tr>
        <td>${y}</td>
        <td>${item}</td>
        <td><input type="checkbox" onchange="state['${key}']=this.checked; save();" ${checked}></td>
      </tr>`;
    });
  });
  html += `</tbody></table></section>`;
  el.innerHTML = html;
}

function renderKalkulator(el){
  const fin = state.finPct||0, health = state.healthPct||0, social = state.socialPct||0, spirit = state.spiritPct||0;
  el.innerHTML = `
    <section class="section">
      <h2>Kalkulator Pensiun (sederhana)</h2>
      <p><small class="muted">Masukkan estimasi pengeluaran pensiun per bulan (Rp) & penghasilan pasif saat ini.</small></p>
      <input class="input" id="out" type="number" placeholder="Pengeluaran pensiun per bulan (mis. 10000000)" value="${state.out||''}"/>
      <input class="input" id="inc" type="number" placeholder="Penghasilan pasif per bulan (mis. 7000000)" value="${state.inc||''}" style="margin-top:8px"/>
      <button class="button" style="margin-top:8px" onclick="hitung()">Hitung</button>
      <div id="hasil" style="margin-top:12px"></div>
    </section>
    <section class="section">
      <h2>Masukkan Progres Anda</h2>
      <div class="kpi">
        ${progressInput('Keuangan','finPct',fin)}
        ${progressInput('Kesehatan','healthPct',health)}
        ${progressInput('Sosial','socialPct',social)}
        ${progressInput('Spiritual','spiritPct',spirit)}
      </div>
    </section>
  `;
}

function progressInput(label, key, val){
  return `<div class="box">
    <div>${label} (${val||0}%)</div>
    <input type="range" min="0" max="100" value="${val||0}" oninput="state['${key}']=+this.value; save(); this.previousElementSibling.innerHTML='${label} ('+this.value+'%)'">
  </div>`;
}

function hitung(){
  const out = +document.getElementById('out').value || 0;
  const inc = +document.getElementById('inc').value || 0;
  state.out = out; state.inc = inc; save();
  const gap = out - inc;
  const rekom = gap<=0? "Sudah aman: penghasilan pasif ≥ pengeluaran." : 
    `Perlu tambahan penghasilan pasif Rp ${gap.toLocaleString('id-ID')} / bulan.`;
  document.getElementById('hasil').innerHTML = `<b>Hasil:</b> ${rekom}`;
}

function renderProgres(el){
  el.innerHTML = `
    <section class="section">
      <h2>Catatan & Progres</h2>
      <textarea class="input" rows="8" placeholder="Tulis catatan, rencana, atau evaluasi..." oninput="state.notes=this.value; save();">${state.notes||''}</textarea>
      <p><small class="muted">Data disimpan di perangkat Anda (localStorage) dan dapat digunakan offline.</small></p>
    </section>
  `;
}

showPage('home');
