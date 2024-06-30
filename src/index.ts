
import { graphqServer } from '../app/graphqlinit';

require('dotenv').config()
const PORT = process.env.PORT || 4000

// interface MyContext {
//   token?: string;
// }


const initServer = async () => {
  const app = await graphqServer()
  await new Promise<void>((resolve) => app.listen({ port: `${PORT}` }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
}
initServer()