CREATE TABLE IF NOT EXISTS public."team"
(
    id SERIAL PRIMARY KEY,
    name character varying(100)
);

INSERT INTO public."team"(id, name) 
VALUES(1, 'Les explorateurs'), (2, 'Les mangeurs de chips'), (3, 'Les couch potatoes');

CREATE TABLE IF NOT EXISTS public."image"
(
    public_id character varying PRIMARY KEY,
    url character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS public."astronaut"
(
    id SERIAL PRIMARY KEY,
    name character varying(100),
    bio text,
    team_id integer,
    image_public_id character varying,
	FOREIGN KEY(team_id) REFERENCES public."team" (id),
	FOREIGN KEY (image_public_id) REFERENCES public."image" (public_id) 
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);