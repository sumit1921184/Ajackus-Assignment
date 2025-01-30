import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Input, FormLabel, FormControl, FormErrorMessage, Button, Flex, Box, useToast, useModal } from "@chakra-ui/react";


const UserForm = ({ user, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();


  const toast = useToast();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("department", user.department || "");
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      await onSave(data);

      toast({
        title: "Success",
        description: "User saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Delay closing form slightly to allow toast to appear first
      setTimeout(() => {
        reset(); // Reset the form
        onCancel(); // Close the form
      }, 500);

    } catch (error) {
      console.error("Error saving user:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // Show server error message
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 4000,
        isClosable: true,
      });

    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <FormControl isInvalid={!!errors.firstName} mb={4}>

        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          {...register("firstName", {
            required: "First Name is required",
            pattern: { value: /^[A-Za-z]{3,}$/, message: "First Name should contain letters and at least three letters" }

          })}
          placeholder="First Name"
        />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>


      <FormControl isInvalid={!!errors.lastName} mb={4}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          {...register("lastName", {
            required: "Last Name is required",
            pattern: { value: /^[A-Za-z]{3,}$/, message: "Last Name should contain letters and at least three letters" }
          })}
          placeholder="Last Name"
        />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>


      <FormControl isInvalid={!!errors.email} mb={4}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" }
          })}
          placeholder="Email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>


      <FormControl isInvalid={!!errors.department} mb={4}>
        <FormLabel htmlFor="department">Department</FormLabel>
        <Input
          id="department"
          {...register("department", {
            required: "Department is required",
            pattern: { value: /^[A-Za-z]+$/,
            message: "Department should contain letters" }

          })}
          placeholder="Department"
        />
        <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
      </FormControl>


      <Flex mt={4} justify="flex-end">
        <Box mr={4}>
          <Button colorScheme="gray" onClick={() => { reset(); onCancel(); }}>Cancel</Button>
        </Box>
        <Button colorScheme="blue" type="submit" isDisabled={Object.keys(errors).length > 0}>
          Save Changes
        </Button>
      </Flex>
    </form>
  );
};

export default UserForm;
