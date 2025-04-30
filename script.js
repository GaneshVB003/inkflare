const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isDrawing = false;
ctx.lineWidth = 2;
ctx.lineCap = "round";

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", async () => {
  isDrawing = false;
  await beautifyText();
});
canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

async function beautifyText() {
  const output = document.getElementById("output");

  // Convert canvas to image for OCR
  const dataUrl = canvas.toDataURL();
  const result = await Tesseract.recognize(dataUrl, 'eng', {
    logger: m => console.log(m)
  });

  const rawText = result.data.text;
  const font = detectFont(rawText);

  output.style.fontFamily = font;
  output.textContent = normalizeParagraph(rawText);
}

// Basic mock: match font to tone (you can improve this)
function detectFont(text) {
  if (text.length < 10) return "Bradley Hand, cursive";
  if (text.includes("!")) return "Felt Tip Roman, sans-serif";
  if (text.includes("love")) return "Emmascript, cursive";
  return "Julietrose, serif";
}

// Normalize spacing & line breaks
function normalizeParagraph(text) {
  return text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}
