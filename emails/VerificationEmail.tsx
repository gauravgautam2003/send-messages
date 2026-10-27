import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text } from 'react-email';

interface WelcomeEmailProps {
    username: string;
    otp: string;
}

const WelcomeEmail = ({ username, otp }: WelcomeEmailProps) => {

    return (
        <Html>
            <Head />
            <Preview>Verification Code</Preview>
            <Tailwind>
                <Body className="bg-black m-auto font-sans">
                    <Container className="mb-10 mx-auto p-5 max-w-[465px]">
                        <Section className="mt-10">
                            <Img
                                src={`https://example.com/brand/example-logo.png`}
                                width="60"
                                height="60"
                                alt="Logo Example"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Text className="text-start text-sm text-white">
                            Hello {username},
                        </Text>
                        <Text className="text-start text-sm text-white leading-relaxed">
                            Welcome to Example! We're excited to have you on board. To get started, please use the following verification code:
                        </Text>
                        <Heading className="text-start text-2xl text-white font-bold mt-4 mb-4">
                            {otp}
                        </Heading>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="py-2.5 px-5 bg-white rounded-md text-black text-sm font-semibold no-underline text-center"
                                href={`https://example.com/get-started`}
                            >
                                Get Started
                            </Button>
                        </Section>
                        <Text className="text-start text-sm text-white leading-relaxed">
                            If you did not sign up for this account, please ignore this email. This verification code will expire in 10 minutes.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;