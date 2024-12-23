import os
from pathlib import Path

os.chdir(Path(__file__).parent)

backgrounds = Path("public/backgrounds")

files = [item.relative_to(backgrounds) for item in backgrounds.rglob("*") if item.is_file() and item.name != ".gitkeep"]

with open("src/data/backgrounds.ts", "w", encoding="utf-8") as f:
	f.write("export const Backgrounds = [\n")
	f.writelines([f'\t"{f}",\n' for f in files])
	f.write("""];

const choose = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const GetRandomBackground = () => `url("backgrounds/${choose(Backgrounds)}")`;
export default GetRandomBackground;""")
