import SectionIntroduction from "../components/SectionIntroduction"
import SectionMenu from "../components/SectionMenu"
import SectionProfile from "../components/SectionProfile"

const Main = () => {
    return (
        <main>
            <SectionProfile />
            <SectionIntroduction />
            <SectionMenu />
        </main>
    )
}

export default Main