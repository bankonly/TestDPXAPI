const _ = require("ssv-utils")

const UserFunc = {
  convert_product_response :(data)=> {
    let result = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let name = null
      let desc = null
      let price = element.price
      let img = null

      if(element.product_master_id){
        name= element.product_master_id.name
        desc = element.product_master_id.desc
        img = element.product_master_id.img[0]
      }
      if(!price){
        price = element.product_option_id.option_detail[0].price
      }

      let push_obj = {
        _id:element._id,
        name:name,
        price:price,
        discount_percentage:_.generateOtp({limit:2}),
        desc,
        img
      }
      result.push(push_obj)
    }
    return result
  }
};

module.exports = UserFunc;
