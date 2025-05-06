import Image, { StaticImageData } from 'next/image';

interface HeaderSectionProps {
    title: string;
    subtitle: string;
    imageSrc?: string | StaticImageData;
}

/**
 * A reusable header section component for guide pages
 * @param title - The main title of the section
 * @param subtitle - The subtitle that appears below the title
 * @param imageSrc - Optional image to display below the title
 */
const HeaderSection = ({ title, subtitle, imageSrc }: HeaderSectionProps) => (
    <section className="mb-8" aria-labelledby="header-title">
        <h1
            id="header-title"
            className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white"
        >
            {title}
            <br />
            <span className="underline underline-offset-3 decoration-8 decoration-[#208282]">{subtitle}</span>
        </h1>
        {imageSrc && (
            <Image
                src={imageSrc}
                alt={`${title} - ${subtitle}`}
                width={900}
                height={10}
                className="mb-5"
                priority
            />
        )}
    </section>
);

export default HeaderSection; 