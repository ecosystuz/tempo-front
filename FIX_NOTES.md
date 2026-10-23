TEMPO GROUP - FIXED PRODUCT CARD SIZES AND IMAGE EDGES

What changed:
- All cards use the same image height and rounded image container.
- Ripped left white borders / image gutter artifacts are trimmed from generated WebP assets.
- The image area uses object-fit:cover so the card remains uniform.
- Product metadata and filters/modal are unchanged.

For an EXISTING local repo with newer Codex edits, avoid copying over src/styles.css directly.
Instead:
1. Copy all WebP files from public/images/ with the 9 names below into your existing public/images/.
2. Paste tempo-product-card-fix.css to the END of src/styles.css (not the beginning).
3. In src/data/site.js, map each product image to new /images/<name>.webp.
4. npm install && npm run build

Fixed image file names: 
 - burchak-87.webp
 - burchak-45.webp
 - troynik.webp
 - mufta.webp
 - reduksiya.webp
 - tarmoqlash.webp
 - pvc-quvurlar.webp
 - rangli-quvurlar.webp
 - gofra.webp
