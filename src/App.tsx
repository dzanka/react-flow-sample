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
  useUpdateNodeInternals,
} from 'reactflow'
import { PlaygroundNode } from './nodes'
import {
  ANIMATED_GRID_DEFAULT_CENTER_ID,
  AUTO_LAYOUT_DEFAULT_CENTER_ID,
  getAutoLayoutScenario,
  getAnimatedGridScenario,
  getGridScenario,
  getHexagonalScenario,
  getStaticScenario,
  GRID_DEFAULT_CENTER_ID,
  HEXAGONAL_DEFAULT_CENTER_ID,
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
  gridSelectedNodeId: string,
  animatedGridSelectedNodeId: string,
  hexagonalSelectedNodeId: string,
): PlaygroundScenario {
  if (scenarioId === 'auto-layout') {
    return getAutoLayoutScenario(tension, centerNodeId, animationVersion)
  }

  if (scenarioId === 'static') {
    return getStaticScenario(tension, staticSelectedNodeId)
  }

  if (scenarioId === 'grid') {
    return getGridScenario(tension, gridSelectedNodeId)
  }

  if (scenarioId === 'animated-grid') {
    return getAnimatedGridScenario(tension, animatedGridSelectedNodeId)
  }

  if (scenarioId === 'hexagonal') {
    return getHexagonalScenario(tension, hexagonalSelectedNodeId)
  }

  return scenarios[0]
}

type FlowCanvasProps = {
  scenario: PlaygroundScenario
  showEdges: boolean
  staticSelectedNodeId: string
  gridSelectedNodeId: string
  animatedGridSelectedNodeId: string
  hexagonalSelectedNodeId: string
  onNodeClick?: NodeMouseHandler
}

function NodeInternalsUpdater({
  nodeIds,
  refreshKey,
}: {
  nodeIds: string[]
  refreshKey: string
}) {
  const updateNodeInternals = useUpdateNodeInternals()

  useEffect(() => {
    if (nodeIds.length === 0) {
      return
    }

    nodeIds.forEach((nodeId) => {
      updateNodeInternals(nodeId)
    })
  }, [nodeIds, refreshKey, updateNodeInternals])

  return null
}

