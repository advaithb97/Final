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
    playerurl = soup.find('a', string='Duncan Robinson')['href']
    extensions.append(playerurl)
print(extensions)
'''

def colorfnc(tm):
    if tm == 'ATL' or tm == 'BOS' or tm == 'BRK' or tm == 'CHI':
        return 'primary'
    elif tm == 'CHO' or tm == 'CLE' or tm == 'DAL' or tm == 'DEN':
        return 'secondary'
    elif tm == 'DET' or tm == 'GSW' or tm == 'HOU' or tm == 'IND':
        return 'success'
    elif tm == 'IND' or tm == 'LAC' or tm == 'LAL' or tm == 'MEM':
        return 'danger'
    elif tm == 'MIA' or tm == 'MIL' or tm == 'MIN' or tm == 'NOP':
        return 'warning'
    elif tm == 'NYK' or tm == 'OKC' or tm == 'ORL' or tm == 'PHI':
        return 'info'
    return 'dark'


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
    FGpercent = 0
    if arr[9].text != '': FGpercent = float(arr[9].text)
    ThreeP = float(arr[10].text)
    ThreePA = float(arr[11].text)
    ThreePercent = 0
    if arr[12].text != '': ThreePercent = float(arr[12].text)
    TwoP = float(arr[13].text)
    TwoPA = float(arr[14].text)
    TwoPercent = 0
    if arr[15].text != '': TwoPercent = float(arr[15].text)
    eFG = 0
    if arr[16].text != '': eFG = float(arr[16].text)
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
    TSA = FGA + .44*FTA
    TSpercent = 0
    if TSA != 0: TSpercent = PTS/(2*TSA)
    imgurl = soup.find('img', itemscope='image')['src']

    dataval = soup.find_all('tr', id='per_game.2019')
    arrval = dataval[-1].find_all('td')
    TM = str(arrval[1].text)
    color = colorfnc(TM)
    print(name + ' added')
    with sqlite3.connect(dbpath) as conn:
            cursor = conn.cursor()
            sql = """INSERT INTO players (
                     name, G, MP, FG, FGA, FGpercent, ThreeP, ThreePA,
                     ThreePercent, TwoP, TwoPA, TwoPercent, eFG, FT, FTA,
                     FTpercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS,
                     TSpercent, imgurl, TM, color
                     ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
            values = (name, G, MP, FG, FGA, FGpercent, ThreeP, ThreePA,
                     ThreePercent, TwoP, TwoPA, TwoPercent, eFG, FT, FTA,
                     FTpercent, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS,
                     TSpercent, imgurl, TM, color)
            cursor.execute(sql, values)
    time.sleep(10)