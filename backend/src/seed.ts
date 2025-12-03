import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('🗑️  Limpando banco de dados...');
    
    await prisma.carteiraSaude.deleteMany();
    await prisma.consulta.deleteMany();
    await prisma.vacina.deleteMany();
    await prisma.pet.deleteMany();
    await prisma.user.deleteMany();

    console.log('👤 Criando usuários...');
    
    const user1 = await prisma.user.create({
      data: {
        nome: 'João Silva',
        email: 'joao@example.com',
        senha: await bcrypt.hash('senha123', 10)
      }
    });

    const user2 = await prisma.user.create({
      data: {
        nome: 'Maria Santos',
        email: 'maria@example.com',
        senha: await bcrypt.hash('senha123', 10)
      }
    });

    console.log('💉 Criando vacinas...');
    
    const vacinas = await Promise.all([
      prisma.vacina.create({ data: { nome: 'V8', descricao: 'Vacina múltipla contra cinomose, parvovirose, etc', precoFilhote: 80, precoAdulto: 90, idadeMinima: 6 } }),
      prisma.vacina.create({ data: { nome: 'V10', descricao: 'Vacina múltipla completa', precoFilhote: 100, precoAdulto: 110, idadeMinima: 8 } }),
      prisma.vacina.create({ data: { nome: 'Antirrábica', descricao: 'Proteção contra raiva', precoFilhote: 60, precoAdulto: 60, idadeMinima: 12 } }),
      prisma.vacina.create({ data: { nome: 'Giardia', descricao: 'Proteção contra giardíase', precoFilhote: 70, precoAdulto: 70, idadeMinima: 8 } }),
      prisma.vacina.create({ data: { nome: 'Leishmaniose', descricao: 'Proteção contra leishmaniose', precoFilhote: 150, precoAdulto: 150, idadeMinima: 16 } })
    ]);

    console.log('🐕 Criando pets...');
    
    const rex = await prisma.pet.create({
      data: {
        nome: 'Rex',
        especie: 'Cão',
        raca: 'Labrador',
        idade: 3,
        donoId: user1.id,
        donoNome: 'João Silva',
        donoTelefone: '(83) 99999-1111'
      }
    });

    const mimi = await prisma.pet.create({
      data: {
        nome: 'Mimi',
        especie: 'Gato',
        raca: 'Siamês',
        idade: 2,
        donoId: user2.id,
        donoNome: 'Maria Santos',
        donoTelefone: '(83) 99999-2222'
      }
    });

    console.log('📅 Criando consultas...');
    
    await prisma.consulta.create({
      data: {
        petId: rex.id,
        petNome: 'Rex',
        donoNome: 'João Silva',
        donoTelefone: '(83) 99999-1111',
        veterinario: 'Dr. Carlos Mendes',
        motivo: 'Vacina anual V10',
        data: '2025-11-25',
        hora: '10:00'
      }
    });

    console.log('💉 Criando carteiras de vacinação...');
    
    await prisma.carteiraSaude.create({
      data: {
        petId: rex.id,
        vacinasAplicadas: {
          connect: [{ id: vacinas[0].id }, { id: vacinas[2].id }]
        },
        proximasVacinas: {
          connect: [{ id: vacinas[1].id }, { id: vacinas[3].id }]
        }
      }
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('\n🔑 Credenciais de teste:');
    console.log('   Email: joao@example.com');
    console.log('   Senha: senha123');
    
  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();