import requests
from bs4 import BeautifulSoup

# URL to scrape png from websites
URL = "https://realpython.github.io/fake-jobs/"
page = requests.get(URL)


soup = BeautifulSoup(page.content, "html.parser")