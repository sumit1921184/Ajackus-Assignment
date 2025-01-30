import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Input, FormLabel, FormControl, FormErrorMessage, Button, Flex, Box } from "@chakra-ui/react";

const UserForm = ({ user, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("email", user.email);
      setValue("department", user.department || "");
    }
  }, [user, setValue]);

  
  useEffect(() => {
    if (!user) {
      reset(); 
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    await onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
     
      <FormControl isInvalid={errors.firstName} isRequired>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input 
          id="firstName" 
          {...register("firstName", { required: "First Name is required" })} 
          placeholder="First Name" 
        />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>

      
      <FormControl isInvalid={errors.lastName} mt={4} isRequired>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input 
          id="lastName" 
          {...register("lastName", { required: "Last Name is required" })} 
          placeholder="Last Name" 
        />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>

      
      <FormControl isInvalid={errors.email} mt={4} isRequired>
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

      
      <FormControl mt={4} isRequired>
        <FormLabel htmlFor="department">Department</FormLabel>
        <Input id="department" {...register("department", { required: "Department is required" })} placeholder="Department" />
      </FormControl>

      
      <Flex mt={4} justify="flex-end">
        <Box mr={4}>
          <Button colorScheme="gray" onClick={onCancel}>Cancel</Button>
        </Box>
        <Button colorScheme="blue" type="submit" isDisabled={Object.keys(errors).length > 0}>
          Save Changes
        </Button>
      </Flex>
    </form>
  );
};

export default UserForm;
