# Cadastro de músicos

![imagem do projeto](/public/print1.png)

## Tecnologias utilizadas:

- [ReactJS](https://react.dev/)
- [ViteJS](https://vitejs.dev/) - com Typescript
- [TailwindCSS](https://tailwindcss.com/)
- [Node.JS](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Prisma](https://www.prisma.io/)

![imagem Vite.js](/public/vite.svg) ![imagem Typescript](/public/Typescript.png)
![imagem TailwindCSS](/public/icon-tailwind.png) ![imagem Nodejs](/public/node.png)
![imagem Fastify](/public/Fastify_logo.svg) ![imagem MongoDb](/public/MongoDB_Logo.svg.png)
![imagem Prisma](/public/prisma.png)

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
