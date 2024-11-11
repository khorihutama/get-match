## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

1. First create the .env file

```bash
$ cp .env.example .env
```

2. Fill the env file variable

3. Run the docker compose to build the postgres container

```bash
$ docker compose build postgres --d
```

4. Run the migration, seeder, and lastly the servicee
 
```bash
$ pnpm migrate

$ pnpm seed

# watch mode
$ pnpm run start:dev
```

## Testing

Use the api.psotman_collection.json file for the test

## Additional

To access the swagger, after running the service, access to http://localhost:3000/api