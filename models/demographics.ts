import { Model, Schema, model, models } from 'mongoose';

interface DemographicsI {
  state: string;
  cities: string[];
}
type DemographicsDocument = DemographicsI & Document;
type DemographicsModel = Model<DemographicsDocument>;

const DemographicsSchema = new Schema<DemographicsDocument>({
  state: String,
  cities: [String],
});

const Demographics: DemographicsModel =
  models.demographics || model('demographics', DemographicsSchema);

export default Demographics;
