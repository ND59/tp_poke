import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.type.deleteMany();
  await prisma.pokemonCard.deleteMany();

  await prisma.type.createMany({
    data: [
      { name: 'Normal' },
      { name: 'Fire' },
      { name: 'Water' },
      { name: 'Grass' },
      { name: 'Electric' },
      { name: 'Ice' },
      { name: 'Fighting' },
      { name: 'Poison' },
      { name: 'Ground' },
      { name: 'Flying' },
      { name: 'Psychic' },
      { name: 'Bug' },
      { name: 'Rock' },
      { name: 'Ghost' },
      { name: 'Dragon' },
      { name: 'Dark' },
    ],
  });

  const types = await prisma.type.findMany();

  await prisma.pokemonCard.create({
    data: {
      name: 'Pikachu',
      pokedexId: 25,
      lifePoints: 35,
      size: 0.4,
      weight: 6.0,
      imageUrl: 'https://example.com/pikachu.png',
      types: {
        create: [
          { typeId: types.find(type => type.name === 'Electric')!.id },
          { typeId: types.find(type => type.name === 'Flying')!.id },
        ],
      },
    },
  });

  await prisma.pokemonCard.create({
    data: {
      name: 'Bulbizarre',
      pokedexId: 1,
      lifePoints: 45,
      size: 0.7,
      weight: 6.9,
      imageUrl: 'https://example.com/bulbizarre.png',
      types: {
        create: [
          { typeId: types.find(type => type.name === 'Grass')!.id },
        ],
      },
    },
  });

  console.log('Seed completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });