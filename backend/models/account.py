import sqlite3
from hashlib import sha256
import random

dbpath = "data/nbabase.db"

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

    def new_team(self, user_pk, teamname):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO teams (
                     user_pk, player_pk, team_name
                     ) VALUES(?, ?, ?)"""
            values = (user_pk, -1, teamname)
            cursor.execute(sql, values)

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