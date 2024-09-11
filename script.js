const colorInput = document.getElementById('colorInput');
const colorPreview = document.getElementById('colorPreview');
const hexValue = document.getElementById('hexValue');
const rgbaValue = document.getElementById('rgbaValue');
const hslaValue = document.getElementById('hslaValue');

function hexToRgba(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function hexToHsla(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = Math.round(s * 100);
  l = Math.round(l * 100);
  h = Math.round(h * 360);

  return `hsla(${h}, ${s}%, ${l}%, 1)`;
}

colorInput.addEventListener('input', () => {
  const selectedColor = colorInput.value;

  // Update preview box
  colorPreview.style.backgroundColor = selectedColor;

  // Update Hex value
  hexValue.value = selectedColor;

  // Update RGBA value
  rgbaValue.value = hexToRgba(selectedColor);

  // Update HSLA value
  hslaValue.value = hexToHsla(selectedColor);
});
