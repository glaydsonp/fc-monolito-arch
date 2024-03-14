import { Sequelize } from "sequelize-typescript"
import { app } from "../../express";
import request from 'supertest'
import { ProductModel } from "../../../modules/product-adm/repository/product.model"

describe("E2E test for product", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false
    })

    sequelize.addModels([ProductModel])

    await sequelize.sync({ force: true });
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product",
        description: "Description",
        purchasePrice: 100,
        stock: 100
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product");
    expect(response.body.description).toBe("Description");
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(100);
  });
});   