import React, { useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import Widget from "./Widget";
import AddWidgetForm from "./AddWidgetForm";
import Modal from "./Modal";

const Category = ({ category, widgets }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function getProgressValue(i) {
    let value = (i + 1) * 20;

    if (value > 100) {
      i = 1;
      return (i + 1) * 20;
    } else {
      return value;
    }
  }

  return (
    <Box mb={4}>
      <Box as="h2" mb={2} fontSize="xl" fontWeight="bold">
        {category.name}
      </Box>
      <Flex wrap="wrap" gap={4}>
        {widgets.map((widget, i) => (
          <Widget
            key={widget.id}
            widget={widget}
            category={category}
            progressValue={getProgressValue(i)}
          />
        ))}
        <Box
          width="320px"
          height="180px"
          margin="10px"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          <Button
            onClick={() => setIsFormOpen(true)}
            colorScheme="white"
            color="black"
            boxShadow="md"
            bg="gray.50"
            borderWidth="1px"
          >
            + Add Widget
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <AddWidgetForm
          selectedCategory={category.id}
          setIsFormOpen={setIsFormOpen}
        />
      </Modal>
    </Box>
  );
};

export default Category;
