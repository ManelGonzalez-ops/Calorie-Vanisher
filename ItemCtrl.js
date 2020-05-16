// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
      this.id = id;
      this.name = name;
      this.calories = calories;

      this.obtainObject = function(){
          return {
              id: this.id,
              name: this.name,
              calories: this.calories
          }
      }
    }
  
    // Data Structure / State
    const data = {
      items: [
        // {id: 0, name: 'Steak Dinner', calories: 1200},
        // {id: 1, name: 'Cookie', calories: 400},
        // {id: 2, name: 'Eggs', calories: 300}
      ],
      currentItem: null,
      totalCalories: 0
    }
  
    // Public methods
    return {
      getItems: function(){
        
        return data.items;
        
      },
      addItem: function(name, calories){
        let ID;
        // Create ID
        if(data.items.length > 0){
          ID = data.items.length;
        } else {
          ID = 0;
        }
  
        // Calories to number
        calories = parseInt(calories);
  
        // Create new item
        newItem = new Item(ID, name, calories);
  
        // Add to items array
        data.items.push(newItem);
  
        return newItem;
      },
      getItemById: function(id){
        let found = null;
        // Loop through items
        data.items.forEach(function(item){
          if(item.id === id){
            found = item;
          }
        });
        return found;
      },
      setCurrentItem: function(item){
        data.currentItem = item;
      },
      getCurrentItem: function(){
        return data.currentItem;
      },
      getTotalCalories: function(){
        let total = 0;
  
        // Loop through items and add cals
        data.items.forEach(function(item){
          total += item.calories;
        });
  
        // Set total cal in data structure
        data.totalCalories = total;
  
        // Return total
        return data.totalCalories;
      },
        deleteCurrentItem : function(current){
            data.items.forEach((item,index) =>{
                if (item.id === current.id){
                    data.items.splice(index, 1)
                }
                
            })
        }
      ,
      logData: function(){
        return data;
      }
    }
  })();