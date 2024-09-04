const ContentEducation = () => {
    return (
        <div id="education" className="pt-16 mb-10">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Education</h3>
            <span className="text-3xl ml-1">🎓</span>
            <div className="mt-5 mb-10">
                <div className="flex justify-between w-full">
                <h4 className="text-2xl">National Development University Veteran of East Java</h4>
                <h4 className="text-xl">Surabaya, Indonesia</h4>
                </div>
                <div className="flex justify-between text-xl">
                <h4>Bachelor of Computer Science</h4>
                <h4>2021 - 2025 (Expected)</h4>
                </div>
                <div className="description ml-4">
                <ul className="list-disc">
                    <li>Cummulative GPA: 3.86 / 4.00</li>
                    <li>Relevant Coursework: Software Engineering, Web Programming, Mobile App Development, Cloud Computing, Data Structure, Object-Oriented Programming (OOP), Framework Programming</li>
                </ul>
                </div>
            </div>
            </div>
    )
}

export default ContentEducation;