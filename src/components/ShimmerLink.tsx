"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ShimmerLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerLink = React.forwardRef<HTMLAnchorElement, ShimmerLinkProps>(
  (
    {
      href,
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        href={href}
        ref={ref}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        {...props}
      >
        {/* spark - rotating border highlight */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]",
          )}
        >
          <div className="absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div
              className="absolute -inset-full w-auto animate-shimmer-spin [translate:0_0]"
              style={{
                background: "conic-gradient(from 0deg, transparent 300deg, var(--shimmer-color) 330deg, var(--shimmer-color) 30deg, transparent 60deg)",
              }}
            />
          </div>
        </div>
        {children}
        {/* Highlight */}
        <div
          className={cn(
            "absolute inset-0 size-full",
            "rounded-[var(--radius)]",
            "transform-gpu transition-all duration-300 ease-in-out",
            "shadow-[inset_0_-8px_10px_#ffffff1f]",
            "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
            "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
          )}
        />
        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]",
          )}
        />
      </Link>
    );
  },
);

ShimmerLink.displayName = "ShimmerLink";

export { ShimmerLink };
