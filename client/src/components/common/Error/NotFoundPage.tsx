import FuzzyText from "@/components/react-bits/TextAnimations/FuzzyText/FuzzyText";



export default function NotFoundPage() {
    const enableHover = true;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "black",
                gap: "8px",
            }}
        >
            <FuzzyText
                fontSize="clamp(6rem, 20vw, 18rem)"
                fontWeight={900}
                fontFamily="'Montserrat', cursive"
                color="white"
                baseIntensity={0.3}
                hoverIntensity={0.7}
                enableHover={enableHover}
            >
                404
            </FuzzyText>

            <FuzzyText
                fontSize="clamp(2rem, 8vw, 6rem)"
                fontWeight={400}
                fontFamily="'Patrick Hand', cursive"
                color="white"
                baseIntensity={0.1}
                hoverIntensity={0.3}
                enableHover
            >
                not found
            </FuzzyText>
        </div>
    );
}
