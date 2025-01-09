const { PrismaClient } = require("@prisma/client");
const { Decimal } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();
const seedData = {
  users: [
    {
      username: "john_doe",
      password: "hashed_password",
      email: "john.doe@example.com",
      firstname: "John",
      lastname: "Doe",
      user_role: 3,
      is_active: true,
      createdAt: "2023-01-01T12:00:00Z",
    },
    {
      username: "jane_smith",
      password: "hashed_password",
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      user_role: 3,
      is_active: true,
      createdAt: "2023-06-01T15:00:00Z",
    },
  ],
  brands: [
    {
      name: "Samsung",
      image:
        "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/256_144_2.png?$512_N_PNG$",
    },
    {
      name: "Apple",
      image:
        "https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu.png",
    },
    {
      name: "Sony",
      image: "https://1000logos.net/wp-content/uploads/2021/05/Sony-logo.png",
    },
    {
      name: "LG",
      image:
        "https://www.lg.com/content/dam/lge/global/our-brand/src/mocks/bs0002/brand-elements-logo-primary-d.svg",
    },
    {
      name: "Panasonic",
      image:
        "https://logos-world.net/wp-content/uploads/2023/03/Panasonic-Logo.png",
    },
  ],
  categories: [
    {
      name: "Electronics",
    },
    {
      name: "Books",
    },
    {
      name: "Home Appliances",
    },
    {
      name: "Clothing",
    },
    {
      name: "Toys",
    },
    {
      name: "Health & Beauty",
    },
    {
      name: "Sports Equipment",
    },
    {
      name: "Groceries",
    },
    {
      name: "Automotive",
    },
    {
      name: "Music Instruments",
    },
  ],
  products: [
    {
      name: "Smartphone X",
      price: 699.99,
      stock: 50,
      brandId: 1,
      categoryId: 1,
      min: 10,
      max: 280,
    },
    {
      name: "Laptop Pro",
      price: 1099.99,
      stock: 30,
      brandId: 2,
      categoryId: 1,
      min: 10,
      max: 280,
    },
    {
      name: "Wireless Earbuds",
      price: 149.99,
      stock: 80,
      brandId: 3,
      categoryId: 1,
      min: 10,
      max: 280,
    },
    {
      name: "4K Smart TV",
      price: 1299.99,
      stock: 20,
      brandId: 4,
      categoryId: 1,
      min: 10,
      max: 280,
    },
    {
      name: "Digital Camera Z",
      price: 799.99,
      stock: 15,
      brandId: 5,

      categoryId: 1,
      min: 5,
      max: 20,
    },
    {
      name: "Mystery Novel",
      price: 19.99,
      stock: 100,
      brandId: 1,

      categoryId: 2,
      min: 10,
      max: 280,
    },
    {
      name: "Science Textbook",
      price: 59.99,
      stock: 140,
      brandId: 2,

      categoryId: 2,
      min: 100,
      max: 2800,
    },
    {
      name: "Self-Help Guide",
      price: 25.99,
      stock: 70,
      brandId: 3,

      categoryId: 2,
      min: 10,
      max: 280,
    },
    {
      name: "Cookbook Deluxe",
      price: 35.99,
      stock: 60,
      brandId: 4,

      categoryId: 2,
      min: 10,
      max: 1210,
    },
    {
      name: "Fantasy Adventure",
      price: 15.99,
      stock: 90,
      brandId: 5,

      categoryId: 2,
      min: 10,
      max: 280,
    },
    {
      name: "Microwave Oven",
      price: 199.99,
      stock: 25,
      brandId: 1,

      categoryId: 3,
      min: 10,
      max: 280,
    },
    {
      name: "Vacuum Cleaner",
      price: 149.99,
      stock: 40,
      brandId: 2,

      categoryId: 3,
      min: 10,
      max: 280,
    },
    {
      name: "Air Purifier",
      price: 299.99,
      stock: 30,
      brandId: 3,

      categoryId: 3,
      min: 10,
      max: 280,
    },
    {
      name: "Blender Max",
      price: 89.99,
      stock: 50,
      brandId: 4,

      categoryId: 3,
      min: 10,
      max: 280,
    },
    {
      name: "Coffee Maker Pro",
      price: 129.99,
      stock: 35,
      brandId: 5,

      categoryId: 3,
      min: 10,
      max: 280,
    },
    {
      name: "Winter Jacket",
      price: 199.99,
      stock: 60,
      brandId: 1,

      categoryId: 4,
      min: 10,
      max: 280,
    },
    {
      name: "Running Shoes",
      price: 79.99,
      stock: 120,
      brandId: 2,

      categoryId: 4,
      min: 10,
      max: 280,
    },
    {
      name: "Summer Dress",
      price: 49.99,
      stock: 80,
      brandId: 3,

      categoryId: 4,
      min: 10,
      max: 280,
    },
    {
      name: "Casual Shirt",
      price: 39.99,
      stock: 100,
      brandId: 4,

      categoryId: 4,
      min: 10,
      max: 280,
    },
    {
      name: "Leather Belt",
      price: 25.99,
      stock: 50,
      brandId: 5,

      categoryId: 4,
      min: 10,
      max: 280,
    },
    {
      name: "Building Blocks",
      price: 29.99,
      stock: 200,
      brandId: 1,

      categoryId: 5,
      min: 10,
      max: 280,
    },
    {
      name: "Doll House",
      price: 59.99,
      stock: 60,
      brandId: 2,

      categoryId: 5,
      min: 10,
      max: 280,
    },
    {
      name: "RC Car",
      price: 99.99,
      stock: 40,
      brandId: 3,

      categoryId: 5,
      min: 10,
      max: 280,
    },
    {
      name: "Puzzle Set",
      price: 19.99,
      stock: 150,
      brandId: 4,

      categoryId: 5,
      min: 10,
      max: 280,
    },
    {
      name: "Action Figure",
      price: 24.99,
      stock: 80,
      brandId: 5,
      categoryId: 5,
    },
  ],
  transactions: [
    {
      userId: 1,
      brandId: 1,
      productId: 1,
      quantity: 2,
      price: new Decimal(699.99),
      price_total: new Decimal(1399.98),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 2,
      brandId: 2,
      productId: 3,
      quantity: 1,
      price: new Decimal(149.99),
      price_total: new Decimal(149.99),
      createdAt: "",
      transaction_type: 2,
    },
    {
      userId: 1,
      brandId: 3,
      productId: 5,
      quantity: 3,
      price: new Decimal(799.99),
      price_total: new Decimal(2399.97),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 2,
      brandId: 5,
      productId: 25,
      quantity: 5,
      price: new Decimal(24.99),
      price_total: new Decimal(124.95),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 1,
      brandId: 4,
      productId: 4,
      quantity: 1,
      price: new Decimal(1299.99),
      price_total: new Decimal(1299.99),
      createdAt: "",
      transaction_type: 2,
    },
    {
      userId: 2,
      brandId: 2,
      productId: 2,
      quantity: 2,
      price: new Decimal(1099.99),
      price_total: new Decimal(2199.98),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 1,
      brandId: 3,
      productId: 8,
      quantity: 4,
      price: new Decimal(25.99),
      price_total: new Decimal(103.96),
      createdAt: "",
      transaction_type: 2,
    },
    {
      userId: 2,
      brandId: 1,
      productId: 11,
      quantity: 1,
      price: new Decimal(199.99),
      price_total: new Decimal(199.99),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 1,
      brandId: 2,
      productId: 7,
      quantity: 3,
      price: new Decimal(59.99),
      price_total: new Decimal(179.97),
      createdAt: "",
      transaction_type: 1,
    },
    {
      userId: 2,
      brandId: 5,
      productId: 15,
      quantity: 2,
      price: new Decimal(129.99),
      price_total: new Decimal(259.98),
      createdAt: "",
      transaction_type: 2,
    },
  ],
};

