import { Node, Edge } from '@xyflow/react';

export interface FlowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
}

export const flowTemplates: FlowTemplate[] = [
  {
    id: 'fetch-users',
    name: 'Buscar usuários',
    description: 'Faz uma requisição GET e exibe o resultado',
    nodes: [
      {
        id: 'req1',
        type: 'apiRequest',
        position: { x: 0, y: 0 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users',
        },
      },
      { id: 'out1', type: 'output', position: { x: 250, y: 0 }, data: {} },
    ],
    edges: [{ id: 'e1-2', source: 'req1', target: 'out1' }],
  },
  {
    id: 'transform-users',
    name: 'Transformar usuários',
    description: 'Busca usuários e extrai apenas id, name e email',
    nodes: [
      {
        id: 'req1',
        type: 'apiRequest',
        position: { x: 0, y: 0 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users',
        },
      },
      {
        id: 'trans1',
        type: 'transform',
        position: { x: 250, y: 0 },
        data: {
          code: 'return data.map(u => ({ id: u.id, name: u.name, email: u.email }));',
        },
      },
      { id: 'out1', type: 'output', position: { x: 500, y: 0 }, data: {} },
    ],
    edges: [
      { id: 'e1-2', source: 'req1', target: 'trans1' },
      { id: 'e2-3', source: 'trans1', target: 'out1' },
    ],
  },
  {
    id: 'check-status',
    name: 'Condição de status',
    description: 'Chama uma API e verifica se status === 200',
    nodes: [
      {
        id: 'req1',
        type: 'apiRequest',
        position: { x: 0, y: 0 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts/1',
        },
      },
      {
        id: 'cond1',
        type: 'condition',
        position: { x: 250, y: 0 },
        data: {
          expression: 'data.status === 200',
        },
      },
      { id: 'ok', type: 'output', position: { x: 500, y: -50 }, data: {} },
      { id: 'err', type: 'output', position: { x: 500, y: 50 }, data: {} },
    ],
    edges: [
      { id: 'e1-2', source: 'req1', target: 'cond1' },
      { id: 'e2-3', source: 'cond1', target: 'ok', sourceHandle: 'true' },
      { id: 'e2-4', source: 'cond1', target: 'err', sourceHandle: 'false' },
    ],
  },
  {
    id: 'merge-apis',
    name: 'Merge de duas APIs',
    description: 'Combina usuários e posts em um único objeto',
    nodes: [
      {
        id: 'users',
        type: 'apiRequest',
        position: { x: 0, y: -50 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users',
        },
      },
      {
        id: 'posts',
        type: 'apiRequest',
        position: { x: 0, y: 50 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts',
        },
      },
      { id: 'merge1', type: 'merge', position: { x: 250, y: 0 }, data: {} },
      { id: 'out1', type: 'output', position: { x: 500, y: 0 }, data: {} },
    ],
    edges: [
      { id: 'e1-m', source: 'users', target: 'merge1' },
      { id: 'e2-m', source: 'posts', target: 'merge1' },
      { id: 'm-out', source: 'merge1', target: 'out1' },
    ],
  },
  {
    id: 'invalid-flow',
    name: 'Fluxo inválido',
    description: 'Contém um erro de transformação para testes',
    nodes: [
      {
        id: 'req1',
        type: 'apiRequest',
        position: { x: 0, y: 0 },
        data: {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/users',
        },
      },
      {
        id: 'trans1',
        type: 'transform',
        position: { x: 250, y: 0 },
        data: {
          code: 'return data.map(u => u.id',
        },
      },
      { id: 'out1', type: 'output', position: { x: 500, y: 0 }, data: {} },
    ],
    edges: [
      { id: 'e1-2', source: 'req1', target: 'trans1' },
      { id: 'e2-3', source: 'trans1', target: 'out1' },
    ],
  },
];

export default flowTemplates;
