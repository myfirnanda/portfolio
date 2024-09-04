import SectionMenuAside from "./SectionMenuAside"
import SectionMenuContent from "./SectionMenuContent"

const SectionMenu = () => {
    return (
        <section id="menu" class="bg-black">
            {/* <div style="background-image: url('./merged-img.png'); background-size: cover; background-position: center; background-color: rgba(0, 0, 0, 0.5); background-blend-mode: multiply;"> */}
            <div style={{ backgroundImage: `url("https://www.dropbox.com/scl/fi/yjlqvwv7f9kbqbe0rzyr1/merged-img.webp?rlkey=8h0m4n1bz1keqp2e8zm8u0wvs&st=dj0hw4yk&raw=1")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'multiply' }}>
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-12 gap-10">
                        <SectionMenuAside />
                        <SectionMenuContent />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionMenu;