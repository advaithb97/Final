import sqlite3


def schema(dbpath="nbabase.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()
        
        cur.execute("""
        CREATE TABLE users (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            password_hash VARCHAR(128),
            api_key VARCHAR(15)
        );""")

        cur.execute("""
        CREATE TABLE teams (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            user_pk INTEGER NOT NULL,
            player_pk INTEGER NOT NULL,
            team_name VARCHAR(25),
            FOREIGN KEY (user_pk) REFERENCES user(pk),
            FOREIGN KEY (player_pk) REFERENCES player(pk)
        );""")

        cur.execute("""
        CREATE TABLE players (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(40),
            G INTEGER,
            MP FLOAT,
            FG FLOAT,
            FGA FLOAT,
            FGpercent FLOAT,
            ThreeP FLOAT,
            ThreePA FLOAT,
            ThreePercent FLOAT,
            TwoP FLOAT,
            TwoPA FLOAT,
            TwoPercent FLOAT,
            eFG FLOAT,
            FT FLOAT,
            FTA FLOAT,
            FTpercent FLOAT,
            ORB FLOAT,
            DRB FLOAT,
            TRB FLOAT,
            AST FLOAT,
            STL FLOAT,
            BLK FLOAT,
            TOV FLOAT,
            PF FLOAT,
            PTS FLOAT,
            TSpercent FLOAT,
            imgurl VARCHAR(32),
            TM VARCHAR(4),
            color VARCHAR(16)
        );""")


        cur.execute("""
        CREATE TABLE results (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            winteam VARCHAR(25),
            lossteam VARCHAR(25),
            upvotes INTEGER,
            downvotes INTEGER
        );""")

        cur.execute("""
        CREATE TABLE friends (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(25),
            friendname VARCHAR(25),
            outgoing BOOLEAN,
            is_friend BOOLEAN
        );""")

        cur.execute("""
        CREATE TABLE challenges (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(25),
            friendname VARCHAR(25),
            teamname VARCHAR(25),
            outgoing BOOLEAN,
        );""")
        

if __name__ == "__main__":
    schema()