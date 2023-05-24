## API Endpoints

Here are the available API endpoints:

1. **GET /categories**
   This endpoint is used to retrieve all categories. No specific input is required.

2. **GET /foods/:id**
   This endpoint retrieves the list of foods belonging to a certain category. It expects the ID of the food category as the `id` parameter.

3. **POST /order**
   This endpoint is used to place an order. It expects a JSON body containing the IDs of the foods to specify your order.

   Example Request Body:

   ```json
   {
     "foodIds": ["food1_id", "food2_id", "food3_id"]
   }
   ```

4. **POST /reservations**
   This endpoint is used to create a reservation. It expects a JSON body containing the first name, last name, phone number, email address, note, and reservation time. Optional fields: firstName, lastName, phoneNumber, email, note, reservationTime.

   Example Request Body:

   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "phoneNumber": "+1234567890",
     "email": "johndoe@example.com",
     "note": "Vegetarian",
     "reservationTime": 1671443200000
   }
   ```
