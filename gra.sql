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
    required boolean DEFAULT false NOT NULL,
    method character varying DEFAULT 'GET'::character varying NOT NULL
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
-- Name: gra_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gra_files (
    id bigint NOT NULL,
    file_name character varying NOT NULL,
    system_file_name character varying NOT NULL,
    tag character varying NOT NULL,
    file_url character varying NOT NULL,
    file_path character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.gra_files OWNER TO postgres;

--
-- Name: gra_files_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gra_files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gra_files_id_seq OWNER TO postgres;

--
-- Name: gra_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gra_files_id_seq OWNED BY public.gra_files.id;


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
    role_id integer[] DEFAULT ARRAY[]::integer[] NOT NULL
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
-- Name: gra_files id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_files ALTER COLUMN id SET DEFAULT nextval('public.gra_files_id_seq'::regclass);


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
96	p	管理员	/api/user/:id	GET			
97	p	管理员	/api/user	GET			
98	p	管理员	/api/user	DELETE			
99	p	管理员	/api/user/:id	PATCH			
100	p	管理员	/api/user	PATCH			
101	p	管理员	/api/login	POST			
102	p	管理员	/api/check	POST			
103	p	管理员	/api/files	POST			
104	p	管理员	/api/user	PUT			
105	p	管理员	/api/users	POST			
106	p	管理员	/api/file	DELETE			
107	p	管理员	/api/file	PATCH			
604	p	超级管理员	/api/router	POST			
605	p	超级管理员	/api/role	PUT			
606	p	超级管理员	/api/user/:id	GET			
607	p	超级管理员	/api/role/:id	GET			
608	p	超级管理员	/api/routers/:id	GET			
609	p	超级管理员	/api/roles	GET			
610	p	超级管理员	/api/api/:id	GET			
611	p	超级管理员	/api/router/:id	GET			
612	p	超级管理员	/api/authority/:id	GET			
613	p	超级管理员	/api/user	GET			
614	p	超级管理员	/api/api	DELETE			
615	p	超级管理员	/api/router	DELETE			
616	p	超级管理员	/api/role	DELETE			
617	p	超级管理员	/api/user	DELETE			
618	p	超级管理员	/api/router	PATCH			
619	p	超级管理员	/api/user/:id	PATCH			
620	p	超级管理员	/api/user	PATCH			
621	p	超级管理员	/api/api	PATCH			
622	p	超级管理员	/api/role	PATCH			
623	p	超级管理员	/api/api	POST			
624	p	超级管理员	/api/apis	POST			
625	p	超级管理员	/api/login	POST			
626	p	超级管理员	/api/check	POST			
627	p	超级管理员	/api/roles	POST			
628	p	超级管理员	/api/files	POST			
629	p	超级管理员	/api/user	PUT			
630	p	超级管理员	/api/router	PUT			
631	p	超级管理员	/api/users	POST			
632	p	超级管理员	/api/file	POST			
633	p	超级管理员	/api/file	DELETE			
634	p	超级管理员	/api/file	PATCH			
635	p	超级管理员	/api/routers	GET			
\.


--
-- Data for Name: gra_apis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_apis (id, api_path, api_comment, api_method, api_group_id, created_at, updated_at, required, method) FROM stdin;
81	/api/router	获取路由列表	POST / 多条件查询|创建	8	2023-11-21 08:10:07.924659	2023-11-21 16:21:01.132408	f	POST
55	/api/role	创建角色	PUT / 创建	6	2023-08-16 16:29:22.735957	2023-09-20 15:49:56.237708	f	PUT
6	/api/user/:id	根据ID获取用户信息	GET / 查询	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:54.364454	f	GET
54	/api/role/:id	根据ID获取角色信息	GET / 查询	6	2023-08-16 16:28:54.086962	2023-09-20 15:49:51.462439	f	GET
56	/api/routers/:id	获取路由菜单树	GET / 查询	6	2023-08-16 16:29:46.518065	2023-09-20 15:50:02.852808	f	GET
79	/api/roles	获取全部角色	GET / 查询	6	2023-11-21 08:10:07.921244	2023-11-21 16:20:45.891644	f	GET
61	/api/api/:id	根据ID获取Api信息	GET / 查询	7	2023-08-16 16:32:47.498996	2023-09-20 15:50:29.120376	f	GET
80	/api/router/:id	根据ID获取路由信息	GET / 查询	8	2023-11-21 08:10:07.923018	2023-11-21 16:21:05.488027	f	GET
57	/api/authority/:id	获取角色允许访问的Api	GET / 查询	7	2023-08-16 16:30:27.702628	2023-09-20 15:50:12.202619	f	GET
78	/api/user	获取用户自身信息	GET / 查询	2	2023-11-21 08:10:07.91855	2023-11-24 09:44:12.703665	t	GET
60	/api/api	根据ID删除Api	DELETE / 删除	7	2023-08-16 16:32:07.004275	2023-09-20 15:50:22.89985	f	DELETE
83	/api/router	根据ID删除路由	DELETE / 删除	8	2023-11-21 08:10:07.927946	2023-11-21 16:21:28.723	f	DELETE
53	/api/role	根据ID删除角色	DELETE / 删除	6	2023-08-16 16:28:14.522614	2023-09-20 15:49:46.901623	f	DELETE
4	/api/user	根据ID删除用户	DELETE / 删除	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:43.947922	f	DELETE
84	/api/router	根据ID更新路由信息	PATCH / 更新	8	2023-11-21 08:10:07.929662	2023-11-21 16:21:32.335199	f	PATCH
7	/api/user/:id	根据ID重置用户密码	PATCH / 更新	2	2023-08-14 08:18:48.671844	2023-09-20 15:49:02.126575	f	PATCH
5	/api/user	根据ID更新用户信息	PATCH / 更新	2	2023-08-14 08:18:48.671844	2023-09-20 15:48:49.177881	f	PATCH
59	/api/api	根据ID更新Api信息	PATCH / 更新	7	2023-08-16 16:31:43.50141	2023-09-20 15:50:19.925832	f	PATCH
52	/api/role	根据ID更新角色	PATCH / 更新	6	2023-08-16 16:27:22.317603	2023-09-20 15:49:41.846344	f	PATCH
62	/api/api	创建Api	POST / 多条件查询|创建	7	2023-08-16 16:31:12.409164	2023-09-20 15:50:32.480348	f	POST
58	/api/apis	获取Api列表	POST / 多条件查询|创建	7	2023-08-16 16:31:12.409164	2023-09-20 15:50:16.177468	f	POST
77	/api/login	用户登录	POST / 多条件查询|创建	2	2023-11-21 08:10:07.914999	2023-11-24 09:44:20.613489	t	POST
1	/api/check	检查用户是否登录	POST / 多条件查询|创建	2	2023-08-14 08:18:48.671844	2023-09-20 16:39:58.843623	t	POST
51	/api/roles	获取角色列表	POST / 多条件查询|创建	6	2023-08-16 16:26:43.12355	2023-09-20 15:49:36.524479	f	POST
85	/api/files	获取上传的文件列表	POST / 多条件查询|创建	2	2023-11-21 08:10:07.931329	2023-11-21 16:21:45.540658	f	POST
50	/api/user	创建用户	PUT / 创建	2	2023-08-15 14:18:51.933493	2023-09-20 15:49:23.173679	f	PUT
82	/api/router	创建路由	PUT / 创建	8	2023-11-21 08:10:07.926348	2023-11-21 16:21:25.338712	f	PUT
8	/api/users	获取用户列表	POST / 多条件查询|创建	2	2023-08-14 08:18:48.671844	2023-09-20 15:49:10.036076	f	POST
2	/api/file	文件上传	POST / 多条件查询|创建	5	2023-08-14 08:18:48.671844	2023-09-15 16:35:19.589849	t	POST
87	/api/file	根据ID删除上传的文件	DELETE / 删除	2	2023-11-21 08:10:07.93607	2023-11-21 16:22:04.489954	f	DELETE
86	/api/file	根据ID更新文件信息	PATCH / 更新	2	2023-11-21 08:10:07.933648	2023-11-21 16:22:01.393069	f	PATCH
88	/api/routers	获取路由树	GET / 查询	2	2023-11-24 08:22:22.046311	2023-11-24 16:42:21.271765	t	GET
\.


--
-- Data for Name: gra_casbin_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_casbin_role (id, role_name, allow_api_id, allow_router_id, default_router_id) FROM stdin;
1	超级管理员	{6,8,2,1,51,52,53,54,55,56,57,59,60,61,58,62,7,50,5,4,85,86,87,77,78,80,81,82,83,84,79,88}	{5,2,6,1,8,3,7}	6
2	开发者	{5,4,7,6,8,50,9,1,3,2,51,52,53,54,55,56,57,59,60,61,58,62}	{1,5,2,7,3}	1
7	用户管理员	{5,4,7,6,8,50,9}	{5,7,3}	7
24	管理员	{1,4,5,6,7,8,50,77,78,85,86,87}	{}	1
\.


--
-- Data for Name: gra_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_files (id, file_name, system_file_name, tag, file_url, file_path, created_at, updated_at) FROM stdin;
51	1691554868	1700789421.png	png	/static/images/1700789421.png	D:\\static\\images\\1700789421.png	2023-11-24 09:30:21.248208	2023-11-24 09:30:21.248208
50	一个头像	1700471419.png	png	/static/images/1700471419.png	D:\\static\\images\\1700471419.png	2023-11-20 17:10:19.901471	2023-11-20 17:12:30.409603
\.


--
-- Data for Name: gra_routers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_routers (id, name, icon, path, component_path, parent_id, router_order, is_api_group, required, hidden) FROM stdin;
5	用户信息	FormOutlined	/self	../views/backend/self	-1	2	1	t	t
3	管理员	SolutionOutlined	/admin	../views/backend/admin	-1	2	-1	f	f
7	Api管理	ApiOutlined	/admin/api	../views/backend/admin/api	3	3	1	f	f
2	用户管理	TeamOutlined	/admin/user	../views/backend/admin/user	3	1	1	f	f
6	角色管理	UserOutlined	/admin/role	../views/backend/admin/role	3	1	1	f	f
8	菜单管理	MenuOutlined	/admin/router	../views/backend/admin/router	3	2	1	f	f
1	仪表盘	DashboardOutlined	/dashboard	../views/backend/dashboard	-1	1	1	f	f
\.


--
-- Data for Name: gra_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gra_users (id, username, password, avatar, phone, updated_at, created_at, nickname, enable, role_id) FROM stdin;
1	admin	$2a$10$jvJP0ZkY1gB5ciDxW9Rhn.dKJGby1jg8EcVpZbCBqElcl80noBUCa	/static/images/1700789421.png	13888888888	2023-11-24 16:59:22.835194	2023-08-07 16:49:26.957432	管理员一号	1	{1,7}
2	admin1	$2a$10$iKxK9wtpv.Aeo0wXD0ET4uWj9uYqkxG5KxyFp.qAc1zYMRhlT.rba	/static/images/avatar-default.jpg	13888888888	2023-11-15 11:22:18.405647	2023-08-07 10:38:56.008269	管理员二号	1	{}
\.


--
-- Name: casbin_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.casbin_rule_id_seq', 635, true);


--
-- Name: gra_apis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_apis_id_seq', 88, true);


--
-- Name: gra_casbin_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_casbin_role_id_seq', 28, true);


--
-- Name: gra_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_files_id_seq', 51, true);


--
-- Name: gra_router_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gra_router_id_seq', 9, true);


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
-- Name: gra_files gra_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gra_files
    ADD CONSTRAINT gra_files_pkey PRIMARY KEY (id);


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

