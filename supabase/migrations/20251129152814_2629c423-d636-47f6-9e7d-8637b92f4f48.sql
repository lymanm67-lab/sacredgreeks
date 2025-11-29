-- =====================================================
-- FIX: Move extensions from public schema to extensions schema
-- =====================================================

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Grant usage to postgres and authenticated roles
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- Move pg_net extension to extensions schema (if it exists in public)
-- Note: We need to drop and recreate the extension in the new schema
-- First check what extensions are in public and move them

-- The safest approach is to ensure future extensions go to extensions schema
-- and update search_path to include extensions

-- Update the database search_path to include extensions schema
ALTER DATABASE postgres SET search_path TO public, extensions;

-- For existing extensions that may be in public, we should note them
-- Common extensions that might be there: pg_net, uuid-ossp, pgcrypto

-- Unfortunately, moving existing extensions requires dropping and recreating them
-- which could cause issues. The recommended approach is to:
-- 1. Create new extensions in the extensions schema going forward
-- 2. Leave existing ones as-is to avoid breaking functionality

-- Enable pg_net in extensions schema if not already enabled elsewhere
-- (This is commonly used for webhooks/HTTP requests)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;