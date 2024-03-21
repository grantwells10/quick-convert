from flask import Flask, request, render_template_string
from convert import convert_currency

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        amount = request.form.get('amount', type=float)
        from_currency = request.form['from_currency']
        to_currency = request.form['to_currency']
        converted_amount = convert_currency(amount, from_currency, to_currency)
        print("Converted amount is:" + str(converted_amount))
        return render_template_string('''
            <!doctype html>
            <html>
            <head><title>Currency Converter</title></head>
            <body>
                <h2>Converted Amount: {{ converted_amount }} {{ to_currency }}</h2>
                <a href="/">Convert another amount</a>
            </body>
            </html>
        ''', converted_amount=converted_amount, to_currency=to_currency)
    return render_template_string('''
        <!doctype html>
        <html>
        <head><title>Currency Converter</title></head>
        <body>
            <h1>Currency Converter</h1>
            <form method="post">
                Amount: <input type="number" step="0.01" name="amount" required><br>
                From Currency (e.g., USD): <input type="text" name="from_currency" required><br>
                To Currency (e.g., EUR): <input type="text" name="to_currency" required><br>
                <input type="submit" value="Convert">
            </form>
        </body>
        </html>
    ''')

if __name__ == '__main__':
    app.run(debug=True)
