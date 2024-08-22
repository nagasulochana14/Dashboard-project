import React, { useState } from "react";
import { Box, Checkbox, Text, Flex, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidget } from "../redux/dashboardSlice";
import "./WidgetManager.css";

const WidgetManager = ({ setIsModalOpen }) => {
  const data = useSelector((state) => state.dashboard.data);
  const visibleWidgets = useSelector((state) => state.dashboard.visibleWidgets);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(data.categories[0]?.id || 1);

  // Temporary state to store changes
  const [tempVisibleWidgets, setTempVisibleWidgets] = useState(visibleWidgets);

  const handleCheckboxChange = (categoryId, widgetId, isChecked) => {
    setTempVisibleWidgets((prevState) => {
      const categoryWidgets = prevState[categoryId] || [];

      if (isChecked) {
        return {
          ...prevState,
          [categoryId]: [...categoryWidgets, widgetId],
        };
      } else {
        return {
          ...prevState,
          [categoryId]: categoryWidgets.filter((id) => id !== widgetId),
        };
      }
    });
  };

  const handleConfirm = () => {
    // Dispatch only the necessary updates to the Redux store
    Object.keys(tempVisibleWidgets).forEach((categoryId) => {
      const widgetsInCategory = tempVisibleWidgets[categoryId] || [];

      // Add widgets that are checked
      widgetsInCategory.forEach((widgetId) => {
        if (!visibleWidgets[categoryId]?.includes(widgetId)) {
          dispatch(toggleWidget({ widgetId, isChecked: true, selectedCategory: categoryId }));
        }
      });

      // Remove widgets that are unchecked
      (visibleWidgets[categoryId] || []).forEach((widgetId) => {
        if (!widgetsInCategory.includes(widgetId)) {
          dispatch(toggleWidget({ widgetId, isChecked: false, selectedCategory: categoryId }));
        }
      });
    });

    setIsModalOpen(false); // Close the modal after confirming
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Text mb={4}>
        Personalize your dashboard by adding the following widgets:
      </Text>

      {/* Category Names in a Single Line */}
      <Flex
        mb={4}
        borderBottom="2px solid"
        borderColor="gray.200"
        overflowX="auto"
        gap="20px"
      >
        {data.categories.map((category) => (
          <Text
            key={category.id}
            cursor="pointer"
            borderBottom={
              activeCategory === category.id && "2px solid purple"
            }
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Text>
        ))}
      </Flex>

      {/* Widgets for the Active Category */}
      <Box>
        {data.categories
          .filter((category) => category.id === activeCategory)
          .map((category) => (
            <Box key={category.id} ml={4}>
              {category.widgets.map((widget) => (
                <Box
                  key={widget.id}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  border="1px solid"
                  borderColor="gray.300"
                  padding="2px 8px"
                  borderRadius="md"
                  margin="8px"
                  color="pink.600"
                >
                  <Checkbox
                    isChecked={tempVisibleWidgets[category.id]?.includes(widget.id)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        category.id,
                        widget.id,
                        e.target.checked
                      )
                    }
                  >
                    {widget.name}
                  </Checkbox>
                </Box>
              ))}
            </Box>
          ))}
      </Box>

      <Flex mt="auto" justifyContent="flex-end" gap="8px" padding="8px">
        <Button colorScheme="gray" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button bg="black" color="white" onClick={handleConfirm}>
          Confirm
        </Button>
      </Flex>
    </Box>
  );
};

export default WidgetManager;
