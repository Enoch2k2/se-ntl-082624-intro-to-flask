from flask import make_response, jsonify
from config import app

# if we run python app.py then __name__ is "__main__"
# if we don't run this file but it is imported somewhere "__name of the file__"
@app.route("/get-user")
def index():
  return_data = {
    "id": 1,
    "username": "Bob"
  }

  return make_response(jsonify(return_data))