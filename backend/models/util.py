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
    output['points'] = float(arr[-1].text)
    output['rebounds'] = float(arr[-7].text)
    output['assists'] = float(arr[-6].text)
    output['steals'] = float(arr[-5].text)
    output['blocks'] = float(arr[-4].text)
    output['turnovers'] = float(arr[-3].text)
    output['efg'] = float(arr[16].text)
    return output

#print(get_playerdata(get_playerurl("Steven", "Adams")))