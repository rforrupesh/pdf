---
layout: default
title: Remove Pages from PDF
description: Remove unwanted pages from PDF online for free
permalink: /remove/
---

<h1>Remove Pages from PDF</h1>

<div class="tool-box">
  <input type="file" id="pdfFile" accept="application/pdf">

  <label>Pages to remove (example: 1,3,5):</label>
  <input type="text" id="pagesToRemove" placeholder="e.g. 1,3,5">

  <button onclick="removePages()">Remove Pages & Download</button>
</div>

<!-- JS LIB -->
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>

<!-- TOOL SCRIPT -->
<script>
async function removePages() {
  const fileInput = document.getElementById('pdfFile');
  const pagesInput = document.getElementById('pagesToRemove');

  if (!fileInput.files.length) {
    alert("Please upload a PDF");
    return;
  }

  const file = fileInput.files[0];
  const bytes = await file.arrayBuffer();

  const pdfDoc = await PDFLib.PDFDocument.load(bytes);
  const totalPages = pdfDoc.getPageCount();

  const pagesToRemove = pagesInput.value
    .split(',')
    .map(p => parseInt(p.trim()) - 1)
    .filter(p => !isNaN(p));

  const newPdf = await PDFLib.PDFDocument.create();

  for (let i = 0; i < totalPages; i++) {
    if (!pagesToRemove.includes(i)) {
      const [page] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(page);
    }
  }

  const pdfBytes = await newPdf.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "modified.pdf";
  a.click();
}
</script>
