// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    // The authenticated user
    const user = context.params.user;

    if(user!._id !== data.ownerId){
      throw new Error('You cannot delete this book');
    }

    // Override the original data (so that people can't submit additional stuff)
    context.data = {

      bookId: data.bookId,

      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
