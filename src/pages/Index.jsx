import { Container, Text, VStack, Heading, Button, Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to MovieFlix</Heading>
        <Text fontSize="lg" textAlign="center">
          Your ultimate destination for unlimited movies and TV shows. Watch anywhere. Cancel anytime.
        </Text>
        <Box boxSize="sm" mt={6}>
          <Image src="/images/movie-flix-logo.png" alt="MovieFlix Logo" />
        </Box>
        <Button as={Link} to="/catalog" colorScheme="teal" size="lg" mt={6}>
          Explore Now
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;