import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { ItemDto } from './item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findById({ _id: id });
  }

  async create(item: ItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async update(id: string, item: ItemDto): Promise<Item> {
    return await this.itemModel.findOneAndUpdate({ _id: id }, item, {
      new: true,
    });
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }
}
