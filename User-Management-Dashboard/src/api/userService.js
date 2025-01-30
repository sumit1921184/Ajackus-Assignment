const API_URL = "https://user-json-aa7y.onrender.com/users";

//Function to fetch users with pagination
export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_URL}?_page=${page}&_per_page=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();  
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;  
  }
};

//Function to add users 
export const addUser = async (user) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to add user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;  
  }
};

//Function to update users
export const updateUser = async (id, user) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const data = await response.json();
    console.log("data",data,id);
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;  
  }
};

//Function to delete users
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;  
  }
};
