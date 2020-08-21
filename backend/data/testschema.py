import sqlite3


def testschema(dbpath="nbabase.db"):
    with sqlite3.connect(dbpath) as conn:
        cur = conn.cursor()
        cur.execute("""
        CREATE TABLE challenges (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(25),
            friendname VARCHAR(25),
            teamname VARCHAR(25),
        );""")


    testschema()