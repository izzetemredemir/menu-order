import fastify, { FastifyInstance } from "fastify";
import mongoose, { ConnectOptions } from "mongoose";
import CategorySchema from "./models/category";
import Food from "./models/food";
import Reservation, { IReservation } from "./models/reservation";
import * as dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const server: FastifyInstance = fastify({ logger: true });

// API route to fetch categories
server.get("/categories", async (_request, reply) => {
  try {
    const categories = await CategorySchema.find();
    return reply.status(200).send({ categories });
  } catch (error) {
    server.log.error(error);
    return reply
      .status(500)
      .send({ error: "Error fetching collections from the database." });
  }
});

// Define the type for request params
interface FoodParams {
  id: string;
}

// API route to get a specific food by ID
server.get<{ Params: FoodParams }>("/foods/:id", async (request, reply) => {
  try {
    const food = await Food.find({ category: request.params.id });
    if (!food) {
      reply.status(404).send({ error: "Food not found" });
    } else {
      reply.send(food);
    }
  } catch (error) {
    server.log.error(error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Define the schema for the order request body
interface OrderRequestBody {
  foodIds: string[];
}

// API route for placing an order
server.post<{ Body: OrderRequestBody }>("/order", async (request, reply) => {
  try {
    const { foodIds } = request.body;

    // Perform order processing logic here
    // ...

    // Always return a success message
    return reply.status(200).send({ message: "Order placed successfully" });
  } catch (error) {
    server.log.error(error);
    return reply.status(500).send({ error: "Internal Server Error" });
  }
});
interface CreateReservationBody {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  note?: string;
  reservationTime?: number;
}
// API route for creating a reservation
server.post<{ Body: CreateReservationBody }>(
  "/reservations",
  async (request, reply) => {
    try {
      const { firstName, lastName, phoneNumber, email, note, reservationTime } =
        request.body;

      // Create a new reservation document
      const reservation: IReservation = new Reservation({
        firstName,
        lastName,
        phoneNumber,
        email,
        note,
        reservationTime,
      });

      // Save the reservation to the database
      await reservation.save();

      return reply
        .status(201)
        .send({ message: "Reservation created successfully", reservation });
    } catch (error) {
      server.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
);
const PORT = process.env.PORT || 3000;
// Start the server
const start = async () => {
  try {
    await server.listen({ port: PORT });
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
