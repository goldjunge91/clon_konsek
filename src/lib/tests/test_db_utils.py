import logging
import os
from lib.db_utils import setup_logging

def test_setup_logging():
    # Call the setup_logging function
    setup_logging()

    # Check if the log file is created
    log_file_path = f"{os.path.dirname(__file__)}/db_utils.log"
    assert os.path.exists(log_file_path)

    # Check if the logger is configured correctly
    logger = logging.getLogger()
    assert logger.level == logging.INFO

    # Check if the file handler is added to the logger
    assert any(isinstance(handler, logging.handlers.RotatingFileHandler) for handler in logger.handlers)

    # Check if the console handler is added to the logger
    assert any(isinstance(handler, logging.StreamHandler) for handler in logger.handlers)

    # Check if the log format is correct
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler = next(handler for handler in logger.handlers if isinstance(handler, logging.handlers.RotatingFileHandler))
    assert file_handler.formatter._fmt == formatter._fmt
    console_handler = next(handler for handler in logger.handlers if isinstance(handler, logging.StreamHandler))
    assert console_handler.formatter._fmt == formatter._fmt