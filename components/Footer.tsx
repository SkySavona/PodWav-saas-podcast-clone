import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white-3 py-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/logo.svg" alt="PodWav Logo" width={30} height={30} />
          <span className="ml-2 text-lg text-white-1 font-semibold">PodWav</span>
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link href="/" className="hover:text-white-1 transition-colors duration-300">
            Home
          </Link>
          <Link href="#" className="hover:text-white-1 cursor-not-allowed transition-colors duration-300">
            About
          </Link>
          <Link href="#" className="hover:text-white-1 cursor-not-allowed transition-colors duration-300">
            Contact
          </Link>
        </nav>
      </div>
      <div className="text-center mt-4 text-sm">
        © 2024 PodWav. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;