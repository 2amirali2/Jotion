import Footer from "./_components/Footer"
import Heading from "./_components/Heading"
import Heroes from "./_components/Heroes"

export default function Home() {
  return (
    <div className="min-h-full flex flex-col overflow-clip">
      <div className="flex flex-col text-center items-center justify-center md:justify-start gap-y-4 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  )
}
