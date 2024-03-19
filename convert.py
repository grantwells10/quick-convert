from dotenv import load_dotenv
import os
import requests

load_dotenv()

API_KEY = os.getenv("CURRENCYLAYER_API_KEY")

def get_live_rates(api_key):
    url = f"http://api.currencylayer.com/live?access_key={api_key}"
    response = requests.get(url)
    if response:
        return response.json()['quotes']
    else:
        print("Error fetching data")

def convert_currency(amount, from_currency, to_currency):
    rates = get_live_rates(api_key=API_KEY)
    if from_currency == "USD":
        conversion_rate = rates.get(f"USD{to_currency}")
    else:
        conversion_rate = rates.get(f"USD{to_currency}") / rates.get(f"USD{from_currency}")
    return amount * conversion_rate

amount = input("Enter amount: ")

from_curr = input("Enter from currency: ")

to_curr = input("Enter to currency: ")

print(convert_currency(int(amount), from_curr, to_curr))


