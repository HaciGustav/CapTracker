const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const seedData = {
  users: [
    {
      id: 1,
      username: "john_doe",
      password: "hashed_password",
      email: "john.doe@example.com",
      first_name: "John",
      last_name: "Doe",
      is_admin: true,
      is_manager: false,
      is_staff: false,
      is_active: false,
      createdAt: "2023-01-01T12:00:00Z",
    },
    {
      id: 2,
      username: "jane_smith",
      password: "hashed_password",
      email: "jane.smith@example.com",
      first_name: "Jane",
      last_name: "Smith",
      is_admin: false,
      is_manager: false,
      is_staff: false,
      is_active: true,
      createdAt: "2023-06-01T15:00:00Z",
    },
  ],
  brands: [
    {
      id: 1,
      name: "Brand A",
      image: "https://example.com/images/brand_a.png",
    },
    {
      id: 2,
      name: "Brand B",
      image: "https://example.com/images/brand_b.png",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Electronics",
    },
    {
      id: 2,
      name: "Home Appliances",
    },
  ],
  products: [
    {
      id: 1,
      name: "Smartphone X",
      price: 699.99,
      stock: 50,
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Laptop Y",
      price: 999.99,
      stock: 30,
      brandId: 1,
      categoryId: 1,
    },
    {
      id: 3,
      name: "Vacuum Cleaner Z",
      price: 199.99,
      stock: 100,
      brandId: 2,
      categoryId: 2,
    },
  ],
  transactions: [
    {
      id: 1,
      userId: 1,
      brandId: 1,
      productId: 1,
      quantity: 2,
      price: 699.99,
      price_total: 1399.98,
      transaction_type: 0,
    },
    {
      id: 2,
      userId: 2,
      brandId: 2,
      productId: 3,
      quantity: 1,
      price: 199.99,
      price_total: 199.99,
      transaction_type: 1,
    },
  ],
};

async function main() {
  const { users, brands, categories, products, transactions } = seedData;
  try {
    for (let u of users) {
      await prisma.user.create({
        data: u,
      });
    }
    for (let b of brands) {
      await prisma.brand.create({
        data: b,
      });
    }
    for (let c of categories) {
      await prisma.category.create({
        data: c,
      });
    }
    for (let p of products) {
      await prisma.product.create({
        data: p,
      });
    }
    for (let t of transactions) {
      await prisma.transaction.create({
        data: t,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
main();
