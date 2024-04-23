import requests
from bs4 import BeautifulSoup
import json

currency_wikipedia = 'https://en.wikipedia.org/wiki/List_of_circulating_currencies'

response = requests.get(currency_wikipedia)

soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find_all('table', {'class': 'wikitable sortable'})[0]

# extract the rows, skipping the header row
rows = table.find_all('tr')[1:]
currency_data = []

for row in rows:
    cols = row.find_all('td')
    cols_text = [ele.text.strip() for ele in cols]
    
    if len(cols_text) >= 4:
        currency_data.append({
            'State/Territory': cols_text[0],
            'Currency Name': cols_text[1],
            'Symbol': cols_text[2],
            'ISO Code': cols_text[3]
        })

with open('currency_data.json', 'w', encoding='utf-8') as outfile:
    json.dump(currency_data, outfile, ensure_ascii=False, indent=4)
