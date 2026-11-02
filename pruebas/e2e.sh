#!/usr/bin/env bash
# Prueba de punta a punta (Chrome headless): crea el curso, pega la lista, toma asistencia, pone notas y revisa límites y el aviso de versión completa.
# Uso: pruebas/e2e.sh   (sirve ../app en :8779)
set -euo pipefail
cd "$(dirname "$0")/.."; D=$(mktemp -d); python3 -m http.server 8779 -d app >/dev/null 2>&1 & SRV=$!; sleep 1
S=( "document.querySelector('#dlg h2').innerText"
 "(()=>{document.getElementById('c-d').value='Andrea';document.getElementById('c-n').value='5° Básico A';document.querySelector('[data-ok]').click();return document.querySelector('.card.filled h2').innerText})()"
 "(()=>{document.querySelector('[data-v=estudiantes]').click();document.getElementById('e-pegar').click();document.getElementById('p-t').value='1. Pérez Soto, Ana María\nGonzález Ruiz, Luis\nCamila Araya Vega';document.querySelector('[data-ok]').click();return document.querySelectorAll('.lista .item').length+' estudiantes'})()"
 "(()=>{document.querySelector('#navbar [data-v=asistencia]').click();document.getElementById('a-todos').click();return document.querySelector('.card p').innerText})()"
 "(()=>{document.querySelector('#navbar [data-v=notas]').click();document.getElementById('nt-nueva').click();document.getElementById('ev-n').value='Prueba 1';document.querySelector('[data-ok]').click();var i=document.querySelectorAll('.nota-in');i[0].value='6,5';i[0].dispatchEvent(new Event('change'));return [...document.querySelectorAll('.item .t2')].map(x=>x.innerText).join(' | ')})()"
 "(()=>{document.querySelector('#navbar [data-v=ajustes]').click();return document.querySelector('.card.filled').innerText.replace(/\\s+/g,' ')})()" )
OUT=$(node pruebas/cdp.js http://localhost:8779/index.html "$D" 390 844 1 "${S[@]}" 2>&1); kill "$SRV" 2>/dev/null || true; echo "$OUT"
for k in "Tu curso" "5° Básico A" "3 estudiantes" "Presentes 3" "Promedio 6,5" "debes contactarte con la desarrolladora"; do echo "$OUT" | grep -q "$k" && echo "OK   $k" || { echo "FALLA $k"; exit 1; }; done
