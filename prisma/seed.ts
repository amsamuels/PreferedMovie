import { PrismaClient } from '@prisma/client';
import { any, string } from 'zod';
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

    //await prisma.vote.deleteMany({
   // where: {
    //  AND:[
     // {
    //      id: {
      //      not: "null"
        }
    //    }
     // ]
        
  //  }})
   
//  }
  catch(e){ console.log(e)}finally {
    await prisma.$disconnect();
  }
 
  };
  dofill();
  