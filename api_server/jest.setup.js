// Runs before each test file. Sets env defaults so importing config work on tests.

process.env.NODE_ENV = 'test';
process.env.POSTGRES_DB = process.env.POSTGRES_DB || 'test_db';
process.env.POSTGRES_USER = process.env.POSTGRES_USER || 'test_user';
process.env.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'test_pass';
process.env.POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
