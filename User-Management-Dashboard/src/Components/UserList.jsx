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
  useBreakpointValue,
  Grid,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useModal } from "../contexts/modalContext";
import UserForm from "./UserForm";
import { deleteUser, fetchUsers, updateUser } from "../api/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showModal, onClose } = useModal();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const usersData = await fetchUsers(); 
      setUsers(usersData);
      setLoading(false);
    };
    loadUsers();
  }, []);

  const handleDelete = (id) => {
    showModal({
      heading: "Confirm Deletion",
      body: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Delete User",
          colorScheme: "red",
          onClick: () => deleteUser(id), 
          closeOnClick: true,
        },
        {
          label: "Cancel",
          colorScheme: "blue",
          onClick: onClose,
          closeOnClick: true,
        },
        
      ],
      onSave: async () => {
        const isDeleted = await deleteUser(id); 
        if (isDeleted) {
          setUsers(users.filter((user) => user.id !== id));
        }
      },
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
          }} 
        />
      ),
      
    });
  };
  

  const handleAddUser = () => {
    showModal({
      heading: "Add User",
      body: <UserForm />,
      buttons: [
        {
          label: "Add User",
          colorScheme: "blue",
          onClick: () => console.log("User added"), 
          closeOnClick: true,
        },
        
      ],
    });
  };

  return (
    <Box
      w="90vw"
      h="100vh"
      overflow="hidden"
      m={4} // Adds margin to the whole container
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
        maxHeight="calc(100vh - 200px)" 
        overflowY="auto"
        
        border="1px solid #ddd"
        borderRadius="md"
      >
        <Table variant="simple">
          <Thead position="sticky" top="0" bg="white" zIndex={1}>
            <Tr>
              <Th>Id</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Department</Th>
              <Th>Action</Th>
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
    </Box>
  );
};

export default UserList;
