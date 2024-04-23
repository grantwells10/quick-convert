import requests
from bs4 import BeautifulSoup
import json

currency_wikipedia = 'https://en.wikipedia.org/wiki/List_of_circulating_currencies'
response = requests.get(currency_wikipedia)

soup = BeautifulSoup(response.text, 'html.parser')
table = soup.find('table', class_='wikitable sortable mw-collapsible')

currency_data = []

for row in table.find_all('tr')[1:]:  # skips the first row which is the header
    cells = row.find_all('td')
    if cells:
        currency_info = {
            'State/Territory': cells[0].get_text(strip=True),
            'Currency Name': cells[1].get_text(strip=True),
            'Symbol': cells[2].get_text(strip=True) if len(cells) > 2 else '',
            'ISO Code': cells[3].get_text(strip=True) if len(cells) > 3 else '',
            'Fractional Unit': cells[4].get_text(strip=True) if len(cells) > 4 else '',
            'Number to Basic': cells[5].get_text(strip=True) if len(cells) > 5 else ''
        }
        currency_data.append(currency_info)

for currency in currency_data:
    print(currency)

with open('currency.json', 'w', encoding='utf-8') as f:
    json.dump(currency_data, f, indent=4)

