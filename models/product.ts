import { Model, Schema, model, models } from 'mongoose';
import { ProductI } from '@/app/constants/interfaces';


type ProductDocument = ProductI & Document;
type ProductModel = Model<ProductDocument>;

const productSchema = new Schema<ProductDocument>({
  pictures: {
    type: [String],
    required: [true, 'Pictures are required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  bulb_type: {
    type: String,
    required: [true, 'type is required'],
  },
  watt: {
    type: Number,
    required: [true, 'Watt is required'],
  },
  quantity_available: {
    type: Number,
    required: [true, 'Available Quantity is required'],
  },
});

const Product: ProductModel = models.product || model('product', productSchema);

export default Product;
