import { Model, Schema, model, models } from 'mongoose';

interface DemographicsI {
  [key: string]: string[];
}
type DemographicsDocument = DemographicsI & Document;
type DemographicsModel = Model<DemographicsDocument>;

const DemographicsSchema = new Schema<DemographicsDocument>({
});

const Demographics: DemographicsModel =
  models.Demographics || model('demographics', DemographicsSchema);

export default Demographics;
