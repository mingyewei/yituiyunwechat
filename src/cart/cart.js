/**
 * Created by james on 2016-10-25.
 */

export function applyPromotionResToCart(Promotions=[],cartItems){
  let promotionCartItems=[];
  cartItems.map(item=>{
    if(item.groupid=='0') {
      promotionCartItems.push(Object.assign({}, item));
    } else {
      if(item.isSuit && typeof item.packageItems !='undefined') {
        item.packageItems.map(pkgItem=> {
          promotionCartItems.push(Object.assign({}, pkgItem, {
            _id: item._id,
            custid: item.custid,
            groupid: item.groupid,
            isSuit: true,
            suitNo: item.suitNo,
            checked: item.checked,
            status: item.status
          }))
        })
      }
    }
  });
  promotionCartItems=clearPromotions(promotionCartItems);
  Promotions.map((promotion)=>{
    let cartLen=promotionCartItems.length;
    //TypeId=2表示买赠促销
    if(promotion.TypeId==2){
      promotion.Gifts.map(gift=>{
        promotionCartItems.push({
          prodid:gift.ProdId,
          promotionId:promotion.Id,
          promotionTypeName:promotion.TypeName,
          price:gift.Price,
          count:gift.Qty,
          discount:0,
          name:gift.Name,
          img:getSmallImage(gift.Img),
          isGift:true,
          checked:true
        });
      })

    }

    promotion.Items.map((item)=>{
      for(let i =0;i<cartLen; i++)
      {
        if(promotionCartItems[i].groupid==item.GroupId && promotionCartItems[i].prodid==item.ProdId && promotionCartItems[i].promotionId ==0){

          if(promotionCartItems[i].count>item.Qty){
            let splitCartItem=Object.assign({},promotionCartItems[i],{count:promotionCartItems[i].count-item.Qty});
            promotionCartItems.push(splitCartItem);
          }
          promotionCartItems[i].count=item.Qty;
          promotionCartItems[i].discount=item.Discount;
          promotionCartItems[i].promotionId=promotion.Id;
          promotionCartItems[i].promotionTypeName=promotion.TypeName;
          break;
        }
      }
    });


  });

  promotionCartItems.map((item)=>{
    item.subtotal=item.price*item.count-item.discount;
  });
  promotionCartItems.sort((a,b)=>{return a.promotionId-b.promotionId});
  return promotionCartItems;
}

export function clearPromotions(cartItems){
  let oriCartItems=[];
  cartItems=cartItems.filter(item=>(typeof item.isGift =='undefined' || item.isGift==false));
  cartItems.map(item=>{
    let matchCartItem=oriCartItems.find(oriItem=>oriItem.groupid==item.groupid && oriItem.prodid==item.prodid && oriItem.suitNo==item.suitNo);

    if(typeof matchCartItem != 'undefined'){
      matchCartItem.count+=item.count;
    }else {
      matchCartItem=item;
      oriCartItems.push(matchCartItem);
    }
    matchCartItem.discount=0;
    matchCartItem.promotionId=0;
    delete matchCartItem.promotionTypeName;
  });

  return oriCartItems;

}

function getSmallImage(image){
  let fileStart=image.lastIndexOf('/');
  let filePath=image.substring(0,fileStart+1);
  let fileName=image.substring(fileStart+1);
  return filePath+'s/'+fileName;

}


