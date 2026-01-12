-- MySQL 메모리 최적화 설정
-- 3.8GB 서버용 (약 128MB로 제한)

-- 현재 설정 확인
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';
SHOW VARIABLES LIKE 'key_buffer_size';
SHOW VARIABLES LIKE 'max_connections';

-- 권장 설정 (my.cnf에 추가):
-- [mysqld]
-- innodb_buffer_pool_size = 128M
-- key_buffer_size = 16M
-- max_connections = 50
-- table_open_cache = 200
-- thread_cache_size = 8
