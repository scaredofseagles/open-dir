const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { writeFile } = require("fs/promises");
require("dotenv").config();

// TODO: add switch for atom or vs code
// TODO: add help arg

// FIXME: handle relative paths
const writeInitFile = async () => {
  let projectPath = process.argv[2] === "." ? process.cwd() : process.argv[2];

  try {
    await writeFile(
      process.env.PATH_INIT_SCRIPT,
      `atom.project.setPaths(['${projectPath}'])`
    );
  } catch (err) {
    console.error(err);
  }
};

const cleanup = async () => {
  try {
    await writeFile(process.env.PATH_INIT_SCRIPT, "");
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  try {
    await writeInitFile();
    await exec(`open -n ${process.env.PATH_APP_ATOM}`);

    // TODO: check if app has been opened, cleanup file, exit process
  } catch (err) {
    console.error(err);
    await cleanup();
  }
})();
