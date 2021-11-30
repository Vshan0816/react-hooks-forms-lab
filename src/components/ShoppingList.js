import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items , setItems}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("Produce")
  


  function handleNameChange(e){
    setItemName(e.target.value)
  }

  function handleItemChange(e){
    setItemCategory(e.target.value)
  }

  function onSearchChange (e) {
    setSearch(e.target.value)
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }
  
  function onItemFormSubmit(e){
    e.preventDefault()
    const newItem = {
      id: uuid(), // the `uuid` library can be used to generate a unique id
      name: itemName,
      category: itemCategory,
    };
    const itemArray = [...items, newItem]
    setItems(itemArray)
  }


  const itemsToDisplay = items.filter((item) => {
    let stringMatch = false
    let categoryMatch = false

    if (selectedCategory === "All") {categoryMatch = true}
    if (selectedCategory === item.category){categoryMatch = true}
    if (item.name.indexOf(search)>=0){stringMatch = true}

    return stringMatch && categoryMatch
  });

  // const finalArray = itemsToDisplay.filter((item)=> {
  //   const length = item.name.length
  //   if (selectedCategory === "All") {return true}
  //   else if (search.slice(0, length) === item.name.slice(0,length)) return true
    
  // })

  return (
    <div className="ShoppingList">
      <ItemForm 
        onItemFormSubmit={onItemFormSubmit}
        itemName={itemName}
        handleNameChange={handleNameChange}
        handleItemChange={handleItemChange}/>
      <Filter
       onCategoryChange={handleCategoryChange}
       onSearchChange={onSearchChange}
        search={search}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
