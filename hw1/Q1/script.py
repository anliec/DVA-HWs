import http.client
import json
import time
import sys
import collections
import argparse


class IMDBRequest:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.last_request_time = None
        self.request_max_time = 1/3  # in sec
        self.api_url = "api.themoviedb.org"
        self.base_url = "/3/"
        print("connect")
        self.con = http.client.HTTPSConnection(self.api_url)

    def request(self, mode: str, **kwargs):
        if self.last_request_time is None:
            self.last_request_time = time.time()
        elif self.last_request_time + self.request_max_time > time.time():
            time.sleep(self.last_request_time + self.request_max_time - time.time())
            self.last_request_time = time.time()
        kwargs["api_key"] = self.api_key
        url = self.base_url + mode + "?" + '&'.join(["{}={}".format(k, v) for k, v in kwargs.items()])
        # print(url)
        self.con.request('GET', url)
        response = self.con.getresponse().read()
        return json.loads(response, encoding="utf-8")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(type=str,
                        dest="api_key")
    args = parser.parse_args()

    imdb = IMDBRequest(args.api_key)

    # b.
    data = imdb.request("genre/movie/list", language="en-US")
    # print(data)
    drama_id = filter(lambda genre: genre["name"] == "Drama", data["genres"]).__next__()['id']
    # print(drama_id)

    page = 0
    movie_limit = 350
    movies = []
    with open("movie_ID_name.csv", 'w') as file:
        while len(movies) < movie_limit:
            page += 1
            drama_list = imdb.request("discover/movie", page=page,
                                      **{"with_genres": drama_id, "primary_release_date.gte": 2004,
                                         "sort_by": "popularity.desc"})
            movies += drama_list['results']
            for movie in drama_list['results']:
                file.write("{},{}\n".format(movie['id'], movie['title']))
    print(len(movies), movies)

    # c.
    similar_limit = 5
    similar = {}
    for movie in movies[:movie_limit]:
        similar_list = imdb.request("movie/{}/similar".format(movie["id"]))
        filtered_dict = {}
        try:
            for similar_movie in similar_list["results"][:similar_limit]:
                if similar_movie['id'] in similar:
                    if movie['id'] in similar[similar_movie['id']]:
                        # print("movie filtered: {}".format(similar_movie))
                        continue
                filtered_dict[similar_movie['id']] = similar_movie
        except KeyError as e:
            print(similar_list)
            raise e
        # print(len(similar))
        # if movie["id"] in similar:
        #     print("Movie {} already in similar dict".format(movie["title"]))
        similar[movie["id"]] = filtered_dict
    print(len(similar))

    with open("movie_ID_sim_movie_ID.csv", 'w') as file:
        for k, v in similar.items():
            for similar_movie_id in v.keys():
                file.write("{},{}\n".format(k, similar_movie_id))









