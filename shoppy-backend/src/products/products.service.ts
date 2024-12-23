import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from '../prisma/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './product-images';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(data: CreateProductRequest, userId: number) {
    return this.prismaService.product.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async getProductById(productId: number) {
    try {
      return {
        ...(await this.prismaService.product.findUniqueOrThrow({
          where: { id: productId },
        })),
        imageExists: await this.imageExists(productId),
      };
    } catch (error) {
      throw new NotFoundException('Product not found with ID ' + productId);
    }
  }

  async getProducts(userId: number) {
    const products = await this.prismaService.product.findMany({
      where: { userId: userId },
    });
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(
        join(`${PRODUCT_IMAGES}/${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteProductById(productId: number) {
    try {
      const res = await this.prismaService.product.delete({
        where: {
          id: productId,
        },
      });
      const imageExists = await this.imageExists(productId);
      if (imageExists) {
        await fs.unlink(join(`${PRODUCT_IMAGES}/${productId}.jpg`));
      }
      return res;
    } catch (error) {
      throw new NotImplementedException(
        'Problem occured while deleting product with ID ' + productId,
      );
    }
  }

  async updateProductById(productId: number, userId, data) {
    try {
      const res = await this.prismaService.product.update({
        where: {
          id: productId,
          userId: userId,
        },
        data: {
          ...data,
        },
      });
      return res;
    } catch (error) {
      throw new NotImplementedException(
        'Problem occured while updating product with ID ' + productId,
      );
    }
  }
}
