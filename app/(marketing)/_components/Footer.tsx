import Image from "next/image"

const Footer = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="md:flex items-center gap-2 hidden">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={40}
          height={40}
          className="dark:hidden"
        />
        <Image
          src={"/logo-dark.svg"}
          alt="logo"
          width={40}
          height={40}
          className="hidden dark:block"
        />
        <p className="font-semibold">Jotion</p>
      </div>
      <div className="flex gap-x-6 justify-between md:justify-end w-full">
      <p className="text-sm text-muted-foreground">Privacy Policy</p>
      <p className="text-sm text-muted-foreground">Terms & Conditions</p>
      </div>
    </div>
  )
}
export default Footer