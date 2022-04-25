CREATE TABLE public.table_name (
  "_id" serial NOT NULL,
  "another_field" varchar NOT NULL,
  "third_field" bigint,
  --etc
  CONSTRAINT "table_name_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.another_table (
  "_id" serial NOT NULL,
  "another_field" varchar NOT NULL,
  "third_field" bigint,
  "table_name_id" serial NOT NULL,
  --etc
  CONSTRAINT "another_table_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.another_table ADD CONSTRAINT "another_table_fk0" FOREIGN KEY ("table_name_id") REFERENCES public.table_name("_id");

INSERT INTO public.table_name VALUES(1, 'info', 'more info');
INSERT INTO public.table_name VALUES(2, 'info', 'more info');
INSERT INTO public.table_name VALUES(3, 'info', 'more info');

INSERT INTO public.another_table VALUES(1, 'info', 'more info', 1);
INSERT INTO public.another_table VALUES(2, 'info', 'more info', 1);
INSERT INTO public.another_table VALUES(3, 'info', 'more info', 1);
INSERT INTO public.another_table VALUES(4, 'info', 'more info', 2);

select setval('public.table_name__id_seq', 4, false);
select setval('public.another_table__id_seq', 5, false);