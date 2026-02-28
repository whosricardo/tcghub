import '../styles/globals.css'

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html>
            <body className="antialiased">{children}</body>
        </html>
    )
}
