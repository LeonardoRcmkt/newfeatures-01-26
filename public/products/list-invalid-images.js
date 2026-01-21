const fs = require("fs");
const path = require("path");

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
  ".svg"
];

const dir = process.cwd();
const files = fs.readdirSync(dir);

console.log("📸 Imagens com caracteres NÃO numéricos no nome:\n");

let found = false;

for (const file of files) {
  const fullPath = path.join(dir, file);
  if (!fs.statSync(fullPath).isFile()) continue;

  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXTENSIONS.includes(ext)) continue;

  const name = path.basename(file, ext);

  // Verifica se existe algo que NÃO seja número
  if (/[^0-9]/.test(name)) {
    const invalidChars = [...new Set(name.match(/[^0-9]/g))];

    console.log(`• ${file}`);
    console.log(`  ↳ caracteres inválidos: ${invalidChars.join(", ")}`);
    found = true;
  }
}

if (!found) {
  console.log("✅ Nenhuma imagem com caracteres inválidos encontrada.");
}
