import rollupPluginTypeScript from "rollup-plugin-typescript2";

export default {
    input: "./src/reloop-beatmix.ts",
    output: {
        file: "./dist/reloop-beatmix.js",
        format: "iife",
        name: "ReloopBeatmix"
    },
    plugins: [
        rollupPluginTypeScript({
            tsconfig: "./tsconfig.json",
            clean: true
        }),
    ],
};
