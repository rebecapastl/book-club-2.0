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

    // Throw an error if the review is shorter than 5 characters
    if(data.text.length < 5) {
      throw new Error('A review must have from 5 to 300 characters');
    }

    // Throw an error if we didn't get a book
    if(!data.book) {
      throw new Error('A review must have a book');
    }

    // Throw an error if we didn't get a bookId
    if(!data.bookId) {
      throw new Error('A review must have a bookId');
    }

    console.log(data);

    // The authenticated user
    const user = context.params.user;

    // The actual review text
    const text = data.text
      // Review can't be longer than 300 characters
      .substring(0, 300);

    const book = data.book
      // Book title can't be longer than 100 characters
      .substring(0, 100);

    const bookId = data.bookId
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
