import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gear Marketplace | FilmFolio",
  description: "Rent top-tier cinema equipment directly from working professionals.",
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
