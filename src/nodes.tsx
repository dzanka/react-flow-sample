import { Handle, Position, type NodeProps } from 'reactflow'

type PlaygroundNodeData = {
  label: string
  tone?: 'center' | 'inner' | 'outer'
}

export function PlaygroundNode({ data }: NodeProps<PlaygroundNodeData>) {
  return (
    <article className={`playground-node playground-node--${data.tone ?? 'outer'}`}>
      <Handle type="target" position={Position.Left} />
      <div className="playground-node__label">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </article>
  )
}
