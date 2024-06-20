import Image from "next/image"

const Heroes = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src={"/documents.webp"}
            alt="documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src={"/documents-dark.webp"}
            alt="documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
        <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px] md:block hidden">
          <Image
            src={"/reading.webp"}
            alt="documents"
            fill
            className="object-contain dark:hidden"
          />
          <Image
            src={"/reading-dark.webp"}
            alt="documents"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
    </div>
  )
}
export default Heroes
