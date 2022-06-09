#!/usr/bin/env python3
from __future__ import annotations

import json
import random
import os
from os import path
from datetime import datetime, timezone
from time import sleep


def get_report_stats() -> dict:
	print('Collecting super important stats...')
	sleep(2)
	return {
		'metrics': random.choice(['the best metrics', 'amazing metrics', 'all the metrics', 'super metrics']),
		'speed': random.randint(10000, 99999),
		'bugs': random.randint(-10, 0),
		'universe': 42
	}


def generate_report() -> dict:
	print('Generating report...')
	sleep(0.5)
	return {
		'report': get_report_stats(),
		'time': datetime.now(timezone.utc).isoformat()
	}


def write_report(report: dict) -> None:
	print('Writing report file...')
	sleep(1)

	write_dir = path.join(path.dirname(path.realpath(__file__)), 'resources')
	report_file = path.join(write_dir, 'report.json')
	os.makedirs(write_dir, exist_ok=True)
	with open(report_file, 'w') as out:
		json.dump(report, out)

	print(f'Done! Report available at {report_file}')


def main():
	report = generate_report()
	write_report(report)

if __name__ == '__main__':
	main()
