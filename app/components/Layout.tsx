'use client'

import { NextFont } from "next/dist/compiled/@next/font"
import Header from "./Header"
import { usePathname } from "next/navigation"

export default function Layout({
  content,
  font
}: {
  content: React.ReactNode,
  font: NextFont
}) {

  const pathname = usePathname()
  
  return (
    <body className={font.className} style={pathname === '/' ? {
      backgroundImage: 'url("/wp.jpg")',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPositionY: 'center',
      backgroundPositionX: 'center'
    } : {}}>
      <div className="flex flex-col" style={{
        minHeight: '100dvh'
      }}>
        <Header />
        <main className="grow">
          {content}
        </main>
        <footer className="py-2 px-4 bg-black bg-opacity-80 text-center text-white relative z-10">
          <p>Creado por Luciano Luna</p>
        </footer>
      </div>
    </body>
  )
}