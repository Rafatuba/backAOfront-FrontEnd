# Cadastro de músicos

![imagem do projeto](/public/print1.png)

## Tecnologias utilizadas:

- [ReactJS](https://react.dev/) <img src="/public/Typescript.png" alt="Typscript" width="80">
- [ViteJS](https://vitejs.dev/) <img src="/public/vite.svg" alt="vite.js" width="80">
- [TailwindCSS](https://tailwindcss.com/) <img src="/public/icon-tailwind.png" alt="Tailwind css" width="80">
- [Node.JS](https://nodejs.org/en) <img src="/public/node.png" alt="Node" width="80">
- [Fastify](https://fastify.dev/) <img src="/public/Fastify_logo.svg" alt="Fastify" width="80">
- [MongoDB](https://www.mongodb.com/pt-br) <img src="/public/MongoDB_Logo.svg.png" alt="MongoDB" width="80">
- [Prisma](https://www.prisma.io/) <img src="/public/prisma.png" alt="Prisma" width="80">

- Exemplo da configuração do `server.ts`, na API:

```js
import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors);
  await app.register(routes);

  try {
    await app.listen({ port: 3333 });
  } catch (err) {
    process.exit(1);
  }
};

start();
```

- Desenvolvido por: `Rafael Silva`
- Contato: `rafaolly1@gmail.com`
