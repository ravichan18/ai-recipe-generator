export const metadata = {
  title: "KitchenPilot",
  description: "AI recipe generation that turns what you have into something incredible."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
