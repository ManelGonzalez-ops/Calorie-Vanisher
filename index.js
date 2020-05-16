// Storage Controller









// App Controller
const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);

    document.querySelector(UISelectors.updateBtn).addEventListener("click", updateEditItem);

    document.querySelector(UISelectors.deleteBtn).addEventListener("click", removeItem)
    document.querySelector(UISelectors.clearBtn).addEventListener("click", removeEverything)
    document.querySelector(UISelectors.backBtn).addEventListener("click", turnback)
  }

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();


    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      const itemGood = newItem.obtainObject()
      

      StorageCtrl.updateStorage(itemGood)

      // Add item to UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  }

  // Update item submit
  const itemUpdateSubmit = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // Get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);




      // Add item to form
      UICtrl.addItemToForm();
    }

    e.preventDefault();
  }

  const updateEditItem = function (e) {

    let currentElement = ItemCtrl.getCurrentItem() //aquí el nombre de la funcion confunde porque no solo obtenemos el current element si no que lo
    const lista = document.querySelectorAll(".collection-item")
    lista.forEach(li => {
      let lispit = li.id.split("-")
      if (currentElement.id == parseInt(lispit[1])) {
        const objetivo = document.getElementById(`item-${currentElement.id}`)
        const input = UICtrl.getItemInput()


        const cambiar = ItemCtrl.getItems()
        
        let listaActualizada = []
        cambiar.forEach(item => {
          if (item.id === currentElement.id) {
            item.calories = parseInt(input.calories)
            item.name = input.name
          }
          listaActualizada.push(item)  //si te fijas vamos a meter todos los items, solo que si se cumple el if uno de ellos sera modificado

        })
        
        

        UICtrl.setUpdatedItem(input, objetivo)
        UICtrl.clearInput();
        UICtrl.clearEditState()

        StorageCtrl.deleteItemSto(listaActualizada)
        const calories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(calories)
      }


    })

    e.preventDefault()
  }

  const removeItem = function (e) {

    const currentElement = ItemCtrl.getCurrentItem()
    const lista = document.querySelectorAll(".collection-item")
    lista.forEach(li => {
      let lispit = li.id.split("-")
      if (currentElement.id == parseInt(lispit[1])) {
        const objetivo = document.getElementById(`item-${currentElement.id}`)
        const inputs = UICtrl.getItemInput()



        ItemCtrl.deleteCurrentItem(currentElement)
        const data = ItemCtrl.getItems()

        StorageCtrl.deleteItemSto(data)

        UICtrl.deleteItem(objetivo)

        UICtrl.clearInput();
        UICtrl.clearEditState()
       

        const calories = ItemCtrl.getTotalCalories()
        UICtrl.showTotalCalories(calories)

      }
    })

    e.preventDefault()
  }

  const removeEverything = function () {
    const dataStructure = ItemCtrl.logData()
    
    dataStructure.items = []
    dataStructure.totalCalories = 0
   
    
    //const lista = document.getElementById("item-list")
    let elementos = document.querySelectorAll(".collection-item")
    //elementos.forEach(item => lista.removeChild(item))
    elementos.forEach(item => item.remove())

    const calories = ItemCtrl.getTotalCalories()
    UICtrl.showTotalCalories(calories)
    UICtrl.hideList()

    StorageCtrl.clearStorage()
  }

  const turnback = function(){
    UICtrl.clearEditState()
  }


  // Public methods
  return {
    init: function () {
      // Clear edit state / set initial set
      UICtrl.clearEditState();

      const elementos = StorageCtrl.copyData()
      //const realitems = StorageCtrl.copyData(items)
      // Fetch items from data structure
      if (elementos) {
        elementos.forEach(elem => {
          ItemCtrl.addItem(elem.name, elem.calories)
        })
      }

      const items = ItemCtrl.getItems();


      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }

})(ItemCtrl, UICtrl, StorageCtrl);

// Initialize App
App.init();