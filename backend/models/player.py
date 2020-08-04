import sqlite3

def insert_player(teamspk, playerdata):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        sql = """INSERT INTO players(
            teams_pk, first_name, last_name, points, rebounds, assists, steals, blocks, turnovers, efg
            ) VALUES (?,?,?,?,?,?,?,?,?)"""
        values = (first_name, last_name,
                    *(playerdata.values()))
        cursor.execute(sql, values)