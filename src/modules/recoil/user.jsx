import { atom } from 'recoil'

export const _user = atom({
  key: 'user',
  default: {
    firstName: 'Gildong',
    lastName: 'Hong',
    age: 30
  }
});
