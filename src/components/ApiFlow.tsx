import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import ApiRequestNode from './nodes/ApiRequestNode';
import TransformNode from './nodes/TransformNode';
import ConditionNode from './nodes/ConditionNode';
import MergeNode from './nodes/MergeNode';
import OutputNode from './nodes/OutputNode';
import Sidebar from './Sidebar';
import flowTemplates, { FlowTemplate } from '../examples/flowTemplates';
import { useExecutionStore } from '../store';

let id = 0;
const getId = () => `node_${id++}`;

export default function ApiFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([] as Edge[]);
  const { resetResults } = useExecutionStore();

  const nodeTypes = {
    apiRequest: ApiRequestNode,
    transform: TransformNode,
    condition: ConditionNode,
    merge: MergeNode,
    output: OutputNode,
  };

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = (type: string) => {
    const newNode: Node = {
      id: getId(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {},
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveFlow = () => {
    localStorage.setItem('flow', JSON.stringify({ nodes, edges }));
  };

  const loadFlow = () => {
    const raw = localStorage.getItem('flow');
    if (!raw) return;
    try {
      const { nodes: n, edges: e } = JSON.parse(raw);
      setNodes(n || []);
      setEdges(e || []);
    } catch {}
  };

  const loadTemplate = (template: FlowTemplate) => {
    setNodes(template.nodes);
    setEdges(template.edges);
  };

  const executeFlow = async () => {
    resetResults();
    const { setResult, results } = useExecutionStore.getState();

    const incoming = (id: string) => edges.filter((e) => e.target === id);
    const outgoing = (id: string) => edges.filter((e) => e.source === id);

    const getInput = (id: string) => {
      const first = incoming(id)[0];
      return first ? results[first.source] : undefined;
    };

    const getInputs = (id: string) => incoming(id).map((e) => results[e.source]);

    const canRun = (id: string, executed: Set<string>) =>
      incoming(id).every((e) => executed.has(e.source));

    const nodesMap: Record<string, Node> = nodes.reduce(
      (acc, n) => ({ ...acc, [n.id]: n }),
      {}
    );
    const queue = nodes.filter((n) => incoming(n.id).length === 0);
    const executed = new Set<string>();

    while (queue.length) {
      const node = queue.shift()!;
      let output: any = undefined;
      const data = node.data as any;
      switch (node.type) {
        case 'apiRequest': {
          try {
            const headers = data.headers ? JSON.parse(data.headers) : undefined;
            const res = await fetch(data.url || '', {
              method: data.method || 'GET',
              headers,
              body: data.body && data.method !== 'GET' ? data.body : undefined,
            });
            let body: any = undefined;
            try {
              body = await res.json();
            } catch {}
            output = { status: res.status, data: body };
          } catch (e) {
            output = { error: String(e) };
          }
          break;
        }
        case 'transform': {
          try {
            const fn = new Function('data', data.code || 'return data');
            output = fn(getInput(node.id));
          } catch (e) {
            output = { error: String(e) };
          }
          break;
        }
        case 'condition': {
          try {
            const fn = new Function('data', `return ${data.expression || 'false'}`);
            output = !!fn(getInput(node.id));
          } catch {
            output = false;
          }
          break;
        }
        case 'merge': {
          const inputs = getInputs(node.id);
          output = Object.assign({}, ...inputs);
          break;
        }
        case 'output': {
          output = getInput(node.id);
          break;
        }
        default:
          break;
      }

      setResult(node.id, output);
      executed.add(node.id);

      outgoing(node.id).forEach((edge) => {
        if (node.type === 'condition') {
          if (output && edge.sourceHandle !== 'true') return;
          if (!output && edge.sourceHandle !== 'false') return;
        }
        const target = nodesMap[edge.target];
        if (target && canRun(target.id, executed)) {
          queue.push(target);
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <Sidebar
        onAdd={addNode}
        onRun={executeFlow}
        onSave={saveFlow}
        onLoad={loadFlow}
        templates={flowTemplates}
        onLoadTemplate={loadTemplate}
      />
      <div className="flex-1 h-full">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
