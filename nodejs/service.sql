CREATE TABLE accident_data (
    id SERIAL PRIMARY KEY,
    accident_date DATE,                   
    latitude NUMERIC(9, 6),                   
    longitude NUMERIC(9, 6),                  
    vehicle_type VARCHAR(255),             
    injured_fatalities_count INTEGER,                   
    road_condition VARCHAR(255),              
    weather_condition VARCHAR(255),          
    image_url TEXT,                           
    data_submission_time TIMESTAMP DEFAULT NOW() 
);
select * from public.accident_data


    const sql = `select * from houses where address Like '%${address}%'`
   


INSERT INTO accident_data (
    accident_date, 
    latitude, 
    longitude, 
    vehicle_type, 
    injured_fatalities_count, 
    road_condition, 
    weather_condition, 
    image_url, 
    data_submission_time
) 
VALUES (
    '2024-09-13',                        -- วันที่เกิดอุบัติเหตุ
    13.7563,                             -- ละติจูด
    100.5018,                            -- ลองจิจูด
    'รถยนต์',                            -- ประเภทยานพาหนะ
    5,                                   -- จำนวนผู้บาดเจ็บและผู้เสียชีวิตรวมกัน (ตัวอย่าง)
    'ถนนหลัก',                           -- สภาพถนน
    'มีเมฆปกคลุม',                      -- สภาพอากาศ
    'http://example.com/image.jpg',      -- รูปภาพ (URL ของรูปภาพ)
    NOW()                                -- เวลาที่ส่งข้อมูล (ค่าปริยายเป็นเวลาปัจจุบัน)
);

