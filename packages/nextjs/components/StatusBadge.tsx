import { CoverageStatus, STATUS_META } from "~~/utils/risk-data";

export const StatusBadge = ({ status, label }: { status: CoverageStatus; label?: string }) => {
  const meta = STATUS_META[status];
  return <span className={`badge badge-sm ${meta.badgeClass}`}>{label ?? meta.label}</span>;
};
