// eslint-disable-next-line @typescript-eslint/no-var-requires
const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request: any, response: any) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async store(request: any, response: any) {
    const { name, icon } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name, icon });

    response.status(201).json(category);
  }
}

module.exports = new CategoryController();
