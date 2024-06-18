import dts from "bun-plugin-dts";

async function compile(filePath: string, outputDir: string): Promise<void> {
  await Bun.build({
    entrypoints: [filePath],
    outdir: outputDir,
    minify: true,
    plugins: [dts()],
  });
}

compile("./src/fowl.ts", "./dist");
