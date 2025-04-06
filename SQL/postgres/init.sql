CREATE TABLE purchases (
    session_id VARCHAR(255),
    item_id INTEGER,
    date TIMESTAMP
);

CREATE TABLE sessions (
    session_id VARCHAR(255),
    item_id INTEGER,
    date TIMESTAMP
);

-- Import first 20 lines from train_purchases.csv (no headers, plain session ids)
COPY purchases(session_id, item_id, date)
FROM '/data/train_purchases_20.csv'
DELIMITER ',' 
CSV HEADER;

-- Import first 20 lines from train_sessions.csv (has headers)
COPY sessions(session_id, item_id, date)
FROM '/data/train_sessions_20.csv'
DELIMITER ','
CSV HEADER;