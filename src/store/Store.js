"use client";

export const useStore = () => {
  const items = localStorage.getItem("items");

  const sortedItems = items ? JSON.parse(items).sort((a, b) => {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();
    return aDate - bDate;
  }) : [];

  return sortedItems ? JSON.parse(sortedItems) : [];
}

export const addNewItem = (item) => {
  const items = localStorage.getItem("items");
  const parsedItems = items ? JSON.parse(items) : [];

  if(item?.accountInformation.username) {
    const existingItem = parsedItems.find((i) => i?.accountInformation?.username === item?.accountInformation?.username);
    
    if(existingItem) {
      return {
        success: false,
        message: "User Name already exists",
        data: existingItem
      }
    }
  }
  parsedItems.unshift({...item, createdAt: new Date().toISOString()});
  localStorage.setItem("items", JSON.stringify(parsedItems));
  return {
    success: true,
    message: "Item added successfully",
    data: item
  }
}

