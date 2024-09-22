DO $$ 
BEGIN
    -- Verifica se o banco de dados já existe
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'meubanco') THEN
        -- Cria o banco de dados se não existir
        EXECUTE 'CREATE DATABASE meubanco';
    END IF;
END $$;
