
import processAddBook from '../../hooks/process-add-book';
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processAddBook()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
