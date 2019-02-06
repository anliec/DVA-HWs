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
        self.bad_request_timeout = 10  # in sec
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
        while True:
            self.con.request('GET', url)
            response = self.con.getresponse().read()
            json_response = json.loads(response, encoding="utf-8")
            if 'status_code' in json_response and json_response['status_code'] == 25:
                print("Time out get, waiting for 10 sec")
                time.sleep(self.bad_request_timeout)
                continue
            return json_response


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(type=str,
                        dest="api_key")
    args = parser.parse_args()

    imdb = IMDBRequest(args.api_key)

    # b.
    data = imdb.request("genre/movie/list", language="en-US")
    drama_id = filter(lambda genre: genre["name"] == "Drama", data["genres"]).__next__()['id']

    page = 0
    movie_limit = 350
    movies = []
    with open("movie_ID_name.csv", 'w') as file:
        while len(movies) < movie_limit:
            page += 1
            drama_list = imdb.request("discover/movie", page=page,
                                      **{"with_genres": drama_id, "primary_release_date.gte": 2004,
                                         "sort_by": "popularity.desc"})
            if len(movies) + len(drama_list['results']) > movie_limit:
                movies_to_add = drama_list['results'][:movie_limit - len(movies)]
            else:
                movies_to_add = drama_list['results']
            movies += movies_to_add
            for movie in movies_to_add:
                file.write("{},{}\n".format(movie['id'], movie['title']))
    print("{} drama movies found".format(len(movies)))

    # c.
    similar_limit = 5
    similar = {}
    for movie in movies[:movie_limit]:
        similar_list = imdb.request("movie/{}/similar".format(movie["id"]))
        filtered_dict = {}
        try:
            for similar_movie in similar_list["results"][:similar_limit]:
                filtered_dict[similar_movie['id']] = similar_movie
        except KeyError as e:
            print(similar_list)
            raise e
        similar[movie["id"]] = filtered_dict
    print(len(similar))

    # filter out double
    filtered_similar = collections.defaultdict(dict)
    for movie_id, similar_dict in similar.items():
        for similar_movie_id, similar_movie_info in similar_dict.items():
            if movie_id > similar_movie_id:
                if similar_movie_id in similar and movie_id in similar[similar_movie_id]:
                    # filter this one
                    continue
            filtered_similar[movie_id][similar_movie_id] = similar_movie_info
    print(len(filtered_similar))

    with open("movie_ID_sim_movie_ID.csv", 'w') as file:
        for k, v in filtered_similar.items():
            for similar_movie_id in v.keys():
                file.write("{},{}\n".format(k, similar_movie_id))

    # with open("movies_labels.csv", 'w') as file:
    #     file.write("Id,Label\n")
    #     written_movies = {}
    #     for k, v in similar.items():
    #         for similar_movie_id, info in v.items():
    #             if similar_movie_id not in written_movies:
    #                 written_movies[similar_movie_id] = info
    #                 file.write("{},{}\n".format(similar_movie_id, info['title']))
    #     for movie in movies[:movie_limit]:
    #         if movie['id'] not in written_movies:
    #             written_movies[movie['id']] = movie
    #             file.write("{},{}\n".format(movie['id'], movie['title']))






