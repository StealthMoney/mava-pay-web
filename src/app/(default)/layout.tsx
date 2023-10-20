import HomeHeader from "@/components/homeHeader";

export default function DefaultLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}