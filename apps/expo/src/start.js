// Note: This script is used to start the emulator on the correct platform.
// Common Error: when getting "spawn expo ENOENT" error, you should install expo globally

// TODO: Currently this is not working, error code: "Error: spawn npx ENOENT"

const spawn = require("cross-spawn");
const os = require("os");

const platform = os.platform();

const COMMAND = "npx";
const args = ["expo start"];

args.push(platform === "darwin" ? "--ios" : "--android");

const expoProcess = spawn(COMMAND, args, { stdio: "inherit" });

expoProcess.on("error", (err) => {
  const cmd = COMMAND + " " + args.join(" ");
  console.error(`Expo Start Dev Error (${cmd}): ${err}`);
  return process.exit(1);
});

expoProcess.on("close", (code) => {
  console.log(`Expo process exited with code ${code}`);
});
