from bs4 import BeautifulSoup
import requests
import sqlite3
import time

dbpath = "nbabase.db"

headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    }


baseurl = "https://www.basketball-reference.com/"


with open('2019stats.html') as page:
    soup = BeautifulSoup(page, 'html.parser')
    data = soup.find('table', id='per_game_stats')
    arr = data.find_all('a')
    extensions = []
    for elem in arr:
        if len(elem.text) > 3:
            val = str(elem['href'])
            if val not in extensions:
                extensions.append(val)

'''extensions = []
with open('2019stats.html') as page:
    soup = BeautifulSoup(page, 'html.parser')
    playerurl = soup.find('a', string='Ike Anigbogu')['href']
    extensions.append(playerurl)

print(extensions)'''

for playerurl in extensions:
    totalurl = baseurl + playerurl
    page = requests.get(totalurl, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    data = soup.find('tr', id='per_game.2019')
    arr = data.find_all('td')
    G = float(arr[4].text)
    MP = float(arr[6].text)
    FG = float(arr[7].text)
    FGA = float(arr[8].text)
    FGpercent = float(arr[9].text)
    ThreeP = float(arr[10].text)
    ThreePA = float(arr[11].text)
    ThreePercent = 0
    if arr[12].text != '': ThreePercent = float(arr[12].text)
    TwoP = float(arr[13].text)
    TwoPA = float(arr[14].text)
    TwoPercent = 0
    if arr[12].text != '': TwoPercent = float(arr[15].text)
    eFG = float(arr[16].text)
    FT = float(arr[-12].text)
    FTA = float(arr[-11].text)
    FTpercent = 0
    if arr[-10].text != '': FTpercent = float(arr[-10].text)
    ORB = float(arr[-9].text)
    DRB = float(arr[-8].text)
    TRB = float(arr[-7].text)
    AST = float(arr[-6].text)
    STL = float(arr[-5].text)
    BLK = float(arr[-4].text)
    TOV = float(arr[-3].text)
    PF = float(arr[-2].text)
    PTS = float(arr[-1].text)
    titleval = soup.find('title').text
    indexval = titleval.index('Stats')
    name = str(titleval[:indexval-1])
    print(name + ' added')
    with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO players (
                     name, G, MP, FG, FGA, FGpercent, ThreeP, ThreePA,
                     ThreePercent, TwoP, TwoPA, TwoPercent, eFG, FT, FTA,
                     FTpercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS
                     ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
            values = (name, G, MP, FG, FGA, FGpercent, ThreeP, ThreePA,
                     ThreePercent, TwoP, TwoPA, TwoPercent, eFG, FT, FTA,
                     FTpercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS)
            cursor.execute(sql, values)
    time.sleep(15)