function FlowCanvas({
  scenario,
  showEdges,
  staticSelectedNodeId,
  gridSelectedNodeId,
  animatedGridSelectedNodeId,
  hexagonalSelectedNodeId,
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
    scenario.id === 'static'
      ? hoveredNodeId ?? staticSelectedNodeId
      : scenario.id === 'grid'
        ? hoveredNodeId ?? gridSelectedNodeId
        : scenario.id === 'animated-grid'
          ? hoveredNodeId ?? animatedGridSelectedNodeId
          : scenario.id === 'hexagonal'
            ? hoveredNodeId ?? hexagonalSelectedNodeId
        : null

  const staticSelectedTargetIds = useMemo(() => {
    if (
      scenario.id !== 'static' &&
      scenario.id !== 'grid' &&
      scenario.id !== 'animated-grid' &&
      scenario.id !== 'hexagonal'
    ) {
      return new Set<string>()
    }

    const selectedNodeId =
      scenario.id === 'static'
        ? staticSelectedNodeId
        : scenario.id === 'grid'
          ? gridSelectedNodeId
          : scenario.id === 'animated-grid'
            ? animatedGridSelectedNodeId
            : hexagonalSelectedNodeId

    return new Set(
      edges
        .filter((edge) => edge.source === selectedNodeId)
        .map((edge) => edge.target),
    )
  }, [
    animatedGridSelectedNodeId,
    edges,
    gridSelectedNodeId,
    hexagonalSelectedNodeId,
    scenario.id,
    staticSelectedNodeId,
  ])

  const hoverTargetIds = useMemo(() => {
    const sourceNodeId =
      scenario.id === 'static' ||
      scenario.id === 'animated-grid' ||
      scenario.id === 'hexagonal'
        ? activeStaticNodeId
        : hoveredNodeId

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
          (scenario.id === 'animated-grid' || scenario.id === 'hexagonal') &&
          hoveredNodeId &&
          node.id !== hoveredNodeId &&
          !hoverTargetIds.has(node.id)
            ? 'is-animated-grid-nonhover'
            : null,
          (scenario.id === 'static' ||
            scenario.id === 'grid' ||
            scenario.id === 'animated-grid' ||
            scenario.id === 'hexagonal') &&
          hoveredNodeId &&
          node.id ===
            (scenario.id === 'static'
              ? staticSelectedNodeId
              : scenario.id === 'grid'
                ? gridSelectedNodeId
                : scenario.id === 'animated-grid'
                  ? animatedGridSelectedNodeId
                  : hexagonalSelectedNodeId) &&
          node.id !== hoveredNodeId &&
          !hoverTargetIds.has(node.id)
            ? scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
              ? 'is-animated-grid-source-muted'
              : 'is-static-source-muted'
            : null,
          (scenario.id === 'static' ||
            scenario.id === 'grid' ||
            scenario.id === 'animated-grid' ||
            scenario.id === 'hexagonal') &&
          hoveredNodeId &&
          staticSelectedTargetIds.has(node.id) &&
          node.id !== hoveredNodeId &&
          !hoverTargetIds.has(node.id)
            ? scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
              ? 'is-animated-grid-target-muted'
              : 'is-static-target-muted'
            : null,
          node.id === hoveredNodeId
            ? scenario.id === 'static' || scenario.id === 'grid'
              ? 'is-static-source'
              : scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
                ? 'is-animated-grid-hover-source'
              : 'is-hover-source'
            : null,
          (
            (scenario.id === 'static' &&
              node.id === staticSelectedNodeId &&
              !hoveredNodeId) ||
            (scenario.id === 'grid' && node.id === gridSelectedNodeId && !hoveredNodeId) ||
            (scenario.id === 'animated-grid' &&
              node.id === animatedGridSelectedNodeId &&
              !hoveredNodeId) ||
            (scenario.id === 'hexagonal' &&
              node.id === hexagonalSelectedNodeId &&
              !hoveredNodeId)
          )
            ? scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
              ? 'is-animated-grid-source'
              : 'is-static-source'
            : null,
          hoverTargetIds.has(node.id)
            ? scenario.id === 'static' || scenario.id === 'grid'
              ? 'is-static-target'
              : scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
                ? hoveredNodeId
                  ? 'is-animated-grid-hover-target'
                  : 'is-animated-grid-target'
              : 'is-hover-target'
            : null,
          (scenario.id === 'static' ||
            scenario.id === 'grid' ||
            scenario.id === 'animated-grid' ||
            scenario.id === 'hexagonal') &&
          hoveredNodeId &&
          (
            node.id ===
              (scenario.id === 'static'
                ? staticSelectedNodeId
                : scenario.id === 'grid'
                  ? gridSelectedNodeId
                  : scenario.id === 'animated-grid'
                    ? animatedGridSelectedNodeId
                    : hexagonalSelectedNodeId) ||
            staticSelectedTargetIds.has(node.id)
          ) &&
          (node.id === hoveredNodeId || hoverTargetIds.has(node.id))
            ? scenario.id === 'animated-grid' || scenario.id === 'hexagonal'
              ? 'is-animated-grid-overlap-large'
              : 'is-static-overlap-large'
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
      gridSelectedNodeId,
      animatedGridSelectedNodeId,
      hexagonalSelectedNodeId,
      staticSelectedNodeId,
      staticSelectedTargetIds,
    ],
  )
  const edgeAlignedNodeIds = useMemo(
    () =>
      Array.from(
        new Set(
          visibleEdges
            .filter((edge) => !edge.hidden)
            .flatMap((edge) => [edge.source, edge.target]),
        ),
      ),
    [visibleEdges],
  )
  const edgeAlignmentRefreshKey = useMemo(
    () =>
      edgeAlignedNodeIds
        .map((nodeId) => {
          const node = visibleNodes.find((candidate) => candidate.id === nodeId)
          return node
            ? `${node.id}:${node.className ?? ''}:${node.position.x}:${node.position.y}`
            : nodeId
        })
        .join('|'),
    [edgeAlignedNodeIds, visibleNodes],
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
      <NodeInternalsUpdater
        nodeIds={edgeAlignedNodeIds}
        refreshKey={edgeAlignmentRefreshKey}
      />
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
  const [gridSelectedNodeId, setGridSelectedNodeId] = useState(GRID_DEFAULT_CENTER_ID)
  const [animatedGridSelectedNodeId, setAnimatedGridSelectedNodeId] = useState(
    ANIMATED_GRID_DEFAULT_CENTER_ID,
  )
  const [hexagonalSelectedNodeId, setHexagonalSelectedNodeId] = useState(
    HEXAGONAL_DEFAULT_CENTER_ID,
  )
  const selectedScenario = useMemo(
    () =>
      getScenarioForState(
        scenarioId,
        tension,
        centerNodeId,
        animationVersion,
        staticSelectedNodeId,
        gridSelectedNodeId,
        animatedGridSelectedNodeId,
        hexagonalSelectedNodeId,
      ),
    [
      scenarioId,
      tension,
      centerNodeId,
      animationVersion,
      staticSelectedNodeId,
      gridSelectedNodeId,
      animatedGridSelectedNodeId,
      hexagonalSelectedNodeId,
    ],
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

    if (nextScenarioId === 'grid') {
      setGridSelectedNodeId(GRID_DEFAULT_CENTER_ID)
    }

    if (nextScenarioId === 'animated-grid') {
      setAnimatedGridSelectedNodeId(ANIMATED_GRID_DEFAULT_CENTER_ID)
    }

    if (nextScenarioId === 'hexagonal') {
      setHexagonalSelectedNodeId(HEXAGONAL_DEFAULT_CENTER_ID)
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

  const handleGridNodeClick: NodeMouseHandler = (_, node) => {
    if (scenarioId !== 'grid') {
      return
    }

    setGridSelectedNodeId(node.id)
  }

  const handleAnimatedGridNodeClick: NodeMouseHandler = (_, node) => {
    if (scenarioId !== 'animated-grid') {
      return
    }

    setAnimatedGridSelectedNodeId(node.id)
  }

  const handleHexagonalNodeClick: NodeMouseHandler = (_, node) => {
    if (scenarioId !== 'hexagonal') {
      return
    }

    setHexagonalSelectedNodeId(node.id)
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
        {scenarioId === 'auto-layout' ||
        scenarioId === 'static' ||
        scenarioId === 'grid' ||
        scenarioId === 'animated-grid' ||
        scenarioId === 'hexagonal' ? (
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
          key={scenarioId}
          scenario={selectedScenario}
          showEdges={showEdges}
          staticSelectedNodeId={staticSelectedNodeId}
          gridSelectedNodeId={gridSelectedNodeId}
          animatedGridSelectedNodeId={animatedGridSelectedNodeId}
          hexagonalSelectedNodeId={hexagonalSelectedNodeId}
          onNodeClick={
            scenarioId === 'auto-layout'
              ? handleAutoLayoutNodeClick
              : scenarioId === 'static'
                ? handleStaticNodeClick
                : scenarioId === 'grid'
                  ? handleGridNodeClick
                  : scenarioId === 'animated-grid'
                    ? handleAnimatedGridNodeClick
                    : scenarioId === 'hexagonal'
                      ? handleHexagonalNodeClick
              : undefined
          }
        />
      </section>
    </main>
  )
}

export default App
