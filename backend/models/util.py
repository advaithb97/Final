from bs4 import BeautifulSoup
import requests

headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    }

def get_playerurl(first_name, last_name):
    page = requests.get("https://www.basketball-reference.com/leagues/NBA_2020_per_game.html", headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    return soup.find('a', string=first_name + ' ' + last_name)['href']
    #print(soup.find('a', string='Steven Adams')['href'])


def get_playerdata(playerurl):
    baseurl = "https://www.basketball-reference.com/"
    totalurl = baseurl + playerurl
    page = requests.get(totalurl, headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    data = soup.find('tr', id='per_game.2019')
    arr = data.find_all('td')
    output = {}
    output['G'] = float(arr[4].text)
    output['MP'] = float(arr[6].text)
    output['FG'] = float(arr[7].text)
    output['FGA'] = float(arr[8].text)
    output['FG%'] = float(arr[9].text)
    output['3P'] = float(arr[10].text)
    output['3PA'] = float(arr[11].text)
    output['3P%'] = float(arr[12].text)
    output['2P'] = float(arr[13].text)
    output['2PA'] = float(arr[14].text)
    output['2P%'] = float(arr[15].text)
    output['eFG'] = float(arr[16].text)
    output['FT'] = float(arr[-12].text)
    output['FTA'] = float(arr[-11].text)
    output['FT%'] = float(arr[-10].text)
    output['ORB'] = float(arr[-9].text)
    output['DRB'] = float(arr[-8].text)
    output['TRB'] = float(arr[-7].text)
    output['AST'] = float(arr[-6].text)
    output['STL'] = float(arr[-5].text)
    output['BLK'] = float(arr[-4].text)
    output['TOV'] = float(arr[-3].text)
    output['PF'] = float(arr[-2].text)
    output['PTS'] = float(arr[-1].text)
    return output

print(get_playerdata(get_playerurl("Ryan", "Anderson")))