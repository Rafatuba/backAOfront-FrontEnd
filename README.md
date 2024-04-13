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

<img src="/public/vite.svg" alt="vite.js" style={width:200px}>
<img src="/public/Typescript.png" alt="Typscript" style={width:200px}>
<img src="/public/icon-tailwind.png" alt="Tailwind css" style={width:200px}>
<img src="/public/node.png" alt="Node" style={width:200px}>
<img src="/public/Fastify_logo.svg" alt="Fastify" style={width:200px}>
<img src="/public/MongoDB_Logo.svg.png" alt="MongoDB" style={width:200px}>
<img src="/public/prisma.png" alt="Prisma" style={width:200px}>

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
