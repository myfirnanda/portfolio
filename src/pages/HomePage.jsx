import SectionIntroduction from "../components/SectionIntroduction"
import SectionMenu from "../components/SectionMenu"
import SectionProfile from "../components/SectionProfile"
import BackToTop from "../components/BackToTop"

const HomePage = () => {
    return (
        <main>
            <SectionProfile />
            <SectionIntroduction />
            <SectionMenu />
            <BackToTop />
        </main>
    )
}

export default HomePage
