import json 
from urllib import request, error

my_list = []

banned_publishers = [
  'NBC - Heroes',
  'SyFy',
  'South Park',
  'ABC Studios',
  'Universal Studios'
]

def make_model(json_dict):
  new_model = {
    "model": "heroes.hero",
    "pk": json_dict['id'],
    "fields": {
      "name": json_dict['name'],
      "full_name": json_dict['biography']['fullName'],
      "image_url": json_dict['images']['lg'],
      "slug": json_dict['slug'],
      "alter_egos": json_dict['biography']['alterEgos'],
      "aliases": '+'.join(json_dict['biography']['aliases']),
      "gender": json_dict['appearance']['gender'],
      "publisher": json_dict['biography']['publisher'],
      "alignment": json_dict['biography']['alignment'],
      "occupation": json_dict['work']['occupation'],
      "affiliations": json_dict['connections']['groupAffiliation']
    }
  }

  return new_model

res = request.urlopen('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json')
data = json.loads(res.read())
my_list = [make_model(item) for item in data if item['biography']['publisher'] not in banned_publishers]

with open('heroes/seeds.json', 'w') as outfile:
  json.dump(my_list, outfile, indent=2)