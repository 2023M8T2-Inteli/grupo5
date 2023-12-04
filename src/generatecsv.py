from fastapi import FastAPI, StreamingResponse
from psycopg2 import connect
import pandas as pd

app = FastAPI()

@app.get("/download_table/{table_name}") # insert actual table name in place of {table_name} in all instances
async def download_table(table_name: str):
    # Connect to database
    conn = connect(host="your_host", port="5432", dbname="your_db", user="your_user", password="your_password") # insert actual values in place of your_host, your_db, etc.

    # Fetch data with optional filter
    query = f"SELECT * FROM {table_name}"
    # Add filter logic based on request parameters if needed

    cursor = conn.cursor()
    cursor.execute(query)
    data = cursor.fetchall()

    # Convert to pandas DataFrame
    df = pd.DataFrame(data)

    # Prepare CSV data
    csv_data = df.to_csv(index=False, header=True).encode()

    # Send CSV response
    return StreamingResponse(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={table_name}.csv"},
    )
