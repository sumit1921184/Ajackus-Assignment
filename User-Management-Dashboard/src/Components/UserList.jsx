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
  const { showModal, onClose } = useModal();
  const [update, setUpdate] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;

  const toast = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const usersData = await fetchUsers(currentPage, usersPerPage);
      setTotalUsers(() => parseInt(usersData.items))
      setUsers(usersData.data);
      setLoading(false);
    };
    loadUsers();
  }, [update, currentPage]);


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
              await deleteUser(id);

              toast({
                title: "User Deleted",
                description: "The user has been deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

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

  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
      <Button colorScheme="blue" onClick={handleAddUser} mb={4}>
        Add User
      </Button>

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
              users.map((user, index) => (
                <Tr key={user.id} bg={index % 2 === 0 ? "gray.100" : "white"}>
                  <Td>{user.id}</Td>
                  <Td>{user.firstName}</Td>
                  <Td>{user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.department || "No Department"}</Td>
                  <Td>
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
