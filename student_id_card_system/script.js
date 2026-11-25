const form = document.getElementById('studentForm');
const $ = id => document.getElementById(id);

form.addEventListener('submit', event => {
  event.preventDefault();
  $('cardName').textContent = $('name').value.trim() || 'Student Name';
  $('cardReg').textContent = $('reg').value.trim() || '—';
  $('cardDept').textContent = $('dept').value.trim() || '—';
  $('cardYear').textContent = $('year').value.trim() || '—';
  $('cardBlood').textContent = $('blood').value.trim() || '—';
  $('cardCollege').textContent = $('college').value.trim() || 'YOUR COLLEGE NAME';
  $('cardAcademic').textContent = $('academic').value.trim() || '';
});

$('photo').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = e => $('cardPhoto').src = e.target.result;
  reader.readAsDataURL(file);
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    $('cardName').textContent = 'Student Name';
    $('cardReg').textContent = '—';
    $('cardDept').textContent = '—';
    $('cardYear').textContent = '—';
    $('cardBlood').textContent = '—';
    $('cardCollege').textContent = 'YOUR COLLEGE NAME';
    $('cardAcademic').textContent = '2026 - 2027';
    $('cardPhoto').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='160' viewBox='0 0 140 160'%3E%3Crect width='140' height='160' fill='%23e8eef7'/%3E%3Ccircle cx='70' cy='54' r='27' fill='%2395a8c2'/%3E%3Cpath d='M20 150c4-36 23-53 50-53s46 17 50 53' fill='%2395a8c2'/%3E%3C/svg%3E";
  }, 0);
});

$('printBtn').addEventListener('click', () => window.print());

$('downloadBtn').addEventListener('click', async () => {
  const card = $('idCard');
  if (typeof html2canvas === 'undefined') {
    alert('For image download, open this page with an internet connection and reload. You can also use Print / Save as PDF.');
    return;
  }
  const canvas = await html2canvas(card, {scale: 2, backgroundColor: '#ffffff'});
  const link = document.createElement('a');
  link.download = 'student-id-card.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});