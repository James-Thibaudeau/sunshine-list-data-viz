import json
from pprint import pprint

data = json.load(open('apiData.json'))

result = []

for i in range(0, 17):
    result = result + data[str(i)]

result_dict = {"data": result}

with open('goodData.json', 'w') as outfile:
    json.dump(result_dict, outfile)