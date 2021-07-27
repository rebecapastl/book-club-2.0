// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A review must have a text');
    }

    if(!data.book) {
      throw new Error('A review must have a book');
    }

    if(!data.bookId) {
      throw new Error('A review must have a bookId');
    }



    // The authenticated user
    const user = context.params.user;

    console.log(context.params);

    // The actual review text
    const text = data.text
      // Review can't be longer than 300 characters
      .substring(0, 300);

    const book = data.book
      // Book title can't be longer than 100 characters
      .substring(0, 100);

    const bookId = data.book
      // Book id can't be longer than 100 characters
      .substring(0, 100);


    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      user: user!.name,
      book,
      userId: user!._id,
      bookId,

      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practice: hooks should always return the context
    return context;

  };
};
