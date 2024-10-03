import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import { SimpleReporter } from '../simple-reporter';

describe('API Company', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api-desafio-qa.onrender.com';
  let empresaId = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Verificando endpoints usando o método POST', () => {
    it('Deve criar série de empresas', async () => {
      const response = await p
        .spec()
        .post(`${baseUrl}/company`)
        .withJson({
          name: faker.animal.cat(),
          cnpj: "17163385000100",
          state: "santa catarina",
          city: "criciuma",
          address: "Rua dos Bobos",
          sector: "mechanical"
        })
        .expectStatus(StatusCodes.CREATED);
      
      empresaId = response.body.id; // Salva o ID da empresa
      console.log(`ID da Empresa: ${empresaId}`);
    });

    describe('Verificando endpoint usando método GET', () => {
      it('cadastro da EMPRESA', async () => {
        const empresaNome = faker.animal.cat(); // Nome gerado para a empresa
        const cnpj = "17163385000100"; // CNPJ fixo
        const estado = "Santa Catarina"; // Estado fixo
        const cidade = "Criciúma"; // Cidade fixa
        const endereco = "Rua dos Bobos"; // Endereço fixo
        const setor = "mechanical"; // Setor fixo
    
        await p
          .spec()
          .post(`${baseUrl}/company`) // Endpoint para cadastro de empresa
          .withJson({
            name: empresaNome,
            cnpj: cnpj,
            state: estado,
            city: cidade,
            address: endereco,
            sector: setor
          })
          .expectStatus(StatusCodes.CREATED) // Status de criação
          .expectBodyContains(empresaNome) // Verifica se o nome da empresa está no corpo da resposta
          .returns('id'); // Retorna o ID da empresa cadastrada
      });
    });

    describe('Verificando endpoints usando o método POST e PUT', () => {
      let empresaId; // Variável para armazenar o ID da empresa
    
      it('Deve criar uma nova empresa', async () => {
        const response = await p
          .spec()
          .post(`${baseUrl}/company`)
          .withJson({
            name: faker.animal.cat(),
            cnpj: "17163385000100",
            state: "santa catarina",
            city: "criciuma",
            address: "Rua dos Bobos",
            sector: "mechanical"
          })
          .expectStatus(StatusCodes.CREATED);
        
        empresaId = response.body.id; // Salva o ID da empresa
        console.log(`ID da Empresa: ${empresaId}`);
      });
    
      it('Deve atualizar os detalhes da empresa', async () => {
        const response = await p
          .spec()
          .put(`${baseUrl}/company/${empresaId}`)
          .withJson({
            name: "Empresa Atualizada",
            cnpj: "17163385000100",
            state: "São Paulo",
            city: "São Paulo",
            address: "Avenida Paulista, 1234",
            sector: "technology"
          })
          .expectStatus(StatusCodes.OK);
    
        console.log(`Empresa ${empresaId} atualizada com sucesso.`);
      });   


    });

    describe('Verificando endpoints usando o método POST, PUT e GET', () => {
      let empresaId; // Variável para armazenar o ID da empresa
    
      it('Deve criar uma nova empresa', async () => {
        const response = await p
          .spec()
          .post(`${baseUrl}/company`)
          .withJson({
            name: faker.animal.cat(),
            cnpj: "17163385000100",
            state: "santa catarina",
            city: "criciuma",
            address: "Rua dos Bobos",
            sector: "mechanical"
          })
          .expectStatus(StatusCodes.CREATED);
        
        empresaId = response.body.id; // Salva o ID da empresa
        console.log(`ID da Empresa: ${empresaId}`);
      });
    
      it('Deve retornar os detalhes da empresa com base no ID', async () => {
        const response = await p
          .spec()
          .get(`${baseUrl}/company/${empresaId}`)
          .expectStatus(StatusCodes.OK);
    
        const { name, cnpj, state, city, address, sector } = response.body;
        console.log(`Detalhes da Empresa: 
          Nome: ${name}, 
          CNPJ: ${cnpj}, 
          Estado: ${state}, 
          Cidade: ${city}, 
          Endereço: ${address}, 
          Setor: ${sector}`);
      });

    });   

    describe('Verificando endpoints usando o método POST, GET, PUT e DELETE', () => {
      let empresaId; // Variável para armazenar o ID da empresa
    
      it('Deve criar uma nova empresa', async () => {
        const response = await p
          .spec()
          .post(`${baseUrl}/company`)
          .withJson({
            name: faker.animal.cat(),
            cnpj: "17163385000100",
            state: "santa catarina",
            city: "criciuma",
            address: "Rua dos Bobos",
            sector: "mechanical"
          })
          .expectStatus(StatusCodes.CREATED);
        
        empresaId = response.body.id; // Salva o ID da empresa
        console.log(`ID da Empresa: ${empresaId}`);
      });
    
      it('Deve remover a empresa com base no ID fornecido', async () => {
        const response = await p
          .spec()
          .delete(`${baseUrl}/company/${empresaId}`)
          .expectStatus(StatusCodes.NO_CONTENT); // Status 204 para remoção bem-sucedida
    
        console.log(`Empresa ${empresaId} removida com sucesso.`);
      });
    
      it('Deve retornar erro ao buscar a empresa removida', async () => {
        const response = await p
          .spec()
          .get(`${baseUrl}/company/${empresaId}`)
          .expectStatus(StatusCodes.NOT_FOUND); // Verifica se a empresa foi realmente removida
    
        console.log(`Empresa ${empresaId} não encontrada, pois foi removida.`);
      });
    });

    describe('Verificando endpoints usando o método POST, GET', () => {
      let empresaId; // Variável para armazenar o ID da empresa
    
      it('Deve criar uma nova empresa', async () => {
        const response = await p
          .spec()
          .post(`${baseUrl}/company`)
          .withJson({
            name: faker.animal.cat(),
            cnpj: "17163385000100",
            state: "santa catarina",
            city: "criciuma",
            address: "Rua dos Bobos",
            sector: "mechanical"
          })
          .expectStatus(StatusCodes.CREATED);
        
        empresaId = response.body.id; // Salva o ID da empresa
        console.log(`ID da Empresa: ${empresaId}`);
      });
    
      it('Deve recuperar todos os produtos associados a uma empresa', async () => {
        const response = await p
          .spec()
          .get(`${baseUrl}/company/${empresaId}/products`)
          .expectStatus(StatusCodes.OK);
    
        const products = response.body; // Supondo que a resposta seja uma lista de produtos
        products.forEach(product => {
          console.log(`Produto ID: ${product.productId}, Nome: ${product.productName}, Descrição: ${product.productDescription}, Preço: ${product.price}`);
        });
      });
    });

       


  });
});