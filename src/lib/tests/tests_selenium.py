# test_selenium_script.py
import debugpy
from main_3v2 import navigate_to_url  #
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    filename='selenium_debug.log',
                    filemode='w')

# In your script, add log statements like:
logging.debug(f"Attempting to navigate to URL: {user_link}")
driver.get(user_link)
logging.debug("Successfully navigated to URL")

# For the error you're seeing:
try:
    driver.get(user_link)
except Exception as e:
    logging.error(f"Failed to navigate to URL: {user_link}")
    logging.error(f"Error details: {str(e)}")Import the relevant function

def test_navigation():
    url = "https://example.com"  # Use a known working URL for testing
    result = navigate_to_url(url)
    assert result == True  # Assuming navigate_to_url returns True on success




