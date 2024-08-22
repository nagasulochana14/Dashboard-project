// src/components/Dashboard.js
import React, { useState } from 'react';
import { Box, Button, Text, IconButton } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import Category from './Category';
import WidgetManager from './WidgetManager';
import Modal from './Modal';
import { resetDashboard } from '../redux/dashboardSlice';
import MenuBar from './Menubar';

const Dashboard = () => {
  const data = useSelector((state) => state.dashboard.data);
  const visibleWidgets = useSelector((state) => state.dashboard.visibleWidgets);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  const reset = () => {
    dispatch(resetDashboard());
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

   const filteredCategories = data.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <Box>
      <MenuBar onChange={handleSearchChange}/>
    <Box height="93vh" display="flex" flexDirection="column" p={4} bg="gray.50">
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">CNAPP Dashboard</Text>
        <Box>
          <Button onClick={() => setIsModalOpen(true)} 
          colorScheme="white" 
          mr={2} 
          color="black" 
          boxShadow="md"
          bg="white"
          borderWidth="1px"
          >
            Add Widget +
          </Button>
          <IconButton
            icon={<RepeatIcon />}
            onClick={reset}
            aria-label="Reset Dashboard"
            colorScheme="white"
            color="black"
            boxShadow="md"
            bg="white"
            borderWidth="1px"
          />
        </Box>
      </Box>
      <Box flex="1" overflowY="auto" display="flex" flexDirection="column">
        {filteredCategories.map(category => (
          <Category
            key={category.id}
            category={category}
            widgets={category.widgets.filter(widget => visibleWidgets[category.id]?.includes(widget.id))}
          />
        ))}
      </Box>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WidgetManager setIsModalOpen={setIsModalOpen} />
      </Modal>
    </Box>
    </Box>
  );
};

export default Dashboard;
