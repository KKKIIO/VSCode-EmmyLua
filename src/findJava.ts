import * as path from "path";
import * as vscode from "vscode";

function validateJava(javaPath: string): boolean {
    return true;
}

export default function(): string|null {
	var executableFile: string = "java";
	if(process["platform"] === "win32") {
		executableFile += ".exe";
    }
    
    var settingsPath = vscode.workspace.getConfiguration("emmylua").get("java.home");
    if (settingsPath) {
        let javaPath = path.join(<string>settingsPath, "bin", executableFile);
        if (validateJava(javaPath)) {
            return javaPath;
        }
    }

	if("JAVA_HOME" in process.env) {
		let javaHome = <string> process.env.JAVA_HOME;
        let javaPath = path.join(javaHome, "bin", executableFile);
        return javaPath;
	}

	if("PATH" in process.env) {
		let PATH = <string> process.env.PATH;
		let paths = PATH.split(path.delimiter);
		let pathCount = paths.length;
		for(let i = 0; i < pathCount; i++) {
			let javaPath = path.join(paths[i], executableFile);
			if(validateJava(javaPath)) {
				return javaPath;
			}
		}
	}
     
	return null;
}