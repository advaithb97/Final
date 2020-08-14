import sqlite3
from hashlib import sha256
import random
from .player import get_playerinfo

dbpath = "data/nbabase.db"

class InvalidPlayerError(Exception):
    pass

class InvalidTeamError(Exception):
    pass

class TeamExistingError(Exception):
    pass

class PlayerExistingError(Exception):
    pass

class PlayerNotExistingError(Exception):
    pass

class Account:

    def __init__(self, username, password_hash, api_key, pk=None):
        self.pk = pk
        self.username = username
        self.password_hash = password_hash
        self.api_key = api_key
        self.dbpath = "data/nbabase.db"


    def update(self):
        """Add a new account to the database
        """
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE users SET api_key=? WHERE pk=?"""
            cursor.execute(sql, (self.api_key, self.pk))

    def insert(self):
        """Add a new account to the database
        """
        # Will need to hash our password
        password_hash = self.hash_password(self.password_hash)
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO users (
                     username, password_hash, api_key
                     ) VALUES(?, ?, ?)"""
            values = (self.username, password_hash, self.api_key)
            cursor.execute(sql, values)

    def new_result(self, winteam, lossteam):
        """Add a new account to the database
        """
        # Will need to hash our password
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO results (
                     winteam, lossteam, upvotes, downvotes
                     ) VALUES(?, ?, ?, ?)"""
            values = (winteam, lossteam, 0, 0)
            cursor.execute(sql, values)


    def new_team(self, user_pk, teamname):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()

            sql = """SELECT * FROM teams WHERE team_name=? AND user_pk = ?"""
            cursor.execute(sql, (teamname, self.pk))
            entries = cursor.fetchone()
            if not entries is None:
                raise TeamExistingError

            sql = """INSERT INTO teams (
                     user_pk, player_pk, team_name
                     ) VALUES(?, ?, ?)"""
            values = (user_pk, -1, teamname)
            cursor.execute(sql, values)

    
    def insert_player(self, teamname, playername):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM players WHERE name=?"""
            cursor.execute(sql, (playername,))
            entries = cursor.fetchone()
            print(entries)
            if entries is None:
                raise InvalidPlayerError
            player_pk = entries[0]

            sql = """SELECT * FROM teams WHERE team_name=? AND user_pk = ?"""
            cursor.execute(sql, (teamname, self.pk))
            entries = cursor.fetchone()
            if entries is None:
                raise InvalidTeamError
            entries_teamname = entries[3]
            entries_account_pk = entries[1]
            print(teamname, entries_teamname)
            print(self.pk, entries_account_pk)

            sql = """SELECT * FROM teams WHERE team_name=? AND user_pk = ? and player_pk = ?"""
            cursor.execute(sql, (teamname, self.pk, player_pk))
            entryvals = cursor.fetchone()
            existing = False
            if entryvals:
                existing = True
            
            if existing:
                print(player_pk, entryvals[2])
                raise PlayerExistingError

            sql = """INSERT INTO teams (
                     user_pk, player_pk, team_name
                     ) VALUES(?, ?, ?)"""
            values = (self.pk, player_pk, teamname)
            cursor.execute(sql, values)
            return entries


    def remove_player(self, teamname, playername):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM players WHERE name=?"""
            cursor.execute(sql, (playername,))
            entries = cursor.fetchone()
            print(entries)
            if entries is None:
                raise InvalidPlayerError
            player_pk = entries[0]

            sql = """SELECT * FROM teams WHERE team_name=? AND user_pk = ?"""
            cursor.execute(sql, (teamname, self.pk))
            entries = cursor.fetchone()
            if entries is None:
                raise InvalidTeamError
            entries_teamname = entries[3]
            entries_account_pk = entries[1]
            print(teamname, entries_teamname)
            print(self.pk, entries_account_pk)

            sql = """SELECT * FROM teams WHERE team_name=? AND user_pk = ? AND player_pk = ?"""
            cursor.execute(sql, (teamname, self.pk, player_pk))
            entryvals = cursor.fetchone()
            existing = False
            if entryvals:
                existing = True
                print(player_pk, entryvals[2])
            
            if not existing:
                raise PlayerNotExistingError

            sql = """DELETE FROM teams WHERE team_name = ? AND user_pk = ? AND player_pk = ?"""
            values = (teamname, self.pk, player_pk)
            cursor.execute(sql, values)
            return entries


    def all_teams(self):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM teams WHERE user_pk=?"""
            cursor.execute(sql, (self.pk,))
            entries = cursor.fetchall()
            teamlist = []
            for entry in entries:
                tname = entry[3]
                if tname not in teamlist:
                    teamlist.append(tname)
            return teamlist

    def show_votes(self):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM results"""
            cursor.execute(sql)
            entries = cursor.fetchall()
            voteslist = []
            for entry in entries:
                xVal = {"winTeam": entry[1], "lossTeam": entry[2],
                    "upVotes": entry[3], "downVotes": entry[4]}
                voteslist.append(xVal)
            return voteslist

    def team_players(self, teamname):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT player_pk FROM teams WHERE user_pk=? and team_name = ?"""
            cursor.execute(sql, (self.pk, teamname))
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
            

    @classmethod
    def upvote(cls, upvotes, winteam, lossteam):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE results SET upvotes=? WHERE winteam=? AND lossteam=?"""
            cursor.execute(sql, (upvotes+1, winteam, lossteam))
        return upvotes+1


    @classmethod
    def downvote(cls, downvotes, winteam, lossteam):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """UPDATE results SET downvotes=? WHERE winteam=? AND lossteam=?"""
            cursor.execute(sql, (downvotes+1, winteam, lossteam))
        return downvotes+1


    @classmethod
    def login(cls, username, password):
        """We will need to hash our password here
        """
        # 
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users 
                  WHERE username=? AND password_hash=?"""
            cursor.execute(sql, (username, cls.hash_password(password)))
            user = cursor.fetchone()
            # username, password_hash, api_key, pk
            return cls(user[1], user[2], user[3], user[0])


    @classmethod
    def api_authenticate(cls, api_key):
        with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """SELECT * FROM users WHERE api_key=?"""
            cursor.execute(sql, (api_key,))
            user = cursor.fetchone()
            if user:    
                return cls(user[1], user[2], user[3], user[0])
            return None

    @staticmethod
    def hash_password(password):
        hasher = sha256()
        hasher.update(password.encode())
        return hasher.hexdigest()

    @staticmethod
    def random_api_key(length=15):
        random_string = "".join([str(random.randint(1,10)) for i in range(25)])
        hasher = sha256()
        hasher.update(random_string.encode())
        return hasher.hexdigest()[:20]