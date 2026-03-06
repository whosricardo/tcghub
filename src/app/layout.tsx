import '../styles/globals.css'
import Providers from '../components/providers'

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html>
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
