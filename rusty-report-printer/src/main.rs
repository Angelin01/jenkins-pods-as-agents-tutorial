use std::{fs, process};
use std::thread::sleep;
use std::time::Duration;
use chrono::{DateTime, Utc};
use serde::Deserialize;

#[allow(unused)]
#[derive(Deserialize, Debug)]
struct Report {
    metrics: String,
    speed: i32,
    bugs: i32,
    universe: u8
}

#[allow(unused)]
#[derive(Deserialize, Debug)]
struct ReportWrapper {
    report: Report,
    time: DateTime<Utc>
}

fn main() {
    println!("Reading our super important report...");
    sleep(Duration::from_millis(500));

    let report_content;
    match fs::read_to_string("resources/report.json") {
        Ok(s) => {report_content = s}
        Err(e) => {
            eprintln!("Failed reading our report :(");
            eprintln!("Error: {e}");
            process::exit(1);
        }
    }

    println!("Parsing the report...");
    sleep(Duration::from_secs(1));
    let report: ReportWrapper;
    match serde_json::from_str(&report_content) {
        Ok(s) => { report = s }
        Err(e) => {
            eprintln!("Failed parsing our report. Was it not good enough? :(");
            eprintln!("Error: {e}");
            process::exit(1);
        }
    }

    println!("Report parsed successfully!");
    println!("Now printing our report continuously to show how good we are!");

    loop {
        println!("{report:#?}");
        sleep(Duration::from_secs(15));
    }
}
