const faker = require('faker')

const restaurants = []
const orders = []
const meals = []

for (let restaurantId = 0; restaurantId < 100; restaurantId++) {
  const restaurant = {
    id: restaurantId,
    email: faker.internet.email(),
    name: faker.company.companyName(),
    password: faker.internet.password(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
  }
  restaurants.push(restaurant)
  for (let mealId = 0; mealId < 20; mealId++) {
    const meal = {
      id: mealId,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription,
      price: faker.commerce.price(),
      image_url: faker.image.imageUrl(),
      restaurantId: restaurantId
    }

    meals.push(meal)
  }
}
for (let customer = 0; customer < 100; customer++) {
const order = {
  id: faker.datatype.number(),
  status: 'PENDING',
  customer_first_name: faker.name.firstName(),
  customer_last_name: faker.name.lastName(),
  customer_street: faker.address.streetName(),
  customer_street_nr: faker.datatype.number(),
  customer_zip: faker.address.zipCode(),
  customer_city: faker.address.city(),
  comments: faker.hacker.phrase(),
  mealId: Math.floor(Math.random() * 20),
  restaurantId: Math.floor(Math.random() * 100)
}
  orders.push(order)
}

console.log(restaurants)

module.exports = {restaurants, orders, meals}
