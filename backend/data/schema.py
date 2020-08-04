import sqlite3


def schema(dbpath="nbabase.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()

        cur.execute("""
        CREATE TABLE user (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            password_hash VARCHAR(128),
            api_key VARCHAR(15),
        );""")

        cur.execute("""
        CREATE TABLE teams (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            user_pk INTEGER NOT NULL,
            team_name VARCHAR(25),
            stat1 FLOAT,
            stat2 FLOAT,
            stat3 FLOAT,
            FOREIGN KEY (user_pk) REFERENCES user(pk),
        );""")

        cur.execute("""
        CREATE TABLE players (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            teams_pk INTEGER NOT NULL,
            first_name VARCHAR(15),
            last_name VARCHAR(15),
            points FLOAT,
            rebounds FLOAT,
            assists FLOAT,
            steals FLOAT,
            blocks FLOAT,
            turnovers FLOAT,
            efg FLOAT,
            FOREIGN KEY (teams_pk) REFERENCES teams(pk)
        );""")


if __name__ == "__main__":
    schema()