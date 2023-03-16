import { Product } from './../../models/Product';
import { Request, Response } from 'express';

export async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find().where('category').equals(categoryId);

    res.json(products);
  }
  catch {
    res.status(500);
  }
}
