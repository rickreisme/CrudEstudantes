# Use a imagem oficial do PostgreSQL como base
FROM postgres:15.0

# Defina as variáveis de ambiente necessárias
ENV POSTGRES_USER=$DB_USER
ENV POSTGRES_PASSWORD=$DB_PASSWORD
ENV POSTGRES_DB=$DB_NAME

# Copie os scripts SQL para o diretório de inicialização do PostgreSQL
COPY create-database.sql /docker-entrypoint-initdb.d/
COPY init.sql /docker-entrypoint-initdb.d/

# Exponha a porta padrão do PostgreSQL
EXPOSE 5432

# Execute o comando de inicialização padrão do PostgreSQL
CMD ["postgres"]