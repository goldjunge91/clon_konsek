import os
from crontab import CronTab
from datetime import datetime, timedelta

def schedule_delete_folder_cronjob(folder_path: str) -> None:
    try:
        # Create a new cron job
        cron = CronTab(user=True)
        command = f"rm -rf {folder_path}"
        job = cron.new(command=command)

        # Set the job to run in 2 minutes
        now = datetime.now()
        execution_time = now + timedelta(minutes=2)
        job.setall(execution_time.strftime("%-M %-H %-d %-m *"))

        # Write the cron job to the crontab file
        cron.write()

        print(f"Cronjob scheduled to delete folder: {folder_path} at {execution_time}")

    except Exception as error:
        print(f"Fehler beim Planen des Cronjobs: {error}")

# Test the cronjob scheduling
folder_to_delete = "/home/marco/git/pdf-website/DATA/downloads/ae7aa1a8-17bd-4078-a103-12ecef011ca2copy3"

# Create the test folder
os.makedirs(folder_to_delete, exist_ok=True)

# Schedule the cronjob to delete the folder
schedule_delete_folder_cronjob(folder_to_delete)

print("Cronjob scheduled. Please wait for 2 minutes to check if the folder is deleted.")