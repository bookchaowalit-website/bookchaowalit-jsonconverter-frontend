import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata: Metadata = { title: "JSON Converter | Bookchaowalit", description: "Format JSON and move simple data between JSON and YAML in the browser.", metadataBase: new URL("https://bookchaowalit.com"), robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>
  {/* THESIS: A converter is a transformation table; show the source, the pull, and the resulting shape as one physical operation.
OWN-WORLD: A pattern-cutting studio: charcoal cloth, bone paper, gold drawcord, notched drafting marks, seams and pieces.
STORY: Lay out source data, pull a named transformation, inspect the finished piece, then copy it.
FIRST VIEWPORT: Transformation controls and the source/result workbench occupy the first viewport.
FORM: The source textarea is the editable pattern; mode buttons pull the cord; output is the finished piece; direction seed a2c88b22.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}
  <Analytics /><SpeedInsights />{children}</body></html>; }
