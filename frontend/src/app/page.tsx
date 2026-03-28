import ContentHome  from "@/components/homepage/common/contentHome";
import Banner from "@/components/homepage/layout/banner";
import Navbar from "@/components/homepage/layout/navbar";

export default function Home() {
    return (
        <main className="flex flex-col">
            <Navbar/>
            <Banner/>
            <ContentHome/>
        </main>
    )
}
