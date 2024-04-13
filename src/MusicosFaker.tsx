import { faker } from "@faker-js/faker/locale/pt_BR";

export const musicos = Array.from({ length: 10 }).map(() => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    niver: faker.date.birthdate(),
  };
});

// Parei em 29min.
