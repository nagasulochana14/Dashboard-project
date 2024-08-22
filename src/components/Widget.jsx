import React from 'react';
import { Box, IconButton, Text, CircularProgress } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../redux/dashboardSlice'; 

const Widget = ({ widget, category }) => {
  const dispatch = useDispatch();

  // Check if the category is a progress category
  const isProgressCategory = category.id === 1; // Adjust this logic as needed

  const handleRemoveWidget = () => {
    dispatch(removeWidget({
      categoryId: category.id, // Pass the categoryId
      widgetId: widget.id // Pass the widgetId
    }));
  };

  return (
    <Box
      width="320px"
      height="180px"
      margin="10px"
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      position="relative"
      overflow="hidden"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Text
        fontWeight="bold"
        position="absolute"
        top="8px"
        left="15px"
        textAlign="left"
      >
        {widget.name}
      </Text>

      {isProgressCategory ? (
        <>
          <CircularProgress
            value={widget.progress || 50}  // Default progress to 50 if not provided
            size="100px"
            thickness="8px"
            color="teal"
          />
          <Text mt={2} textAlign="center">
            {widget.text}
          </Text>
        </>
      ) : (
        <Text mt={2} textAlign="center">
          {widget.text}
        </Text>
      )}

      <IconButton
        aria-label="Remove widget"
        icon={<CloseIcon />}
        onClick={handleRemoveWidget} // Updated to handleRemoveWidget
        position="absolute"
        top="2"
        right="2"
        size="sm"
        color="red"
      />
    </Box>
  );
};

export default Widget;
