import './globals.css'

export const metadata = {
  title: 'Student Management',
  description: 'Manage students efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
