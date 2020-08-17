import sqlite3

dbpath = "data/nbabase.db"

def get_playerdata(name):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()
        sql = """SELECT * FROM players WHERE name=?"""
        cursor.execute(sql, (name,))
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
        output['FT'] = arr[14]
        output['FTA'] = arr[15]
        output['FT%'] = arr[16]
        output['ORB'] = arr[17]
        output['DRB'] = arr[18]
        output['TRB'] = arr[19]
        output['AST'] = arr[20]
        output['STL'] = arr[21]
        output['BLK'] = arr[22]
        output['TOV'] = arr[23]
        output['PF'] = arr[24]
        output['PTS'] = arr[25]
        output['TS%'] = arr[26]
        output['imgurl'] = arr[27]
        output['TM'] = arr[28]
        output['color'] = arr[29]
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
        output['FT'] = arr[14]
        output['FTA'] = arr[15]
        output['FT%'] = arr[16]
        output['ORB'] = arr[17]
        output['DRB'] = arr[18]
        output['TRB'] = arr[19]
        output['AST'] = arr[20]
        output['STL'] = arr[21]
        output['BLK'] = arr[22]
        output['TOV'] = arr[23]
        output['PF'] = arr[24]
        output['PTS'] = arr[25]
        output['TS%'] = arr[26]
        output['imgurl'] = arr[27]
        output['TM'] = arr[28]
        output['color'] = arr[29]
        return output