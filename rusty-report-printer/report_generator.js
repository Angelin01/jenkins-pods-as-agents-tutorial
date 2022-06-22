#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

async function asyncSleep(millis) {
    return new Promise(resolve => {
        setTimeout(resolve, millis);
    });
}

function randomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

async function getReportStats() {
    console.log("Collecting super important stats...");
    await asyncSleep(2000);
    const availableMetrics = ["the best metrics", "amazing metrics", "all the metrics", "super metrics"];
    return {
        metrics: availableMetrics[Math.floor(Math.random()*availableMetrics.length)],
        speed: randomInt(10000, 90000),
        bugs: randomInt(-10, 0),
        universe: 42
    }
}

async function generateReport() {
    console.log("Generating report...");
    await asyncSleep(500);
    return {
        report: await getReportStats(),
        time: (new Date()).toISOString()
    }
}

async function writeReport(report) {
    console.log("Writing report file...");
    await asyncSleep(1000);

    const writeDir = path.join(__dirname, "resources");
    if (!fs.existsSync(writeDir)){
        fs.mkdirSync(writeDir);
    }

    const reportFile = path.join(writeDir, "report.json");
    fs.writeFileSync(reportFile, JSON.stringify(report));

    console.log(`Done! Report available at ${reportFile}`);
}

async function main() {
    const report = await generateReport();
    await writeReport(report);
}

void main();
