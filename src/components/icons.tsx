import type { SVGProps } from "react";

/** Icone a tratto, 24×24, ereditano il colore dal testo. Sempre decorative: il significato è nel testo accanto. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Calendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const MapPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 1 1 13 0c0 5.2-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);

export const Ticket = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8.5V6.8C4 6.4 4.4 6 4.8 6h14.4c.4 0 .8.4.8.8v1.7a2.5 2.5 0 0 0 0 5v1.7c0 .4-.4.8-.8.8H4.8c-.4 0-.8-.4-.8-.8v-1.7a2.5 2.5 0 0 0 0-5Z" />
    <path d="M14 6.5v11" strokeDasharray="1.5 2" />
  </Base>
);

export const Users = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c.6-3.2 2.7-5 5.5-5s4.9 1.8 5.5 5" />
    <circle cx="17" cy="9.5" r="2.3" />
    <path d="M16 14.2c2.4.1 4 1.6 4.5 4.3" />
  </Base>
);

export const Download = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />
  </Base>
);

export const Share = (p: IconProps) => (
  <Base {...p}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
  </Base>
);

export const Printer = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 9V3.5h10V9M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <rect x="7" y="14" width="10" height="7" rx="1" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const Info = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5.5M12 7.6v.1" />
  </Base>
);

export const Alert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.8 21 19.5H3L12 3.8Z" />
    <path d="M12 10v4.5M12 17.2v.1" />
  </Base>
);

export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.2 6.8v.1" />
  </Base>
);

export const Facebook = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 8.5H16V5.2c-.3 0-1.3-.2-2.5-.2-2.4 0-4 1.5-4 4.2v2.3H7v3.6h2.5V21h3.2v-5.9h2.6l.4-3.6h-3v-2c0-1 .3-1.6 1.8-1.6Z" />
  </Base>
);

export const WhatsApp = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.7L4.5 19.5Z" />
    <path d="M9.2 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.3.5-2 .3-2.3-.7-4.6-3-5.3-5.3-.2-.7 0-1.5.3-2Z" />
  </Base>
);

export const Link = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Base>
);

export const Sparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4M6 6l2.6 2.6M15.4 15.4 18 18M18 6l-2.6 2.6M8.6 15.4 6 18" />
  </Base>
);

export const Tree = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21v-7" />
    <path d="M12 14c-4 0-6.5-2.2-6.5-5.2C5.5 5.6 8.4 3.5 12 3.5s6.5 2.1 6.5 5.3c0 3-2.5 5.2-6.5 5.2Z" />
    <path d="M12 14 9 11M12 12.5l2.5-2.5M9.5 21h5" />
  </Base>
);

export const Books = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="5" width="4" height="15" rx="1" />
    <rect x="9" y="3.5" width="4" height="16.5" rx="1" />
    <path d="m14.6 6.3 3.8-1 3.1 13.6-3.8.9z" />
  </Base>
);

export const Kids = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="6.5" r="2.3" />
    <circle cx="16.5" cy="8.5" r="1.9" />
    <path d="M4.5 20v-4.8c0-2 1.5-3.6 3.5-3.6s3.5 1.6 3.5 3.6V20M13.5 20v-3.5c0-1.7 1.3-3 3-3s3 1.3 3 3V20" />
  </Base>
);

export const Mic = (p: IconProps) => (
  <Base {...p}>
    <rect x="9" y="3.5" width="6" height="11" rx="3" />
    <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21M9 21h6" />
  </Base>
);

export const Letter = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </Base>
);

export const Screen = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
    <path d="M8 20.5h8M12 16.5v4" />
  </Base>
);

export const Light = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 17.5h5M10 20.5h4" />
    <path d="M12 3.5a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2v1h5v-1c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3.5Z" />
  </Base>
);

export const Train = (p: IconProps) => (
  <Base {...p}>
    <rect x="5.5" y="3.5" width="13" height="13" rx="3" />
    <path d="M5.5 10.5h13M9 20.5l1.5-4M15 20.5l-1.5-4M9 13.5v.1M15 13.5v.1" />
  </Base>
);

export const Car = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 16.5v-4l2-5.2c.3-.8 1-1.3 1.9-1.3h8.2c.9 0 1.6.5 1.9 1.3l2 5.2v4" />
    <path d="M3 16.5h18v2.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5ZM4.5 12h15" />
    <path d="M7 14.5h1M16 14.5h1" />
  </Base>
);

export const Plane = (p: IconProps) => (
  <Base {...p}>
    <path d="M10.5 13.5 4 12l-1-1.5 1.5-.5 6 1.2L15 6.6c.8-.8 2-1.1 2.8-.6.5.8.2 2-.6 2.8L12.6 13.3l1.2 6-.5 1.5L11.8 20l-1.3-6.5Z" />
  </Base>
);

export const Bus = (p: IconProps) => (
  <Base {...p}>
    <rect x="4.5" y="3.5" width="15" height="14" rx="2.5" />
    <path d="M4.5 10.5h15M8 20.5v-3M16 20.5v-3M8 14v.1M16 14v.1" />
  </Base>
);

export const Accessibility = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="4.8" r="1.6" />
    <path d="M5 8.5c2.3.6 4.6.9 7 .9s4.7-.3 7-.9M12 9.4v4.1M12 13.5l-3 7M12 13.5l3 7" />
  </Base>
);

export const Rain = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 15.5a4.5 4.5 0 0 1-.6-9 5.5 5.5 0 0 1 10.6 1.3 3.9 3.9 0 0 1 0 7.7H7Z" />
    <path d="M9 18.5 8 21M13 18.5 12 21M17 18.5 16 21" />
  </Base>
);

export const Camera = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8.5c0-.8.7-1.5 1.5-1.5h2.2l1.5-2.2h5.6l1.5 2.2h2.2c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5h-13c-.8 0-1.5-.7-1.5-1.5v-9Z" />
    <circle cx="12" cy="13" r="3.4" />
  </Base>
);
