-- Create tables
CREATE TABLE contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] NOT NULL,
    github TEXT,
    demo TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert contact messages
CREATE POLICY "Allow anonymous message creation"
ON contact_messages FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read all contact messages
CREATE POLICY "Allow authenticated users to read messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to delete contact messages
CREATE POLICY "Allow authenticated users to delete messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- Allow authenticated users to manage projects
CREATE POLICY "Allow authenticated users to manage projects"
ON projects FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow anonymous users to read projects
CREATE POLICY "Allow anonymous users to read projects"
ON projects FOR SELECT
TO anon
USING (true);
