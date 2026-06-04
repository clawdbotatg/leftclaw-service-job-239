"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { StatusBadge } from "~~/components/StatusBadge";
import {
  CATEGORY_FILTERS,
  CategoryFilter,
  MATRIX_PROVIDER_SLUGS,
  STATUS_FILTERS,
  StatusFilter,
  getEntry,
  matchesCategory,
  protocols,
  providers,
  statusFilterToValue,
} from "~~/utils/risk-data";

const matrixProviders = MATRIX_PROVIDER_SLUGS.map(slug => providers.find(p => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => Boolean(p),
);

const Dashboard: NextPage = () => {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const filteredProtocols = useMemo(() => {
    const statusValue = statusFilterToValue(statusFilter);
    return protocols.filter(protocol => {
      if (!matchesCategory(protocol.category, category)) return false;
      if (statusValue === null) return true;
      // Keep the protocol if at least one shown provider matches the status filter.
      return matrixProviders.some(provider => getEntry(protocol.slug, provider.slug)?.status === statusValue);
    });
  }, [category, statusFilter]);

  return (
    <div className="flex flex-col grow w-full bg-base-200">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col grow">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-1">DeFi Risk Intelligence Dashboard</h1>
          <p className="text-base-content/70">
            What risk providers say about top Ethereum DeFi protocols — verbatim, side by side
          </p>
        </header>

        {/* Filter bar */}
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-base-content/60 mb-1">Category</div>
            <div className="join">
              {CATEGORY_FILTERS.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`join-item btn btn-sm ${category === c ? "btn-primary" : "btn-ghost"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-base-content/60 mb-1">
              Coverage status
            </div>
            <div className="join">
              {STATUS_FILTERS.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`join-item btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-ghost"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="card bg-base-100 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th className="bg-base-100 sticky left-0 z-10 min-w-[180px]">Protocol</th>
                  {matrixProviders.map(provider => (
                    <th key={provider.slug} className="text-center min-w-[120px]">
                      <a
                        href={provider.website}
                        target="_blank"
                        rel="noreferrer"
                        className="link link-hover whitespace-nowrap"
                        title={provider.description}
                      >
                        {provider.name}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProtocols.map(protocol => (
                  <tr key={protocol.slug} className="hover">
                    <td className="bg-base-100 sticky left-0 z-10">
                      <Link href={`/protocol/${protocol.slug}`} className="link link-hover font-semibold">
                        {protocol.name}
                      </Link>
                      <div className="text-xs text-base-content/50">{protocol.category}</div>
                    </td>
                    {matrixProviders.map(provider => {
                      const entry = getEntry(protocol.slug, provider.slug);
                      const status = entry?.status ?? "needs-verification";
                      return (
                        <td key={provider.slug} className="text-center align-top">
                          <div className="flex flex-col items-center gap-1">
                            <StatusBadge status={status} />
                            {entry?.ratingLabel && (
                              <span className="text-[11px] text-base-content/70 leading-tight">
                                {entry.ratingLabel}
                              </span>
                            )}
                            {entry?.rating && (
                              <span className="text-xs font-semibold leading-tight">{entry.rating}</span>
                            )}
                            {entry?.sourceUrl && (
                              <a
                                href={entry.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-base-content/50 hover:text-primary"
                                title="View source"
                              >
                                <ArrowTopRightOnSquareIcon className="h-3 w-3 inline" />
                              </a>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {filteredProtocols.length === 0 && (
                  <tr>
                    <td colSpan={matrixProviders.length + 1} className="text-center text-base-content/60 py-8">
                      No protocols match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-base-content/70">
          <span className="font-semibold">Legend:</span>
          <span className="flex items-center gap-1">
            <StatusBadge status="covered" /> Covered
          </span>
          <span className="flex items-center gap-1">
            <StatusBadge status="partial" /> Partial
          </span>
          <span className="flex items-center gap-1">
            <StatusBadge status="needs-verification" /> Needs verification
          </span>
          <span className="flex items-center gap-1">
            <StatusBadge status="not-covered" /> Not covered
          </span>
          <span className="flex items-center gap-1">
            <StatusBadge status="source-unavailable" /> Source unavailable
          </span>
        </div>

        <p className="text-xs text-base-content/60 mt-6 border-t border-base-300 pt-4">
          Data retrieved from public sources. Timestamps shown per entry. This dashboard does not create composite
          scores.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
