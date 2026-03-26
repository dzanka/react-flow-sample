import { useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type NodeMouseHandler,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { PlaygroundNode } from './nodes'
import {
  AUTO_LAYOUT_DEFAULT_CENTER_ID,
  getAutoLayoutScenario,
  getStaticScenario,
  scenarios,
  STATIC_DEFAULT_CENTER_ID,
  type PlaygroundScenario,
  type ScenarioId,
} from './scenarios'
import './App.css'

const nodeTypes = {
  playground: PlaygroundNode,
}

function cloneNodes(nodes: Node[]) {
  return nodes.map((node) => ({
    ...node,
    data: { ...node.data },
  }))
}

function cloneEdges(edges: Edge[]) {
  return edges.map((edge) => ({ ...edge }))
}

function getScenarioForState(
  scenarioId: ScenarioId,
  tension: number,
  centerNodeId: string,
  animationVersion: number,
  staticSelectedNodeId: string,
): PlaygroundScenario {
  if (scenarioId === 'auto-layout') {
    return getAutoLayoutScenario(tension, centerNodeId, animationVersion)
  }

  if (scenarioId === 'static') {
    return getStaticScenario(tension, staticSelectedNodeId)
  }

  return scenarios[0]
}

type FlowCanvasProps = {
  scenario: PlaygroundScenario
  showEdges: boolean
  staticSelectedNodeId: string
  onNodeClick?: NodeMouseHandler
}

function FlowCanvas({
  scenario,
  showEdges,
  staticSelectedNodeId,
  onNodeClick,
}: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(cloneNodes(scenario.nodes))
  const [edges, setEdges, onEdgesChange] = useEdgesState(cloneEdges(scenario.edges))
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  useEffect(() => {
    setNodes(cloneNodes(scenario.nodes))
    setEdges(cloneEdges(scenario.edges))
    setHoveredNodeId(null)
  }, [scenario, setEdges, setNodes])

  const handleConnect = (connection: Connection) => {
    setEdges((currentEdges) =>
      addEdge(
        {
          ...connection,
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 16,
            height: 16,
            color: '#6f7670',
          },
          style: {
            stroke: '#6f7670',
            strokeWidth: 1.5,
            strokeDasharray: '4 6',
          },
        },
        currentEdges,
      ),
    )
  }

  const visibleEdges = useMemo(() => {
    if (showEdges) {
      return edges
    }

    if (!hoveredNodeId) {
      return []
    }

    return edges.map((edge) =>
      edge.source === hoveredNodeId
        ? {
            ...edge,
            animated: true,
            style: {
              ...edge.style,
              strokeWidth: 2,
            },
          }
        : {
            ...edge,
            hidden: true,
          },
    )
  }, [edges, hoveredNodeId, showEdges])

  const activeStaticNodeId =
    scenario.id === 'static' ? hoveredNodeId ?? staticSelectedNodeId : null

  const staticSelectedTargetIds = useMemo(() => {
    if (scenario.id !== 'static') {
      return new Set<string>()
    }

    return new Set(
      edges
        .filter((edge) => edge.source === staticSelectedNodeId)
        .map((edge) => edge.target),
    )
  }, [edges, scenario.id, staticSelectedNodeId])

  const hoverTargetIds = useMemo(() => {
    const sourceNodeId = scenario.id === 'static' ? activeStaticNodeId : hoveredNodeId

    if (!sourceNodeId) {
      return new Set<string>()
    }

    return new Set(
      edges.filter((edge) => edge.source === sourceNodeId).map((edge) => edge.target),
    )
  }, [activeStaticNodeId, edges, hoveredNodeId, scenario.id])

  const visibleNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        className: [
          node.className,
          scenario.id === 'static' &&
          hoveredNodeId &&
          node.id === staticSelectedNodeId &&
          node.id !== hoveredNodeId &&
          !hoverTargetIds.has(node.id)
            ? 'is-static-source-muted'
            : null,
          scenario.id === 'static' &&
          hoveredNodeId &&
          staticSelectedTargetIds.has(node.id) &&
          node.id !== hoveredNodeId &&
          !hoverTargetIds.has(node.id)
            ? 'is-static-target-muted'
            : null,
          node.id === hoveredNodeId
            ? scenario.id === 'static'
              ? 'is-static-source'
              : 'is-hover-source'
            : null,
          node.id === staticSelectedNodeId && !hoveredNodeId && scenario.id === 'static'
            ? 'is-static-source'
            : null,
          hoverTargetIds.has(node.id)
            ? scenario.id === 'static'
              ? 'is-static-target'
              : 'is-hover-target'
            : null,
          scenario.id === 'static' &&
          hoveredNodeId &&
          (node.id === staticSelectedNodeId || staticSelectedTargetIds.has(node.id)) &&
          (node.id === hoveredNodeId || hoverTargetIds.has(node.id))
            ? 'is-static-overlap-large'
            : null,
        ]
          .filter(Boolean)
          .join(' '),
      })),
    [
      hoverTargetIds,
      hoveredNodeId,
      nodes,
      scenario.id,
      staticSelectedNodeId,
      staticSelectedTargetIds,
    ],
  )

  const handleNodeMouseEnter: NodeMouseHandler = (_, node) => {
    setHoveredNodeId(node.id)
  }

  const handleNodeMouseLeave: NodeMouseHandler = () => {
    setHoveredNodeId(null)
  }

  return (
    <ReactFlow
      nodes={visibleNodes}
      edges={visibleEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={handleConnect}
      onNodeClick={onNodeClick}
      onNodeMouseEnter={handleNodeMouseEnter}
      onNodeMouseLeave={handleNodeMouseLeave}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      deleteKeyCode={['Backspace', 'Delete']}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={24}
        size={1}
        color="rgba(78, 88, 79, 0.18)"
      />
      <Controls showInteractive={false} />
    </ReactFlow>
  )
}

