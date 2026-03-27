import { MarkerType, type Edge, type Node } from 'reactflow'

type PlaygroundData = {
  label: string
  tone?: 'center' | 'inner' | 'outer'
}

export type ScenarioId =
  | 'auto-layout'
  | 'static'
  | 'grid'
  | 'animated-grid'
  | 'hexagonal'

export type PlaygroundScenario = {
  id: ScenarioId
  shortLabel: string
  label: string
  description: string
  nodes: Node<PlaygroundData>[]
  edges: Edge[]
}

export const AUTO_LAYOUT_DEFAULT_CENTER_ID = 'a1'
export const STATIC_DEFAULT_CENTER_ID = 's1'
export const GRID_DEFAULT_CENTER_ID = 'g1'
export const ANIMATED_GRID_DEFAULT_CENTER_ID = 'ag1'
export const HEXAGONAL_DEFAULT_CENTER_ID = 'h1'

const dottedEdge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
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
})

const staticNodes: Node<PlaygroundData>[] = [
  { id: 's1', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Start', tone: 'center' } },
  { id: 's2', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source A', tone: 'inner' } },
  { id: 's3', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source B', tone: 'inner' } },
  { id: 's4', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source C', tone: 'inner' } },
  { id: 's5', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Parse', tone: 'outer' } },
  { id: 's6', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Validate', tone: 'outer' } },
  { id: 's7', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Transform', tone: 'outer' } },
  { id: 's8', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Review', tone: 'outer' } },
  { id: 's9', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Queue', tone: 'outer' } },
  { id: 's10', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Decide', tone: 'outer' } },
  { id: 's11', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Revise', tone: 'outer' } },
  { id: 's12', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Approve', tone: 'outer' } },
  { id: 's13', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Reject', tone: 'outer' } },
  { id: 's14', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Archive', tone: 'outer' } },
  { id: 's15', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Notify', tone: 'outer' } },
]

const staticEdges: Edge[] = [
  dottedEdge('se-1', 's1', 's2'),
  dottedEdge('se-2', 's1', 's3'),
  dottedEdge('se-3', 's1', 's4'),
  dottedEdge('se-4', 's2', 's5'),
  dottedEdge('se-5', 's3', 's6'),
  dottedEdge('se-6', 's4', 's8'),
  dottedEdge('se-7', 's2', 's7'),
  dottedEdge('se-8', 's5', 's9'),
  dottedEdge('se-9', 's6', 's10'),
  dottedEdge('se-10', 's7', 's10'),
  dottedEdge('se-11', 's8', 's11'),
  dottedEdge('se-12', 's9', 's12'),
  dottedEdge('se-13', 's10', 's12'),
  dottedEdge('se-14', 's10', 's13'),
  dottedEdge('se-15', 's11', 's14'),
  dottedEdge('se-16', 's12', 's15'),
  dottedEdge('se-17', 's13', 's15'),
  dottedEdge('se-18', 's14', 's15'),
  dottedEdge('se-19', 's11', 's6'),
  dottedEdge('se-20', 's13', 's8'),
  dottedEdge('se-21', 's9', 's7'),
  dottedEdge('se-22', 's14', 's10'),
]

const gridNodes: Node<PlaygroundData>[] = [
  { id: 'g1', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Start', tone: 'center' } },
  { id: 'g2', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source A', tone: 'inner' } },
  { id: 'g3', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source B', tone: 'inner' } },
  { id: 'g4', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source C', tone: 'inner' } },
  { id: 'g5', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Parse', tone: 'outer' } },
  { id: 'g6', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Validate', tone: 'outer' } },
  { id: 'g7', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Transform', tone: 'outer' } },
  { id: 'g8', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Review', tone: 'outer' } },
  { id: 'g9', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Queue', tone: 'outer' } },
  { id: 'g10', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Decide', tone: 'outer' } },
  { id: 'g11', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Revise', tone: 'outer' } },
  { id: 'g12', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Approve', tone: 'outer' } },
  { id: 'g13', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Reject', tone: 'outer' } },
  { id: 'g14', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Archive', tone: 'outer' } },
  { id: 'g15', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Notify', tone: 'outer' } },
]

const gridEdges: Edge[] = [
  dottedEdge('ge-1', 'g1', 'g2'),
  dottedEdge('ge-2', 'g1', 'g3'),
  dottedEdge('ge-3', 'g1', 'g4'),
  dottedEdge('ge-4', 'g2', 'g5'),
  dottedEdge('ge-5', 'g3', 'g6'),
  dottedEdge('ge-6', 'g4', 'g8'),
  dottedEdge('ge-7', 'g2', 'g7'),
  dottedEdge('ge-8', 'g5', 'g9'),
  dottedEdge('ge-9', 'g6', 'g10'),
  dottedEdge('ge-10', 'g7', 'g10'),
  dottedEdge('ge-11', 'g8', 'g11'),
  dottedEdge('ge-12', 'g9', 'g12'),
  dottedEdge('ge-13', 'g10', 'g12'),
  dottedEdge('ge-14', 'g10', 'g13'),
  dottedEdge('ge-15', 'g11', 'g14'),
  dottedEdge('ge-16', 'g12', 'g15'),
  dottedEdge('ge-17', 'g13', 'g15'),
  dottedEdge('ge-18', 'g14', 'g15'),
  dottedEdge('ge-19', 'g11', 'g6'),
  dottedEdge('ge-20', 'g13', 'g8'),
  dottedEdge('ge-21', 'g9', 'g7'),
  dottedEdge('ge-22', 'g14', 'g10'),
]

const animatedGridNodes: Node<PlaygroundData>[] = [
  { id: 'ag1', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Start', tone: 'center' } },
  { id: 'ag2', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source A', tone: 'inner' } },
  { id: 'ag3', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source B', tone: 'inner' } },
  { id: 'ag4', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source C', tone: 'inner' } },
  { id: 'ag5', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Parse', tone: 'outer' } },
  { id: 'ag6', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Validate', tone: 'outer' } },
  { id: 'ag7', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Transform', tone: 'outer' } },
  { id: 'ag8', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Review', tone: 'outer' } },
  { id: 'ag9', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Queue', tone: 'outer' } },
  { id: 'ag10', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Decide', tone: 'outer' } },
  { id: 'ag11', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Revise', tone: 'outer' } },
  { id: 'ag12', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Approve', tone: 'outer' } },
  { id: 'ag13', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Reject', tone: 'outer' } },
  { id: 'ag14', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Archive', tone: 'outer' } },
  { id: 'ag15', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Notify', tone: 'outer' } },
]

const animatedGridEdges: Edge[] = [
  dottedEdge('age-1', 'ag1', 'ag2'),
  dottedEdge('age-2', 'ag1', 'ag3'),
  dottedEdge('age-3', 'ag1', 'ag4'),
  dottedEdge('age-4', 'ag2', 'ag5'),
  dottedEdge('age-5', 'ag3', 'ag6'),
  dottedEdge('age-6', 'ag4', 'ag8'),
  dottedEdge('age-7', 'ag2', 'ag7'),
  dottedEdge('age-8', 'ag5', 'ag9'),
  dottedEdge('age-9', 'ag6', 'ag10'),
  dottedEdge('age-10', 'ag7', 'ag10'),
  dottedEdge('age-11', 'ag8', 'ag11'),
  dottedEdge('age-12', 'ag9', 'ag12'),
  dottedEdge('age-13', 'ag10', 'ag12'),
  dottedEdge('age-14', 'ag10', 'ag13'),
  dottedEdge('age-15', 'ag11', 'ag14'),
  dottedEdge('age-16', 'ag12', 'ag15'),
  dottedEdge('age-17', 'ag13', 'ag15'),
  dottedEdge('age-18', 'ag14', 'ag15'),
  dottedEdge('age-19', 'ag11', 'ag6'),
  dottedEdge('age-20', 'ag13', 'ag8'),
  dottedEdge('age-21', 'ag9', 'ag7'),
  dottedEdge('age-22', 'ag14', 'ag10'),
]

const hexagonalNodes: Node<PlaygroundData>[] = [
  { id: 'h1', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Start', tone: 'center' } },
  { id: 'h2', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source A', tone: 'inner' } },
  { id: 'h3', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source B', tone: 'inner' } },
  { id: 'h4', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Source C', tone: 'inner' } },
  { id: 'h5', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Parse', tone: 'outer' } },
  { id: 'h6', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Validate', tone: 'outer' } },
  { id: 'h7', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Transform', tone: 'outer' } },
  { id: 'h8', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Review', tone: 'outer' } },
  { id: 'h9', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Queue', tone: 'outer' } },
  { id: 'h10', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Decide', tone: 'outer' } },
  { id: 'h11', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Revise', tone: 'outer' } },
  { id: 'h12', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Approve', tone: 'outer' } },
  { id: 'h13', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Reject', tone: 'outer' } },
  { id: 'h14', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Archive', tone: 'outer' } },
  { id: 'h15', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Notify', tone: 'outer' } },
]

const hexagonalEdges: Edge[] = [
  dottedEdge('he-1', 'h1', 'h2'),
  dottedEdge('he-2', 'h1', 'h3'),
  dottedEdge('he-3', 'h1', 'h4'),
  dottedEdge('he-4', 'h2', 'h5'),
  dottedEdge('he-5', 'h3', 'h6'),
  dottedEdge('he-6', 'h4', 'h8'),
  dottedEdge('he-7', 'h2', 'h7'),
  dottedEdge('he-8', 'h5', 'h9'),
  dottedEdge('he-9', 'h6', 'h10'),
  dottedEdge('he-10', 'h7', 'h10'),
  dottedEdge('he-11', 'h8', 'h11'),
  dottedEdge('he-12', 'h9', 'h12'),
  dottedEdge('he-13', 'h10', 'h12'),
  dottedEdge('he-14', 'h10', 'h13'),
  dottedEdge('he-15', 'h11', 'h14'),
  dottedEdge('he-16', 'h12', 'h15'),
  dottedEdge('he-17', 'h13', 'h15'),
  dottedEdge('he-18', 'h14', 'h15'),
  dottedEdge('he-19', 'h11', 'h6'),
  dottedEdge('he-20', 'h13', 'h8'),
  dottedEdge('he-21', 'h9', 'h7'),
  dottedEdge('he-22', 'h14', 'h10'),
]

const autoLayoutBaseNodes: Node<PlaygroundData>[] = [
  { id: 'a1', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Intake', tone: 'center' } },
  { id: 'a2', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Profile', tone: 'inner' } },
  { id: 'a3', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Rules', tone: 'inner' } },
  { id: 'a4', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Context', tone: 'inner' } },
  { id: 'a5', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Normalize', tone: 'outer' } },
  { id: 'a6', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Rank', tone: 'outer' } },
  { id: 'a7', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Merge', tone: 'outer' } },
  { id: 'a8', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Check', tone: 'outer' } },
  { id: 'a9', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Plan', tone: 'outer' } },
  { id: 'a10', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Draft', tone: 'outer' } },
  { id: 'a11', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Review', tone: 'outer' } },
  { id: 'a12', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Retry', tone: 'outer' } },
  { id: 'a13', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Approve', tone: 'outer' } },
  { id: 'a14', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Publish', tone: 'outer' } },
  { id: 'a15', type: 'playground', position: { x: 0, y: 0 }, data: { label: 'Report', tone: 'outer' } },
]

const autoLayoutEdges: Edge[] = [
  dottedEdge('ae-1', 'a1', 'a2'),
  dottedEdge('ae-2', 'a1', 'a3'),
  dottedEdge('ae-3', 'a1', 'a4'),
  dottedEdge('ae-4', 'a2', 'a5'),
  dottedEdge('ae-5', 'a3', 'a5'),
  dottedEdge('ae-6', 'a4', 'a6'),
  dottedEdge('ae-7', 'a5', 'a7'),
  dottedEdge('ae-8', 'a6', 'a7'),
  dottedEdge('ae-9', 'a7', 'a8'),
  dottedEdge('ae-10', 'a7', 'a9'),
  dottedEdge('ae-11', 'a8', 'a10'),
  dottedEdge('ae-12', 'a9', 'a10'),
  dottedEdge('ae-13', 'a10', 'a11'),
  dottedEdge('ae-14', 'a11', 'a13'),
  dottedEdge('ae-15', 'a11', 'a12'),
  dottedEdge('ae-16', 'a12', 'a9'),
  dottedEdge('ae-17', 'a13', 'a14'),
  dottedEdge('ae-18', 'a14', 'a15'),
  dottedEdge('ae-19', 'a6', 'a8'),
  dottedEdge('ae-20', 'a5', 'a9'),
  dottedEdge('ae-21', 'a3', 'a6'),
  dottedEdge('ae-22', 'a13', 'a10'),
]

const AUTO_LAYOUT_NODE_WIDTH = 160
const AUTO_LAYOUT_NODE_HEIGHT = 52

function placeOnCircle(
  nodes: Node<PlaygroundData>[],
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
) {
  if (nodes.length === 0) {
    return []
  }

  return nodes.map((node, index) => {
    const angle = startAngle + (Math.PI * 2 * index) / nodes.length

    return {
      ...node,
      position: {
        x:
          centerX + Math.cos(angle) * radius - AUTO_LAYOUT_NODE_WIDTH / 2,
        y:
          centerY + Math.sin(angle) * radius - AUTO_LAYOUT_NODE_HEIGHT / 2,
      },
    }
  })
}

function buildConcentricLayout(
  nodes: Node<PlaygroundData>[],
  edges: Edge[],
  centerNodeId: string,
  tension: number,
  animationVersion = 0,
) {
  const clampedTension = Math.min(1, Math.max(-1, tension))
  const centerNode = nodes.find((node) => node.id === centerNodeId) ?? nodes[0]
  const innerNeighborIds = new Set(
    edges.filter((edge) => edge.source === centerNode.id).map((edge) => edge.target),
  )

  const centerX = 720
  const centerY = 420
  const innerRadius = 220 + clampedTension * 140
  const outerRadius = innerRadius + 230 + clampedTension * 180
  const reshuffleClass =
    animationVersion > 0 ? `is-reshuffling-${animationVersion % 2}` : undefined

  const innerRingNodes = nodes.filter((node) => innerNeighborIds.has(node.id))
  const outerRingNodes = nodes.filter(
    (node) => node.id !== centerNode.id && !innerNeighborIds.has(node.id),
  )

  return [
    {
      ...centerNode,
      className: reshuffleClass,
      data: {
        ...centerNode.data,
        tone: 'center' as const,
      },
      position: {
        x: centerX - AUTO_LAYOUT_NODE_WIDTH / 2,
        y: centerY - AUTO_LAYOUT_NODE_HEIGHT / 2,
      },
    },
    ...placeOnCircle(
      innerRingNodes.map((node) => ({
        ...node,
        className: reshuffleClass,
        data: {
          ...node.data,
          tone: 'inner' as const,
        },
      })),
      centerX,
      centerY,
      innerRadius,
      -Math.PI / 2,
    ),
    ...placeOnCircle(
      outerRingNodes.map((node) => ({
        ...node,
        className: reshuffleClass,
        data: {
          ...node.data,
          tone: 'outer' as const,
        },
      })),
      centerX,
      centerY,
      outerRadius,
      -Math.PI / 2 + Math.PI / outerRingNodes.length,
    ),
  ]
}

function buildGridLayout(
  nodes: Node<PlaygroundData>[],
  topNodeId: string,
  tension: number,
  expanded = false,
) {
  const clampedTension = Math.min(1, Math.max(-1, tension))
  const topNode = nodes.find((node) => node.id === topNodeId) ?? nodes[0]
  const remainderNodes = nodes.filter((node) => node.id !== topNode.id)
  const centerX = 720
  const topY = 140
  const columnGap = expanded ? 330 + clampedTension * 90 : 220 + clampedTension * 70
  const rowGap = expanded ? 250 + clampedTension * 70 : 145 + clampedTension * 45
  const columns = 4

  return [
    {
      ...topNode,
      className: expanded ? 'is-animated-grid-row-0' : undefined,
      position: {
        x: centerX - AUTO_LAYOUT_NODE_WIDTH / 2,
        y: topY,
      },
    },
    ...remainderNodes.map((node, index) => {
      const row = Math.floor(index / columns)
      const column = index % columns
      const rowWidth = Math.min(columns, remainderNodes.length - row * columns)
      const rowOffset = ((rowWidth - 1) * columnGap) / 2

      return {
        ...node,
        className: expanded ? `is-animated-grid-row-${row + 1}` : undefined,
        position: {
          x:
            centerX - rowOffset + column * columnGap - AUTO_LAYOUT_NODE_WIDTH / 2,
          y: topY + 180 + row * rowGap,
        },
      }
    }),
  ]
}

function buildHexagonalLayout(
  nodes: Node<PlaygroundData>[],
  topNodeId: string,
  tension: number,
  expanded = false,
) {
  const clampedTension = Math.min(1, Math.max(-1, tension))
  const topNode = nodes.find((node) => node.id === topNodeId) ?? nodes[0]
  const remainderNodes = nodes.filter((node) => node.id !== topNode.id)
  const centerX = 720
  const topY = 140
  const columnGap = expanded ? 290 + clampedTension * 90 : 210 + clampedTension * 60
  const rowGap = expanded ? 200 + clampedTension * 60 : 135 + clampedTension * 40
  const columns = 4

  return [
    {
      ...topNode,
      className: expanded ? 'is-animated-grid-row-0' : undefined,
      position: {
        x: centerX - AUTO_LAYOUT_NODE_WIDTH / 2,
        y: topY,
      },
    },
    ...remainderNodes.map((node, index) => {
      const row = Math.floor(index / columns)
      const column = index % columns
      const rowWidth = Math.min(columns, remainderNodes.length - row * columns)
      const rowOffset = ((rowWidth - 1) * columnGap) / 2
      const staggerOffset = row % 2 === 0 ? 0 : columnGap / 2

      return {
        ...node,
        className: expanded ? `is-animated-grid-row-${row + 1}` : undefined,
        position: {
          x:
            centerX -
            rowOffset +
            column * columnGap +
            staggerOffset -
            AUTO_LAYOUT_NODE_WIDTH / 2,
          y: topY + 190 + row * rowGap,
        },
      }
    }),
  ]
}

function buildPromotedLayoutScenario(
  id: Extract<ScenarioId, 'animated-grid' | 'hexagonal'>,
  shortLabel: string,
  label: string,
  description: string,
  nodes: Node<PlaygroundData>[],
  edges: Edge[],
  topNodeId: string,
  selectedNodeId: string,
  baseLayout: Node<PlaygroundData>[],
): PlaygroundScenario {
  const heroPosition = { x: 720 - AUTO_LAYOUT_NODE_WIDTH / 2, y: 140 }
  const parkedStartPosition = { x: 1120, y: 40 }
  const connectedNodeIds = new Set(
    edges.filter((edge) => edge.source === selectedNodeId).map((edge) => edge.target),
  )
  const baseLayoutById = new Map(baseLayout.map((node) => [node.id, node]))

  const positionedNodes = nodes.map((node) => {
    if (node.id === selectedNodeId) {
      return {
        ...node,
        position: heroPosition,
        className: 'is-animated-grid-motion is-animated-grid-row-0',
        data: {
          ...node.data,
          tone: 'center' as const,
        },
      }
    }

    if (node.id === topNodeId && selectedNodeId !== topNodeId) {
      return {
        ...node,
        position: parkedStartPosition,
        className: 'is-animated-grid-motion is-parked-start',
        data: {
          ...node.data,
          tone: 'outer' as const,
        },
      }
    }

    const layoutNode = baseLayoutById.get(node.id)

    return {
      ...node,
      position: layoutNode?.position ?? node.position,
      className: ['is-animated-grid-motion', layoutNode?.className]
        .filter(Boolean)
        .join(' '),
      data: {
        ...node.data,
        tone: connectedNodeIds.has(node.id) ? ('inner' as const) : ('outer' as const),
      },
    }
  })

  return {
    id,
    shortLabel,
    label,
    description,
    nodes: positionedNodes,
    edges,
  }
}

export function getAutoLayoutScenario(
  tension = 0.5,
  centerNodeId = AUTO_LAYOUT_DEFAULT_CENTER_ID,
  animationVersion = 0,
): PlaygroundScenario {
  return {
    id: 'auto-layout',
    shortLabel: 'Auto Layout',
    label: 'Auto Layout Flow',
    description:
      'Click any node to promote it to the center. Its direct outgoing targets become the inner ring, and all remaining nodes move to the outer ring.',
    nodes: buildConcentricLayout(
      autoLayoutBaseNodes,
      autoLayoutEdges,
      centerNodeId,
      tension,
      animationVersion,
    ),
    edges: autoLayoutEdges,
  }
}

export function getStaticScenario(
  tension = 0,
  selectedNodeId = STATIC_DEFAULT_CENTER_ID,
): PlaygroundScenario {
  const positionedNodes = buildConcentricLayout(
    staticNodes,
    staticEdges,
    STATIC_DEFAULT_CENTER_ID,
    tension,
  )
  const connectedNodeIds = new Set(
    staticEdges
      .filter((edge) => edge.source === selectedNodeId)
      .map((edge) => edge.target),
  )

  return {
    id: 'static',
    shortLabel: 'Static',
    label: 'Static Flow',
    description:
      'The static flow starts from the same concentric grouping as auto layout, but its interaction model stays separate.',
    nodes: positionedNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        tone:
          node.id === selectedNodeId
            ? 'center'
            : connectedNodeIds.has(node.id)
              ? 'inner'
              : 'outer',
      },
    })),
    edges: staticEdges,
  }
}

export function getGridScenario(
  tension = 0,
  selectedNodeId = GRID_DEFAULT_CENTER_ID,
): PlaygroundScenario {
  const positionedNodes = buildGridLayout(gridNodes, GRID_DEFAULT_CENTER_ID, tension)
  const connectedNodeIds = new Set(
    gridEdges
      .filter((edge) => edge.source === selectedNodeId)
      .map((edge) => edge.target),
  )

  return {
    id: 'grid',
    shortLabel: 'Grid',
    label: 'Grid Flow',
    description:
      'Nodes are laid out on a rectangular grid with the first node alone in the first row. Hover and selection behave like the static flow.',
    nodes: positionedNodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        tone:
          node.id === selectedNodeId
            ? 'center'
            : connectedNodeIds.has(node.id)
              ? 'inner'
              : 'outer',
      },
    })),
    edges: gridEdges,
  }
}

export function getAnimatedGridScenario(
  tension = 0,
  selectedNodeId = ANIMATED_GRID_DEFAULT_CENTER_ID,
): PlaygroundScenario {
  return buildPromotedLayoutScenario(
    'animated-grid',
    'Animated Grid',
    'Animated Grid Flow',
    'Grid layout with the same hover and click behavior as Grid, but the selected node moves into a hero slot while the previous hero node returns to its body position.',
    animatedGridNodes,
    animatedGridEdges,
    ANIMATED_GRID_DEFAULT_CENTER_ID,
    selectedNodeId,
    buildGridLayout(animatedGridNodes, ANIMATED_GRID_DEFAULT_CENTER_ID, tension, true),
  )
}

export function getHexagonalScenario(
  tension = 0,
  selectedNodeId = HEXAGONAL_DEFAULT_CENTER_ID,
): PlaygroundScenario {
  return buildPromotedLayoutScenario(
    'hexagonal',
    'Hexagonal',
    'Hexagonal Flow',
    'Hexagonal layout with the same hover and click behavior as Animated Grid, using a staggered honeycomb-like body layout.',
    hexagonalNodes,
    hexagonalEdges,
    HEXAGONAL_DEFAULT_CENTER_ID,
    selectedNodeId,
    buildHexagonalLayout(hexagonalNodes, HEXAGONAL_DEFAULT_CENTER_ID, tension, true),
  )
}

export const scenarios: PlaygroundScenario[] = [
  getAutoLayoutScenario(),
  getStaticScenario(),
  getGridScenario(),
  getAnimatedGridScenario(),
  getHexagonalScenario(),
]
