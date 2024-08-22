import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { addWidget } from "../redux/dashboardSlice";

const AddWidgetForm = ({ selectedCategory, onClose, setIsFormOpen }) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(false);
    if (widgetName) {
      const newWidget = {
        id: new Date().getTime(), // Unique ID for the new widget
        name: widgetName,
        text: widgetText,
      };

      // Dispatch an action to add the widget to the selected category
      dispatch(addWidget({ categoryId: selectedCategory, widget: newWidget }));

      // Clear the input fields
      setWidgetName("");
      setWidgetText("");

      // Close the form/modal
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="widgetName">Widget Name</FormLabel>
          <Input
            id="widgetName"
            type="text"
            placeholder="Widget Name"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="widgetText">Widget Text (Optional)</FormLabel>
          <Input
            id="widgetText"
            type="text"
            placeholder="Widget Text (Optional)"
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mr={2}>
          Save
        </Button>
        <Button
          onClick={() => {
            setIsFormOpen(false);
            onClose();
          }}
          colorScheme="gray"
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddWidgetForm;
