# menu-order

A REST API backend for a restaurant menu: it serves categories and dishes from MongoDB, stores table reservations, and has a placeholder endpoint for orders. Written in TypeScript with Fastify and Mongoose.

> **Status:** archived. Built in 2023. Kept for reference, not maintained.

## What it does

- Lists the menu categories.
- Lists the dishes in a category, or a given set of dishes by id.
- Stores table reservations in MongoDB.
- Accepts an order as a list of dish ids. This endpoint is a stub: it always answers with success, and no order processing or payment was implemented.
- Ships seed scripts that add sample categories and soups (Turkish menu data) and bulk-update dish images.

## API

| Method | Path            | Description                                   |
| ------ | --------------- | --------------------------------------------- |
| GET    | `/categories`   | All categories, as `{ "categories": [...] }`  |
| GET    | `/foods/:id`    | Dishes in the category whose id is `:id`      |
| GET    | `/foods?ids=`   | Dishes for a comma-separated list of ids      |
| POST   | `/order`        | Placeholder, always returns a success message |
| POST   | `/reservations` | Creates a reservation, returns `201`          |

### GET /foods

`ids` is a comma-separated list of dish ids, for example `ids=5eb3d668b31de5d588f4292a,5eb3d668b31de5d588f4292b`. Dishes come back in the order of the ids; unknown ids are skipped.

### POST /order

```json
{
  "paymentInfo": {},
  "foodIds": ["food1_id", "food2_id", "food3_id"]
}
```

### POST /reservations

All fields are optional.

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "email": "johndoe@example.com",
  "note": "Vegetarian",
  "reservationTime": 1671443200000,
  "persons": 3
}
```

`persons` exists in the reservation schema, but the handler does not save it.

## Tech stack

- TypeScript on Node.js 18
- Fastify 4
- MongoDB with Mongoose 7
- dotenv for configuration
- Docker (two-stage build)

## Running it locally

You need Node.js and a MongoDB connection string.

```bash
npm install
cp .env.example .env    # then set MONGO_URI
npx nodemon             # runs ts-node src/index.ts and restarts on changes
```

The server listens on `PORT` (default `3000`) on all interfaces.

With Docker:

```bash
docker build -t menu-order .
docker run -p 3000:3000 -e MONGO_URI="<your connection string>" menu-order
```

To load sample data:

```bash
npx ts-node src/scripts/addCat.ts     # five categories
npx ts-node src/scripts/addFood.ts    # three soups in the "Çorbalar" category
```

The seed scripts do not close the database connection, so stop them with Ctrl+C once they log their results. `src/scripts/updateFood.ts` uses a hard-coded category id; change it before running.

## License

MIT, see [LICENSE](LICENSE).
