import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TokenPayLoad } from '../auth/token-payload.interface';
import { CreateProductRequest } from './dto/create-product.request';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PRODUCT_IMAGES } from './product-images';
import { UpdateProductRequest } from './dto/update-product.request';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProductt(
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayLoad,
  ) {
    return this.productsService.createProduct(body, user.userId);
  }

  @Post(':productId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: PRODUCT_IMAGES,
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.productId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {}
  //pipe is the bloc of code that is to transform request or to apply validation

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProducts(@CurrentUser() user: TokenPayLoad) {
    return this.productsService.getProducts(user.userId);
  }

  @Get(':productId')
  @UseGuards(JwtAuthGuard)
  async getProductById(@Param('productId') productId: string) {
    return this.productsService.getProductById(+productId);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  async deleteProductById(@Param('productId') productId: string) {
    return this.productsService.deleteProductById(+productId);
  }

  @Patch(':productId')
  @UseGuards(JwtAuthGuard)
  async updateProductById(
    @Body() body: UpdateProductRequest,
    @CurrentUser() user: TokenPayLoad,
    @Param('productId') productId: string,
  ) {
    return this.productsService.updateProductById(
      +productId,
      user.userId,
      body,
    );
  }
}
