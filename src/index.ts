
import { graphqServer } from '../app/graphqlinit';

require('dotenv').config()


// interface MyContext {
//   token?: string;
// }


const initServer = async () => {
  const app = await graphqServer()
  await new Promise<void>((resolve) => app.listen({ port: `${process.env.PORT}` }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
}
initServer()