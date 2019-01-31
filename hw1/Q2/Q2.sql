-- Setup. DO NOT REMOVE.
.headers on
.separator ','

DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS movie_cast;
DROP VIEW IF EXISTS good_collaboration;
DROP TABLE IF EXISTS movie_overview;

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (a.i) Create tables

-- [insert your SQL statement(s) BELOW this line]

CREATE TABLE IF NOT EXISTS movies (id INTEGER, name TEXT, score INTEGER);
CREATE TABLE IF NOT EXISTS movie_cast (movie_id INTEGER, cast_id INTEGER, cast_name TEXT);

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.tables
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (a.ii) Import data

-- [insert your SQLite command(s) BELOW this line]

.import movie-cast.txt movie_cast
.import movie-name-score.txt movies

-- [insert your SQLite command(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.headers off
SELECT COUNT(*) FROM movies;
SELECT COUNT(*) FROM movie_cast;
.headers on
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (b) Create indexes

-- [insert your SQL statement(s) BELOW this line]

CREATE INDEX IF NOT EXISTS scores_index ON movies (score);
CREATE INDEX IF NOT EXISTS cast_index ON movie_cast (cast_id);
CREATE INDEX IF NOT EXISTS movie_index ON movies (id);

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.indexes
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (c) Calculate a proportion

-- [insert your SQL statement(s) BELOW this line]

SELECT AVG(s) * 100 as prop
FROM (SELECT 1 as s FROM movies WHERE score > 50 UNION ALL
      SELECT 0 as s FROM movies WHERE score <= 50);

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (d) Find the highest scoring movies

-- [insert your SQL statement(s) BELOW this line]


SELECT * FROM movies ORDER BY score DESC, name ASC LIMIT 7;

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (e) Find the most prolific actors

-- [insert your SQL statement(s) BELOW this line]

SELECT cast_id, cast_name, COUNT(movie_id) as movie_count
FROM movie_cast
GROUP BY cast_id
ORDER BY movie_count DESC, cast_name ASC
LIMIT 5;

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (f) Get high scoring actors

-- [insert your SQL statement(s) BELOW this line]

SELECT cast_id, cast_name, AVG(m.score) average_score
FROM movie_cast as c INNER JOIN movies as m ON c.movie_id = m.id
WHERE m.score >= 50
GROUP BY c.cast_id
HAVING COUNT(c.movie_id) > 2
ORDER BY average_score DESC, c.cast_name ASC
LIMIT 10;

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (g) Creating views

-- [insert your SQL statement(s) BELOW this line]

CREATE VIEW good_collaboration AS
SELECT c1.cast_id as cast_member_id1, c2.cast_id as cast_member_id2, COUNT(m.id) as movie_count, AVG(m.score) as average_movie_score
FROM movie_cast as c1
     INNER JOIN
     movie_cast as c2
     ON c1.movie_id = m.id
     INNER JOIN
     movies as m
     ON c2.movie_id = m.id
WHERE c1.cast_id < c2.cast_id
GROUP BY c1.cast_id, c2.cast_id
HAVING movie_count >= 3 and average_movie_score >= 40;

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.headers off
PRAGMA table_info(good_collaboration);
SELECT AVG(average_movie_score) FROM good_collaboration;
.headers on
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (h) Find the best collaborators

-- [insert your SQL statement(s) BELOW this line]

SELECT c.cast_id as cast_id, c.cast_name as cast_name, AVG(u.average_movie_score) as collaboration_score
FROM (SELECT cast_member_id1 as id, movie_count, average_movie_score FROM good_collaboration
      UNION ALL
      SELECT cast_member_id2 as id, movie_count, average_movie_score FROM good_collaboration) as u
     INNER JOIN
     movie_cast as c
     ON c.cast_id = u.id
GROUP BY u.id
ORDER BY collaboration_score DESC, cast_name ASC
LIMIT 5;

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (i) Create FTS table and import data

-- [insert your SQL statement(s) BELOW this line]

CREATE VIRTUAL TABLE movie_overview USING fts3(
    id integer,
    name text,
    year integer,
    overview text,
    popularity decimal);

.import movie-overview.txt movie_overview

-- [insert your SQL statement(s) ABOVE this line]

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (i.1) Count movies with "fight"

-- [insert your SQL statement(s) BELOW this line]

SELECT count(*) as count_overview
FROM movie_overview
WHERE overview MATCH 'fight';

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --

-- (i.2) List movies with "love" and "story" nearby

-- [insert your SQL statement(s) BELOW this line]

SELECT id
FROM movie_overview
WHERE overview MATCH 'love NEAR/5 story';

-- [insert your SQL statement(s) ABOVE this line]

-- [the following statement(s) are for autograding. DO NOT REMOVE.]
.print '~~~~~'

-- ***** ***** ***** ***** ***** ***** ***** ***** ***** ***** --