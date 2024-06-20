import dts from "bun-plugin-dts";

async function compile(filePath: string, outputDir: string): Promise<void> {
  await Bun.build({
    entrypoints: [filePath],
    outdir: outputDir,
    minify: false,
    plugins: [dts()],
  });
}

compile("./src/fowl.ts", "../dist");
