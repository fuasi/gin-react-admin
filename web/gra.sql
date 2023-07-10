--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: gra_router; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_router (
    id integer NOT NULL,
    name character varying NOT NULL,
    icon character varying NOT NULL,
    path character varying NOT NULL,
    component_path character varying NOT NULL,
    parent_id character varying NOT NULL,
    router_order integer NOT NULL
);


ALTER TABLE public.gra_router OWNER TO postgres;

--
-- Name: gra_router_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gra_router_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gra_router_id_seq OWNER TO postgres;

--
-- Name: gra_router_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gra_router_id_seq OWNED BY public.gra_router.id;


--
-- Name: gra_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_users (
    id bigint NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    avatar character varying NOT NULL
);


ALTER TABLE public.gra_users OWNER TO postgres;

--
-- Name: gra_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gra_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gra_users_id_seq OWNER TO postgres;

--
-- Name: gra_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gra_users_id_seq OWNED BY public.gra_users.id;


--
-- Name: gra_router id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_router ALTER COLUMN id SET DEFAULT nextval('public.gra_router_id_seq'::regclass);


--
-- Name: gra_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_users ALTER COLUMN id SET DEFAULT nextval('public.gra_users_id_seq'::regclass);


--
-- Data for Name: gra_router; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_router (id, name, icon, path, component_path, parent_id, router_order) FROM stdin;
1	仪表盘	CompassOutlined	/dashboard	../views/backend/dashboard	-1	1
3	管理员	SolutionOutlined	/admin	../views/backend/admin	-1	1
2	用户管理	UserOutlined	/admin/user	../views/backend/admin/user	3	1
\.


--
-- Data for Name: gra_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_users (id, username, password, avatar) FROM stdin;
1	admin	$2a$10$tYIKsL/qYAd6Fl/i.0O51eoqCPOVimeKa0Ja4LYsQIeSIR4zNfIRO	https://img2.woyaogexing.com/2019/05/10/7c340024aac54a50b22be288584701c2!400x400.jpeg
\.


--
-- Name: gra_router_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_router_id_seq', 4, true);


--
-- Name: gra_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_users_id_seq', 1, true);


--
-- Name: gra_router gra_router_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_router
    ADD CONSTRAINT gra_router_pkey PRIMARY KEY (id);


--
-- Name: gra_users gra_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_users
    ADD CONSTRAINT gra_users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

