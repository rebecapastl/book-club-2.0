// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { app, data } = context;

    // Throw an error if we didn't get an email
    if(!data.email) {
      throw new Error('A user must have an email');
    }

    //validate email pattern
    function validateEmail(email: string) {
      //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email
      const pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return pattern.test(String(email).toLowerCase());
    }
    // Throw an error if email does not match the pattern
    if (!validateEmail(data.email)){
      throw new Error('Input a valid email.');
    }
    // Throw an error if this is a duplicate email
    const users = await app.service('users').find({
      query: {
        email: data.email
      }
    });
    if(users.total > 0) {
      throw new Error('The is already a user registered with this email');
    }



    if(!data.name) {
      throw new Error('A user must have a name');
    }

    if(!data.password) {
      throw new Error('A user must have a password');
    }

    console.log(data);

    // The actual review text
    const email = data.email
      // Email can't be longer than 100 characters
      .substring(0, 100);

    const name = data.name
      // Name can't be longer than 60 characters
      .substring(0, 60);

    const password = data.password
      // Password id can't be longer than 60 characters
      .substring(0, 60);

    let avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEP_MMlRInjPLsrly2_ThlKq_ytlxjIqap1w&usqp=CAU';

    if (data.avatar){
      avatar = data.avatar
        // Avatar id can't be longer than 20000 characters
        .substring(0, 20000);
    }

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      email,
      name,
      password,
      avatar,

      // Add the current date
      createdAt: new Date().getTime()
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
