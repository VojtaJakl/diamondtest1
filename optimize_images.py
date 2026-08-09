from pathlib import Path
from PIL import Image

IMG_DIR = Path("assets/img")

MAX_WIDTH = 1800
QUALITY = 82

extensions = {".jpg", ".jpeg", ".png"}

files = [
    file for file in IMG_DIR.iterdir()
    if file.is_file()
    and file.suffix.lower() in extensions
    and file.stem.isdigit()
]

print(f"Nalezeno {len(files)} fotografií.")
print()

for file in sorted(files, key=lambda x: (int(x.stem), x.name.lower())):

    # Normálně:
    # 20.JPG -> 20.webp
    #
    # Speciální případ:
    # 72.JPG -> 72.webp
    # 72.png -> 72-png.webp

    if file.stem == "72" and file.suffix.lower() == ".png":
        output = IMG_DIR / "72-png.webp"
    else:
        output = IMG_DIR / f"{file.stem}.webp"

    try:
        with Image.open(file) as image:

            if image.mode in ("RGBA", "LA"):
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

            if image.width > MAX_WIDTH:

                ratio = MAX_WIDTH / image.width
                new_height = int(image.height * ratio)

                image = image.resize(
                    (MAX_WIDTH, new_height),
                    Image.Resampling.LANCZOS
                )

            image.save(
                output,
                "WEBP",
                quality=QUALITY,
                method=6
            )

        original_size = file.stat().st_size / 1024 / 1024
        new_size = output.stat().st_size / 1024 / 1024

        print(
            f"{file.name:12} → "
            f"{output.name:15} "
            f"{original_size:6.2f} MB → "
            f"{new_size:6.2f} MB"
        )

    except Exception as e:
        print(f"CHYBA: {file.name} → {e}")

print()
print("======================================")
print("HOTOVO")
print("Originální fotografie zůstaly zachované.")
print("======================================")