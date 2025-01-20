import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

app.use(express.json());

// GET: /pokemons-cards
app.get('/pokemons-cards', async (_req, res) => {
  try {
    const pokemonCards = await prisma.pokemonCard.findMany({
      include: { types: true },
    });
    res.status(200).send(pokemonCards);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching pokemon cards' });
  }
});

// GET: /pokemons-cards/:pokemonCardId
app.get('/pokemons-cards/:pokemonCardId', async (req, res) => {
  const { pokemonCardId } = req.params;
  try {
    const pokemonCard = await prisma.pokemonCard.findUnique({
      where: { id: Number(pokemonCardId) },
      include: { types: true },
    });
    if (pokemonCard) {
      res.status(200).send(pokemonCard);
    } else {
      res.status(404).send({ error: 'Pokemon card not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching the pokemon card' });
  }
});

// POST: /pokemon-cards
app.post('/pokemon-cards', async (req, res) => {
  const { types, ...data } = req.body;
  try {
    const typeIds = await prisma.type.findMany({
      where: { name: { in: types } },
      select: { id: true },
    });

    if (typeIds.length !== types.length) {
      return res.status(400).send({ error: 'One or more types are invalid' });
    }

    const newPokemonCard = await prisma.pokemonCard.create({
      data: {
        ...data,
        types: {
          create: typeIds.map(type => ({ typeId: type.id })),
        },
      },
    });
    res.status(201).send(newPokemonCard);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send({ error: `An error occurred while creating the pokemon card: ${errorMessage}` });
  }
});

// DELETE: /pokemons-cards/:pokemonCardId
app.delete('/pokemons-cards/:pokemonCardId', async (req, res) => {
  const { pokemonCardId } = req.params;
  try {
    await prisma.pokemonCard.delete({ where: { id: Number(pokemonCardId) } });
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send({ error: `An error occurred while deleting the pokemon card: ${errorMessage}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});