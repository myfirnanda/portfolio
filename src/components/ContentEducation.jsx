const ContentEducation = () => {
    return (
        <div id="education" className="pt-16 mb-10">
            <h3 className="fw-bold text-4xl relative line-heading inline-block mb-10 font-semibold">Education</h3>
            <span className="text-3xl ml-1">🎓</span>
                <div className="mt-5 mb-10">
                    <div className="flex justify-between w-full">
                    <h4 className="text-2xl">National Development University <br/>Veteran of East Java</h4>
                    <h4 className="text-xl">Surabaya, Indonesia</h4>
                    </div>
                    <div className="flex justify-between text-xl my-2">
                        <h4>Bachelor of Computer Science</h4>
                        <h4>2021 - 2025</h4>
                    </div>
                    <div className="description ml-4">
                        <ul className="list-disc">
                            <li>Cummulative GPA: 3.88 / 4.00</li>
                            <li>Relevant Coursework: Software Engineering, Web Programming, Mobile App Development, Cloud Computing, Data Structure, Object-Oriented Programming (OOP), Framework Programming</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-5 mb-10">
                    <div className="flex justify-between w-full">
                    <h4 className="text-2xl">Yayasan Dicoding Indonesia</h4>
                    <h4 className="text-xl">Bandung, Indonesia</h4>
                    </div>
                    <div className="flex justify-between text-xl my-2">
                        <h4>Cloud Computing Learning Path</h4>
                        <h4>Aug 2023 - Dec 2023</h4>
                    </div>
                    <div className="description ml-4">
                        <ul className="list-disc">
                            <li>Developed an innovative app with CRUD functionalities, authentication, and authorization, integrating with GoogleCloud Platform (GCP) services for enhanced performance and scalability.</li>
                            <li>Created a REST API using ExpressJS and MySQL, ensuring smooth frontend usage by testing with Postman, andprovided clear API documentation with Swagger for team collaboration.</li>
                            <li>Successfully collaborated with 6 member team, demonstrating strong interpersonal skills, and completed the projectahead of schedule.</li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}

export default ContentEducation;