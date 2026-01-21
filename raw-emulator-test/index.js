const childProcess = require("node:child_process")

const BINARY_PATH = "/Users/alejandromarco/.cache/firebase/emulators/cloud-firestore-emulator-v1.20.2.jar"

let emulator = {}

emulator.instance = childProcess.spawn("java", [
    '-Dgoogle.cloud_firestore.debug_log_level=FINE',
    '-Duser.language=en',
    '-jar',
    BINARY_PATH,
    '--host',
    '127.0.0.1',
    '--port',
    8080,
    '--websocket_port',
    9150,
    '--project_id',
    'demo-project',
    '--rules',
    [
        {
            database: '(default)',
            rules: '/Users/alejandromarco/Desktop/firebase-tools/issues/9770/firestore.rules'
        },
        {
            database: 'non-default',
            rules: '/Users/alejandromarco/Desktop/firebase-tools/issues/9770/firestore.non-default.rules'
        }
    ],
    '--single_project_mode',
    true
])

emulator.instance.stderr?.on("data", (data) => {
    console.log("DEBUG", data.toString());
});

emulator.instance.once("exit", async (code, signal) => {
    if (signal) {
        utils.logWarning(`Firestore emulator has exited upon receiving signal: ${signal}`);
    } else if (code && code !== 0 && code !== /* SIGINT */ 130) {
        console.log("Firestore emulator", `has exited with code: ${code}`);
    }
});