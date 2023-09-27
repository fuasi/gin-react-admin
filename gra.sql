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
-- Name: casbin_rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.casbin_rule (
    id bigint NOT NULL,
    ptype character varying(100),
    v0 character varying(100),
    v1 character varying(100),
    v2 character varying(100),
    v3 character varying(100),
    v4 character varying(100),
    v5 character varying(100)
);


ALTER TABLE public.casbin_rule OWNER TO postgres;

--
-- Name: casbin_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.casbin_rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.casbin_rule_id_seq OWNER TO postgres;

--
-- Name: casbin_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.casbin_rule_id_seq OWNED BY public.casbin_rule.id;


--
-- Name: gra_apis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_apis (
    id integer NOT NULL,
    api_path character varying NOT NULL,
    api_comment character varying NOT NULL,
    api_method character varying NOT NULL,
    api_group_id integer DEFAULT 1 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    required boolean DEFAULT false NOT NULL
);


ALTER TABLE public.gra_apis OWNER TO postgres;

--
-- Name: gra_apis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gra_apis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gra_apis_id_seq OWNER TO postgres;

--
-- Name: gra_apis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gra_apis_id_seq OWNED BY public.gra_apis.id;


--
-- Name: gra_casbin_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_casbin_role (
    id integer NOT NULL,
    role_name character varying NOT NULL,
    allow_api_id integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    allow_router_id integer[] DEFAULT ARRAY[]::integer[] NOT NULL,
    default_router_id integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.gra_casbin_role OWNER TO postgres;

--
-- Name: gra_casbin_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gra_casbin_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gra_casbin_role_id_seq OWNER TO postgres;

--
-- Name: gra_casbin_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gra_casbin_role_id_seq OWNED BY public.gra_casbin_role.id;


--
-- Name: gra_routers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_routers (
    id integer NOT NULL,
    name character varying NOT NULL,
    icon character varying NOT NULL,
    path character varying NOT NULL,
    component_path character varying NOT NULL,
    parent_id integer NOT NULL,
    router_order integer NOT NULL,
    is_api_group integer DEFAULT '-1'::integer NOT NULL,
    required boolean DEFAULT false NOT NULL,
    hidden boolean DEFAULT false NOT NULL
);


ALTER TABLE public.gra_routers OWNER TO postgres;

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

ALTER SEQUENCE public.gra_router_id_seq OWNED BY public.gra_routers.id;


--
-- Name: gra_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_users (
    id bigint NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    avatar character varying DEFAULT '/static/images/avatar-default.jpg'::character varying NOT NULL,
    phone character varying,
    updated_at timestamp without time zone,
    created_at timestamp without time zone,
    nickname character varying,
    enable smallint DEFAULT 1 NOT NULL,
    role_id integer DEFAULT 1 NOT NULL
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
-- Name: casbin_rule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.casbin_rule ALTER COLUMN id SET DEFAULT nextval('public.casbin_rule_id_seq'::regclass);


--
-- Name: gra_apis id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_apis ALTER COLUMN id SET DEFAULT nextval('public.gra_apis_id_seq'::regclass);


--
-- Name: gra_casbin_role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_casbin_role ALTER COLUMN id SET DEFAULT nextval('public.gra_casbin_role_id_seq'::regclass);


--
-- Name: gra_routers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_routers ALTER COLUMN id SET DEFAULT nextval('public.gra_router_id_seq'::regclass);


--
-- Name: gra_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_users ALTER COLUMN id SET DEFAULT nextval('public.gra_users_id_seq'::regclass);


--
-- Data for Name: casbin_rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.casbin_rule (id, ptype, v0, v1, v2, v3, v4, v5) FROM stdin;
\.


--
-- Data for Name: gra_apis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_apis (id, api_path, api_comment, api_method, api_group_id, created_at, updated_at, required) FROM stdin;
2	/api/file	文件上传	POST / 多条件查询|创建	5	2023-08-14 08:18:48.671844	2023-09-15 16:35:19.589849	t
3	/api/user	获取路由树	GET / 查询	6	2023-08-14 08:18:48.671844	2023-09-20 15:48:36.991383	t
4	/api/user	根据ID删除用户	DELETE / 删除	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:43.947922	f
5	/api/user	根据ID更新用户信息	PATCH / 更新	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:49.177881	f
6	/api/user/:id	根据ID获取用户信息	GET / 查询	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:54.364454	f
7	/api/user/:id	根据ID重置用户密码	PATCH / 更新	2	2023-08-14 08:18:48.671844	2023-09-20 15:49:02.126575	f
8	/api/users	获取用户列表	POST / 多条件查询|创建	2	2023-08-14 08:18:48.671844	2023-09-20 15:49:10.036076	f
9	/api/login	登录	POST / 多条件查询|创建	2	2023-08-14 08:18:48.671844	2023-09-20 15:49:15.050666	t
50	/api/user	创建用户	PUT / 创建	2	2023-08-15 14:18:51.933493	2023-09-20 15:49:23.173679	f
51	/api/roles	获取角色列表	POST / 多条件查询|创建	6	2023-08-16 16:26:43.12355	2023-09-20 15:49:36.524479	f
52	/api/role	根据ID更新角色	PATCH / 更新	6	2023-08-16 16:27:22.317603	2023-09-20 15:49:41.846344	f
53	/api/role	根据ID删除角色	DELETE / 删除	6	2023-08-16 16:28:14.522614	2023-09-20 15:49:46.901623	f
54	/api/role/:id	根据ID获取角色信息	GET / 查询	6	2023-08-16 16:28:54.086962	2023-09-20 15:49:51.462439	f
55	/api/role	创建角色	PUT / 创建	6	2023-08-16 16:29:22.735957	2023-09-20 15:49:56.237708	f
56	/api/routers/:id	获取路由菜单树	GET / 查询	6	2023-08-16 16:29:46.518065	2023-09-20 15:50:02.852808	f
57	/api/authority/:id	获取全部Api	GET / 查询	7	2023-08-16 16:30:27.702628	2023-09-20 15:50:12.202619	f
58	/api/apis	获取Api列表	POST / 多条件查询|创建	7	2023-08-16 16:31:12.409164	2023-09-20 15:50:16.177468	f
59	/api/api	根据ID更新Api信息	PATCH / 更新	7	2023-08-16 16:31:43.50141	2023-09-20 15:50:19.925832	f
60	/api/api	根据ID删除Api	DELETE / 删除	7	2023-08-16 16:32:07.004275	2023-09-20 15:50:22.89985	f
61	/api/api/:id	根据ID获取Api信息	GET / 查询	7	2023-08-16 16:32:47.498996	2023-09-20 15:50:29.120376	f
62	/api/api	创建Api	POST / 多条件查询|创建	7	2023-08-16 16:31:12.409164	2023-09-20 15:50:32.480348	f
1	/api/check	检查用户是否登录	POST / 多条件查询|创建	2	2023-08-14 08:18:48.671844	2023-09-20 16:39:58.843623	t
\.


--
-- Data for Name: gra_casbin_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_casbin_role (id, role_name, allow_api_id, allow_router_id, default_router_id) FROM stdin;
1	超级管理员	{6,8,9,2,1,3,51,52,53,54,55,56,57,59,60,61,58,62,7,50,5,4}	{5,2,6,3,7,1,8}	1
2	开发者	{5,4,7,6,8,50,9,1,3,2,51,52,53,54,55,56,57,59,60,61,58,62}	{1,5,2,7,3}	1
7	用户管理员	{5,4,7,6,8,50,9}	{5,7,3}	7
\.


--
-- Data for Name: gra_routers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_routers (id, name, icon, path, component_path, parent_id, router_order, is_api_group, required, hidden) FROM stdin;
8	菜单管理	MenuOutlined	/admin/router	../views/backend/admin/router	3	2	1	f	f
1	仪表盘	DashboardOutlined	/dashboard	../views/backend/dashboard	-1	1	1	f	f
2	用户管理	TeamOutlined	/admin/user	../views/backend/admin/user	3	1	1	f	f
7	Api管理	ApiOutlined	/admin/api	../views/backend/admin/api	3	3	1	f	f
5	用户信息	FormOutlined	/self	../views/backend/self	-1	2	1	t	t
6	角色管理	UserOutlined	/admin/role	../views/backend/admin/role	3	1	1	f	f
3	管理员	SolutionOutlined	/admin	../views/backend/admin	-1	2	-1	f	f
\.


--
-- Data for Name: gra_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_users (id, username, password, avatar, phone, updated_at, created_at, nickname, enable, role_id) FROM stdin;
2	admin1	$2a$10$iKxK9wtpv.Aeo0wXD0ET4uWj9uYqkxG5KxyFp.qAc1zYMRhlT.rba	/static/images/avatar-default.jpg	13888888888	2023-08-17 17:34:11.699454	2023-08-07 10:38:56.008269	管理员二号	1	7
1	admin	$2a$10$jvJP0ZkY1gB5ciDxW9Rhn.dKJGby1jg8EcVpZbCBqElcl80noBUCa	/static/images/1691554868.png	13888888888	2023-09-12 16:29:48.269419	2023-08-07 16:49:26.957432	管理员一号	1	1
\.


--
-- Name: casbin_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.casbin_rule_id_seq', 1, false);


--
-- Name: gra_apis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_apis_id_seq', 65, true);


--
-- Name: gra_casbin_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_casbin_role_id_seq', 17, true);


--
-- Name: gra_router_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_router_id_seq', 8, true);


--
-- Name: gra_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_users_id_seq', 20, true);


--
-- Name: casbin_rule casbin_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.casbin_rule
    ADD CONSTRAINT casbin_rule_pkey PRIMARY KEY (id);


--
-- Name: gra_apis gra_apis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_apis
    ADD CONSTRAINT gra_apis_pkey PRIMARY KEY (id);


--
-- Name: gra_casbin_role gra_casbin_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_casbin_role
    ADD CONSTRAINT gra_casbin_role_pkey PRIMARY KEY (id);


--
-- Name: gra_routers gra_router_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_routers
    ADD CONSTRAINT gra_router_pkey PRIMARY KEY (id);


--
-- Name: gra_users gra_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_users
    ADD CONSTRAINT gra_users_pkey PRIMARY KEY (id);


--
-- Name: idx_casbin_rule; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_casbin_rule ON public.casbin_rule USING btree (ptype, v0, v1, v2, v3, v4, v5);


--
-- PostgreSQL database dump complete
--

