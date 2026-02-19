"use client";

import React, { type MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Briefcase, Store } from "lucide-react";
import { cn } from "@/lib/utils";

type AwardBadgeType =
  | "golden-kitty"
  | "product-of-the-day"
  | "product-of-the-month"
  | "product-of-the-week"
  | "custom";

type BadgeVariant = "gold" | "silver";

type BadgeIconType = "briefcase" | "store" | "ph";

const iconMap = { briefcase: Briefcase, store: Store } as const;

// Product Hunt kitty logo (from 21st.dev / Product Hunt badge)
const ProductHuntIconPath = "M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037";

interface AwardBadgeProps {
  type?: AwardBadgeType;
  place?: number;
  link?: string;
  href?: string;
  /** Custom label (small text above), used when type="custom" */
  customLabel?: string;
  /** Custom title (main text), used when type="custom" */
  customTitle?: string;
  /** Gold or silver background variant, used when type="custom" */
  variant?: BadgeVariant;
  /** Icon name for custom badge - avoids passing components from Server */
  icon?: BadgeIconType;
  /** Emoji for custom badge (e.g. "💰" "📊") - use instead of icon */
  emoji?: string;
  /** Compact size for nav/header use */
  compact?: boolean;
  /** Additional className for the wrapper */
  className?: string;
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

const backgroundColor = ["#f3e3ac", "#ddd", "#f1cfa6"];

const variantBackgrounds: Record<BadgeVariant, string> = {
  gold: "#f3e3ac",
  silver: "#8a8a8a",
};

const title: Record<string, string> = {
  "golden-kitty": "Golden Kitty Awards",
  "product-of-the-day": "Product of the Day",
  "product-of-the-month": "Product of the Month",
  "product-of-the-week": "Product of the Week",
};

export const AwardBadge = ({
  type = "custom",
  place,
  link,
  href,
  customLabel = "",
  customTitle = "",
  variant = "gold",
  icon: iconName,
  emoji,
  compact = false,
  className,
}: AwardBadgeProps) => {
  const Icon = iconName ? iconMap[iconName] : undefined;
  const url = href ?? link ?? "#";
  const uid = React.useId().replace(/:/g, "");
  const isInternal = url.startsWith("/") || url.startsWith("#");
  const ref = useRef<HTMLAnchorElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState<number>(0);
  const [matrix, setMatrix] = useState<string>(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState<string>(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] =
    useState<boolean>(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] =
    useState<boolean>(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState<boolean>(false);
  const enterTimeout = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout1 = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout2 = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeout3 = useRef<NodeJS.Timeout | null>(null);

  const displayLabel = type === "custom" ? customLabel : "PRODUCT HUNT";
  const displayTitle =
    type === "custom"
      ? customTitle
      : `${title[type] ?? ""}${place ? ` #${place}` : ""}`;

  const getDimensions = () => {
    const left = ref?.current?.getBoundingClientRect()?.left ?? 0;
    const right = ref?.current?.getBoundingClientRect()?.right ?? 0;
    const top = ref?.current?.getBoundingClientRect()?.top ?? 0;
    const bottom = ref?.current?.getBoundingClientRect()?.bottom ?? 0;
    return { left, right, top, bottom };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale -
        ((maxScale - minScale) * Math.abs(xCenter - clientX)) /
          (xCenter - left),
      maxScale -
        ((maxScale - minScale) * Math.abs(yCenter - clientY)) /
          (yCenter - top),
      maxScale -
        ((maxScale - minScale) *
          (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY))) /
          (xCenter - left + yCenter - top),
    ];

    const rotate = {
      x1:
        0.25 *
        ((yCenter - clientY) / yCenter - (xCenter - clientX) / xCenter),
      x2:
        maxRotate -
        ((maxRotate - minRotate) * Math.abs(right - clientX)) / (right - left),
      x3: 0,
      y0: 0,
      y2:
        maxRotate -
        ((maxRotate - minRotate) * (top - clientY)) / (top - bottom),
      y3: 0,
      z0:
        -(
          maxRotate -
          ((maxRotate - minRotate) * Math.abs(right - clientX)) /
            (right - left)
        ),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / (top - bottom),
      z3: 0,
    };
    return (
      `${scale[0]}, ${rotate.y0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `${rotate.x3}, ${rotate.y3}, ${rotate.z3}, 1`
    );
  };

  const getOppositeMatrix = (
    _matrix: string,
    clientY: number,
    onMouseEnter?: boolean,
  ) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;

    return _matrix
      .split(", ")
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) {
          return (-parseFloat(item) * multiplier) / weakening;
        } else if (index === 0 || index === 5 || index === 10) {
          return "1";
        } else if (index === 6) {
          return (
            (multiplier *
              (maxRotate -
                ((maxRotate - minRotate) * (top - oppositeY)) /
                  (top - bottom))) /
            weakening
          );
        } else if (index === 9) {
          return (
            (maxRotate -
              ((maxRotate - minRotate) * (top - oppositeY)) /
                (top - bottom)) /
            weakening
          );
        }
        return item;
      })
      .join(", ");
  };

  const onMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    if (leaveTimeout1.current) clearTimeout(leaveTimeout1.current);
    if (leaveTimeout2.current) clearTimeout(leaveTimeout2.current);
    if (leaveTimeout3.current) clearTimeout(leaveTimeout3.current);
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(
      () => setDisableInOutOverlayAnimation(true),
      350,
    );
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition(
          (Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5,
        );
      });
    });

    const matrix = getMatrix(e.clientX, e.clientY);
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY, true);

    setMatrix(oppositeMatrix);
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setTimeout(
      () =>
        setFirstOverlayPosition(
          (Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5,
        ),
      150,
    );

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const onMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const oppositeMatrix = getOppositeMatrix(matrix, e.clientY);

    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(oppositeMatrix);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(
          () => setFirstOverlayPosition(-firstOverlayPosition / 4),
          150,
        );
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished) {
      setMatrix(currentMatrix);
    }
  }, [currentMatrix, isTimeoutFinished]);

  const overlayAnimations = [...Array(10).keys()]
    .map(
      (e) => `
    @keyframes overlayAnimation${e + 1} {
      0% { transform: rotate(${e * 10}deg); }
      50% { transform: rotate(${(e + 1) * 10}deg); }
      100% { transform: rotate(${e * 10}deg); }
    }
  `,
    )
    .join(" ");

  const badgePlace = type === "custom" ? 1 : place ?? 1;
  const bgFill =
    type === "custom" ? variantBackgrounds[variant] : backgroundColor[(badgePlace || 2) - 1] ?? backgroundColor[1];
  const textFill = type === "custom" && variant === "gold" ? "#5c4a1f" : type === "custom" && variant === "silver" ? "#ffffff" : "#666";

  const content = (
    <>
      <style>{overlayAnimations}</style>
      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 500ms ease-out",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260 54"
          className={compact ? "h-auto w-[140px] sm:w-[160px]" : "h-auto w-[180px] sm:w-[260px]"}
        >
          <defs>
            <filter id={`blur1-${uid}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id={`badgeMask-${uid}`}>
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
          </defs>
          <rect
            width="260"
            height="54"
            rx="10"
            fill={bgFill}
          />
          <rect
            x="4"
            y="4"
            width="252"
            height="46"
            rx="8"
            fill="transparent"
            stroke={variant === "silver" ? "#6b6b6b" : "#bbb"}
            strokeWidth="1"
          />
          {displayLabel && (
            <text
              fontFamily="Helvetica-Bold, Helvetica"
              fontSize="9"
              fontWeight="bold"
              fill={textFill}
              x="53"
              y="20"
            >
              {displayLabel}
            </text>
          )}
          <text
            fontFamily="Helvetica-Bold, Helvetica"
            fontSize={customTitle.length > 20 ? "12" : "16"}
            fontWeight="bold"
            fill={textFill}
            x={Icon ? "44" : "52"}
            y={displayLabel ? "40" : "32"}
          >
            {displayTitle}
          </text>
          {type === "custom" && (emoji || Icon || iconName === "ph") ? (
            emoji ? (
              <text
                x="22"
                y="34"
                fontSize="18"
                textAnchor="middle"
              >
                {emoji}
              </text>
            ) : iconName === "ph" ? (
              <g transform="translate(8, 9)">
                <path fill={textFill} d={ProductHuntIconPath} />
              </g>
            ) : Icon ? (
              <foreignObject x="12" y="14" width="26" height="26">
                <div
                  xmlns="http://www.w3.org/1999/xhtml"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: textFill,
                  }}
                >
                  <Icon size={22} strokeWidth={2} style={{ color: textFill }} />
                </div>
              </foreignObject>
            ) : null
          ) : type !== "custom" ? (
            <g transform="translate(8, 9)">
              <path
                fill="#666"
                d="M14.963 9.075c.787-3-.188-5.887-.188-5.887S12.488 5.175 11.7 8.175c-.787 3 .188 5.887.188 5.887s2.25-1.987 3.075-4.987m-4.5 1.987c.787 3-.188 5.888-.188 5.888S7.988 14.962 7.2 11.962c-.787-3 .188-5.887.188-5.887s2.287 1.987 3.075 4.987m.862 10.388s-.6-2.962-2.775-5.175C6.337 14.1 3.375 13.5 3.375 13.5s.6 2.962 2.775 5.175c2.213 2.175 5.175 2.775 5.175 2.775m3.3 3.413s-1.988-2.288-4.988-3.075-5.887.187-5.887.187 1.987 2.287 4.988 3.075c3 .787 5.887-.188 5.887-.188Zm6.75 0s1.988-2.288 4.988-3.075c3-.826 5.887.187 5.887.187s-1.988 2.287-4.988 3.075c-3 .787-5.887-.188-5.887-.188ZM32.625 13.5s-2.963.6-5.175 2.775c-2.213 2.213-2.775 5.175-2.775 5.175s2.962-.6 5.175-2.775c2.175-2.213 2.775-5.175 2.775-5.175M28.65 6.075s.975 2.887.188 5.887c-.826 3-3.076 4.988-3.076 4.988s-.974-2.888-.187-5.888c.788-3 3.075-4.987 3.075-4.987m-4.5 7.987s.975-2.887.188-5.887c-.788-3-3.076-4.988-3.076-4.988s-.974 2.888-.187 5.888c.788 3 3.075 4.988 3.075 4.988ZM18 26.1c.975-.225 3.113-.6 5.325 0 3 .788 5.063 3.038 5.063 3.038s-2.888.975-5.888.187a13 13 0 0 1-1.425-.525c.563.788 1.125 1.425 2.288 1.913l-.863 2.062c-2.063-.862-2.925-2.137-3.675-3.262-.262-.375-.525-.713-.787-1.05-.26.293-.465.586-.686.903l-.102.147-.048.068c-.775 1.108-1.643 2.35-3.627 3.194l-.862-2.062c1.162-.488 1.725-1.125 2.287-1.913-.45.225-.938.375-1.425.525-3 .788-5.887-.187-5.887-.187s1.987-2.288 4.987-3.075c2.212-.563 4.35-.188 5.325.037"
              />
            </g>
          ) : null}
          <g style={{ mixBlendMode: "overlay" }} mask={`url(#badgeMask-${uid})`}>
            {[
              "hsl(358, 100%, 62%)",
              "hsl(30, 100%, 50%)",
              "hsl(60, 100%, 50%)",
              "hsl(96, 100%, 50%)",
              "hsl(233, 85%, 47%)",
              "hsl(271, 85%, 47%)",
              "hsl(300, 20%, 35%)",
              "transparent",
              "transparent",
              "white",
            ].map((fill, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                  transformOrigin: "center center",
                  transition: !disableInOutOverlayAnimation
                    ? "transform 500ms ease-out"
                    : "none",
                  animation: disableOverlayAnimation
                    ? "none"
                    : `overlayAnimation${i + 1} 12s infinite`,
                  willChange: "transform",
                }}
              >
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={fill}
                  filter={`url(#blur1-${uid})`}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </>
  );

  const commonProps = {
    ref,
    className: cn(
      compact
        ? "block h-auto w-[140px] cursor-pointer sm:w-[160px]"
        : "block h-auto w-[180px] cursor-pointer sm:w-[260px]",
      className,
    ),
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
  };

  if (isInternal) {
    return (
      <Link href={url} {...commonProps}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...commonProps}
    >
      {content}
    </a>
  );
};
