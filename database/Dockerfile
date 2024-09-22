FROM postgres:15.0

ENV POSTGRES_HOST_AUTH_METHOD=trust

ENV POSTGRES_USER=$DB_USER
ENV POSTGRES_PASSWORD=$DB_PASSWORD
ENV POSTGRES_DB=$DB_NAME

COPY create-database.sql /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]