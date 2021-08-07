import { FC, useState } from 'react';
import styled from 'styled-components';
import InfoComponent from './infoComponent';

type ProductsComponentTypes = {
    data: any;
    id: string;
}
const ProductsComponent:FC<ProductsComponentTypes> = ({data, id})=>{
    const products = id===""?data.products:data.products.filter((product:any) =>product===product.id)
    return(
        <>
            {products.map((product:any)=>{
                return(
                    <div key={product.id}>{product}</div>
                );
            })}
        </>
    );
};
export default ProductsComponent;