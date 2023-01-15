import { sequelize } from '../core/db.js'
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

interface AdsModel extends Model<InferAttributes<AdsModel>, InferCreationAttributes<AdsModel>> {
  id: CreationOptional<number>
  user_id?: string
  category?: string
  post_id?: string
  product_name?: string
  elon_state?: string
  kilo?: string
  tg_link?: string
  phone_number?: string
  miqdor_type?: string 

}
export const Ads = sequelize.define<AdsModel>('ads', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  user_id: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  post_id: { type: DataTypes.STRING, unique: true },
  product_name: { type: DataTypes.STRING },
  kilo: {type: DataTypes.STRING},
  tg_link: { type: DataTypes.STRING },
  elon_state: {type: DataTypes.STRING},
  phone_number: { type: DataTypes.STRING },
  miqdor_type: {type:DataTypes.STRING}
})
