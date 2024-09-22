FROM postgres:15.0

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

ENV POSTGRES_USER=$DB_USER
ENV POSTGRES_PASSWORD=$DB_PASSWORD
ENV POSTGRES_DB=$DB_NAME

COPY create-database.sql /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]