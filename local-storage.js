 const StorageCtrl = (function () {

    const storage = {
        // {id=.. name=.. calories}
    }


    return {

        updateStorage: function (item) {
            let store;
            
            if (!localStorage.getItem("elementos")) {
                store = []
            }
            else {
                store = JSON.parse(localStorage.getItem("elementos"))
            }
            console.log(item)
            
            store.push(item)

            localStorage.setItem("elementos", JSON.stringify(store))
        },

        copyData: function () {
            
            const elementos = JSON.parse(localStorage.getItem("elementos"))
            
            return elementos            
        },
        
        deleteItemSto: function(items){
            localStorage.setItem("elementos", JSON.stringify(items))
        },

        clearStorage: function(){
            localStorage.clear()
        }
        
    }
})()