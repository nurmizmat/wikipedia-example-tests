import { faker } from '@faker-js/faker';

export default {
  //Generates a random name consisting of a full name and a 5-digit number.
  randomName() {
    const randomName = faker.person.fullName() + ' ' + faker.string.numeric(5);
    return randomName;
  },

  // Generates a random password.
  randomPassword() {
    const randomPassword = faker.internet.password();
    return randomPassword;
  },

  // Produces a random email address.
  randomEmail() {
    const randomEmail = faker.internet.email();
    return randomEmail;
  },

  // Creates a random numeric string of 5 characters.
  randomNumeric() {
    const randomNumeric = faker.string.numeric(5);
    return randomNumeric;
  },

  // Generates a random symbol string of 5 characters.
  randomSymbol() {
    const randomSymbol = faker.string.symbol(5);
    return randomSymbol;
  },
}