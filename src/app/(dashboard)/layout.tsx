
export default function DashboardLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex h-full">
      <div className="sidebar">

      </div>
      <div className="">
        <p>This is the dashboard</p>
        <main className="">{children}</main>
      </div>
    </div>
  );
}