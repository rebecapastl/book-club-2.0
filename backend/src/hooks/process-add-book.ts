// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.title) {
      throw new Error('A book must have a title');
    }

    if(!data.author) {
      throw new Error('A book must have an author');
    }

    if(!data.availability) {
      throw new Error('You must choose the availability of the book');
    }

    // Throw an error if the availability is different from Borrowing, Trading or Both
    if(data.availability !== 'Borrowing' && data.availability !== 'Trading' && data.availability !== 'Both'){
      throw new Error('Choose if the book is available for borrowing, trading or both');
    }

    // The authenticated user
    const user = context.params.user;

    console.log(context.params);

    // The actual book title
    const title = data.title
      // Title can't be longer than 100 characters
      .substring(0, 100);

    const author = data.author
      // Author can't be longer than 60 characters
      .substring(0, 60);

    const cover = data.cover
      // Cover can't be longer than 20000 characters
      .substring(0, 20000);

    const availability = data.availability
      // Availability can't be longer than 20 characters
      .substring(0, 20);

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      title,
      author,
      cover,
      availability,
      owner: user!.name,
      ownerId: user!._id,

      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
