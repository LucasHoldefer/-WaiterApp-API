// eslint-disable-next-line @typescript-eslint/no-var-requires
const ProductsRepository = require('../repositories/ProductsRepository');

class ProductController {
  async index(request: any, response: any) {
    const categories = await ProductsRepository.findAll();
    response.json(categories);
  }

  async store(request: any, response: any) {
    const imagePath = request.file?.filename;
    const { name, description, price, category } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const product = await ProductsRepository.create({ name, description, price, imagePath, category });

    response.status(201).json(product);
  }

  async getByCategory(request: any, response: any) {
    const category = request.params.categoryId;

    const products = await ProductsRepository.findByCategory({ category });
    response.json(products);
  }
}

module.exports = new ProductController();
export {};
