import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* navbar - This will basically be worked on for personal project after this course. Only submitting a simple page as per lab requirements */}
      <header className='fixed w-full'>
        <nav className='bg-white border-gray-200 py-2.5 dark:bg-gray-600'>
          <div className='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
            <Link href={"/"} className='flex items-center'>
              <img
                src='/nextcrypt-logo-symbol-dark.png'
                className='h-6 mr-3 sm:h-9 drop-shadow-lg'
                alt='NextCrypt Logo'
              />
              <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>NextCrypt</span>
            </Link>
            <div className='flex items-center lg:order-2'>
              <Link
                href={"/login"}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                Sign Up/Log In
              </Link>
            </div>
          </div>
        </nav>
      </header>
      {/* landing page main section */}
      <section className='bg-white dark:bg-gray-600'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white drop-shadow-md'>
              Take Your Secrets To The Crypt.
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              NextCrypt is not your average password manager. With a focus on putting user privacy first, we strive to
              put control of your data into your hands. We vow to never sell your user data to third parties. Utilizing
              zero-knowledge encryption, even we cannot view the secrets stored on our platform. Truly take your secrets
              with you to the beyond.
            </p>
          </div>
          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='/nextcrypt-logo-dark.png' alt='NextCrypt Logo' />
          </div>
        </div>
      </section>
      {/* Lab Assignment Answer */}
      <section className='bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6'>
        <p className="mb-8 font-light lg:text-xl">
          This is by no means the finality of what I wanted to create and will be something I work on after exam sessions. But for the purpose of the lab, the simplest
          webpage was created as stated in the requirements. The page is using NextJS with Tailwind CSS. Installing it was pretty straightforward via the node package
          manager. The setup conveniently uses TypeScript and Tailwind bundled with it so it cuts out a lot of the grunt work involved. As for actually building it,
          inspiration was taken from tailwind CSS components. The logo created via GIMP. In terms of challenges, learning how the routing functions. I plan on turning This
          into a full-fledged application in the near future. But that's about it for this lab. Was nice working on these small tasks for the course. Happy Holidays!
        </p>
        </div>
      </section>
    </>
  );
}
