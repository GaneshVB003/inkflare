const beautifiedTextContainer = document.getElementById("beautifiedText");

function recognizeText() {
    // Use Tesseract to recognize the handwriting from the canvas
    Tesseract.recognize(
        canvas,
        'eng',
        {
            logger: (m) => console.log(m), // optional, logs progress
        }
    ).then(({ data: { text } }) => {
        beautifiedTextContainer.textContent = beautifyText(text);
    });
}

// Beautify the recognized text by applying a font style and other text styling
function beautifyText(text) {
    // Example of beautification: apply better font, size, and alignment
    return `<span class="font-serif text-xl text-gray-800 tracking-wide leading-relaxed">${text}</span>`;
}

// Set up a timer to recognize text every 1 second while the user is writing
setInterval(() => {
    if (isDrawing === false) {
        recognizeText();
    }
}, 1000);
