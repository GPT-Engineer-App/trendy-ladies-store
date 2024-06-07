import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Box, Image, HStack, IconButton, Badge, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const products = [
  { id: 1, name: "Red Dress", price: 49.99, image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyZWQlMjBkcmVzc3xlbnwwfHx8fDE3MTc3NTczNTV8MA&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 2, name: "Blue Jeans", price: 39.99, image: 'https://images.unsplash.com/photo-1611007724518-5baaa6e24ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxibHVlJTIwamVhbnN8ZW58MHx8fHwxNzE3NzU3MzU2fDA&ixlib=rb-4.0.3&q=80&w=1080' },
  { id: 3, name: "White Blouse", price: 29.99, image: 'https://images.unsplash.com/photo-1608234807905-4466023792f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGJsb3VzZXxlbnwwfHx8fDE3MTc3NTczNTZ8MA&ixlib=rb-4.0.3&q=80&w=1080' },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const handleLogin = () => {
    if (username === "user" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast({
      title: `${product.name} added to cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
    toast({
      title: "Item removed from cart",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePayment = () => {
    setCart([]);
    toast({
      title: "Payment successful",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (!isLoggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login to My First Look</Text>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">My First Look</Text>
        <IconButton aria-label="Cart" icon={<FaShoppingCart />} size="lg" onClick={() => toast({ title: "Cart clicked", status: "info", duration: 2000, isClosable: true })} />
      </HStack>
      <VStack spacing={4} align="stretch">
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
            <HStack>
              <Image src={product.image} boxSize="100px" objectFit="cover" alt={product.name} />
              <VStack align="start">
                <Text fontSize="lg">{product.name}</Text>
                <Text>${product.price.toFixed(2)}</Text>
                <Button size="sm" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Box mt={8}>
        <Text fontSize="xl" mb={4}>
          Shopping Cart
        </Text>
        {cart.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {cart.map((product) => (
              <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <HStack justifyContent="space-between">
                  <Text>{product.name}</Text>
                  <HStack>
                    <Text>${product.price.toFixed(2)}</Text>
                    <IconButton aria-label="Remove" icon={<FaTrash />} size="sm" onClick={() => removeFromCart(product.id)} />
                  </HStack>
                </HStack>
              </Box>
            ))}
            <Button leftIcon={<FaCreditCard />} colorScheme="teal" onClick={handlePayment}>
              Proceed to Payment
            </Button>
          </VStack>
        )}
      </Box>
    </Container>
  );
};

export default Index;
