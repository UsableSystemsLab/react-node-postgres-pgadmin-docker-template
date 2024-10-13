-- Create User table
CREATE TABLE IF NOT EXISTS public."User" (
    id CHARACTER VARYING(255),
    user_name CHARACTER VARYING(255) NOT NULL,
    first_name CHARACTER VARYING(120),
    last_name CHARACTER VARYING(120),
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);