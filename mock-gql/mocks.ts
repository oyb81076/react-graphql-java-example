import { Random } from 'mockjs';
const array = (min = 10, max = min) => Array<object>(Random.integer(min, max)).fill({});
export default {
  ID: () => Random.id(),
  Query: {
    users: () => array(),
    projects: () => array(),
  },
  User: () => ({
    name: Random.cname(),
    age: Random.integer(20, 50),
    male: Random.boolean(),
  }),
  Project: () => ({
    name: Random.ctitle(),
  }),
};
