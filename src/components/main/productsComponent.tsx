import { FC } from 'react';
import styled from 'styled-components';
import {IData} from '../interfaces/interfaces';
import { ProductType } from '../interfaces/types';

type ProductsComponentTypes = {
    data: IData;
    id: string|undefined|null;
    setState: (name:string, value:any)=>void;
    amount: string| undefined | null;
};

const ProductsComponent:FC<ProductsComponentTypes> = ({data, id, setState, amount, children})=>{

    const product = data.products.filter((product:ProductType) =>product.id===id);

    const formatProd = (prod: string)=>{
        const stringArray = prod.split(" ");
        const result = [];
        result.push(stringArray[0], stringArray[1]);

        return result.join(" ");
    };
    return(
        <ProductsWrapper>
            {amount===null && product!==null?
            <>
                
                <h2>Choose an amount to continue</h2>
                <div className="flex-container">
                {product.map((product:any)=>
                
                    product.products.map((prod:string, i:number)=>{
                        return(
                            <ProductCard key={i} onClick={()=>{
                                setState("amount", formatProd(prod));

                            }}>
                                <p>Receiver Gets: </p>
                                <div className="price"><strong>{formatProd(prod)}</strong></div>
                                <div className="divider small">Topup amount {formatProd(prod)}</div>
                            </ProductCard>
                        )
                    })
                    
                )}
                </div>
            </>
            :
            <>
                {children}
            </>
        }
        </ProductsWrapper>
    );
};
const ProductsWrapper = styled.div`

    h2{
        text-align: center;
    }
    .flex-container{
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        margin: 0 auto;
    }
`;
const ProductCard = styled.div`
    border: 1px solid rgb(112, 140, 140);
    border-left: 4px solid rgb(112, 140, 140);
    border-radius: 8px;
    box-shadow: transparent 0px 0px 0px 2px; 
    padding: 0 0.2rem 0.2rem 0.2rem;
    height: 100%;
    width: auto;
    min-width: 230px;
    margin: 0.2rem;
    cursor: pointer;
    p{
        color: rgb(112, 140, 140);
        line-height: 1;
    }
    p.small{
        font-size: 0.9em;
    }
    .divider{
        margin-top: 4px;
        border-top: 1px solid rgb(231, 239, 243);
    }
    .price {
        font-size: 18px;
    }
    &:hover{
        box-shadow: rgb(203 242 0) 0px 0px 2px 2px;
    }
    
`;
export default ProductsComponent;