#import the modules
import os
import glob
import pandas as pd
import csv

# Function to generate logs (replace this with your actual log generation code)
def generate_logs():
    # Replace this with your actual log generation code
    logs = [
        {"Movimentação": "Movement1", "Solicitações": 10, "Gravações": 5},
        {"Movimentação": "Movement2", "Solicitações": 8, "Gravações": 3},
        # Add more log entries as needed
    ]
    return logs

with open('logs.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    field = ["Movimentação", "Solicitações", "Gravações"]
    
    writer.writerow(field)

    # Get logs from another piece of code (function: generate_logs)
    logs = generate_logs()

    for log in logs:
        writer.writerow([log["Movimentação"], log["Solicitações"], log["Gravações"]])

#list all csv files only
csv_files = glob.glob('*.{}'.format('csv'))

# Read existing CSV files into a DataFrame
df_combined = pd.concat((pd.read_csv(file) for file in csv_files), ignore_index=True)

# Display the resulting DataFrame
print(df_combined)