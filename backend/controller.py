from flask import Flask, jsonify, request
from flask_cors import CORS
from models.player import get_playerdata
from models.account import Account, InvalidPlayerError, InvalidTeamError, PlayerExistingError, PlayerNotExistingError, TeamExistingError, VoteEntryExistingError, FriendExistingError, ChallengeExistingError, NotFriendError

app = Flask(__name__)
CORS(app)

#print(get_playerdata(get_playerurl("Steven", "Adams")))

dbpath = "data/nbabase.db"


@app.route("/api/player/<first_name>/<last_name>", methods=["GET"])
def player_data(first_name, last_name):
    name = first_name + ' ' + last_name
    player_vals = get_playerdata(name)
    print(player_vals)
    return jsonify({ "name":player_vals['name'], "points": player_vals['PTS'], "rebounds": player_vals['TRB'], 
        "assists": player_vals['AST'], "steals": player_vals['STL'], 'efg': player_vals['eFG'],
        "blocks": player_vals['BLK'], "turnovers":player_vals['TOV'], "color":player_vals['color'],
        "imgurl":player_vals['imgurl'], 'team':player_vals['TM']})


@app.route("/api/insert", methods=["POST"])
def insert():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    teamname = data.get("teamname")
    playername = data.get("playername")
    try:
        account.insert_player(teamname, playername)
    except InvalidPlayerError:
        return jsonify({"error": "invalid player"})
    except InvalidTeamError:
        return jsonify({"error": "invalid team"})
    except PlayerExistingError:
        return jsonify({"error": "you already have this player on this team"})
    return jsonify({"success":True})


@app.route("/api/remove", methods=["POST"])
def remove():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    teamname = data.get("teamname")
    playername = data.get("playername")
    try:
        account.remove_player(teamname, playername)
    except InvalidPlayerError:
        return jsonify({"error": "invalid player"})
    except InvalidTeamError:
        return jsonify({"error": "invalid team"})
    except PlayerNotExistingError:
        return jsonify({"error": "you don't have this player on this team"})
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
        account.update()
        return jsonify({"session_id": account.api_key, 
                    "username": account.username})
    return jsonify({"session_id": "", 
                    "username": ""})


@app.route("/api/insert_result", methods=["POST"])
def insert_result():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    winteam = data.get("winteam")
    lossteam = data.get("lossteam")
    try:
        account.new_result(winteam, lossteam)
    except VoteEntryExistingError:
        return jsonify({"error": "Vote Entry Exists"})
    return jsonify({"success":True})


@app.route("/api/upvote", methods=["POST"])
def upvote():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    winteam = data.get("winteam")
    lossteam = data.get("lossteam")
    upvotes = data.get("upvotes")
    z = account.upvote(upvotes, winteam, lossteam)
    return jsonify({"upvotes": z})


@app.route("/api/downvote", methods=["POST"])
def downvote():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    winteam = data.get("winteam")
    lossteam = data.get("lossteam")
    downvotes = data.get("downvotes")
    z = account.downvote(downvotes, winteam, lossteam)
    return jsonify({"downvotes": z})

@app.route("/api/viewVotes", methods=["POST"])
def view_votes():
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    votes_out = account.show_votes()
    return jsonify({"votes": votes_out})


@app.route("/api/create", methods=["POST"])
def create_user():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    key = Account.random_api_key()
    new_user = Account(data.get("username"), data.get("password"), 
                       key)
    new_user.insert()
    # save new account account.save()
    return jsonify({"session_id": new_user.api_key, 
                    "username": new_user.username})


@app.route("/api/newteam", methods=["POST"])
def create_team():
    data = request.get_json()
    teamname = data.get("teamname")
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    try:
        account.new_team(account.pk, teamname)
    except TeamExistingError:
        return jsonify({"error": "you already have this team"})
    return jsonify({"success":True})
    


@app.route("/api/myTeams", methods=["POST"])
def my_teams():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    teams = account.all_teams()
    print(teams)
    return jsonify({"teams": teams})


@app.route("/api/viewTeam", methods=["POST"])
def view_team():
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    teamname = data.get("teamname")
    if not account:
        return jsonify({"some error": "error here"})
    tplayers = account.team_players(teamname)
    print(tplayers)
    return jsonify({"team": tplayers})


@app.route("/api/friendRequest", methods=["POST"])
def friend_request():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    friendname = data.get("friendname")
    try:
        account.friend_request(friendname)
    except FriendExistingError:
        return jsonify({"error": "you already have this friend"})
    return jsonify({"success":True})


@app.route("/api/showRequests", methods=["POST"])
def my_requests():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    friend_requests = account.show_requests()
    return jsonify({"friend requests": friend_requests})


@app.route("/api/showFriends", methods=["POST"])
def my_friends():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    my_friends = account.all_friends()
    return jsonify({"friends": my_friends})


@app.route("/api/acceptFriend", methods=["POST"])
def accept_friend():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    friendname = data.get("friendname")
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    account.accept_friend(friendname)
    return jsonify({"success":True})


@app.route("/api/rejectFriend", methods=["POST"])
def reject_friend():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    friendname = data.get("friendname")
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    account.reject_friend(friendname)
    return jsonify({"success":True})


@app.route("/api/challengeRequest", methods=["POST"])
def challenge_request():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    friendname = data.get("friendname")
    teamname = data.get("teamname")
    try:
        account.challenge_request(friendname, teamname)
    except NotFriendError:
        return jsonify({"error": "you can only challenge friends"})
    except ChallengeExistingError:
        return jsonify({"error": "you already made this challenge"})
    return jsonify({"success":True})

@app.route("/api/showChallenges", methods=["POST"])
def my_challenges():
    # use token to authenticate user
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    my_challenges = account.all_challenges()
    return jsonify({"challenge requests": my_challenges})


@app.route("/api/deleteChallenge", methods=["POST"])
def delete_challenge():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    friendname = data.get("friendname")
    friendteam = data.get("friendteam")
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    account.delete_challenge(friendname, friendteam)
    return jsonify({"success":True})


@app.route("/api/confirmChallenge", methods=["POST"])
def confirm_challenge():
    # get data from request
    data = request.get_json()
    # TODO: see if account exists
    account = Account.api_authenticate(data.get("token"))
    teamname = data.get("teamname")
    friendname = data.get("friendname")
    friendteam = data.get("friendteam")
    if not account:
        return jsonify({"some error": "error here"})
    # get data from request
    # if the account exists:
    friend_pk = ''
    with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE name=?"""
            cursor.execute(sql, (friendname,))
            entries = cursor.fetchone()
            friend_pk = entries[0]
    team1 = grab_team(account.pk, teamname)
    team2 = grab_team(friend_pk, friendteam)
    return jsonify({"team1":team1, 'team2':team2})


def grab_team(user_pk, teamname):
    data = request.get_json()
    account = Account.api_authenticate(data.get("token"))
    teamname = data.get("teamname")
    if not account:
        return jsonify({"some error": "error here"})
    with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT player_pk FROM teams WHERE user_pk=? and team_name = ?"""
            cursor.execute(sql, (user_pk, teamname))
            pklist = cursor.fetchall()
            playerlist = []
            pklist = pklist[1:]
            print(pklist)
            for primary_key in pklist:
                print(primary_key)
                pkey = primary_key[0]
                playerinfo = get_playerinfo(pkey)
                playerlist.append(playerinfo)
            return playerlist