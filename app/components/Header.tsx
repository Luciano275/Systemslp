'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoMdCart } from 'react-icons/io'
import { FaTruck } from 'react-icons/fa'
import { BsGraphUpArrow } from 'react-icons/bs'

const links = [
  { name: 'Productos', href: '/productos', icon: IoMdCart },
  { name: 'Proveedores', href: '/proveedores', icon: FaTruck },
  { name: 'Reportes', href: '/reportes', icon: BsGraphUpArrow }
]

export default function Header() {

  const pathname = usePathname();

  return (
    <header className="bg-neutral-900 relative z-10">
      <nav className="hidden lg:flex justify-between text-white items-center p-5">
        <h1 className="text-4xl">
          <Link href='/'>System SLP</Link>
        </h1>
        <div className="flex gap-5">
          {
            links.map((link) => {
              const IconLink = link.icon;
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`flex gap-1 items-center ${pathname === link.href ? 'text-white' : 'text-neutral-400'} transition-colors hover:text-white text-lg`}
                >
                  <IconLink />
                  {link.name}
                </Link>
              )
            })
          }
        </div>
      </nav>
      <h2 className="lg:hidden block text-2xl text-white pt-3 pb-1 md:pt-6 md:pb-4 px-5 text-center">
        <Link href='/'>System SLP</Link>
      </h2>
      <nav className="lg:hidden flex justify-between gap-2 p-2">
        {
          links.map((link) => {
            const IconLink = link.icon;
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`grow flex h-full items-center rounded-xl justify-center ${pathname === link.href ? 'bg-neutral-300' : 'text-neutral-400'} transition-colors hover:bg-neutral-300 hover:text-black p-2`}
              >
                <IconLink className="text-2xl md:text-4xl" />
              </Link>
            )
          })
        }
      </nav>
    </header>
  )
}