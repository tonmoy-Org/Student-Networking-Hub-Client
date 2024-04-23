

const SectionTitle = ({heading, subHeading, description}) => {
    return (
        <div className="md:w-6/12 text-center mx-auto py-10">
            <p className="text-[#eb5463]">{subHeading}</p>
            <h1 className="text-4xl py-3 font-bold">{heading}</h1>
            <p className="py-3">{description}</p>
        </div>
    );
};

export default SectionTitle;