function App() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>(scenarios[0].id)
  const [tension, setTension] = useState(0)
  const [centerNodeId, setCenterNodeId] = useState(AUTO_LAYOUT_DEFAULT_CENTER_ID)
  const [animationVersion, setAnimationVersion] = useState(0)
  const [showEdges, setShowEdges] = useState(false)
  const [staticSelectedNodeId, setStaticSelectedNodeId] = useState(STATIC_DEFAULT_CENTER_ID)
  const selectedScenario = useMemo(
    () =>
      getScenarioForState(
        scenarioId,
        tension,
        centerNodeId,
        animationVersion,
        staticSelectedNodeId,
      ),
    [scenarioId, tension, centerNodeId, animationVersion, staticSelectedNodeId],
  )

  const handleScenarioChange = (nextScenarioId: ScenarioId) => {
    setScenarioId(nextScenarioId)

    if (nextScenarioId === 'auto-layout') {
      setCenterNodeId(AUTO_LAYOUT_DEFAULT_CENTER_ID)
      setAnimationVersion(0)
    }

    if (nextScenarioId === 'static') {
      setStaticSelectedNodeId(STATIC_DEFAULT_CENTER_ID)
    }
  }

  const handleAutoLayoutNodeClick: NodeMouseHandler = (_, node) => {
    if (scenarioId !== 'auto-layout') {
      return
    }

    setAnimationVersion((version) => version + 1)
    setCenterNodeId(node.id)
  }

  const handleStaticNodeClick: NodeMouseHandler = (_, node) => {
    if (scenarioId !== 'static') {
      return
    }

    setStaticSelectedNodeId(node.id)
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">React Flow Playground</p>
          <h1>{selectedScenario.label}</h1>
          <p className="scenario-description">{selectedScenario.description}</p>
        </div>

        <div className="scenario-switch" role="tablist" aria-label="Scenarios">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={scenario.id === scenarioId ? 'is-active' : undefined}
              onClick={() => handleScenarioChange(scenario.id)}
            >
              {scenario.shortLabel}
            </button>
          ))}
        </div>
      </header>

      <section className="layout-controls">
        {scenarioId === 'auto-layout' || scenarioId === 'static' ? (
          <label className="tension-control" htmlFor="layout-tension">
            <span>Tension</span>
            <input
              id="layout-tension"
              type="range"
              min="-100"
              max="100"
              value={Math.round(tension * 100)}
              onChange={(event) => setTension(Number(event.target.value) / 100)}
            />
            <strong>{tension > 0 ? '+' : ''}{Math.round(tension * 100)}%</strong>
          </label>
        ) : null}

        <label className="edge-toggle" htmlFor="show-edges">
          <span>Edges</span>
          <button
            id="show-edges"
            type="button"
            role="switch"
            aria-checked={showEdges}
            className={showEdges ? 'is-active' : undefined}
            onClick={() => setShowEdges((value) => !value)}
          >
            <span className="edge-toggle__track">
              <span className="edge-toggle__thumb" />
            </span>
            <strong>{showEdges ? 'Shown' : 'Hidden'}</strong>
          </button>
        </label>
      </section>

      <section className="canvas-shell">
        <FlowCanvas
          scenario={selectedScenario}
          showEdges={showEdges}
          staticSelectedNodeId={staticSelectedNodeId}
          onNodeClick={
            scenarioId === 'auto-layout'
              ? handleAutoLayoutNodeClick
              : scenarioId === 'static'
                ? handleStaticNodeClick
              : undefined
          }
        />
      </section>
    </main>
  )
}

export default App
