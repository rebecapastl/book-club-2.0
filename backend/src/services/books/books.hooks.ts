
import processAddBook from '../../hooks/process-add-book';
// import processDeleteBook from '../../hooks/process-delete-book';


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
