import { unstable_getServerSession } from "next-auth";
import MainNavigation from "../components/MainNavigation";
import "../styles/globals.css";
import { Providers } from "./providers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await unstable_getServerSession();

    return (
        <html lang="en">
            <body>
                <Providers session={session}>
                    <header>
                        <MainNavigation />
                    </header>

                    {children}
                </Providers>
            </body>
        </html>
    );
}
