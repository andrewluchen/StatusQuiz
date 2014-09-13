from flask import Flask, render_template, render_template_string, redirect, request, jsonify
from itertools import groupby
from jinja2.environment import Environment
import os, json

app = Flask(__name__)
app.jinja_env.variable_start_string = '{|'
app.jinja_env.variable_end_string = '|}'

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True, port = 80, host='0.0.0.0')
