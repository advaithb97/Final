from flask import Flask, jsonify, request
from flask_cors import CORS
from models.util import get_playerdata, get_playerurl

app = Flask(__name__)
CORS(app)

#print(get_playerdata(get_playerurl("Steven", "Adams")))


@app.route("/api/player/<first_name>/<last_name>", methods=["GET"])
def player_data(first_name, last_name):
    player_vals = get_playerdata(get_playerurl(first_name, last_name))
    return jsonify({"points": player_vals['points'], "rebounds": player_vals['rebounds'], 
        "assists": player_vals['assists'], "steals": player_vals['steals'], 'efg': player_vals['efg'],
        "blocks": player_vals['blocks'], "turnovers":player_vals['turnovers']})



@app.route("/api/insert", methods=["POST"])
def insert():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    try:
        account.insert(get_playerdata(get_playerurl(data.get("first_name"), data.get("last_name"))))
    except InvalidPlayerError:
        return jsonify({"error": "invalid player"})
    return jsonify({"success":True})


@app.route("/api/login", methods=["POST"])
def login():
    # get data from request
    data = request.get_json()
    # authenticate our account
    account = Account.login(data.get("username"), data.get("password"))
    # if the account exists, return api_token
    if account:
        account.api_key = account.random_api_key()
        account.save()
        return jsonify({"session_id": account.api_key, 
                    "username": account.username})
    return jsonify({"session_id": "", 
                    "username": ""})


@app.route("/api/create", methods=["POST"])
def create_user():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    key = Account.random_api_key()
    new_user = Account(data.get("username"), data.get("password"), 
                       key, data.get("balance"))
    new_user.save()
    # save new account account.save()
    return jsonify({"session_id": new_user.api_key, 
                    "username": new_user.username})
