import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  UnauthorizedError,
  messages,
} from '../errors/index.js';
import { schemaEmail } from '../validators/users.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => !schemaEmail.validate(value).error,
      message: () => messages.app.notEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findOneAndValidatePassword({ password, email }) {
      return this.findOne({ email })
        .select('+password')
        .then((document) => {
          if (!document) {
            throw new UnauthorizedError(messages.user.incorrect);
          }

          return bcrypt.compare(password, document.password)
            .then((isSuccess) => {
              if (!isSuccess) {
                throw new UnauthorizedError(messages.user.incorrect);
              }

              const {
                password: removed, // удаляем пароль из объекта пользователя
                ...user
              } = document.toObject(); // превращаем документ в объект пользователя
              return user;
            });
        });
    },
  },
});

export const User = mongoose.model('user', userSchema);
