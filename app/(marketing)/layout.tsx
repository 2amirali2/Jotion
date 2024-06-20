import Navbar from "./_components/Navbar"

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="pt-40 h-full">{children}</main>
    </div>
  )
}
export default MarketingLayout
