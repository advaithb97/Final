import sqlite3

dbpath = "data/nbabase.db"

def get_playerdata(name):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        sql = """SELECT * FROM players WHERE name=?"""
        cursor.execute(sql, (name,))
        arr = cursor.fetchall()[0]
        output = {}
        output['G'] = arr[2]
        output['MP'] = arr[3]
        output['FG'] = arr[4]
        output['FGA'] = arr[5]
        output['FG%'] = arr[6]
        output['3P'] = arr[7]
        output['3PA'] = arr[8]
        output['3P%'] = arr[9]
        output['2P'] = arr[10]
        output['2PA'] = arr[11]
        output['2P%'] = arr[12]
        output['eFG'] = arr[13]
        output['FT'] = arr[-12]
        output['FTA'] = arr[-11]
        output['FT%'] = arr[-10]
        output['ORB'] = arr[-9]
        output['DRB'] = arr[-8]
        output['TRB'] = arr[-7]
        output['AST'] = arr[-6]
        output['STL'] = arr[-5]
        output['BLK'] = arr[-4]
        output['TOV'] = arr[-3]
        output['PF'] = arr[-2]
        output['PTS'] = arr[-1]
        return output


def get_playerinfo(pk):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        sql = """SELECT * FROM players WHERE pk=?"""
        cursor.execute(sql, (pk,))
        arr = cursor.fetchall()[0]
        output = {}
        output['name'] = arr[1]
        output['G'] = arr[2]
        output['MP'] = arr[3]
        output['FG'] = arr[4]
        output['FGA'] = arr[5]
        output['FG%'] = arr[6]
        output['3P'] = arr[7]
        output['3PA'] = arr[8]
        output['3P%'] = arr[9]
        output['2P'] = arr[10]
        output['2PA'] = arr[11]
        output['2P%'] = arr[12]
        output['eFG'] = arr[13]
        output['FT'] = arr[-12]
        output['FTA'] = arr[-11]
        output['FT%'] = arr[-10]
        output['ORB'] = arr[-9]
        output['DRB'] = arr[-8]
        output['TRB'] = arr[-7]
        output['AST'] = arr[-6]
        output['STL'] = arr[-5]
        output['BLK'] = arr[-4]
        output['TOV'] = arr[-3]
        output['PF'] = arr[-2]
        output['PTS'] = arr[-1]
        return output