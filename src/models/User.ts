import { prop, Typegoose, ModelType, InstanceType, staticMethod, pre, post } from 'typegoose';
import validator from 'validator';
import { Gender, Privilige } from '@app/constants';

@pre<User>('save', function(next) {
  if (this.gender === Gender.NON_BINARY) {
    this.privilege = Privilige.HIGH;
  }
  next();
})
@post<User>('save', (user) => {
  try {
    await 
  } catch (e) {
    // TODO: log error
  }
})
export class User extends Typegoose {

  @prop({ required: true, trim: true })
  firstName!: string;

  @prop({ required: true, trim: true })
  lastName!: string;

  @prop({ required: true, unique: true, trim: true })
  username!: String;

  @prop({
    required: true,
    validate: [
      {
        validator: validator.isEmail,
        message: `{VALUE} is not a valid email`
      }
    ]
  })
  email!: String;

  @prop({ required: true, enum: Gender })
  gender!: Gender;

  @prop({ enum: Privilige, default: Privilige.LOW })
  privilege!: Privilige;

  @prop()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(full) {
    const [firstName, lastName] = full.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @staticMethod
  static findByFullName(this: ModelType<User> & typeof User, fullName: string) {
    const [firstName, lastName] = fullName.split(' ');
    return this.findOne({ firstName, lastName });
  }

}

