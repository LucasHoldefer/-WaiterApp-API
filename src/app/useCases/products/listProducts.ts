import { Product } from './../../models/Product';
import { Request, Response } from 'express';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await Product.find();

    res.json(products);
  }
  catch {
    res.status(500);
  }
}
