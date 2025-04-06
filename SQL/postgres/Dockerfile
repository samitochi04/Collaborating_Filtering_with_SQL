FROM postgres:13

COPY init.sql /docker-entrypoint-initdb.d/
COPY data/ /data/

# Set proper permissions
RUN chmod 644 /data/*.csv