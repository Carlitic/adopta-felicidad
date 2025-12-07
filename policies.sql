-- Enable RLS on all tables (if not already enabled)
ALTER TABLE shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy for SHELTERS table
-- Allow anyone (the app) to Insert (register), Select (login/view), Update (admin/self), and Delete
CREATE POLICY "Allow public access to shelters" ON shelters
FOR ALL USING (true) WITH CHECK (true);

-- Policy for ANIMALS table
-- Allow anyone to do anything (since Auth is handled by the App logic)
CREATE POLICY "Allow public access to animals" ON animals
FOR ALL USING (true) WITH CHECK (true);

-- Policy for ADMINS table
-- Allow the app to read admins to verify login
CREATE POLICY "Allow public access to admins" ON admins
FOR ALL USING (true) WITH CHECK (true);
