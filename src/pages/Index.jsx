import { Container, Text, VStack, Heading, Button, Box, Image, Input, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("https://api.example.com/watchlist");
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data);
        } else {
          console.error("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      fetchSearchResults(event.target.value);
    } else {
      setSearchResults([]);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="2xl" mb={4}>Welcome to MovieFlix</Heading>
        <Text fontSize="lg" textAlign="center">
          Your ultimate destination for unlimited movies and TV shows. Watch anywhere. Cancel anytime.
        </Text>
        <Box boxSize="sm" mt={6}>
          <Image src="/images/movie-flix-logo.png" alt="MovieFlix Logo" />
        </Box>
        <Input
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="lg"
          width="50%"
        />
        <SimpleGrid columns={4} spacing={4} width="100%">
          {searchResults.map((movie) => (
            <Box key={movie.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Image src={movie.poster} alt={movie.title} />
              <Box p={2}>
                <Text fontWeight="bold" fontSize="md" isTruncated>{movie.title}</Text>
                <Button colorScheme="teal" size="sm" onClick={() => addToWatchlist(movie)}>Add to Watchlist</Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
        <VStack spacing={4} width="100%" mt={8}>
          <Heading as="h2" size="xl">My Watchlist</Heading>
          <SimpleGrid columns={4} spacing={4} width="100%">
            {watchlist.map((movie) => (
              <Box key={movie.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={movie.poster} alt={movie.title} />
                <Box p={2}>
                  <Text fontWeight="bold" fontSize="md" isTruncated>{movie.title}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;