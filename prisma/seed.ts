import { PrismaClient } from '@prisma/client';
import { any } from 'zod';
const prisma = new PrismaClient();
const {data} = require('./data.ts');


const dofill = async () => {
  try{
    const formatfilm = data.map((film:any) => ({
      id: film.id,
      name: film.title,
      img: film.img,
    }));
    await prisma.film.createMany({data:formatfilm, skipDuplicates:true});
    console.log('done');
  }
  catch(e){ console.log(e)}finally {
    await prisma.$disconnect();
  }
 
  };
  dofill();
  