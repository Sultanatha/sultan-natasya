# Wedding Invitation

## Teknologi yang Digunakan

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) (opsional)
- [TypeScript](https://www.typescriptlang.org/) (jika menggunakan TypeScript)

## Instalasi

Untuk memulai proyek ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/project-name.git
2. cd project-name
3. npm install
4. create supabase untuk generate baseUrl dan key nya 
  https://supabase.com/
  CREATE TABLE comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    comment text NOT NULL,
    timestamp timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  );
5. copy .env.sample menjadi .env lalu masukan baseUrl dan key yang akan digunakan kedalam .env
6. npm run dev

