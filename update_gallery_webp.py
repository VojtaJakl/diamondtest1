from pathlib import Path
import re

HTML_FILE = Path("gallery.html")

html = HTML_FILE.read_text(encoding="utf-8")

pattern = r'assets/img/(\d+)\.(jpg|jpeg|png|JPG|JPEG|PNG)'

def replace_image(match):

    number = match.group(1)
    extension = match.group(2)

    # Speciální případ 72.png
    if number == "72" and extension.lower() == "png":
        return "assets/img/72-png.webp"

    return f"assets/img/{number}.webp"


new_html, count = re.subn(
    pattern,
    replace_image,
    html
)

HTML_FILE.write_text(
    new_html,
    encoding="utf-8"
)

print(f"Hotovo. Upraveno odkazů: {count}")
print("gallery.html nyní používá WebP.")