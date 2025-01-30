import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Skeleton,
  useToast,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useModal } from "../contexts/modalContext";
import UserForm from "./UserForm";
import { addUser, deleteUser, fetchUsers, updateUser } from "../api/userService";

const UserList = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showModal, onClose } = useModal(); // Modal context for showing and closing modals
  const [update, setUpdate] = useState(true); // State to trigger re-fetching of users after updates
  const isMobile = useBreakpointValue({ base: true, md: false }); // To check for mobile screen size
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users
  const usersPerPage = 10; // Number of users per page

  // Chakra UI toast for notifications
  const toast = useToast();

  // Fetch users when component mounts or when the page changes
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const usersData = await fetchUsers(currentPage, usersPerPage);

      // Set total users for pagination
      setTotalUsers(() => parseInt(usersData.items));

      // Set the fetched users
      setUsers(usersData.data);
      setLoading(false);
    };
    loadUsers();
  }, [update, currentPage]);

  // Handle user deletion with confirmation modal
  const handleDelete = (id) => {
    showModal({
      heading: "Confirm Deletion",
      body: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Delete User",
          colorScheme: "red",
          onClick: async () => {
            try {
              await deleteUser(id); // Call the delete user API
              toast({
                title: "User Deleted",
                description: "The user has been deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              // Trigger re-fetching after deletion
              setUpdate((prev) => !prev);
            } catch (error) {
              toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to delete user.",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            }
          },

          // Close modal on button click
          closeOnClick: true,
        },
        {
          label: "Cancel",
          colorScheme: "blue",
          onClick: onClose,
          closeOnClick: true,
        },
      ],
    });
  };

  // Handle user editing
  const handleEdit = (user) => {
    showModal({
      heading: "Edit User",
      body: (
        <UserForm
          user={user}
          onSave={async (data) => {
            await updateUser(user.id, data);
            setUpdate((prev) => !prev);
          }}
          onCancel={onClose}
        />
      ),
    });
  };

  // Handle adding a new user
  const handleAddUser = () => {
    showModal({
      heading: "Add User",
      body: (
        <UserForm
          user={null}
          onSave={async (data) => {
            const newUser = await addUser(data);
            if (newUser) {
              setUpdate((prev) => !prev);
            }
          }}
          onCancel={onClose}
        />
      ),
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(totalUsers / usersPerPage); // Calculate total pages
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1)); // Go to previous page
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // Go to next page

  return (
    <Box
      w="90vw"
      h="100vh"
      overflow="hidden"
      mt={4}
      p={4}
      boxSizing="border-box"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      {/* Button to trigger adding a new user */}
      <Button colorScheme="blue" onClick={handleAddUser} mb={4}>
        Add User
      </Button>

      {/* Table for displaying users */}
      <Box
        maxHeight="calc(100vh - 210px)"
        overflowY="auto"
        border="1px solid #ddd"
        borderRadius="md"
      >
        <Table variant="simple">
          <Thead position="sticky" top="0" bg="white" zIndex={1}>
            <Tr>
              <Th width={isMobile ? "15%" : "10%"}>Id</Th>
              <Th width={isMobile ? "25%" : "15%"}>First Name</Th>
              <Th width={isMobile ? "25%" : "15%"}>Last Name</Th>
              <Th width={isMobile ? "35%" : "20%"}>Email</Th>
              <Th width={isMobile ? "35%" : "20%"}>Department</Th>
              <Th width={isMobile ? "30%" : "20%"}>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {loading ? (
              // Show skeleton loaders while loading data
              Array.from({ length: 10 }).map((_, index) => (
                <Tr key={index}>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" /></Td>
                  <Td><Skeleton height="20px" width="50px" /></Td>
                </Tr>
              ))
            ) : (
              // Show users in the table after data is loaded
              users.map((user, index) => (
                <Tr key={user.id} bg={index % 2 === 0 ? "gray.100" : "white"}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.department || "No Department"}</Td>
                  <Td>
                    {/* Buttons for editing and deleting users */}
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit"
                      colorScheme="blue"
                      onClick={() => handleEdit(user)}
                      mr={2}
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      colorScheme="red"
                      onClick={() => handleDelete(user.id)}
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination controls */}
      <Flex justify="center " align="center" mt={4} gap={5}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
          colorScheme="blue"
        />
        <Box>
          Page {currentPage} of {totalPages}
        </Box>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
          colorScheme="blue"
        />
      </Flex>
    </Box>
  );
};

export default UserList;
