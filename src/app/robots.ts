import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { isProductionDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Le anteprime di Vercel (branch, pull request) restano fuori dai motori di ricerca
  if (!isProductionDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/calendario/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
