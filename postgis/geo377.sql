--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg110+1)
-- Dumped by pg_dump version 16.4

-- Started on 2024-09-09 08:44:22 +07

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

--
-- TOC entry 4440 (class 1262 OID 16384)
-- Name: geodb; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE geodb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE geodb OWNER TO postgres;

\connect geodb

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

--
-- TOC entry 2 (class 3079 OID 16385)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 4441 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 17955)
-- Name: hotel_carbon_sec1; Type: TABLE; Schema: public; Owner: postgres
--
CREATE TABLE public.accident_data (
    id integer NOT NULL,
    accident_date date,
    latitude numeric(9,6),
    longitude numeric(9,6),
    vehicle_type character varying(255),
    injured_fatalities_count integer,
    road_condition character varying(255),
    weather_condition character varying(255),
    image_url text,
    data_submission_time timestamp without time zone DEFAULT now()
);


ALTER TABLE public.accident_data OWNER TO postgres;

--
-- TOC entry 255 (class 1259 OID 51663)
-- Name: accident_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accident_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accident_data_id_seq OWNER TO postgres;

--
-- TOC entry 4329 (class 0 OID 0)
-- Dependencies: 255
-- Name: accident_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accident_data_id_seq OWNED BY public.accident_data.id;


--
-- TOC entry 4172 (class 2604 OID 51667)
-- Name: accident_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accident_data ALTER COLUMN id SET DEFAULT nextval('public.accident_data_id_seq'::regclass);


--
-- TOC entry 4322 (class 0 OID 51664)
-- Dependencies: 256
-- Data for Name: accident_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.accident_data (id, accident_date, latitude, longitude, vehicle_type, injured_fatalities_count, road_condition, weather_condition, image_url, data_submission_time) VALUES (31, '2024-02-14', 18.784640, 98.956700, 'รถจักรยานยนต์', 1, 'แมวตัดหน้า ทางโค้ง', 'ฝนตกปรอยๆซิกๆ', NULL, '2024-09-18 23:54:38.591601');
INSERT INTO public.accident_data (id, accident_date, latitude, longitude, vehicle_type, injured_fatalities_count, road_condition, weather_condition, image_url, data_submission_time) VALUES (33, '2023-10-25', 18.795000, 98.953240, 'รถจักรยานยนต์', 2, 'สภาพดี', 'กลางคืน', NULL, '2024-09-19 01:26:13.836279');
INSERT INTO public.accident_data (id, accident_date, latitude, longitude, vehicle_type, injured_fatalities_count, road_condition, weather_condition, image_url, data_submission_time) VALUES (39, '2023-09-09', 18.795930, 98.957170, 'รถจักรยานยนต์', 2, 'ถนนลื่นและเบรคกระทันหัน', 'แดดจ้า', NULL, '2024-09-19 17:55:14.974485');
INSERT INTO public.accident_data (id, accident_date, latitude, longitude, vehicle_type, injured_fatalities_count, road_condition, weather_condition, image_url, data_submission_time) VALUES (40, '2023-02-14', 18.795930, 98.957160, 'รถจักรยานยนต์', 2, 'ถนนลื่น ', 'สภาพอากาศปกติ ', NULL, '2024-09-22 01:26:11.226904');
INSERT INTO public.accident_data (id, accident_date, latitude, longitude, vehicle_type, injured_fatalities_count, road_condition, weather_condition, image_url, data_submission_time) VALUES (41, '2024-09-15', 18.792410, 98.956410, 'รถจักรยานยนต์', 0, 'เป็นบริเวณทางแยก มองเห็นรถด้านข้างไม่ชัด', 'แดดจ้า', NULL, '2024-09-22 01:30:51.926907');


--
-- TOC entry 4330 (class 0 OID 0)
-- Dependencies: 255
-- Name: accident_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accident_data_id_seq', 41, true);


--
-- TOC entry 4175 (class 2606 OID 51672)
-- Name: accident_data accident_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accident_data
    ADD CONSTRAINT accident_data_pkey PRIMARY KEY (id);


-- Completed on 2024-09-27 12:20:33

--
-- PostgreSQL database dump complete
--
