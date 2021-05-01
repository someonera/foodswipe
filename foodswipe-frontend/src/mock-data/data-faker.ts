import faker from 'faker'

type MockRestaurant = {id: number, email: string, name: string, password: string, latitude: string, longitude: string}
type MockMeal = {id: number, name: string, description: string, price: string, image_url: string, restaurantId: number}
type MockOrder = {id: number, customer_first_name: string, customer_last_name: string, customer_street: string, customer_street_nr: number, customer_zip: string, customer_city: string, comments: string, mealId: number, restaurantId: number}

export const restaurants: MockRestaurant[] = []
export const orders: MockOrder[] = []
export const meals: MockMeal[] = []


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
      description: faker.commerce.productDescription(),
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

export const loginRestaurant = {
  id: restaurants[0].id,
  name: restaurants[0].name,
  email: restaurants[0].email
}

export const mealList: MockMeal[] = meals.filter(meal => meal.restaurantId === loginRestaurant.id)

export const ordersRestaurant = {
  id: restaurants[0].id,
  name: restaurants[0].name
}

export const order = orders[0]

export const meal = meals[0]

export const orderResult = {
  orderId: 1,
  status: 'PENDING',
  restaurantId: orders[0].restaurantId,
  mealId: orders[0].mealId
}