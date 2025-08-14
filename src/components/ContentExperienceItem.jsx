const ContentExperienceItem = ({ image, title, position, status, companyName, companyLink, startDate, endDate, techStack }) => {
    return (
        <div class="relative w-full">
            <div class="rounded-full absolute -top-0.5 z-10 -ml-3.5 h-6 w-6 rounded-full bg-fuchsia-700"></div>
            <div class="ml-6">
                <div class="profesional-item">
                    <div class="company-description">
                    <div class="flex justify-between">
                        <h4 class="text-2xl">{position} - <span class="text-gray-400">{status}</span></h4>
                        <h4 class="text-xl">{startDate} - {endDate}</h4>
                    </div>
                    <div class="job text-xl mt-1 mb-3">
                        <a href={companyLink} target="_blank" rel="noreferrer" class="inline-block">
                            <h4>{companyName}</h4>
                        </a>
                    </div>
                    <div id="tech-used" class="flex gap-2">
                        {techStack.map(stack => {
                            return (
                                <span class="text-xs font-semibold me-2 px-2.5 py-0.5 rounded border bg-fuchsia-800 border-fuchsia-400">{stack}</span>
                            )
                        })}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentExperienceItem;