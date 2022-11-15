CREATE TABLE IF NOT EXISTS team
(
    id SERIAL PRIMARY KEY,
    name character varying(100)
);

INSERT INTO team(id, name) 
VALUES(1, 'Les explorateurs'), (2, 'Les mangeurs de chips'), (3, 'Les couch potatoes'), (4, 'Les Martiens'), (5, 'Les anciens astronautes');


CREATE TABLE IF NOT EXISTS astronaut
(
    id SERIAL PRIMARY KEY,
    name character varying(100),
    bio text,
    team_id integer,
    image_public_id character varying,
    image_url character varying,
	FOREIGN KEY(team_id) REFERENCES public."team" (id)
);