interface BadgeProps {
  caption: number | string;
}

export default function Badge({ caption }: BadgeProps) {
  return <span className="badge">{caption}</span>;
}