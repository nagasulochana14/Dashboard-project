import React from 'react';
import { Box, Flex, Input, Text, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const MenuBar = ({ onChange}) => {
    return (
        <Flex
            direction="row"
            height="60px"
            bg="white"
            p={4}
            alignItems="center"
            justifyContent="space-between"
        >
            {/* Sidebar Menu */}
            <Box
                width={{ base: '100%', md: '250px' }}
                borderRight="1px solid gray.200"
                flexShrink="0"
                display="flex"
                alignItems="center"
            >
                <Text fontSize="lg" fontWeight="bold" mb={4} m="3px">Home</Text>
                {/* <Text fontSize="sm" mb={2}>Dashboard</Text> */}
            </Box>

            {/* Search Input and Category Selector */}
            <Box display="flex" alignItems="center">
                <InputGroup mr={4}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                        placeholder="Search..."
                        size="md"
                        variant="outline"
                        borderColor="gray.300"
                        borderRadius="md"
                        bg="gray.50"
                        onChange={onChange}
                    />
                </InputGroup>
            </Box>
        </Flex>
    );
};

export default MenuBar;
