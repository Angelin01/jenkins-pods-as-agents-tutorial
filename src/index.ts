import fs from "fs";
import * as path from "path";

function loadResource(resourcePath: string): string {
    const fullResourcePath = path.join(__dirname, "..", "resources", ...resourcePath.split("/"));
	return fs.readFileSync(fullResourcePath, { encoding: "utf-8" });
}

async function asyncSleep(millis: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, millis);
    });
}

async function main(): Promise<void> {
	console.log("Reading our super important report...");
	await asyncSleep(500);
	let rawReport;
	try {
		rawReport = loadResource("report.json");
	}
	catch (err) {
		console.error("Failed reading our report :(");
		console.error(err);
		process.exit(1);
	}

	console.log("Parsing the report...");
	await asyncSleep(1000);
	let report;
	try {
		report = JSON.parse(rawReport);
	}
	catch(err) {
		console.error("Failed parsing our report. Was it not good enough? :(");
		console.error(err);
		process.exit(1);
	}

	console.log("Report parsed successfully!");
	console.log("Now printing our report continuously to show how good we are!");
	while (true) {
		console.log(report);
		await asyncSleep(15*1000);
	}
}

void main();
