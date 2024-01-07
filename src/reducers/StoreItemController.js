
class StoreItemController{

    static getElementIndex(post_id, postItems){
        let elementindex = -1;
        for (let index = 0; index < postItems.length; index++) {
            const element = postItems[index];
            if(element.id === parseInt(post_id)){
                elementindex = index;
                break;
            }
        }
        return elementindex;
    }

    static getPostCategoryType(postcategory){
        return postcategory.replace("Post", "").trim();
    }

    static removeDuplicates(originalPostItems, duplicatePostItems)
    {
        for(var i = 0, l = originalPostItems.length; i < l; i++) {
            for(var j = 0, ll = duplicatePostItems.length; j < ll; j++) {
                if(originalPostItems[i].id === duplicatePostItems[j].id) {
                    originalPostItems.splice(i, 1, duplicatePostItems[j]);
                    break;
                }
            }
        }

        return originalPostItems;
    }
}

export default StoreItemController;