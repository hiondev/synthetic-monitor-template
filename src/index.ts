import * as ff from "@google-cloud/functions-framework";
import { runSyntheticHandler } from "@google-cloud/synthetics-sdk-api";
import child_process from "child_process";

ff.http(
  "SyntheticFunction",
  runSyntheticHandler(async () => {
    const command = "npx";
    const args = ["playwright", "test", "--browser=chromium"];
    const spawnResult = child_process.spawnSync(command, args, {
      encoding: "utf8",
      env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: "0" },
    });

    console.log(
      JSON.stringify({
        message: `SPAWN ${command} ${args.join(" ")}`,
        severity: spawnResult.status === 0 ? "INFO" : "ERROR",
        command,
        args,
        res: spawnResult,
      })
    );

    if (spawnResult.status !== 0) {
      throw new Error(spawnResult.output.join("\n"));
    }
  })
);
