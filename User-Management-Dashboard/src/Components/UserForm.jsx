import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Input, FormLabel, FormControl, FormErrorMessage, Button, Flex, Box, useToast } from "@chakra-ui/react";


const UserForm = ({ user, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();


  const toast = useToast();

  // useEffect for setting form data or resetting form when user prop changes
  useEffect(() => {
    if (user) {

      // Pre-fill the form with the existing user data if available
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("department", user.department || "");
    } else {

      // Reset form if no user is provided
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      // Attempt to save the user data
      await onSave(data);

      toast({
        title: "Success",
        description: "User saved successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Delay closing the form slightly to show the toast first
      setTimeout(() => {
        reset();
        onCancel();
      }, 500);

    } catch (error) {
      console.error("Error saving user:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.response && error.response.data && error.response.data.message) {
        // If server returns a specific error message, use it
        errorMessage = error.response.data.message;
      }

      // Show error message in a toast
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

      {/* First Name Input */}
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


      {/* Last Name Input */}
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


      {/* Email Input */}
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


      {/* Department Input */}
      <FormControl isInvalid={!!errors.department} mb={4}>
        <FormLabel htmlFor="department">Department</FormLabel>
        <Input
          id="department"
          {...register("department", {
            required: "Department is required",
            pattern: { value: /^[A-Za-z]+$/, message: "Department should contain letters" }
          })}
          placeholder="Department"
        />
        <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
      </FormControl>


      {/* Form Action Buttons */}
      <Flex mt={4} justify="flex-end">
        <Box mr={4}>

          {/* Cancel Button */}
          <Button colorScheme="gray" onClick={() => { reset(); onCancel(); }}>
            Cancel
          </Button>
        </Box>

        {/* Save Button */}
        <Button colorScheme="blue" type="submit" isDisabled={Object.keys(errors).length > 0}>
          Save Changes
        </Button>
      </Flex>
    </form>
  );
};

export default UserForm;