async function seedUsers(users) {
  return Promise.all(users.map((user) => prisma.user.create({ data: user })));
}

async function seedBrands(brands) {
  return Promise.all(
    brands.map((brand) => prisma.brand.create({ data: brand }))
  );
}

async function seedCategories(categories) {
  return Promise.all(
    categories.map((category) => prisma.category.create({ data: category }))
  );
}

async function seedProducts(products, brands, categories) {
  return Promise.all(
    products.map((product) => {
      const brand = brands.find((b) => b.id === product.brandId); // Match by name or other unique identifier
      const category = categories.find((c) => c.id === product.categoryId);
      if (!brand) console.log(product.brandId);
      if (!category) console.log(category);
      return prisma.product.create({
        data: {
          ...product,
          brandId: brand.id,
          categoryId: category.id,
        },
      });
    })
  );
}

async function seedTransactions(transactions, users, brands, products) {
  const startDate = new Date("2024-01-01T00:00:00.000Z");
  const endDate = new Date("2024-12-31T23:59:59.999Z");
  function randomDate() {
    return new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
  }
  return Promise.all(
    transactions.map((transaction) => {
      const user = users.find((u) => u.id === transaction.userId);
      const brand = brands.find((b) => b.id === transaction.brandId);
      const product = products.find((p) => p.id === transaction.productId);

      return prisma.transaction.create({
        data: {
          ...transaction,
          userId: user.id,
          brandId: brand.id,
          productId: product.id,
          createdAt: randomDate().toISOString(),
        },
      });
    })
  );
}

async function main() {
  const { users, brands, categories, products, transactions } = seedData;

  // Seed Users
  const createdUsers = await seedUsers(users);

  // Seed Brands
  const createdBrands = await seedBrands(brands);

  // Seed Categories
  const createdCategories = await seedCategories(categories);

  // Seed Products (use created brands and categories to assign foreign keys)
  const createdProducts = await seedProducts(
    products,
    createdBrands,
    createdCategories
  );

  // Seed Transactions (use created users, brands, and products)
  await seedTransactions(
    transactions,
    createdUsers,
    createdBrands,
    createdProducts
  );

  console.log("SEED COMPLETED");
}
main();
