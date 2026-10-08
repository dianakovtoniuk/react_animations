interface BadgeProps {
  caption: number;
}

export default function Badge({ caption }: BadgeProps) {
  return <span className="badge">{caption}</span>;
}