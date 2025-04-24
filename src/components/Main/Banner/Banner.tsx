import React from 'react'

const Banner = () => {
    // Define the words to display in the banner
    const words = ["SWAP", "DISCOVER", "EXPLORE", "LEARN", "SECURE", "NEWS", "INSIGHTS", "GUIDES", "TRADE"];

    // Create a function to generate a word sequence with proper spacing
    const createWordSequence = () => {
        return words.map((word, index) => (
            <React.Fragment key={index}>
                <span className="mx-2">{word}</span>
                <span className="mx-2">-</span>
            </React.Fragment>
        ));
    };

    // Repeat the sequence multiple times to ensure continuous scrolling
    const createBannerContent = (repetitions = 4) => {
        const content = [];
        for (let i = 0; i < repetitions; i++) {
            content.push(...createWordSequence());
        }
        return content;
    };

    return (
        <div className="relative max-w-[1500px] rounded-3xl mt-6">
            <div className="w-full overflow-x-hidden relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-72 before:h-full before:z-10 before:pointer-events-none before:bg-gradient-to-r before:from-[#101221] before:to-transparent after:content-[''] after:absolute after:top-0 after:right-0 after:w-72 after:h-full after:z-10 after:pointer-events-none after:bg-gradient-to-l after:from-[#101221] after:to-transparent">
                <div className="flex animate-[scroll-reverse_80s_linear_infinite] py-2">
                    <p className="text-left text-2xl neon-writing font-unbounded whitespace-nowrap">
                        {createBannerContent()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Banner