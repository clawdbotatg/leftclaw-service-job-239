import React from "react";
import Link from "next/link";
import { SwitchTheme } from "~~/components/SwitchTheme";

const GITHUB_REPO = "https://github.com/clawdbotatg/leftclaw-service-job-239";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-4 border-t border-base-300 bg-base-100">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full text-sm">
        <div className="text-base-content/80 text-center md:text-left">Open DeFi Risk Dashboard — A public good</div>
        <div className="flex items-center gap-3">
          <Link href="/" className="link link-hover">
            Dashboard
          </Link>
          <span className="text-base-content/40">·</span>
          <Link href="/methodology" className="link link-hover">
            Methodology
          </Link>
          <span className="text-base-content/40">·</span>
          <a href={GITHUB_REPO} target="_blank" rel="noreferrer" className="link link-hover">
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base-content/80 text-center md:text-right">
            AGPL 3.0 License | Not financial advice
          </span>
          <SwitchTheme />
        </div>
      </div>
    </div>
  );
};
