This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

npm run db:migrate:create --db_name=prisma-demo-db --file_name=create_user_table
npm run db:migrate:generate --migration_file_name=0001_create_user_table.sql
npm run db:migrate:apply:local --db_name=prisma-demo-db
